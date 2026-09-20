# Paweł Habina — portfolio

Responsywne portfolio informatyka i programisty. Terminalowa oprawa, zielony akcent, sekcje SeaByte, ParsHub, pozostałych projektów, umiejętności i kontaktu.

## Rozwój lokalny

Node.js 22.13+ oraz npm:

```sh
npm ci
npm run dev
```

## Weryfikacja

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

Lint obejmuje kod portfolio i używany przełącznik; pozostałe dostarczone komponenty startera nie są modyfikowane.

GitHub Actions wykonuje te kontrole przy pushach na `main`, `codex/**` oraz w pull requestach. Kompilacja tworzy worker Cloudflare w `dist/server/` i zasoby w `dist/client/`. `npm start` uruchamia lokalny podgląd skompilowanego workera.

## Animacje i wydajność

- Intro w stylu terminala: pięć kolejnych komunikatów, automatyczne przejście po około 2,65 s. Można je pominąć przyciskiem lub Escape. To sekwencja wizualna, nie symulacja pomiarów sieci ani sprzętu.
- Wybrane nagłówki pojawiają się litera po literze po wejściu w obszar ekranu. Główny opis specjalizacji cyklicznie wpisuje i kasuje frazy z przerwą na przeczytanie.
- Pełny tekst pozostaje dostępny dla czytników ekranu. Kopia rezerwująca miejsce zapobiega przesuwaniu układu podczas pisania.
- Przełącznik **Animacje** wyłącza intro, pisanie, kursor, przejścia i płynne przewijanie. Preferencja `ph-motion` jest zapisywana lokalnie i synchronizowana między kartami.
- `prefers-reduced-motion: reduce` ma pierwszeństwo. Bez JavaScript, localStorage lub IntersectionObserver podstawowa treść pozostaje dostępna.
- Pisanie jest zatrzymywane poza ekranem, w ukrytej karcie i w trybie lekkim. Obserwatory oraz zegary są sprzątane przy zmianie trybu i odmontowaniu.
- Bez WebGL, wideo, ciągłych pętli requestAnimationFrame ani nasłuchiwania przewijania.

## Edycja treści

- `app/page.tsx` — nagłówek, wstęp, kontakt i stopka.
- `app/project-showcase.tsx` — wyróżnione projekty, linki i opis specjalizacji.
- `app/globals.css` — kolory, typografia, responsywność i animacje.
- `app/terminal-experience.tsx` — sekwencja startowa, kontekst preferencji i animacja pisania.
- `app/motion-control.tsx` oraz `lib/motion.mjs` — przełącznik i pomocnicze sterowanie ruchem.
- `app/layout.tsx` — polskie metadane i lokalnie serwowane fonty.
- `public/favicon.svg` — znak `ph.`.

Opisy wykorzystują publiczny profil i repozytoria https://github.com/pawelhabina, stronę https://www.seabyte.pl/ oraz potwierdzony przez autora zakres ParsHub. Okładki projektów są typograficznymi kompozycjami, a nie zrzutami ich interfejsów. ParsHub oznaczono jako projekt w rozwoju; portfolio nie ujawnia danych klientów ani adresu panelu wewnętrznego.

## Hosting

Projekt wykorzystuje React, TypeScript, Vinext i Tailwind CSS. `.openai/hosting.json` identyfikuje prywatny podgląd Sites. Repozytorium GitHub jest niezależną kopią kodu źródłowego; workflow CI niczego automatycznie nie publikuje.
