# cashcows-website

Broncode van de website van The Cash Cows, gepubliceerd via GitHub Pages.

## Publiceren

1. Open deze map als repository in GitHub Desktop.
2. Publiceer naar GitHub.com.
3. Zet in de repo-instellingen op GitHub.com **Pages** aan (branch: `main`, map: `/root`).
4. De site is live op `https://<gebruikersnaam>.github.io/cashcows-website/`.

## Structuur

- `index.html` — hoofdpagina
- `playlist.html` / `rider.html` — ingebedde PDF-viewers met "terug naar website"-knop
- `css/style.css` — styling
- `js/main.js` — scripts (nav, audiospeler, laad-meer, back-to-top)
- `images/` — logo, hero-achtergrond, bandfoto, testimonial-foto, `gallery/` (fotosectie, genummerd 001–020 + 011a/015a), `video-thumbs/` (posters)
- `muziek/` — 7 tracks als mp3
- `video/` — 10 clips als mp4
- `docs/` — `technical-rider.pdf` en `example-playlist.pdf`

## Status

Nagebouwd naar de oude Wix-site (zie `../screenshots oude WIX website/`), in het Nederlands, met alle
foto's, video's, muziek, logo, rider en playlist zoals aangeleverd (genummerd per map, aflopend
gesorteerd — hoogste nummer boven/eerst).

- Foto-sectie: masonry-layout (wisselende hoogtes), alle 22 foto's, geen laad-meer.
- Video-sectie: standaard 8 clips, "Meer laden"-knop voor de resterende 2 (Live in Hapert, Sax solo).
- Muziek: 7 tracks, klikbaar in de tracklist; bovenste track (I Will Survive) is de standaard/actieve track.

## Op te ruimen (kon niet vanuit hier verwijderd worden)

Van de vorige media-ronde zijn deze bestanden nu ongebruikt — mag je zelf weggooien:

- `video/hapert-saturday-night.mp4`, `video/live-optreden-2017-a/b/c/d.mp4`
- `images/video-thumbs/hapert-saturday-night.jpg`, `images/video-thumbs/live-optreden-2017-a/b/c/d.jpg`
- `images/gallery/gallery-1.jpg` t/m `gallery-8.jpg`
- `images/logo-cow.svg`

## Nog openstaand

- IMG_3128.HEIC in `../foto's/` is niet meegenomen (zat niet in de 001–020 reeks).
- Later: Engelse en Spaanse taalversie toevoegen.
