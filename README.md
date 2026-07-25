# cashcows-website

Broncode van de website van The Cash Cows, gepubliceerd via GitHub Pages.

## Publiceren

1. Open deze map als repository in GitHub Desktop.
2. Publiceer naar GitHub.com.
3. Zet in de repo-instellingen op GitHub.com **Pages** aan (branch: `main`, map: `/root`).
4. De site is live op `https://<gebruikersnaam>.github.io/cashcows-website/`.

## Structuur

- `index.html` — hoofdpagina
- `css/style.css` — styling
- `js/main.js` — scripts (nav, audiospeler, back-to-top)
- `images/` — logo, hero-achtergrond, bandfoto, testimonial-foto, `gallery/` (fotosectie), `video-thumbs/` (posters)
- `muziek/` — 5 tracks als mp3 (geconverteerd uit de aangeleverde wav-bestanden)
- `video/` — 6 clips als mp4 (geconverteerd/hergecodeerd uit de aangeleverde bestanden)
- `docs/` — `technical-rider.pdf` en `example-playlist.pdf`

## Status

Nagebouwd naar de oude Wix-site (zie `../screenshots oude WIX website/`), in het Nederlands, met de
foto's, video's, muziek, logo, rider en playlist die zijn aangeleverd in de mapstructuur.

Nog te controleren/aan te vullen:

- **Videotitels**: alleen "Live in Hapert" en "Live in Wassenaar" konden met zekerheid herleid worden
  (bestandsnaam / geotag). De overige 4 clips uit 2017 heten nu generiek "Live optreden (2017)" —
  laat het weten als je de echte locaties/gignamen hebt, dan pas ik de titels aan.
- **Fotoselectie**: er is een keuze van 8 foto's gemaakt uit de aangeleverde set voor de Foto-sectie;
  zeg het als je andere foto's wilt gebruiken (alle originelen staan nog in `../foto's/`).
- `images/logo-cow.svg` is een ongebruikt restbestand van de eerste opzet (kon niet verwijderd worden
  vanuit hier) — mag je zelf weggooien.
- Later: Engelse en Spaanse taalversie toevoegen.
- IMG_3128.HEIC in `../foto's/` is niet gebruikt (HEIC wordt niet ondersteund door browsers) — laat weten
  of dit een belangrijke foto is, dan converteer ik hem alsnog naar jpg.
