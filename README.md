# Tegeta × FAW — Event Landing Page

Single-page event landing site for the Tegeta Commercial Vehicles × FAW partnership launch. Static HTML / CSS / vanilla JS — no build step.

## Run it
Just open `index.html` in a browser. Or run a quick local server:

```
cd /Users/user/Desktop/website
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Add your images
Place the 4 assets in `/assets/` with these exact filenames:

| File | Source |
|---|---|
| `assets/logo-tegeta.png` | Tegeta logo (the one you provided) |
| `assets/truck-j6p-mixer.jpg` | FAW J6P 8×4 Concrete Mixer (large white mixer photo) |
| `assets/truck-j6p-dump.jpg` | FAW J6P 6×4 Dump Truck (second J6P image) |
| `assets/truck-tiger-vr.jpg` | FAW Tiger VR 4×2 Cargo (VUM-branded box truck photo) |

The page uses `onerror` fallbacks, so it will still render cleanly if images are missing.

## Edit placeholders
Search `index.html` for these tokens and replace with real values:

- `[EVENT DATE]`
- `[EVENT DATE + 1]`
- `[CITY]`
- `[VENUE NAME]`
- `[TIME]`
- `events@tegeta.ge` and `+995 32 2 00 00 00` (contact info)

Translations live in `js/i18n.js` (EN + KA).

## Form submissions
By default forms log the payload to the browser console and show a success card. To connect a real backend, open `js/form.js` and set:

```js
const ENDPOINT = 'https://formspree.io/f/xxxxxxx'; // or your own URL
```

Both the event registration form and the test-drive mini-form will POST JSON to that endpoint.

## Structure
```
website/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── style.css
├── js/
│   ├── i18n.js      (EN + KA dictionaries)
│   ├── main.js      (nav, reveal animations, language toggle)
│   └── form.js      (validation + submit)
├── assets/
│   ├── logo-tegeta.png
│   ├── truck-j6p-mixer.jpg
│   ├── truck-j6p-dump.jpg
│   └── truck-tiger-vr.jpg
└── README.md
```

## Color palette
| Token | Hex |
|---|---|
| `--tg-black` | `#1A1A1A` |
| `--tg-yellow` | `#F5B52A` |
| `--tg-red` | `#E63027` |
| `--tg-white` | `#FFFFFF` |

Yellow is used as a spotlight (CTAs, accents, hover states) against a black/white/gray base.
