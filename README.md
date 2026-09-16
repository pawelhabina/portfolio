# Paweł Habina — portfolio

Responsywne portfolio informatyka i programisty. Ciemna oprawa, limonkowy akcent, sekcje SeaByte, ParsHub, pozostałych projektów, umiejętności i kontaktu.

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

- Przełącznik **Animacje** w nagłówku wyłącza animacje, przejścia oraz płynne przewijanie. Preferencja `ph-motion` jest zapisywana w localStorage i synchronizowana między kartami.
- Systemowe `prefers-reduced-motion: reduce` włącza tryb lekki i ma pierwszeństwo przed lokalnym ustawieniem.
- Efekty pojawiania się sekcji, obrót motywu, animacje przycisków i kart korzystają głównie z transform i opacity. Bez WebGL, wideo, ciągłych pętli JavaScript ani nasłuchiwania przewijania.
- IntersectionObserver uruchamia pojawienie się sekcji jednokrotnie i zatrzymuje dekoracje poza ekranem. Page Visibility API zatrzymuje animacje w nieaktywnej karcie.
- Tryb lekki usuwa obserwatory i nasłuchiwanie widoczności. Brak dostępu do localStorage lub IntersectionObserver nie blokuje treści.
- Treść jest renderowana na serwerze i pozostaje dostępna bez JavaScript. Czcionki są serwowane lokalnie przez build.

Testy jednostkowe obejmują preferencje, niedostępne API, zatrzymywanie efektów i zwalnianie obserwatorów. Nie zastępują pomiaru FPS na fizycznym starszym komputerze.

## Edycja treści

- `app/page.tsx` — nagłówek, wstęp, kontakt i stopka.
- `app/project-showcase.tsx` — wyróżnione projekty, linki i opis specjalizacji.
- `app/globals.css` — kolory, typografia, responsywność i animacje.
- `app/motion-control.tsx` oraz `lib/motion.mjs` — sterowanie ruchem.
- `app/layout.tsx` — polskie metadane i lokalnie serwowane fonty.
- `public/favicon.svg` — znak `ph.`.

Opisy wykorzystują publiczny profil i repozytoria https://github.com/pawelhabina, stronę https://www.seabyte.pl/ oraz potwierdzony przez autora zakres ParsHub. Okładki projektów są typograficznymi kompozycjami, a nie zrzutami ich interfejsów. ParsHub oznaczono jako projekt w rozwoju; portfolio nie ujawnia danych klientów ani adresu panelu wewnętrznego.

## Hosting

Projekt wykorzystuje React, TypeScript, Vinext i Tailwind CSS. `.openai/hosting.json` identyfikuje prywatny podgląd Sites. Repozytorium GitHub jest niezależną kopią kodu źródłowego; workflow CI niczego automatycznie nie publikuje.
