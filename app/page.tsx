import { ArrowDown, ArrowUpRight, CodeXml, MapPin } from 'lucide-react';
import { MotionControl } from './motion-control';

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Przejdź do treści</a>
    <header className="header wrap">
      <a href="#" className="brand" aria-label="Paweł Habina — początek">ph<span>.</span></a>
      <nav aria-label="Nawigacja główna"><a href="#projekty">Projekty</a><a href="#o-mnie">O mnie</a><a href="#kontakt">Kontakt <ArrowUpRight size={14}/></a></nav>
      <MotionControl />
    </header>
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-kicker"><span><i className="status-dot"/> OSOBISTE PORTFOLIO</span><span><MapPin size={13}/> Sopot, Polska</span></div>
        <div className="hero-title-row"><h1 id="hero-title">Paweł<br/><span>Habina<span className="name-dot">.</span></span></h1><div className="hero-symbol" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><span className="asterisk">✳</span><span className="orbit-label">CIEKAWOŚĆ NAPĘDZA ROZWÓJ</span></div></div>
        <div className="hero-bottom"><div><p className="role">Linux. Sieci. Kod.</p><p className="hero-description">Łączę świat infrastruktury z tworzeniem aplikacji.<br/>Uczę się, eksperymentuję i buduję rzeczy, które działają.</p></div><a className="button primary" href="#projekty">Zobacz moje projekty <ArrowDown size={18}/></a></div>
        <div className="hero-foot"><span>INFORMATYK & PROGRAMISTA</span><span className="scroll-cue">PRZEWIŃ, POZNAJ MNIE <ArrowDown size={13}/></span></div>
      </section>
      <div className="tech-strip" aria-label="Technologie"><div>{['Linux','Proxmox','JavaScript','Docker','React','Networking'].map(x=><span key={x}>{x}<b aria-hidden="true">✳</b></span>)}</div></div>
      <section id="projekty" className="section wrap"><p className="eyebrow">01 / WYBRANE PROJEKTY</p><h2>Od pomysłu<br/>do <em>działania.</em></h2><p className="section-description">Własne aplikacje, eksperymenty i infrastruktura. Każdy projekt to kolejny krok.</p><a href="https://github.com/pawelhabina" className="text-link" target="_blank" rel="noreferrer">Zajrzyj na GitHuba <CodeXml size={18}/></a></section>
      <section id="o-mnie" className="section wrap"><p className="eyebrow">02 / O MNIE</p><h2>Najlepiej uczę się,<br/><em>budując.</em></h2><p className="section-description">Interesują mnie Linux, sieci komputerowe i wirtualizacja. We własnym homelabie rozwijam umiejętności administracji systemami i utrzymania usług.</p></section>
      <section id="kontakt" className="contact wrap"><p className="eyebrow">03 / KONTAKT</p><h2>Porozmawiajmy<br/>o <em>możliwościach.</em></h2><a className="contact-email" href="mailto:pawel.habina26@gmail.com">pawel.habina26@gmail.com <ArrowUpRight/></a></section>
    </main>
    <footer className="wrap footer"><a className="brand" href="#">ph<span>.</span></a><span>© {new Date().getFullYear()} Paweł Habina</span><a href="https://github.com/pawelhabina" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></footer>
  </>;
}
