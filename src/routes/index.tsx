import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Bell, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, CreditCard, Gamepad2, Home, Mail, MapPin, Megaphone, Menu, MessageCircle, Search, ShieldCheck, ShoppingCart, Star, Trash2, UserRound, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dock from "@/components/Dock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virtualities | Itens e contas para seus jogos" },
      { name: "description", content: "Explore jogos populares, novidades e itens digitais na Virtualities." },
      { property: "og:title", content: "Virtualities | Itens e contas para seus jogos" },
      { property: "og:description", content: "Explore jogos populares, novidades e itens digitais na Virtualities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const games = ["Murder Mystery 2", "🔥 Slayers 2", "Contas Blox Fruits", "Gamepasses e Frutas Blox Fruits", "Creatures of Sonaria", "Blade Ball", "Steal An Egg", "Anime Dice"];
const categories = ["Murder Mystery 2", "🔥 Slayers 2", "Contas Blox Fruits", "Gamepasses e Frutas Blox Fruits", "Creatures of Sonaria", "Blade Ball"];
const items = [
  { name: "Icewing", price: "R$ 15,17", old: "R$ 16,67", tag: "ANCIENT" },
  { name: "Blue Seer", price: "R$ 12,08", old: "R$ 13,27", tag: "GODLY" },
  { name: "Orange Seer", price: "R$ 8,81", old: "R$ 9,66", tag: "GODLY" },
  { name: "Purple Seer", price: "R$ 9,93", old: "R$ 10,91", tag: "GODLY" },
  { name: "Red Seer", price: "R$ 12,08", old: "R$ 13,27", tag: "GODLY" },
  { name: "Ice Shard", price: "R$ 15,17", old: "R$ 16,67", tag: "GODLY" },
  { name: "Batwing", price: "R$ 18,90", old: "R$ 20,79", tag: "ANCIENT" },
  { name: "Violet Scythe", price: "R$ 11,70", old: "R$ 12,87", tag: "GODLY" },
];
const news = [
  { type: "NOVIDADE", title: "Novo no catálogo: Todas as Gamepass do Jogo", desc: "Novidade fresquinha em Anime Breaker — corre conferir antes que acabe.", time: "há 23 min" },
  { type: "REPOSIÇÃO", title: "Conta com Clan Rengoku (0.1%) voltou ao estoque", desc: "Voltou! Conta com Clan Rengoku está disponível novamente.", time: "há 53 min" },
  { type: "NOVIDADE", title: "Novo no catálogo: Small Storage", desc: "Novidade fresquinha em Anime Breaker — corre conferir antes que acabe.", time: "há 53 min" },
  { type: "NOVIDADE", title: "Novo no catálogo: Big Storage", desc: "Novidade fresquinha em Anime Breaker — corre conferir antes que acabe.", time: "há 53 min" },
];
const faqs = [
  { q: "Como funciona o processo de compra?", a: "Escolha o produto desejado, adicione ao carrinho e finalize a compra. Após a confirmação do pagamento, siga as instruções de entrega informadas no pedido." },
  { q: "Quanto tempo leva para receber os itens?", a: "O prazo pode variar conforme o produto e a disponibilidade. Confira as informações de entrega antes de finalizar seu pedido." },
  { q: "Quanto tempo demora para receber Robux?", a: "O prazo de entrega de Robux depende do método escolhido e das informações do pedido." },
  { q: "Quais formas de pagamento são aceitas?", a: "Consulte as formas de pagamento disponíveis na finalização da compra." },
  { q: "Preciso falar com alguém para receber meu pedido?", a: "Alguns produtos exigem contato para combinar a entrega. As instruções são apresentadas após a compra." },
];

function Heading({ icon: Icon, children }: { icon: typeof Star; children: React.ReactNode }) {
  return <h2 className="section-heading"><span className="heading-icon"><Icon size={19} /></span>{children}</h2>;
}

function Index() {
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(0);
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const visibleGames = useMemo(() => games.filter(g => g.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR"))), [query]);
  const addItem = (name: string) => { setCart(current => [...current, name]); setCartOpen(true); };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const dockItems = [
    { icon: <Home size={20} />, label: "Início", onClick: () => scrollTo("inicio") },
    { icon: <Star size={20} />, label: "Catálogo", onClick: () => scrollTo("catalogo") },
    { icon: <Megaphone size={20} />, label: "Novidades", onClick: () => scrollTo("novidades") },
    { icon: <CircleHelp size={20} />, label: "FAQ", onClick: () => scrollTo("faq") },
    { icon: <MessageCircle size={20} />, label: "Suporte", onClick: () => scrollTo("contato") },
    { icon: <ShoppingCart size={20} />, label: "Carrinho", onClick: () => setCartOpen(true) },
  ];

  return <div className="site-shell" id="inicio">
    <header className="site-header">
      <div className="announcement"><span><Zap size={11} fill="currentColor" /> Entrega imediata via PIX</span><i /> <span><Clock3 size={11} /> Entregas 24h, todos os dias</span><i /> <span><ShieldCheck size={11} /> Compra 100% segura</span></div>
      <div className="navigation">
        <a href="#inicio" className="brand" aria-label="Virtualities, início"><span className="brand-mark">V</span><span>Virtualities</span></a>
        <nav className={mobileMenu ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          <a href="#inicio" onClick={() => setMobileMenu(false)}><Home size={13} /> INÍCIO</a>
          <a href="#catalogo" onClick={() => setMobileMenu(false)}><Star size={13} /> CATÁLOGO</a>
          <a href="#novidades" onClick={() => setMobileMenu(false)}><Megaphone size={13} /> NOVIDADES</a>
        </nav>
        <label className="search-box"><Search size={15} /><input aria-label="Buscar produtos" placeholder="Buscar produtos..." value={query} onChange={e => setQuery(e.target.value)} /></label>
        <Button variant="nav" size="sm" className="account-button" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}><UserRound size={15} /> Minha Conta <ChevronDown size={12} /></Button>
        <Button variant="commerce" size="icon" aria-label={`Abrir carrinho com ${cart.length} itens`} onClick={() => setCartOpen(true)} className="cart-trigger"><ShoppingCart size={17} />{cart.length > 0 && <span className="cart-count">{cart.length}</span>}</Button>
        <Button variant="nav" size="icon" aria-label="Abrir menu" className="menu-trigger" onClick={() => setMobileMenu(v => !v)}><Menu size={19}/></Button>
      </div>
    </header>

    <main>
      <section className="hero-area" aria-label="Destaque principal">
        <div className="eyebrow">A Maior Loja Gamer do Brasil <Star size={14} fill="currentColor" /></div>
        <div className="hero-banner empty-media">
          <div className="hero-content"><h1>Seu Setup <span className="highlight-box">Lendário</span><br />Começa Aqui</h1><p>Robux, pets, contas e gamepasses com entrega na hora e até <strong>30% OFF</strong> pro seu jogo favorito. Bora upar!</p><Button variant="commerce" size="lg" asChild><a href="#catalogo">Ver Ofertas <ArrowRight size={19}/></a></Button></div>
        </div>
      </section>

      <section className="content-section games-section" id="jogos">
        <Heading icon={Gamepad2}>Jogos <em>Populares</em></Heading>
        <div className="games-grid">{visibleGames.length ? visibleGames.map(game => <a className="game-tile empty-media" href="#catalogo" key={game} onClick={() => { const i = categories.indexOf(game); if (i >= 0) setSelectedGame(i); }}><span>{game}</span></a>) : <p className="empty-results">Nenhum jogo encontrado.</p>}</div>
        <Button variant="commerce" asChild><a href="#catalogo">Ver todos os jogos <ArrowRight size={17}/></a></Button>
      </section>

      <section className="content-section news-section" id="novidades">
        <div className="live-tag"><span /> AO VIVO · 26 NOVIDADES HOJE</div>
        <Heading icon={Megaphone}>Últimas <em>Novidades</em></Heading>
        <div className="news-layout"><article className="featured-news"><div className="news-feature-body"><div className="news-meta"><span className="news-pill">✦ NOVIDADE</span><span>Anime Breaker</span><span><Clock3 size={11}/> há 23 min</span></div><h3>Novo no catálogo: Pacote Mundial</h3><p>Novidade fresquinha em Anime Breaker — corre conferir antes que acabe.</p><Button variant="commerce" size="sm" asChild><a href="#catalogo">Conferir <ArrowRight size={14}/></a></Button></div><div className="featured-news-image empty-media" aria-hidden="true" /></article>
          <div className="news-list">{news.map((story, i) => <a href="#catalogo" className="news-row" key={i}><span className="news-thumb empty-media"/><span className="news-row-content"><span className="news-row-meta"><b>{story.type}</b> {story.time}</span><strong>{story.title}</strong><small>{story.desc}</small></span><ChevronRight size={15}/></a>)}</div>
        </div>
        <Button variant="commerce" asChild><a href="#catalogo">Ver todas as novidades <ArrowRight size={17}/></a></Button>
      </section>

      <section className="content-section products-section" id="catalogo">
        <Heading icon={Star}>Produtos em <em>Destaque</em></Heading>
        <div className="category-scroll"><Button variant="nav" size="icon" aria-label="Categoria anterior" onClick={() => setSelectedGame((selectedGame + categories.length - 1) % categories.length)}><ChevronLeft size={15}/></Button>{categories.map((game, i) => <Button key={game} variant={selectedGame === i ? "commerce" : "category"} size="sm" onClick={() => setSelectedGame(i)}>{game}</Button>)}<Button variant="nav" size="icon" aria-label="Próxima categoria" onClick={() => setSelectedGame((selectedGame + 1) % categories.length)}><ChevronRight size={15}/></Button></div>
        <div className="products-grid">{items.map((item, i) => <article className="product-card" key={item.name}><div className="product-image empty-media"><span className="discount">-9%</span><span className="rarity">{item.tag}</span></div><div className="product-info"><h3>{selectedGame === 0 ? item.name : `${(categories[selectedGame] ?? categories[0] ?? "Jogo").replace("🔥 ", "")} ${i + 1}`}</h3><div className="price-line"><strong>{item.price}</strong><del>{item.old}</del></div><Button variant="commerce" size="sm" onClick={() => addItem(selectedGame === 0 ? item.name : `${(categories[selectedGame] ?? categories[0] ?? "Jogo").replace("🔥 ", "")} ${i + 1}`)}><ShoppingCart size={14}/> Adicionar</Button></div></article>)}</div>
      </section>

      <section className="content-section steps-section"><h2 className="plain-heading">Como é fácil comprar com a <em>Virtualities</em></h2><div className="steps-grid">{[{ icon: ShoppingCart, title: "Adicionando itens ao carrinho", text: "Navegue pelo nosso catálogo completo e adicione os produtos desejados ao carrinho com apenas um clique." }, { icon: CreditCard, title: "Inserindo o usuário e efetuando o pagamento", text: "Informe seu usuário e pague com PIX. A confirmação costuma ser instantânea." }, { icon: UserRound, title: "Falando com nossos entregadores", text: "Receba seu pedido através do nosso suporte. Nossa equipe está sempre disponível para ajudar você." }].map((step, i) => <div className="step" key={step.title}><span className="step-number">{i + 1}</span><div className="step-box"><step.icon size={21}/><h3>{step.title}</h3><p>{step.text}</p></div></div>)}</div></section>

      <section className="wide-promo empty-media"><div className="wide-promo-content"><h2><span className="highlight-box">Vantagens</span><br/>que os outros não têm</h2><p>Suba de nível, destrave itens raros e jogue no seu máximo. Sua evolução começa na <strong>Virtualities.</strong></p><Button variant="commerce" size="lg" asChild><a href="#catalogo">Bora Evoluir <ArrowRight size={18}/></a></Button></div></section>

      <section className="content-section reviews-section"><Heading icon={MessageCircle}>Avaliações dos <em>Clientes</em></Heading><div className="review-summary"><div className="review-stats"><div><strong>+50k</strong><span>Clientes satisfeitos</span></div><div><strong>91%</strong><span>deram 4 ou 5 estrelas</span></div><div><strong>24h</strong><span>Suporte por dia</span></div></div><div className="review-score"><strong>4,6</strong><span className="stars">★★★★★</span><small>15.042 avaliações</small></div></div><div className="review-grid">{["Muito rápido atencioso já tinha comprado muito bom", "Muito rápido em menos de 1 min foi minha entrega", "Mano só tem uma coisa a dizer essa loja é incrível", "Fui muito bem atendido e recebi meu item", "MUITOOOO BOMMMMM VOU ATÉ COMPRAR MAIS TARDE", "deu certo aqui o pack obrigado virtualities!"].map((text, i) => <article className="review-card" key={i}><div className="review-author"><span className="review-avatar empty-media"/><div><strong>{["Azu***", "arthurzin********", "is08*****", "new***", "lalau****", "pietrofer*******"][i]}</strong><span className="stars">★★★★★</span></div><small>Comprador verificado</small></div><p>“{text}”</p><span className="review-rating">★ 5.0</span></article>)}</div></section>

      <section className="content-section faq-section" id="faq"><Heading icon={CircleHelp}>Dúvidas <em>Frequentes</em></Heading><p className="section-subtitle">Encontre respostas rápidas para as perguntas mais comuns sobre nossos serviços</p><div className="faq-list">{faqs.map((faq, i) => <div className={`faq-item ${openFaq === i ? "active" : ""}`} key={faq.q}><Button variant="faq" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{faq.q}<span><ChevronDown size={17}/></span></Button>{openFaq === i && <p>{faq.a}</p>}</div>)}</div></section>

      <section className="support-banner empty-media" id="contato"><div><h2>Precisa de uma mão?</h2><p>Estamos aqui para ajudar você a continuar sua jornada.</p><Button variant="commerce" asChild><a href="mailto:suporte@virtualities.com.br">Falar com Suporte <ArrowRight size={17}/></a></Button></div></section>
    </main>

    <footer className="footer"><div className="footer-grid"><div><h3>Sobre</h3><p>A maior loja de itens e contas digitais no Brasil.</p><a href="mailto:suporte@virtualities.com.br"><Mail size={15}/> suporte@virtualities.com.br</a><span><MapPin size={15}/> Brasil</span></div><div><h3>Links Rápidos</h3><a href="#inicio">Início</a><a href="#catalogo">Catálogo</a><a href="#novidades">Novidades</a><a href="#jogos">Jogos</a><a href="#contato">Contato</a></div><div><h3>Suporte</h3><a href="#faq">FAQ</a><a href="mailto:suporte@virtualities.com.br">Fale conosco</a></div><div><h3>Redes Sociais</h3><p>Siga nossas redes sociais e fique por dentro das novidades.</p></div></div><div className="footer-bottom">Virtualities © 2026. Todos os direitos reservados.</div></footer>

    {cartOpen && <div className="cart-overlay" onMouseDown={() => setCartOpen(false)}><aside className="cart-panel" aria-label="Carrinho" onMouseDown={e => e.stopPropagation()}><div className="cart-panel-header"><h2>Meu carrinho <span>({cart.length})</span></h2><Button variant="nav" size="icon" aria-label="Fechar carrinho" onClick={() => setCartOpen(false)}><X size={20}/></Button></div>{cart.length ? <><div className="cart-items">{cart.map((name, i) => <div className="cart-item" key={`${name}-${i}`}><span className="cart-item-image empty-media"/><strong>{name}</strong><Button variant="nav" size="icon" aria-label={`Remover ${name}`} onClick={() => setCart(current => current.filter((_, index) => index !== i))}><Trash2 size={16}/></Button></div>)}</div><p className="cart-note"><Check size={15}/> {cart.length} {cart.length === 1 ? "item adicionado" : "itens adicionados"} ao carrinho</p></> : <div className="cart-empty"><ShoppingCart size={36}/><p>Seu carrinho está vazio.</p><Button variant="commerce" onClick={() => setCartOpen(false)}>Continuar explorando</Button></div>}</aside></div>}
  </div>;
}