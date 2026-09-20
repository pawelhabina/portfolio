import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { MotionControl } from './motion-control';
import { Typewriter } from './terminal-experience';
import { About, ProjectShowcase } from './project-showcase';

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Przejdź do treści
      </a>
      <header id="top" className="header wrap">
        <a href="#top" className="brand" aria-label="Paweł Habina — początek">
          <span className="prompt-symbol">&gt;_</span> ph
        </a>
        <nav aria-label="Nawigacja główna">
          <a href="#projekty">~/projekty</a>
          <a href="#o-mnie">~/o-mnie</a>
          <a href="#kontakt">
            ~/kontakt <ArrowUpRight size={14} />
          </a>
        </nav>
        <MotionControl />
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="terminal-bar">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>pawel@portfolio: ~</span>
            <span>bash — UTF-8</span>
          </div>
          <div className="hero-kicker">
            <span>SESJA / PORTFOLIO</span>
            <span>
              <MapPin size={13} /> Sopot, Polska
            </span>
          </div>
          <p className="command-line">
            <span>pawel@portfolio</span>:<b>~</b>$ whoami
          </p>
          <div className="hero-title-row">
            <h1 id="hero-title">
              <Typewriter text="Paweł Habina." />
            </h1>
          </div>
          <p className="hero-role">
            <span aria-hidden="true">&gt; </span>
            <Typewriter
              text="Informatyk. Programista."
              phrases={[
                'Informatyk. Programista.',
                'Linux. Sieci. Kod.',
                'Od pomysłu do wdrożenia.',
              ]}
              loop
            />
          </p>
          <div className="hero-bottom">
            <div>
              <p className="hero-description">
                Łączę świat infrastruktury z tworzeniem aplikacji.
                <br />
                Uczę się, eksperymentuję i buduję rzeczy, które działają.
              </p>
            </div>
            <a className="button primary" href="#projekty">
              ./zobacz-projekty <ArrowDown size={18} />
            </a>
          </div>
          <div className="hero-foot">
            <span>{'// OTWARTY NA NOWE WYZWANIA'}</span>
            <span className="scroll-cue">
              scroll --down <ArrowDown size={13} />
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
                <b aria-hidden="true">/</b>
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
          <p className="eyebrow">03 / ./kontakt</p>
          <div className="contact-heading">
            <h2>
              <Typewriter text="Porozmawiajmy." />
            </h2>
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
        <a className="brand" href="#top">
          <span className="prompt-symbol">&gt;_</span> ph
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
