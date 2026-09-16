import {
  ArrowUpRight,
  CodeXml,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export function ProjectShowcase() {
  return (
    <>
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">01 / WYBRANE PROJEKTY</p>
          <h2>
            Od pomysłu
            <br />
            do <em>działania.</em>
          </h2>
        </div>
        <p className="section-description">
          Najwięcej mówią rzeczy, które tworzę.
          <br />
          Oto kilka z nich.
        </p>
      </div>
      <div className="project-grid">
        <article className="project-card reveal">
          <a
            className="project-visual seabyte-visual"
            href="https://www.seabyte.pl/"
            target="_blank"
            rel="noreferrer"
            aria-label="Otwórz stronę SeaByte w nowej karcie"
          >
            <span className="visual-corner">01 / WEB</span>
            <span className="visual-launch">
              <ArrowUpRight size={19} />
            </span>
            <div className="sea-wordmark">SeaByte</div>
            <div className="sea-caption">TECHNOLOGIA. PO LUDZKU.</div>
            <div className="sea-services" aria-hidden="true">
              <span>
                <Monitor />
                Sprzęt
              </span>
              <span>
                <Network />
                Sieci
              </span>
              <span>
                <CodeXml />
                Web
              </span>
            </div>
            <span className="visual-bottom">
              SEABYTE.PL <span>↗</span>
            </span>
          </a>
          <div className="project-info">
            <div className="project-title">
              <h3>SeaByte</h3>
              <span className="project-status">
                <i />
                ONLINE
              </span>
            </div>
            <p>
              Moja marka IT. Strona prezentująca serwis sprzętu komputerowego i
              usługi sieciowe — od pierwszego kontaktu do rozwiązania problemu.
            </p>
            <div className="project-tags">
              <span>Strona internetowa</span>
              <span>Usługi IT</span>
            </div>
            <a
              className="text-link"
              href="https://www.seabyte.pl/"
              target="_blank"
              rel="noreferrer"
            >
              Odwiedź seabyte.pl <ArrowUpRight size={17} />
            </a>
          </div>
        </article>
        <article className="project-card reveal">
          <a
            className="project-visual pars-visual"
            href="#parshub-opis"
            aria-label="Poznaj projekt ParsHub"
          >
            <span className="visual-corner">02 / APLIKACJA</span>
            <span className="visual-launch">
              <ArrowUpRight size={19} />
            </span>
            <div className="pars-wordmark">
              <span className="pars-logomark">
                P<span>↗</span>
              </span>
              ParsHub<span className="pars-wordmark-dot">.</span>
            </div>
            <div className="pars-caption">CAŁE IT. JEDNO MIEJSCE.</div>
            <div className="pars-modules" aria-hidden="true">
              <span>
                <Server size={18} />
                Infrastruktura
              </span>
              <span>
                <Monitor size={18} />
                Komputery
              </span>
              <span>
                <ShieldCheck size={18} />
                Agenci
              </span>
            </div>
            <span className="visual-bottom">
              PROJEKT W ROZWOJU <span>↗</span>
            </span>
          </a>
          <div className="project-info" id="parshub-opis">
            <div className="project-title">
              <h3>ParsHub</h3>
              <span className="project-status in-progress">
                <i />W ROZWOJU
              </span>
            </div>
            <p>
              Aplikacja do zarządzania firmami i infrastrukturą IT. Komputery,
              serwery, zgłoszenia i agenci Windows w jednym, spójnym środowisku.
            </p>
            <div className="project-tags">
              <span>React</span>
              <span>TypeScript</span>
              <span>MySQL</span>
            </div>
            <p className="project-note">
              Aktualnie rozwijam <span>↗</span>
            </p>
          </div>
        </article>
      </div>
      <div className="more-projects reveal">
        <div className="more-projects-heading">
          <h3>Po godzinach też buduję.</h3>
          <a
            href="https://github.com/pawelhabina"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Więcej na GitHubie <CodeXml size={18} />
          </a>
        </div>
        <a
          className="project-row"
          href="https://github.com/pawelhabina/69hitow"
          target="_blank"
          rel="noreferrer"
        >
          <span className="project-number">03</span>
          <h4>69hitow</h4>
          <span className="row-description">
            Muzyczne krzyżówki w aplikacji desktopowej
          </span>
          <span className="row-tech">Electron / React</span>
          <ArrowUpRight />
        </a>
        <a
          className="project-row"
          href="https://github.com/pawelhabina/sopockie-laweczki"
          target="_blank"
          rel="noreferrer"
        >
          <span className="project-number">04</span>
          <h4>Sopockie Ławeczki</h4>
          <span className="row-description">Projekt webowy dla Sopotu</span>
          <span className="row-tech">JavaScript</span>
          <ArrowUpRight />
        </a>
        <a
          className="project-row"
          href="https://github.com/pawelhabina/fox-evolution"
          target="_blank"
          rel="noreferrer"
        >
          <span className="project-number">05</span>
          <h4>Fox Evolution</h4>
          <span className="row-description">Gra o ewolucji lisów</span>
          <span className="row-tech">JavaScript</span>
          <ArrowUpRight />
        </a>
      </div>
    </>
  );
}

export function About() {
  return (
    <div className="about-grid">
      <div className="reveal">
        <p className="eyebrow">02 / CZŁOWIEK ZA KODEM</p>
        <h2>
          Ciekawość.
          <br />
          Praktyka.
          <br />
          <em>Kolejny krok.</em>
        </h2>
        <div className="about-signature">
          Paweł Habina<span>↗</span>
        </div>
      </div>
      <div className="about-copy reveal">
        <p className="about-intro">
          Cześć, jestem Paweł — informatyk i programista z Sopotu.
        </p>
        <p>
          Lubię rozumieć, jak rzeczy działają. Dlatego równie dobrze odnajduję
          się w terminalu, przy konfiguracji sieci i podczas tworzenia
          aplikacji.
        </p>
        <p>
          Rozwijam SeaByte i pracuję nad ParsHub. Po godzinach eksperymentuję we
          własnym homelabie opartym o Proxmox: od maszyn wirtualnych i
          kontenerów po hosting usług i monitoring.
        </p>
        <div className="skills-list">
          <div>
            <Terminal size={19} />
            <div>
              <h3>Systemy & infrastruktura</h3>
              <p>Linux · Proxmox · Docker · Nginx</p>
            </div>
          </div>
          <div>
            <CodeXml size={19} />
            <div>
              <h3>Aplikacje & web</h3>
              <p>JavaScript · TypeScript · React · Python · MySQL</p>
            </div>
          </div>
          <div>
            <Network size={19} />
            <div>
              <h3>Sieci & monitoring</h3>
              <p>TCP/IP · DNS · VLAN · Grafana · InfluxDB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
