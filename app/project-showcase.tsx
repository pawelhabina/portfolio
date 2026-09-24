import { Typewriter } from './terminal-experience';
import Image from 'next/image';
import { ArrowUpRight, CodeXml, Network, Terminal } from 'lucide-react';

const projects = [
  {
    name: 'SeaByte',
    featured: true,
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
    featured: true,
    url: 'https://parsifal.seabyte.pl/',
    domain: 'parsifal.seabyte.pl',
    screenshot: '/projects/parshub.png',
    alt: 'Publiczny ekran logowania ParsHub — firmy, infrastruktura i zgłoszenia',
    status: 'W ROZWOJU',
    description:
      'Aplikacja do zarządzania firmami i infrastrukturą IT. Komputery, serwery, zgłoszenia i agenci Windows w jednym środowisku. Dostęp po zalogowaniu.',
    tags: ['React', 'TypeScript', 'MySQL', 'Infrastruktura IT'],
  },
  {
    name: 'Sopockie Ławeczki',
    featured: true,
    url: 'https://laweczki.sopot.pl/',
    domain: 'laweczki.sopot.pl',
    screenshot: '/projects/sopockie-laweczki.webp',
    alt: 'Sopockie Ławeczki — mapa Sopotu z lokalizacjami ławek i nawigacją aplikacji',
    status: 'ONLINE',
    description:
      'Aplikacja zachęcająca do odkrywania Sopotu. Mapa ławek, spotkania i trasy spacerowe, uzupełnione panelem administracyjnym.',
    tags: ['React', 'Node.js', 'Mapy', 'Aplikacja miejska'],
  },
  {
    name: 'Fox Evolution',
    featured: true,
    url: 'https://foxevo.mionix.pl/',
    domain: 'foxevo.mionix.pl',
    screenshot: '/projects/fox-evolution.webp',
    alt: 'Strona Fox Evolution — pixelartowe lisy i prezentacja gry Merge Fox Tycoon',
    status: 'EARLY ACCESS',
    description:
      'Gra merge/clicker na Windows i macOS. Łączenie lisów, ewolucje i rozwój własnego imperium — wraz ze stroną gry i systemem aktualizacji.',
    tags: ['Electron', 'React', 'JavaScript', 'Game dev'],
  },
  {
    name: 'Geo Helper',
    featured: false,
    url: 'https://plonk-lab-geo-atlas.habina1993.chatgpt.site/',
    domain: 'Geo Helper / atlas',
    linkLabel: 'Otwórz prywatny podgląd',
    screenshot: '/projects/geo-helper.webp',
    alt: 'Geo Helper / Plonk Lab — strona atlasu wskazówek do GeoGuessr',
    status: 'PRYWATNY PODGLĄD',
    description:
      'Atlas wskazówek do GeoGuessr: samochody, znaki, słupki, drogi i krajobrazy. Filtrowanie tropów pomaga rozpoznawać kraje. Podgląd wymaga uprawnień.',
    tags: ['React', 'TypeScript', 'GeoGuessr', 'Edukacja'],
  },
  {
    name: 'Gdynia 2126',
    featured: false,
    url: 'https://github.com/pawelhabina/hackaton',
    domain: 'Gdynia 2126 / hackathon',
    linkLabel: 'Zobacz projekt na GitHubie',
    screenshot: '/projects/gdynia-2126.webp',
    alt: 'Gdynia 2126 — interaktywna strona o przeszłości, teraźniejszości i przyszłości miasta',
    status: 'PROTOTYP',
    description:
      'Interaktywna podróż przez Gdynię z lat 1926, 2026 i 2126. Mapa miejsc, oś czasu i wizje przyszłości miasta w zespołowym projekcie hackathonowym.',
    tags: ['React', 'TypeScript', 'Motion', 'Hackathon'],
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
      {[
        {
          featured: true,
          title: 'Wyróżnione projekty',
          command: 'pinned',
          offset: 0,
        },
        {
          featured: false,
          title: 'Pozostałe projekty',
          command: 'explore',
          offset: 4,
        },
      ].map((group) => (
        <section
          className={`project-group${group.featured ? ' featured-group' : ''}`}
          key={group.command}
          aria-labelledby={`projects-${group.command}`}
        >
          <div className="project-group-heading reveal">
            <h3 id={`projects-${group.command}`}>{group.title}</h3>
            <span aria-hidden="true">
              {group.featured ? '[ 04 ]' : '[ 02 ]'} / {group.command}
            </span>
          </div>
          <div className="project-grid">
            {projects
              .filter((project) => project.featured === group.featured)
              .map((project, position) => {
                const index = group.offset + position;
                return (
                  <article
                    className={`project-card reveal${project.featured ? ' project-card-featured' : ''}`}
                    key={project.name}
                  >
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
                          {project.linkLabel
                            ? 'Zobacz projekt'
                            : 'Otwórz stronę'}{' '}
                          <ArrowUpRight size={17} />
                        </span>
                      </div>
                    </a>
                    <div className="project-info">
                      <div className="project-title">
                        <h4>
                          <span className="project-index" aria-hidden="true">
                            0{index + 1} /{' '}
                          </span>
                          {project.name}
                        </h4>
                        <span
                          className={`project-status${project.status !== 'ONLINE' ? ' in-progress' : ''}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p>{project.description}</p>
                      <ul
                        className="project-tags"
                        aria-label="Technologie i kategorie"
                      >
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
                        {project.linkLabel ?? project.domain}{' '}
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
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
