// Zero-dependency checks: content integrity, built HTML sanity, internal links.  npm test
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { lessons } from "./data/lessons.js"; import { extraVocab, CATEGORIES } from "./data/vocab.js"; import { courses } from "./data/courses.js"; import { courseLessons } from "./data/course-lessons.js"; import { SITE } from "./data/site.js";
const BASE = (process.env.BASE_PATH ?? SITE.basePath ?? "").replace(/\/+$/, "");
const dist = path.resolve("dist"); let fails = 0, checks = 0;
const ok = (c, m) => { checks++; if (!c) { fails++; console.error("FAIL:", m); } };

// 1. content integrity
const ids = new Set(), nums = new Set();
for (const l of [...lessons, ...courseLessons]) {
  ok(!ids.has(l.id) && /^[a-z0-9-]+$/.test(l.id), `lesson id ok/unique: ${l.id}`); ids.add(l.id);
  const nk = `${l.course || "core"}:${l.number}`; ok(!nums.has(nk), `lesson number unique: ${nk}`); nums.add(nk);
  for (const k of ["title", "fr", "description", "intro", "level", "type", "minutes"]) ok(l[k], `${l.id}.${k} present`);
  ok(l.objectives.length >= 2 && l.dialogue.some((d) => d.who) && l.vocab.length && l.grammar.length && l.quiz.length >= 4, `${l.id} has objectives/dialogue/vocab/grammar/quiz`);
  for (const d of l.dialogue.filter((x) => x.who)) ok(d.fr && d.en, `${l.id} dialogue line has fr+en`);
  for (const v of l.vocab) ok(v.fr && v.en && v.say && v.ex && v.exEn && CATEGORIES.includes(v.cat), `${l.id} vocab complete: ${v.fr}`);
  l.quiz.forEach((q, i) => {
    const w = `${l.id} q${i + 1}`;
    ok(["mc", "fill"].includes(q.type) && q.q && q.answer && q.explain, `${w} fields`);
    if (q.type === "mc") { ok(q.options.length >= 3 && new Set(q.options).size === q.options.length, `${w} options unique`); ok(q.options.filter((o) => o === q.answer).length === 1, `${w} exactly one correct option`); }
    else ok(q.q.includes("___"), `${w} fill has a blank`);
  });
  if (l.video) for (const f of [l.video.src, l.video.poster, l.video.vtt || l.video.src.replace(/\.mp4$/, ".vtt")]) if (!/^https?:/.test(f)) ok(fs.existsSync(f), `${l.id} video asset exists: ${f}`);
  if (l.art.img) ok(fs.existsSync(`assets/img/${l.art.img}.jpg`), `${l.id} image exists`);
}
for (const l of courseLessons) ok(courses.some((c) => c.id === l.course), `${l.id} belongs to a known course`);
for (const v of extraVocab) ok(v.fr && v.en && v.say && v.ex && v.exEn && CATEGORIES.includes(v.cat), `extra vocab complete: ${v.fr}`);
for (const c of courses) { ok(c.status !== "available" || c.modules.length || courseLessons.some((l) => l.course === c.id), `${c.id} available course has lessons or modules`); ok(!c.cta?.href?.startsWith("/courses/") || /^\/courses\/[a-z0-9-]+\/[a-z0-9-]+\/$/.test(c.cta.href), `${c.id} cta link shape`); ok(!c.checkoutUrl || /^https:\/\//.test(c.checkoutUrl), `${c.id} checkoutUrl must be https`); ok(c.status === "available" || !c.checkoutUrl, `${c.id} unfinished course must not have a checkout link`); }
for (const f of fs.readdirSync(".", { recursive: true }).filter((f) => /\.(js|mjs|html|json|md)$/.test(f) && !/node_modules|dist|\.git|^test\.mjs$/.test(f))) { const t = fs.readFileSync(f, "utf8"); ok(!/(sk_live|secret_key|api[_-]?key\s*[:=]\s*["'][A-Za-z0-9]{12,})/i.test(t), `no secrets in ${f}`); }
try { execFileSync("node", ["--check", "assets/js/app.js"]); ok(true, ""); } catch (e) { ok(false, "app.js syntax"); }

// 2. built pages
const files = fs.readdirSync(dist, { recursive: true }).filter((f) => f.endsWith(".html"));
ok(files.length >= 10, "pages built");
const exists = (u) => { let p = u.split("#")[0].split("?")[0]; if (!p) return true; if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length); else if (BASE && p.startsWith("/")) return false; const f = path.join(dist, decodeURIComponent(p)); return fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, "index.html"))); };
const VOID = new Set(["meta", "link", "img", "input", "br", "hr", "source", "track", "wbr"]);
const titles = new Map();
for (const rel of files) {
  const h = fs.readFileSync(path.join(dist, rel), "utf8");
  ok((h.match(/<h1[ >]/g) || []).length === 1, `${rel}: exactly one h1`);
  ok(/<title>[^<]{10,}/.test(h) && /<meta name="description" content="[^"]{40,}/.test(h), `${rel}: title + description`);
  const t = h.match(/<title>([^<]*)/)[1]; ok(!titles.has(t), `${rel}: unique title (dup of ${titles.get(t)})`); titles.set(t, rel);
  ok(!/localhost|127\.0\.0\.1/.test(h), `${rel}: no localhost`);
  const idl = [...h.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]); ok(new Set(idl).size === idl.length, `${rel}: duplicate ids ${idl.filter((x, i) => idl.indexOf(x) !== i)}`);
  const body = h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, ""); const st = [];
  for (const m of body.matchAll(/<(\/?)([a-z0-9]+)\b[^>]*?(\/?)>/gi)) { const [, close, tag, self] = m; if (VOID.has(tag.toLowerCase()) || self) continue; if (!close) st.push(tag); else { const top = st.pop(); if (top !== tag) { ok(false, `${rel}: tag mismatch <${top}> vs </${tag}>`); break; } } }
  ok(st.length === 0, `${rel}: unclosed tags ${st.slice(-3)}`);
  for (const m of h.matchAll(/(?:href|src|poster)="([^"#][^"]*)"/g)) { const u = m[1]; if (/^(https?:|mailto:|data:|tel:)/.test(u) || u === "#") continue; ok(exists(u), `${rel}: broken link ${u}`); }
}
for (const f of ["robots.txt", "404.html", "assets/data/vocab.json", "assets/css/style.css", "assets/js/app.js", "assets/favicon.svg", "assets/img/og.png"]) ok(fs.existsSync(path.join(dist, f)), `dist/${f} exists`);
console.log(`${checks} checks, ${fails} failed`); process.exit(fails ? 1 : 0);
