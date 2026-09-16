import { ArrowDown, ArrowUpRight, CodeXml, MapPin } from 'lucide-react';
import { MotionControl } from './motion-control';
import { About, ProjectShowcase } from './project-showcase';

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Przejdź do treści
      </a>
      <header className="header wrap">
        <a href="#" className="brand" aria-label="Paweł Habina — początek">
          ph<span>.</span>
        </a>
        <nav aria-label="Nawigacja główna">
          <a href="#projekty">Projekty</a>
          <a href="#o-mnie">O mnie</a>
          <a href="#kontakt">
            Kontakt <ArrowUpRight size={14} />
          </a>
        </nav>
        <MotionControl />
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span>
              <i className="status-dot" /> OSOBISTE PORTFOLIO
            </span>
            <span>
              <MapPin size={13} /> Sopot, Polska
            </span>
          </div>
          <div className="hero-title-row">
            <h1 id="hero-title">
              Paweł
              <br />
              <span>
                Habina<span className="name-dot">.</span>
              </span>
            </h1>
            <div className="hero-symbol motion-region" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <span className="asterisk">✳</span>
              <span className="orbit-label">CIEKAWOŚĆ NAPĘDZA ROZWÓJ</span>
            </div>
          </div>
          <div className="hero-bottom">
            <div>
              <p className="role">Linux. Sieci. Kod.</p>
              <p className="hero-description">
                Łączę świat infrastruktury z tworzeniem aplikacji.
                <br />
                Uczę się, eksperymentuję i buduję rzeczy, które działają.
              </p>
            </div>
            <a className="button primary" href="#projekty">
              Zobacz moje projekty <ArrowDown size={18} />
            </a>
          </div>
          <div className="hero-foot">
            <span>INFORMATYK & PROGRAMISTA</span>
            <span className="scroll-cue">
              PRZEWIŃ, POZNAJ MNIE <ArrowDown size={13} />
            </span>
          </div>
        </section>
        <div className="tech-strip" aria-label="Technologie">
          <div>
            {[
              'Linux',
              'Proxmox',
              'JavaScript',
              'Docker',
              'React',
              'Networking',
            ].map((x) => (
              <span key={x}>
                {x}
                <b aria-hidden="true">✳</b>
              </span>
            ))}
          </div>
        </div>
        <section id="projekty" className="section wrap">
          <ProjectShowcase />
        </section>
        <section id="o-mnie" className="section wrap">
          <About />
        </section>
        <section id="kontakt" className="contact wrap reveal motion-region">
          <p className="eyebrow">03 / KONTAKT</p>
          <div className="contact-heading">
            <h2>
              Dobry projekt zaczyna się
              <br />
              od <em>rozmowy.</em>
            </h2>
            <span className="contact-star" aria-hidden="true">
              ✳
            </span>
          </div>
          <p className="section-description">
            Masz pomysł, pytanie albo propozycję współpracy? Napisz.
          </p>
          <a className="contact-email" href="mailto:pawel.habina26@gmail.com">
            pawel.habina26@gmail.com <ArrowUpRight />
          </a>
          <div className="contact-socials">
            <a
              href="https://github.com/pawelhabina"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={15} />
            </a>
            <span>
              Discord <b>pravel9</b>
            </span>
            <span>
              <MapPin size={14} /> Sopot, Polska
            </span>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <a className="brand" href="#">
          ph<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Paweł Habina</span>
        <a
          href="https://github.com/pawelhabina"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
