import { Typewriter } from './terminal-experience';
import Image from 'next/image';
import { ArrowUpRight, CodeXml, Network, Terminal } from 'lucide-react';

const projects = [
  {
    name: 'SeaByte',
    url: 'https://www.seabyte.pl/',
    domain: 'seabyte.pl',
    screenshot: '/projects/seabyte.png',
    alt: 'Strona SeaByte — serwis komputerowy i sprawdzanie statusu naprawy',
    status: 'ONLINE',
    description:
      'Moja marka IT. Serwis komputerowy, usługi sieciowe i platforma obsługi napraw — od zgłoszenia po sprawdzenie statusu zlecenia.',
    tags: ['React', 'Node.js', 'MySQL', 'Usługi IT'],
  },
  {
    name: 'ParsHub',
    url: 'https://parsifal.seabyte.pl/',
    domain: 'parsifal.seabyte.pl',
    screenshot: '/projects/parshub.png',
    alt: 'Publiczny ekran logowania ParsHub — firmy, infrastruktura i zgłoszenia',
    status: 'W ROZWOJU',
    description:
      'Aplikacja do zarządzania firmami i infrastrukturą IT. Komputery, serwery, zgłoszenia i agenci Windows w jednym środowisku. Dostęp po zalogowaniu.',
    tags: ['React', 'TypeScript', 'MySQL', 'Infrastruktura IT'],
  },
];

export function ProjectShowcase() {
  return (
    <>
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">01 / ls ~/projekty</p>
          <h2>
            <Typewriter text="Wybrane projekty." />
          </h2>
        </div>
        <p className="section-description">
          Najwięcej mówią rzeczy, które tworzę.
          <br />
          Oto kilka z nich.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card reveal" key={project.name}>
            <a
              className="project-preview"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Otwórz ${project.name} w nowej karcie`}
            >
              <div className="project-window-bar" aria-hidden="true">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{project.domain}</span>
                <ArrowUpRight size={15} />
              </div>
              <div className="project-screenshot">
                <Image
                  src={project.screenshot}
                  alt={project.alt}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  unoptimized
                />
                <span className="project-open" aria-hidden="true">
                  Otwórz stronę <ArrowUpRight size={17} />
                </span>
              </div>
            </a>
            <div className="project-info">
              <div className="project-title">
                <h3>
                  <span className="project-index" aria-hidden="true">
                    0{index + 1} /{' '}
                  </span>
                  {project.name}
                </h3>
                <span
                  className={`project-status${project.status === 'W ROZWOJU' ? ' in-progress' : ''}`}
                >
                  {project.status}
                </span>
              </div>
              <p>{project.description}</p>
              <ul className="project-tags" aria-label="Technologie i kategorie">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                {project.domain} <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <a
        className="text-link all-projects-link"
        href="https://github.com/pawelhabina"
        target="_blank"
        rel="noreferrer"
      >
        Zajrzyj do mojego GitHuba <CodeXml size={18} />
      </a>
    </>
  );
}

export function About() {
  return (
    <div className="about-grid">
      <div className="reveal">
        <p className="eyebrow">02 / cat ~/o-mnie</p>
        <h2>
          <Typewriter text={'Za kodem\nstoi człowiek.'} />
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
