// Tiny French static site generator. Zero dependencies:  npm run build  ->  dist/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./data/site.js";
import { lessons as rawLessons } from "./data/lessons.js";
import { CATEGORIES, extraVocab } from "./data/vocab.js";
import { courses, futureProducts } from "./data/courses.js";
import { courseLessons as rawCourseLessons } from "./data/course-lessons.js";
import { roadmap, numbers, sounds } from "./data/content.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, "dist");
const BASE = (process.env.BASE_PATH ?? SITE.basePath ?? "").replace(/\/+$/, "");
const ORIGIN = (process.env.SITE_URL ?? SITE.url ?? "").replace(/\/+$/, "");
const IG = SITE.instagramUrl;

// ---------- helpers ----------
const ty = (v) => typeof v === "string" ? v.replace(/'/g, "’") : Array.isArray(v) ? v.map(ty) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, ty(x)])) : v;
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const J = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
const U = (p) => BASE + p;
const abs = (p) => (ORIGIN ? ORIGIN + p : U(p));
const slug = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "'");
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const copyDir = (src, dst) => { fs.mkdirSync(dst, { recursive: true }); for (const e of fs.readdirSync(src, { withFileTypes: true })) { const s = path.join(src, e.name), d = path.join(dst, e.name); e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d); } };

// ---------- data ----------
fs.rmSync(OUT, { recursive: true, force: true });
const lessons = ty(rawLessons).sort((a, b) => a.number - b.number);
lessons.forEach((l, i) => {
  l.url = `/lessons/${l.id}/`;
  l.prev = lessons[i - 1]?.id || null; l.next = lessons[i + 1]?.id || null;
  l.quiz.forEach((q, n) => { q.id = `${l.id}-q${n + 1}`; q.lesson = l.id; });
});
const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));
const related = (l) => lessons.filter((o) => o.id !== l.id).map((o) => ({ o, s: o.topics.filter((t) => l.topics.includes(t)).length * 10 - Math.abs(o.number - l.number) })).sort((a, b) => b.s - a.s).slice(0, 3).map((x) => x.o);

// Course lessons: same shape as lessons, grouped under a course. They live at /courses/<course>/<lesson>/ and are not in the main lesson library.
const cLessons = ty(rawCourseLessons);
for (const c of courses) {
  c.lessonList = cLessons.filter((l) => l.course === c.id).sort((a, b) => a.number - b.number);
  c.lessonList.forEach((l, i) => {
    l.url = `/courses/${c.id}/${l.id}/`;
    l.prev = c.lessonList[i - 1]?.id || null; l.next = c.lessonList[i + 1]?.id || null;
    l.quiz.forEach((q, n) => { q.id = `${l.id}-q${n + 1}`; q.lesson = l.id; });
    byId[l.id] = l;
  });
}
for (const l of cLessons) if (!l.url) throw new Error(`Course lesson ${l.id} has an unknown course: ${l.course}`);

const vmap = new Map();
for (const l of [...lessons, ...cLessons]) for (const v of l.vocab) {
  const k = slug(v.fr);
  if (!vmap.has(k)) vmap.set(k, { id: k, ...v, lessons: [] });
  const e = vmap.get(k); if (!e.lessons.includes(l.id)) e.lessons.push(l.id);
}
for (const v of ty(extraVocab)) {
  const k = slug(v.fr);
  if (vmap.has(k)) continue;
  const first = norm(v.fr.split(" / ")[0]);
  const hit = !v.fr.includes(" / ") && first.length >= 4 ? lessons.filter((l) => l.dialogue.some((d) => d.fr && new RegExp(`(^|[^a-z])${first.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`).test(norm(d.fr)))).map((l) => l.id) : [];
  vmap.set(k, { id: k, ...v, lessons: hit });
}
const vocab = [...vmap.values()].sort((a, b) => CATEGORIES.indexOf(a.cat) - CATEGORIES.indexOf(b.cat) || a.fr.localeCompare(b.fr, "fr"));
const cats = CATEGORIES.filter((c) => vocab.some((v) => v.cat === c));
const questions = [...lessons, ...cLessons].flatMap((l) => l.quiz.map((q) => ({ ...q, lessonTitle: l.title })));
const allTopics = ["Absolute Beginner", "Greetings and Introductions", "Everyday French", "Travel French", "Food and Cafés", "Numbers and Time", "Vocabulary", "Grammar", "Listening and Conversation", "French Culture"].filter((t) => lessons.some((l) => l.topics.includes(t)));
const allLevels = [...new Set(lessons.map((l) => l.level))];
const allTypes = [...new Set(lessons.map((l) => l.type))];
const newest = [...lessons].sort((a, b) => b.number - a.number).slice(0, 3);
const featured = lessons.filter((l) => [1, 2, 3, 4].includes(l.number));

// ---------- layout ----------
const NAV = [["home", "/", "Home"], ["courses", "/courses/", "Courses"], ["lessons", "/lessons/", "Lessons"], ["about", "/about/", "About"]];
const igIcon = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`;
const ogImg = abs("/assets/img/og.png");

function page({ title, desc, path: p, cur = "", body, jsonld = [], noindex = false, type = "website" }) {
  const full = title.includes("Tiny French") ? title : `${title} | Tiny French`;
  const canon = ORIGIN ? `<link rel="canonical" href="${abs(p)}">\n<meta property="og:url" content="${abs(p)}">` : "";
  const ld = jsonld.length ? `<script type="application/ld+json">${J(jsonld)}</script>` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#bfe3f7">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
${canon}
<link rel="icon" type="image/svg+xml" href="${U("/assets/favicon.svg")}">
<meta property="og:site_name" content="Tiny French">
<meta property="og:type" content="${type}">
<meta property="og:locale" content="en">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Tiny French: learn French with Adrien and Marinette">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(full)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImg}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="${U("/assets/css/style.css")}">
<script>document.documentElement.classList.add("js");window.TF={base:${J(BASE)},ig:${J(IG)}}</script>
<script defer src="${U("/assets/js/app.js")}"></script>
${ld}
</head>
<body data-page="${cur}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
 <div class="wrap bar">
  <a class="brand" href="${U("/")}" aria-label="Tiny French home"><img src="${U("/assets/favicon.svg")}" alt="" width="36" height="36"><span>Tiny <b>French</b></span></a>
  <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span><span></span><span></span></button>
  <nav id="menu" aria-label="Main">
   ${NAV.map(([k, h, t]) => `<a href="${U(h)}"${k === cur ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
   <a class="btn small nav-cta" href="${U("/lessons/" + lessons[0].id + "/")}">Start Learning Free</a>
   ${IG ? `<a class="ig-link" href="${IG}" target="_blank" rel="noopener" aria-label="Tiny French on Instagram">${igIcon}<span class="sr">Instagram</span></a>` : ""}
  </nav>
 </div>
</header>
<main id="main">${body}</main>
<footer class="site-footer">
 <div class="wrap foot">
  <div><a class="brand" href="${U("/")}"><img src="${U("/assets/favicon.svg")}" alt="" width="32" height="32"><span>Tiny <b>French</b></span></a>
   <p>Learn French one tiny story at a time. Free beginner lessons with Adrien and Marinette.</p>
   ${IG ? `<p><a class="btn ghost small" href="${IG}" target="_blank" rel="noopener">${igIcon} Follow ${esc(SITE.instagramHandle)}</a></p>` : ""}</div>
  <div><h2>Learn</h2><ul><li><a href="${U("/start/")}">Start learning</a></li><li><a href="${U("/lessons/")}">All lessons</a></li><li><a href="${U("/vocabulary/")}">Vocabulary</a></li><li><a href="${U("/quizzes/")}">Quizzes</a></li><li><a href="${U("/revise/")}">My revision</a></li></ul></div>
  <div><h2>More</h2><ul><li><a href="${U("/resources/")}">Free resources</a></li><li><a href="${U("/courses/")}">Courses</a></li><li><a href="${U("/about/")}">About</a></li></ul></div>
 </div>
 <div class="wrap legal"><p>Your progress is saved in this browser only (not an account), so it will not follow you to another device. © Tiny French</p></div>
</footer>
</body>
</html>`;
}
const crumbs = (items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: abs(p) })) });
const breadcrumb = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([n, p], i) => `<li>${i < items.length - 1 ? `<a href="${U(p)}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}</li>`).join("")}</ol></nav>`;

const art = (l) => l.art.img
  ? `<img class="art" src="${U(`/assets/img/${l.art.img}.${l.art.ext || "jpg"}`)}" alt="${esc(l.art.alt)}" width="540" height="960" loading="lazy" decoding="async">`
  : `<div class="art emoji" role="img" aria-label="${esc(l.art.alt)}"><span aria-hidden="true">${l.art.emoji}</span></div>`;
const lessonCard = (l) => `<article class="card lesson-card" data-id="${l.id}" data-level="${esc(l.level)}" data-type="${esc(l.type)}" data-topics="${esc(l.topics.join("|"))}" data-search="${esc(norm([l.title, l.fr, l.description, l.topics.join(" "), l.vocab.map((v) => v.fr + " " + v.en).join(" ")].join(" ")))}">
 <a class="card-art" href="${U(l.url)}" tabindex="-1" aria-hidden="true">${art(l)}</a>
 <div class="card-body">
  <div class="chips"><span class="chip ep">Episode ${l.number}</span><span class="chip">${esc(l.level)}</span><span class="chip">⏱ ${l.minutes} min</span><span class="chip ok" data-done hidden>✓ Completed</span></div>
  <h3><a href="${U(l.url)}">${esc(l.title)}</a></h3>
  <p class="fr-title" lang="fr">${esc(l.fr)}</p>
  <ul class="goals">${l.objectives.slice(0, 2).map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
  <a class="btn small" href="${U(l.url)}">Start lesson<span class="sr"> ${esc(l.title)}</span></a>
 </div>
</article>`;
const homeLessonCard = (l) => `<article class="card lesson-card home-lesson-card"><a class="card-art" href="${U(l.url)}" tabindex="-1" aria-hidden="true">${art(l)}</a><div class="card-body"><span class="chip ep">Lesson ${l.number}</span><h3><a href="${U(l.url)}">${esc(l.title)}</a></h3><p class="home-card-desc">${esc(l.description)}</p></div></article>`;
const sayBtn = (t, label = "Listen") => `<button type="button" class="icon-btn say" data-say="${esc(t)}" aria-label="${label}: ${esc(t)}" hidden>🔊</button>`;
const newsletter = () => SITE.newsletter.formAction
  ? `<form class="newsletter card" action="${esc(SITE.newsletter.formAction)}" method="post"><h3>Get new lessons by e-mail</h3><label for="nl-email">Your e-mail</label><div class="row"><input id="nl-email" type="email" name="${esc(SITE.newsletter.emailField)}" required autocomplete="email"><button class="btn" type="submit">Subscribe</button></div></form>`
  : "";
const share = (title) => `<div class="share" data-title="${esc(title)}"><h2 class="h-small">Share this lesson</h2><div class="row">
 <button type="button" class="btn ghost small" data-share-native hidden>Share…</button>
 <button type="button" class="btn ghost small" data-copy>Copy link</button>
 <a class="btn ghost small" data-share="whatsapp" href="#" target="_blank" rel="noopener">WhatsApp</a>
 <a class="btn ghost small" data-share="x" href="#" target="_blank" rel="noopener">X</a>
 <a class="btn ghost small" data-share="facebook" href="#" target="_blank" rel="noopener">Facebook</a>
 <span class="sr" role="status" data-copy-msg></span></div></div>`;
const statusLabel = { available: "Available now", partial: "Some lessons", planned: "Coming later" };

// ---------- pages ----------
const pages = [];
const add = (p, html) => { pages.push(p); write(p === "/" ? "index.html" : `${p.replace(/^\//, "")}index.html`, html); };
const orgLd = { "@type": "Organization", name: "Tiny French", url: abs("/"), logo: abs("/assets/favicon.svg"), ...(IG ? { sameAs: [IG] } : {}) };
function roadmapHTML() {
  return `<ol class="roadmap">${roadmap.map((r, i) => `<li class="rm ${r.status}"><span class="rm-n">${i + 1}</span><div><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p><span class="chip st-${r.status}">${statusLabel[r.status]}</span>${r.lessons ? `<p class="rm-l">${r.lessons.map((n) => { const l = lessons.find((x) => x.number === n); return l ? `<a href="${U(l.url)}">Episode ${n}</a>` : ""; }).join(" · ")}</p>` : ""}${r.note ? `<p class="small muted">${esc(r.note)}</p>` : ""}</div></li>`).join("")}</ol>`;
}

// Home
{
  const first = lessons[0];
  const body = `
<section class="hero home-hero"><div class="wrap hero-grid">
 <div class="hero-copy">
  <h1>Learn French<br>with Adrien &amp; Marinette</h1>
  <p class="lead">Real conversations. Fun lessons.<br>Your French journey starts here!</p>
  <p class="cta-row"><a class="btn big" href="${U("/lessons/" + first.id + "/")}">Start Learning <span aria-hidden="true">→</span></a></p>
 </div>
 <div class="hero-art" aria-label="Adrien and Marinette learning French in a Paris café">
  <img class="hero-scene" src="${U("/assets/img/tiny-french-hero.svg")}" alt="Adrien with blond hair and Marinette with navy twin ponytails sitting together at a café" width="540" height="960" fetchpriority="high">
 </div>
</div></section>
<section class="benefits-strip" aria-label="Tiny French benefits"><div class="wrap benefits-grid">
 <div class="benefit"><span class="benefit-icon pink" aria-hidden="true">☏</span><div><h2>Real Life French</h2><p>Learn useful phrases for everyday situations.</p></div></div>
 <div class="benefit"><span class="benefit-icon blue" aria-hidden="true">▶</span><div><h2>Short &amp; Fun Lessons</h2><p>Engaging videos with Adrien &amp; Marinette.</p></div></div>
 <div class="benefit"><span class="benefit-icon purple" aria-hidden="true">▥</span><div><h2>Beginner Friendly</h2><p>Start from zero, grow at your own pace.</p></div></div>
 <div class="benefit"><span class="benefit-icon green" aria-hidden="true">♡</span><div><h2>Meet New Friends</h2><p>Join a supportive learning community.</p></div></div>
</div></section>
<section class="section popular-section"><div class="wrap">
 <div class="head-row"><h2><span class="heart-mark" aria-hidden="true">♥</span> Popular Lessons</h2><a class="more" href="${U("/lessons/")}">View All Lessons <span aria-hidden="true">→</span></a></div>
 <div class="home-lessons-grid">${featured.map(homeLessonCard).join("")}</div>
</div></section>
<section class="section alt"><div class="wrap center"><h2>Your French journey, one tiny step at a time</h2><p class="lead">Short stories, clear English explanations, and friendly quizzes to help you practise what you learn.</p><p><a class="btn big" href="${U("/lessons/")}">Explore all lessons →</a></p></div></section>`;
  add("/", page({ title: "Tiny French | Learn French with Adrien & Marinette", desc: "Learn French from zero with Adrien and Marinette through short conversations, practical phrases, and beginner-friendly lessons.", path: "/", cur: "home", body, jsonld: [orgLd, { "@type": "WebSite", name: "Tiny French", url: abs("/"), inLanguage: "en" }] }));
}

// Start
add("/start/", page({
  title: "Start Learning French from Zero", cur: "start", path: "/start/",
  desc: "A simple path to learn French from zero: watch a short conversation, learn the words, practise with a quiz. Begin with Lesson 1 for free.",
  jsonld: [crumbs([["Home", "/"], ["Start Learning", "/start/"]])],
  body: `<div class="wrap narrow page-head"><h1>Start learning French</h1><p class="lead">No experience needed. Follow these steps and you will have your first real French conversation in about six minutes.</p></div>
<div class="wrap narrow"><div class="continue big" data-continue hidden></div>
 <ol class="how">
  <li><h2>Meet the sounds</h2><p>French spelling and sound are different from English. Our one-page <a href="${U("/resources/pronunciation-guide/")}">pronunciation guide</a> takes two minutes. Every French word on this site has a 🔊 button that reads it aloud when your browser supports it.</p></li>
  <li><h2>Begin Lesson 1</h2><p>Watch Marinette and Adrien meet in a café, read the dialogue with translations, then take the quiz.</p><p><a class="btn" href="${U(lessons[0].url)}">Start Lesson 1 — Free</a></p></li>
  <li><h2>Keep going, one tiny step at a time</h2><p>Mark each lesson complete to track your progress. Struggled with a word? Save it, and practise it on the <a href="${U("/revise/")}">revision page</a>.</p></li>
 </ol></div>
<section class="section alt"><div class="wrap"><h2 class="center">The roadmap</h2>${roadmapHTML()}<p class="center"><a class="btn ghost" href="${U("/lessons/")}">Browse all lessons</a></p></div></section>`
}));

// Lessons library
add("/lessons/", page({
  title: "French Lessons for Beginners", cur: "lessons", path: "/lessons/",
  desc: "Free beginner French lessons: short conversations with English translations, vocabulary, simple grammar and quizzes. Search by topic, level or keyword.",
  jsonld: [crumbs([["Home", "/"], ["Lessons", "/lessons/"]]), { "@type": "ItemList", itemListElement: lessons.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: abs(l.url), name: l.title })) }],
  body: `<div class="wrap page-head"><h1>Lessons</h1><p class="lead">${lessons.length} free lessons, each with dialogue, vocabulary, grammar and a quiz.</p>
 <div class="progress-summary" data-summary hidden></div>
 <form class="filters" role="search" aria-label="Filter lessons" onsubmit="return false">
  <div><label for="f-q">Search</label><input id="f-q" type="search" placeholder="e.g. coffee, bonjour, Paris" autocomplete="off"></div>
  <div><label for="f-level">Level</label><select id="f-level"><option value="">All levels</option>${allLevels.map((x) => `<option>${esc(x)}</option>`).join("")}</select></div>
  <div><label for="f-topic">Topic</label><select id="f-topic"><option value="">All topics</option>${allTopics.map((x) => `<option>${esc(x)}</option>`).join("")}</select></div>
  <div><label for="f-type">Lesson type</label><select id="f-type"><option value="">All types</option>${allTypes.map((x) => `<option>${esc(x)}</option>`).join("")}</select></div>
  <button type="button" class="btn ghost small" id="f-reset">Clear filters</button>
 </form>
 <p class="muted" role="status" aria-live="polite" id="f-count"></p></div>
<div class="wrap">
 <section id="newest" aria-labelledby="newest-h"><h2 id="newest-h">Newest lessons</h2><div class="grid3">${newest.map(lessonCard).join("")}</div></section>
 <section aria-labelledby="all-h"><h2 id="all-h">All lessons</h2><div class="grid3" id="lesson-grid">${lessons.map(lessonCard).join("")}</div>
 <div class="empty" id="f-empty" hidden><p class="big-emoji" aria-hidden="true">🥖</p><h3>No lessons match that search</h3><p>Try a different word, or clear the filters to see every lesson.</p><button class="btn" type="button" id="f-reset2">Show all lessons</button></div></section>
</div>`
}));

// Lesson pages
const speakerClass = (w) => ({ Adrien: "adrien", Marinette: "marinette" }[w] || "other");
function renderLesson(l, X) {
  const prev = byId[l.prev], next = byId[l.next], rel = X.rel;
  const video = X.hideVideo ? "" : l.video ? `<section class="block" aria-labelledby="v-h"><h2 id="v-h">Watch the lesson</h2><div class="video"><video controls preload="metadata" playsinline poster="${U("/" + l.video.poster)}"><source src="${U("/" + l.video.src)}" type="video/mp4"><track kind="captions" srclang="fr" label="Français + English" src="${U("/" + l.video.src.replace(/\.mp4$/, ".vtt"))}" default>Your browser can't play this video.</video></div><p class="small muted center">${esc(l.video.note)}</p></section>`
    : `<section class="block" aria-labelledby="v-h"><h2 id="v-h">Video</h2><div class="card novideo"><p><b>No video for this lesson yet.</b> Read the dialogue below${IG ? ` and follow <a href="${IG}" target="_blank" rel="noopener">${esc(SITE.instagramHandle)}</a> for new videos` : ""}.</p></div></section>`;
  const ig = l.instagram ? `<p><a class="btn ghost small" href="${esc(l.instagram)}" target="_blank" rel="noopener">${igIcon} See this lesson on Instagram</a></p>` : "";
  const lessonQuiz = { id: l.id, title: l.title, questions: l.quiz };
  const body = `<article class="wrap lesson" data-lesson="${l.id}">
 ${breadcrumb(X.crumbs)}
 <header class="lesson-head">
  <div class="chips"><span class="chip ep">${esc(X.chip)}</span><span class="chip">${esc(l.level)}</span><span class="chip">${esc(l.type)}</span><span class="chip">⏱ ${l.minutes} min</span><span class="chip ok" data-done hidden>✓ Completed</span></div>
  <h1>${esc(l.title)}</h1><p class="fr-title" lang="fr">${esc(l.fr)}</p><p class="lead">${esc(l.description)}</p>
  <div class="card goals-box"><h2 class="h-small">By the end of this lesson you can…</h2><ul>${l.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></div>
  ${ig}
 </header>
 ${video}
 <section class="block" aria-labelledby="d-h"><h2 id="d-h">Dialogue</h2><p class="muted">${esc(l.intro)}</p>
  <ol class="dialogue">${l.dialogue.map((d) => d.scene ? `<li class="scene" role="separator" aria-label="${esc(d.scene)}"><span>${esc(d.scene)}</span></li>` : `<li class="line ${speakerClass(d.who)}"><span class="who">${esc(d.who)}</span><div class="say-row"><p class="fr" lang="fr">${esc(d.fr)}</p>${sayBtn(d.fr)}</div><p class="en">${esc(d.en)}</p></li>`).join("")}</ol></section>
 <section class="block" aria-labelledby="vo-h"><h2 id="vo-h">Vocabulary</h2>
  <ul class="vocab-list">${l.vocab.map((v) => { const id = slug(v.fr); return `<li class="vcard" data-vid="${id}"><div class="v-main"><div class="say-row"><span class="v-fr" lang="fr">${esc(v.fr)}</span>${sayBtn(v.fr)}</div><span class="v-say">${esc(v.say)}</span><span class="v-en">${esc(v.en)}</span></div><p class="v-ex"><span lang="fr">${esc(v.ex)}</span> <span class="muted">— ${esc(v.exEn)}</span></p><button type="button" class="btn ghost small save" data-save="${id}" aria-pressed="false">☆ Save word</button></li>`; }).join("")}</ul>
  <details class="fc-wrap"><summary>Practise these words with flashcards</summary><div class="fc" data-flash="lesson"></div></details></section>
 <section class="block" aria-labelledby="g-h"><h2 id="g-h">Grammar made simple</h2>${l.grammar.map((g) => `<div class="card gram"><h3>${esc(g.title)}</h3><p>${esc(g.body)}</p><ul class="ex">${g.examples.map((e) => `<li><span lang="fr">${esc(e.fr)}</span> ${sayBtn(e.fr)}<br><span class="muted">${esc(e.en)}</span></li>`).join("")}</ul></div>`).join("")}</section>
 <section class="block" id="quiz" aria-labelledby="q-h"><h2 id="q-h">Quiz</h2><div class="quiz" data-quiz="lesson"><noscript>The quiz needs JavaScript. Please turn it on to practise.</noscript></div>
  <script type="application/json" id="quiz-data">${J(lessonQuiz)}</script><script type="application/json" id="vocab-data">${J(l.vocab.map((v) => ({ ...v, id: slug(v.fr) })))}</script></section>
 <section class="block complete" aria-labelledby="c-h"><h2 id="c-h">Finished?</h2><p>Mark this lesson as complete to track your progress. It is saved in this browser only.</p><button type="button" class="btn big" data-complete aria-pressed="false">Mark lesson as complete</button><p class="small muted" role="status" data-complete-msg></p></section>
 ${share(l.title)}
 <nav class="prevnext" aria-label="Lesson navigation">${prev ? `<a class="pn prev" href="${U(prev.url)}"><span>← Previous</span><b>${esc(prev.title)}</b></a>` : "<span></span>"}${next ? `<a class="pn next" href="${U(next.url)}"><span>Next →</span><b>${esc(next.title)}</b></a>` : `<a class="pn next" href="${U(X.more[0])}"><span>More →</span><b>${esc(X.more[1])}</b></a>`}</nav>
 ${rel.length ? `<section class="block" aria-labelledby="r-h"><h2 id="r-h">Related lessons</h2><div class="grid3">${rel.map(lessonCard).join("")}</div></section>` : ""}
</article>`;
  const ld = [crumbs(X.crumbs), { "@type": "LearningResource", name: `${l.title} (${l.fr})`, description: l.description, url: abs(l.url), inLanguage: "en", teaches: "French language", educationalLevel: l.level, learningResourceType: l.type === "Story" ? "Story lesson" : "Dialogue", timeRequired: `PT${l.minutes}M`, isAccessibleForFree: true, publisher: orgLd }];
  if (l.video) ld.push({ "@type": "VideoObject", name: l.title, description: l.description, thumbnailUrl: abs("/" + l.video.poster), contentUrl: abs("/" + l.video.src), uploadDate: l.video.uploaded, duration: l.video.duration, inLanguage: "fr" });
  add(l.url, page({ title: X.title, desc: `${l.description} Free beginner French lesson with dialogue and English translations, vocabulary, grammar and a quiz.`, path: l.url, cur: X.cur, body, jsonld: ld, type: "article" }));
}
for (const l of lessons) renderLesson(l, { rel: related(l), crumbs: [["Home", "/"], ["Lessons", "/lessons/"], [l.title, l.url]], chip: `Episode ${l.number}`, more: ["/lessons/", "All lessons"], title: `${l.title}: Learn French (Episode ${l.number})`, cur: "lessons" });
for (const c of courses) for (const l of c.lessonList) renderLesson(l, { rel: [], hideVideo: true, crumbs: [["Home", "/"], ["Courses", "/courses/"], [c.title, `/courses/${c.id}/`], [l.title, l.url]], chip: `Lesson ${l.number} of ${c.lessonList.length}`, more: [`/courses/${c.id}/`, "Course overview"], title: `${l.title}: ${c.title} (Lesson ${l.number})`, cur: "courses" });

// Vocabulary
add("/vocabulary/", page({
  title: "Easy French Vocabulary for Beginners", cur: "vocabulary", path: "/vocabulary/",
  desc: "Searchable beginner French vocabulary with English meanings, pronunciation help and example sentences. Filter by category and practise with flashcards.",
  jsonld: [crumbs([["Home", "/"], ["Vocabulary", "/vocabulary/"]])],
  body: `<div class="wrap page-head"><h1>French vocabulary</h1><p class="lead">${vocab.length} beginner words and phrases, each with an example. Tap 🔊 to hear it (where your browser supports it).</p>
 <form class="filters" role="search" aria-label="Filter vocabulary" onsubmit="return false">
  <div><label for="v-q">Search</label><input id="v-q" type="search" placeholder="French or English, e.g. croissant" autocomplete="off"></div>
  <div><label for="v-cat">Category</label><select id="v-cat"><option value="">All categories</option>${cats.map((c) => `<option>${esc(c)}</option>`).join("")}</select></div>
  <div class="check"><label><input id="v-saved" type="checkbox"> Saved words only</label></div>
  <button type="button" class="btn ghost small" id="v-reset">Clear filters</button>
 </form><p class="muted" role="status" aria-live="polite" id="v-count"></p>
 <p><button type="button" class="btn" id="v-practice">Practise these words as flashcards</button></p>
 <div class="fc-panel" id="v-fc" hidden><div class="fc" data-flash="page"></div></div></div>
<div class="wrap"><ul class="vocab-grid" id="v-list">${vocab.map((v) => `<li class="vcard" data-vid="${v.id}" data-cat="${esc(v.cat)}" data-search="${esc(norm(v.fr + " " + v.en + " " + v.ex + " " + v.exEn))}"><div class="v-main"><div class="say-row"><span class="v-fr" lang="fr">${esc(v.fr)}</span>${sayBtn(v.fr)}</div><span class="v-say">${esc(v.say)}</span><span class="v-en">${esc(v.en)}</span></div><p class="chips"><span class="chip">${esc(v.cat)}</span></p><p class="v-ex"><span lang="fr">${esc(v.ex)}</span> <span class="muted">— ${esc(v.exEn)}</span></p>${v.lessons.length ? `<p class="small">Lessons: ${v.lessons.map((id) => `<a href="${U(byId[id].url)}">Episode ${byId[id].number}</a>`).join(", ")}</p>` : ""}<button type="button" class="btn ghost small save" data-save="${v.id}" aria-pressed="false">☆ Save word</button></li>`).join("")}</ul>
 <div class="empty" id="v-empty" hidden><p class="big-emoji" aria-hidden="true">📖</p><h3>No words found</h3><p>Try another spelling or clear the filters. Saved-words view stays empty until you save some.</p></div></div>
<script type="application/json" id="vocab-data">${J(vocab)}</script>`
}));

// Quizzes
add("/quizzes/", page({
  title: "French Quizzes for Beginners", cur: "quizzes", path: "/quizzes/",
  desc: "Free French quizzes for beginners: multiple choice, translation and fill-in-the-blank questions with instant feedback and scores.",
  jsonld: [crumbs([["Home", "/"], ["Quizzes", "/quizzes/"]])],
  body: `<div class="wrap page-head"><h1>Quizzes</h1><p class="lead">Instant feedback, a score at the end and the chance to try again.</p></div>
<div class="wrap"><section class="block" aria-labelledby="mix-h"><h2 id="mix-h">Vocabulary mixer</h2><p class="muted">10 random questions from all ${vocab.length} words in the vocabulary library. French → English and English → French.</p><div class="quiz" data-quiz="mixer"><noscript>The quiz needs JavaScript.</noscript></div></section>
 <section class="block" aria-labelledby="lq-h"><h2 id="lq-h">Lesson quizzes</h2><div class="grid3">${lessons.map((l) => `<div class="card qcard" data-qid="${l.id}"><div class="chips"><span class="chip ep">Episode ${l.number}</span><span class="chip">${l.quiz.length} questions</span></div><h3>${esc(l.title)}</h3><p class="muted small" data-best></p><a class="btn small" href="${U(l.url + "#quiz")}">Take quiz<span class="sr"> for ${esc(l.title)}</span></a></div>`).join("")}</div></section>
 <section class="block"><h2>Revision</h2><p>Questions you miss and words you save are collected on your <a href="${U("/revise/")}">revision page</a>.</p></section></div>
<script type="application/json" id="vocab-data">${J(vocab)}</script>`
}));

// Revise
add("/revise/", page({
  title: "My French Revision", cur: "quizzes", path: "/revise/", noindex: true,
  desc: "Practise the French words you saved and the quiz questions you missed.",
  body: `<div class="wrap page-head"><h1>My revision</h1><p class="lead">Words you saved and questions you got wrong. This list lives in this browser only.</p></div>
<div class="wrap"><section class="block"><h2>Questions to retry</h2><p class="muted" data-wrong-count></p><div class="quiz" data-quiz="revise"></div></section>
 <section class="block"><h2>Saved words</h2><p class="muted" data-saved-count></p><div class="fc" data-flash="saved"></div><ul class="vocab-grid" id="saved-list"></ul></section>
 <section class="block"><h2>Your data</h2><p class="small muted">Progress is stored only in this browser. It does not sync between devices, and clearing site data erases it.</p><button class="btn ghost small" type="button" id="reset-progress">Reset all my progress</button></section></div>
<script type="application/json" id="vocab-data">${J(vocab)}</script><script type="application/json" id="questions-data">${J(questions)}</script>`
}));

// About
add("/about/", page({
  title: "About Tiny French", cur: "about", path: "/about/",
  desc: "Tiny French teaches beginner French through short stories with Adrien and Marinette. Learn how the lessons work and why we start with real conversations.",
  jsonld: [crumbs([["Home", "/"], ["About", "/about/"]]), orgLd],
  body: `<div class="wrap narrow page-head"><h1>About Tiny French</h1><p class="lead">French, one tiny story at a time.</p></div>
<div class="wrap narrow prose">
 <h2>What is Tiny French?</h2><p>Tiny French is a free place to learn beginner French through short, friendly conversations. Instead of starting with long grammar tables, you listen to real phrases first, then see why they work.</p>
 <h2>Meet Adrien and Marinette</h2><p>Adrien and Marinette are two cheerful friends who walk you through every lesson. They order croissants, meet in cafés and explore Paris, so every new word comes with a little story to remember it by.</p>
 <h2>Our beginner-first approach</h2><ul><li>Start with real phrases you can use today.</li><li>Always show French with the English translation beneath it.</li><li>Keep lessons short enough to finish.</li><li>Explain grammar only when a lesson needs it, in plain English.</li><li>Practise straight away with quizzes and revision.</li></ul>
 <h2>Website and social media</h2><p>Lessons usually begin life as short videos on social media. This website is the full classroom: the complete dialogue, vocabulary with pronunciation help, grammar notes and a quiz for each lesson.${IG ? ` Follow <a href="${IG}" target="_blank" rel="noopener">${esc(SITE.instagramHandle)}</a> on Instagram to see new videos first.` : ""}</p>
 <p><a class="btn" href="${U("/lessons/")}">Browse the lessons</a></p>
</div>`
}));

// Courses
const priceLabel = (c) => c.free ? "Free" : c.price ? `${c.currency} ${c.price}` : "Price to be announced";
const ctaFor = (c) => c.checkoutUrl ? { label: "Buy this course", href: c.checkoutUrl, ext: true } : c.cta.href === "instagram" ? (IG ? { label: c.cta.label, href: IG, ext: true } : null) : { label: c.cta.label, href: U(c.cta.href) };
const courseCard = (c) => `<article class="card course-card"><img class="art-wide" src="${U(`/assets/img/${c.art}.svg`)}" alt="" width="540" height="960" loading="lazy"><div class="card-body"><div class="chips"><span class="chip ${c.free ? "ok2" : ""}">${c.free ? "Free" : "Paid"}</span><span class="chip st-${c.status === "available" ? "available" : "planned"}">${c.status === "available" ? "Available now" : "In planning"}</span></div><h3><a href="${U("/courses/" + c.id + "/")}">${esc(c.title)}</a></h3><p>${esc(c.summary)}</p><p class="small muted">${esc(c.level)} · ${priceLabel(c)}</p><a class="btn small" href="${U("/courses/" + c.id + "/")}">View details</a></div></article>`;
add("/courses/", page({
  title: "French Courses", cur: "courses", path: "/courses/",
  desc: "All Tiny French lessons are free. A structured paid beginner course is in planning: see the planned modules and follow for launch news.",
  jsonld: [crumbs([["Home", "/"], ["Courses", "/courses/"]])],
  body: `<div class="wrap page-head"><h1>Courses</h1><p class="lead">Everything published today is free. Paid products are planned and are clearly marked until they exist.</p></div>
<div class="wrap"><div class="grid2">${courses.map(courseCard).join("")}</div>
 <section class="block"><h2>Also planned</h2><div class="grid3">${futureProducts.map((p) => `<div class="card"><span class="chip st-planned">Coming later</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`).join("")}</div></section></div>`
}));
for (const c of courses) {
  const cta = ctaFor(c);
  add(`/courses/${c.id}/`, page({
    title: c.title, cur: "courses", path: `/courses/${c.id}/`, desc: c.summary,
    jsonld: [crumbs([["Home", "/"], ["Courses", "/courses/"], [c.title, `/courses/${c.id}/`]]), ...(c.status === "available" ? [{ "@type": "Course", name: c.title, description: c.summary, provider: orgLd, isAccessibleForFree: true }] : [])],
    body: `<div class="wrap narrow">${breadcrumb([["Home", "/"], ["Courses", "/courses/"], [c.title, `/courses/${c.id}/`]])}
 <header class="page-head"><div class="chips"><span class="chip ${c.free ? "ok2" : ""}">${c.free ? "Free" : "Paid"}</span><span class="chip st-${c.status === "available" ? "available" : "planned"}">${c.status === "available" ? "Available now" : "In planning — not for sale yet"}</span><span class="chip">${esc(c.level)}</span></div><h1>${esc(c.title)}</h1><p class="lead">${esc(c.summary)}</p><p class="price">${priceLabel(c)}</p>${cta ? `<p><a class="btn big" href="${esc(cta.href)}"${cta.ext ? ' target="_blank" rel="noopener"' : ""}>${esc(cta.label)}</a></p>` : ""}</header>
 <img class="art-wide big" src="${U(`/assets/img/${c.art}.svg`)}" alt="" width="540" height="960" loading="lazy">
 <section class="block"><h2>What you will be able to do</h2><ul>${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></section>
 ${c.lessonList.length ? `<section class="block"><h2>Lessons</h2><ol class="modules course-lessons">${c.lessonList.map((l) => `<li><a href="${U(l.url)}"><b>${l.number}. ${esc(l.title)}</b></a> <span class="chip">⏱ ${l.minutes} min</span><p class="small muted">${esc(l.description)}</p></li>`).join("")}</ol></section>` : ""}
 ${c.modules.length ? `<section class="block"><h2>Modules</h2><ol class="modules">${c.modules.map((m) => `<li><b>${esc(m.title)}</b> <span class="chip st-${m.status === "available" ? "available" : "planned"}">${m.status === "available" ? "Available" : "Planned"}</span>${m.note ? `<p class="small muted">${esc(m.note)}</p>` : ""}</li>`).join("")}</ol></section>` : ""}</div>`
  }));
}

// Resources
const printable = (title, intro, inner, p) => page({ title, desc: intro, path: p, cur: "courses", jsonld: [crumbs([["Home", "/"], ["Free resources", "/resources/"], [title, p]])], body: `<div class="wrap narrow sheet">${breadcrumb([["Home", "/"], ["Free resources", "/resources/"], [title, p]])}<div class="no-print"><button type="button" class="btn" onclick="window.print()">Print or save as PDF</button></div><h1>${esc(title)}</h1><p class="lead">${esc(intro)}</p>${inner}<p class="small muted">Tiny French · free to print and share for learning.</p></div>` });
const pronHTML = `<dl class="sounds">${sounds.map((s) => `<div><dt>${esc(s.t)}</dt><dd>${esc(s.b)} <span class="muted">Try: <span lang="fr">${esc(s.e)}</span></span></dd></div>`).join("")}</dl>`;
const numHTML = `<table class="sheet-table"><thead><tr><th scope="col">Number</th><th scope="col">French</th><th scope="col">Say it</th></tr></thead><tbody>${numbers.map(([n, f, s]) => `<tr><td>${n}</td><td lang="fr"><b>${esc(f)}</b></td><td>${esc(s)}</td></tr>`).join("")}</tbody></table><p class="muted">Tip: 17, 18 and 19 are just “ten-seven”, “ten-eight” and “ten-nine”.</p>`;
const phraseHTML = cats.map((c) => `<h2>${esc(c)}</h2><table class="sheet-table"><thead><tr><th scope="col">French</th><th scope="col">English</th><th scope="col">Say it</th></tr></thead><tbody>${vocab.filter((v) => v.cat === c).map((v) => `<tr><td lang="fr"><b>${esc(v.fr)}</b></td><td>${esc(v.en)}</td><td>${esc(v.say)}</td></tr>`).join("")}</tbody></table>`).join("");
const resList = [
  { id: "pronunciation-guide", title: "French Alphabet and Pronunciation Guide", text: "Seven sound rules that make French easier to read aloud.", html: pronHTML, desc: "A one-page beginner guide to French sounds: silent letters, accents, nasal vowels, the French R and liaison." },
  { id: "numbers-0-20", title: "French Numbers Cheat Sheet (0–20)", text: "Numbers 0 to 20 with simple pronunciation help.", html: numHTML, desc: "French numbers from zero to twenty with an easy pronunciation guide. Print it and keep it handy." },
  { id: "starter-phrasebook", title: "Tiny French Starter Phrasebook", text: `${vocab.length} beginner words and phrases by category, with pronunciation.`, html: phraseHTML, desc: `${vocab.length} beginner French words and phrases with English meanings and pronunciation, grouped by topic.` }
];
add("/resources/", page({
  title: "Free French Resources", cur: "courses", path: "/resources/",
  desc: "Free printable French resources for beginners: pronunciation guide, numbers cheat sheet and a starter phrasebook.",
  jsonld: [crumbs([["Home", "/"], ["Free resources", "/resources/"]])],
  body: `<div class="wrap page-head"><h1>Free resources</h1><p class="lead">Printable sheets built from the Tiny French lessons. Open one, then print it or save it as a PDF.</p></div>
<div class="wrap"><div class="grid3">${resList.map((r) => `<div class="card"><span class="chip st-available">Available now</span><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p><a class="btn small" href="${U("/resources/" + r.id + "/")}">Open</a></div>`).join("")}</div>
 <section class="block"><h2>Coming later</h2><ul><li>First 30 Days of French Learning</li><li>Printable revision worksheets</li></ul><p class="muted small">These are not published yet.</p></section>
 ${newsletter() || `<section class="block"><h2>Stay in the loop</h2><p>The e-mail newsletter is not set up yet. ${IG ? `For now, follow <a href="${IG}" target="_blank" rel="noopener">${esc(SITE.instagramHandle)}</a> for new lessons.` : ""}</p></section>`}</div>`
}));
for (const r of resList) add(`/resources/${r.id}/`, printable(r.title, r.desc, r.html, `/resources/${r.id}/`));

// 404
write("404.html", page({ title: "Page not found", desc: "This page could not be found. Head back to the Tiny French home page or browse the free French lessons.", path: "/404.html", noindex: true, body: `<div class="wrap narrow page-head center"><p class="big-emoji" aria-hidden="true">🥐</p><h1>Oups ! Page not found</h1><p class="lead">That page does not exist (or has moved). Let's get you back to learning.</p><p><a class="btn" href="${U("/")}">Home</a> <a class="btn ghost" href="${U("/lessons/")}">All lessons</a></p></div>` }));

// ---------- assets + machine files ----------
copyDir(path.join(root, "assets"), path.join(OUT, "assets"));
write("assets/data/vocab.json", JSON.stringify(vocab));
write("assets/data/questions.json", JSON.stringify(questions));
write("assets/data/lessons.json", JSON.stringify([...lessons, ...cLessons].map((l) => ({ id: l.id, number: l.number, title: l.title, fr: l.fr, url: l.url, topics: l.topics, level: l.level, type: l.type }))));
write(".nojekyll", "");
write("robots.txt", `User-agent: *\nAllow: /\n${ORIGIN ? `Sitemap: ${ORIGIN}/sitemap.xml\n` : ""}`);
if (ORIGIN) write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((p) => p !== "/revise/").map((p) => `<url><loc>${ORIGIN}${p}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Built ${pages.length} pages, ${lessons.length} lessons + ${cLessons.length} course lessons, ${vocab.length} vocabulary entries, ${questions.length} questions -> dist/ (base "${BASE}", origin "${ORIGIN || "none"}")`);
