import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from "motion/react";
import { Children, cloneElement, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import "./Dock.css";

interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

interface DockItemProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  mouseX: MotionValue<number>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  magnification: number;
  baseItemSize: number;
  label: string;
}

function DockItem({ children, className = "", onClick, mouseX, spring, distance, magnification, baseItemSize, label }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
      )}
    </motion.div>
  );
}

function DockLabel({ children }: { children: ReactNode; className?: string; isHovered?: MotionValue<number> }) {
  const { isHovered } = { isHovered: undefined };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest: number) => setIsVisible(latest === 1));
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="dock-label"
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
