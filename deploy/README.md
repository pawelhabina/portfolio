# Portfolio na s1

Produkcja: https://portfolio.seabyte.pl. Nginx serwuje statyczny eksport Vinext z `/var/www/portfolio/current`. Animacje, kursor i preferencje działają w przeglądarce. Aplikacja nie wymaga Node, bazy danych ani Cloudflare Workers na serwerze.

## Przygotowanie wersji

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build:static
test -s dist/client/index.html
COPYFILE_DISABLE=1 tar -czf portfolio-static.tar.gz -C dist/client .
```

Wysyłaj wyłącznie `dist/client`, nigdy repozytorium, pliki środowiska ani `dist/server`. Zanotuj pełny SHA commita użytego do kompilacji. Prześlij archiwum i `deploy/install-release.sh` przez skonfigurowane SSH do s1, a następnie uruchom na serwerze jako root:

```sh
bash install-release.sh /ścieżka/portfolio-static.tar.gz <pełny-SHA-commita>
```

Skrypt sprawdza komplet plików, tworzy osobny katalog wersji i atomowo zmienia symlink `current`. Poprzednia wersja pozostaje dostępna przez `previous`. Przy aktualizacji samych plików Nginx nie wymaga przeładowania.

## Konfiguracja domeny

`nginx/portfolio.seabyte.pl.conf` trafia do `/etc/nginx/sites-available/portfolio.seabyte.pl`, z symlinkiem w `sites-enabled`. Przed przeładowaniem zawsze wykonaj `nginx -t`.

DNS domeny kieruje przez Cloudflare do s1. Certyfikat Let's Encrypt dla `portfolio.seabyte.pl` korzysta z HTTP-01 i webroot `/var/www/letsencrypt`. Port 80 udostępnia challenge ACME, pozostały ruch przekierowuje na HTTPS. Systemowy `certbot.timer` odnawia certyfikat, a dedykowany deploy hook sprawdza konfigurację i przeładowuje Nginx. Klucze i dane konta ACME pozostają wyłącznie na serwerze.

Po wdrożeniu sprawdź HTTPS, przekierowanie HTTP, obrazki, skrypty, tryb lekki i brak zmian na seabyte.pl. Nieznane adresy mają zwracać 404, a nie stronę główną ze statusem 200. Nagłówek `Cache-Control: no-cache, no-transform` zapobiega modyfikacji HTML przez Cloudflare, która powodowałaby niezgodność hydracji React (np. przy obfuskacji adresu e-mail).

## Wycofanie wersji

Na s1 jako root, po zweryfikowaniu celu `readlink /var/www/portfolio/previous`:

```sh
ln -s "$(readlink /var/www/portfolio/previous)" /var/www/portfolio/current.rollback
mv -Tf /var/www/portfolio/current.rollback /var/www/portfolio/current
```

Starszych katalogów wersji skrypt nie usuwa automatycznie.
