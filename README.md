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
| `data/course-lessons.js` | **Course lessons** (same shape as lessons). Written in `data/course-conversations.js`, `data/course-sounds.js` and `data/course-everyday.js`; helpers in `data/course-tools.js`. |
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

## Add a course
Courses are free, ordered sets of lessons, like the courses on Tiny Japanese. Course lessons use the same fields as normal lessons (dialogue, vocab, grammar, quiz) and get their own pages at `/courses/<course-id>/<lesson-id>/`, plus their words and questions in the vocabulary library, quizzes and revision.
1. Write the lessons in a `data/course-*.js` file (copy one of the existing files). Every lesson needs `course` (the course id), `number` (its position inside the course) and a globally unique `id`. The helpers in `data/course-tools.js` keep this short.
2. Export them from `data/course-lessons.js`.
3. Add the course to `data/courses.js` with `status: "available"`, `modules: []` and a `cta.href` pointing at lesson 1 (`/courses/<course-id>/<lesson-id>/`). Use an existing image name for `art`.
4. New vocabulary categories go in `CATEGORIES` in `data/vocab.js`.
5. `npm test` validates structure, links and HTML. Commit and push to deploy.

## Make videos for course lessons
`node tools/make-video-scripts.mjs <folder>` turns every course lesson into a script for the Tiny French YouTube generator (`tiny-french-youtube`, folder `lessons/`). Those are landscape 1920x1080 long-format videos with story, vocabulary, grammar and quiz. Copy the scripts into that repo and run its **Render YouTube lesson** workflow.

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

## Premium courses (selling the courses)

The three courses are "free preview + premium": the first 2 lessons of each (`freeLessons` in `data/site.js`) are free, the rest are premium. A premium lesson's dialogue, vocabulary, grammar, quiz, video and captions are **not in this repo**: they live on the server (Supabase project `tiny-courses`, function `premium`) and are sent only after a valid access code is checked. The public pages for premium lessons are locked shells (title, goals and description only), and premium lessons are left out of the vocabulary library, quizzes and revision pages.

**How a sale works** (the payment link has no webhook, so this step is manual):
1. The visitor presses "Buy this course" and pays through the link in `data/site.js` (`premium.payUrl`).
2. They send their email and payment reference with the form under "I've paid".
3. Open the admin page (`/admin.html` on the Tiny Japanese site; it manages both sites), sign in with the admin secret, check the payment arrived, press "Payment received: make code". Copy the ready-made message and send it to the buyer.
4. The buyer enters the code and the course unlocks on that device (up to 3 devices per code; revoke it in the admin page).

**Prices** are in `data/courses.js` (`price`, `currency`).

**Changing premium lessons.** The full source (all lessons, with videos and captions) is in the private repo `tiny-courses-source`. Run the build there with `PREMIUM_EXPORT=<dir> node build.mjs` to render the premium lessons to JSON, upload them with the admin function, then run `node tools/split-fr.mjs` to refresh the public stubs here. Lesson videos for premium lessons are still hosted by the `tiny-french-youtube` site, so their file URLs are public if someone knows the address; the lesson text and quiz are what the code protects.
