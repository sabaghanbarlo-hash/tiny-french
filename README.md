# Tiny French 🇫🇷

Free beginner French lessons with Adrien and Marinette. A zero-dependency static website: no backend, no paid services, no API keys.

## Quick start
```bash
npm run build        # generates dist/ (needs Node 18+; there is nothing to npm install)
npm test             # build + content checks + link/HTML checks
npm run serve        # preview at http://localhost:8080/tiny-french/
```
For a different base path or domain: `BASE_PATH="" SITE_URL="https://tinyfrench.example" npm run build`.

## Project layout
| Path | What it is |
|---|---|
| `data/lessons.js` | **All lessons** (dialogue, vocabulary, grammar, quiz). |
| `data/vocab.js` | Extra vocabulary not tied to a lesson. Lesson vocabulary is collected automatically. |
| `data/courses.js` | Courses/products, prices, checkout links. |
| `data/content.js` | Roadmap, numbers sheet, pronunciation guide text. |
| `data/site.js` | Site name, URL, base path, Instagram, newsletter form URL. |
| `build.mjs` | Static generator: writes every page, `sitemap.xml`, `robots.txt`, JSON data. |
| `assets/` | CSS, JS, images, videos (copied to `dist/assets`). |
| `test.mjs` | Content, HTML and link checks. |

## Deploy (GitHub Pages, free)
`.github/workflows/pages.yml` builds and publishes on every push to `main`. In the repo: **Settings → Pages → Source: GitHub Actions**. The site is then at `https://<user>.github.io/tiny-french/`. All links are generated from `BASE_PATH`, and every page is a real `…/index.html` so refreshing a lesson URL works.

## Add a lesson
1. Copy an object in `data/lessons.js`; give it a new `id` (URL slug) and the next `number`.
2. Fill in `dialogue` (`{ who, fr, en }`, or `{ scene: "…" }` separators), `vocab`, `grammar` and `quiz`.
3. Quiz questions: `mc` (`options` must contain `answer` exactly once) or `fill` (question contains `___`; accents are checked softly).
4. `npm test` validates the structure. Commit and push: cards, navigation, vocabulary, revision and the sitemap update automatically.

## Add vocabulary
Words listed in a lesson's `vocab` appear in the library automatically. For other words add a line to `data/vocab.js` (`w(category, french, english, pronunciation, example, exampleEnglish)`).

## Add videos and images
* Put the video in `assets/video/<id>.mp4` and a captions file `<id>.vtt` beside it, an image in `assets/img/`, then set `video: { src, poster, duration, uploaded, note }` on the lesson. A lesson without `video` shows a "no video yet" note; nothing is invented.
* Use `instagram: "https://www.instagram.com/reel/…"` on a lesson to show a link to its post. For YouTube, add a link in the lesson `intro` or extend the lesson template in `build.mjs`.
* Lesson videos come from the `tiny-french-story` generator. Copy its `.mp4`/`.srt` output here (convert SRT to VTT: change `,` to `.` in timestamps and add a `WEBVTT` header).

## Progress and privacy
Progress, saved words and missed questions are stored in the visitor's browser (`localStorage`, key `tinyfrench:v1`). It is not an account and does not sync across devices. All storage goes through one `store` object in `assets/js/app.js`; replace it with an account-backed version later without touching the rest of the UI.

## Custom domain
Set `url` and `basePath: ""` in `data/site.js` (or build with `BASE_PATH="" SITE_URL=https://yourdomain`), add the domain in **Settings → Pages**, and create a `CNAME` file containing the domain in `assets/` (it will be copied into `dist`). Canonical URLs, Open Graph tags and the sitemap switch to the new domain.

## Newsletter
`data/site.js → newsletter.formAction` is empty, so no signup form is shown and nothing pretends to subscribe anyone. Create a free form with a provider (Buttondown, MailerLite, Brevo, Kit…), paste its hosted-form POST URL and field name, rebuild.

## Selling courses later
The site is static, so it **cannot lock content by itself**. Do this when you are ready:
1. Check which payment provider supports sellers in your country and buyers in your target countries (fees, payouts, taxes). Do not assume Stripe or PayPal.
2. Create the product at that provider and copy its **hosted checkout link** (never keys or secrets).
3. In `data/courses.js` set `status: "available"`, `price`, `currency`, `checkoutUrl` (https only) on the course; the course page shows a *Buy* button. Tests refuse a checkout link on a course still marked `planned`.
4. Deliver paid content outside the public repo: downloads or private video hosted by the provider, or a members-only service. Public GitHub Pages files are public, so keep paid lessons out of this repository until you have access control.
5. Free lessons stay free and open.

## Notes
* Lesson text comes from the Tiny French scripts in the `tiny-french-story` repository. Lessons 2–7 have no video yet.
* The 🔊 buttons use the browser's Web Speech API (free). If a browser has no French voice, the buttons are hidden.
* Pronunciation respellings are approximate English-friendly guides, not IPA.
