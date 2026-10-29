// Turns every course lesson in data/course-lessons.js into a script for the Tiny French YouTube generator
// (repo: tiny-french-youtube, folder lessons/, landscape 1920x1080 long-format videos).
// Usage: node tools/make-video-scripts.mjs <output-folder>
import fs from "node:fs";
import path from "node:path";
import { courses } from "../data/courses.js";
import { courseLessons } from "../data/course-lessons.js";

const out = process.argv[2] || "video-scripts";
fs.mkdirSync(out, { recursive: true });

// The video engine has two speakers only: Marinette and Adrien. Other roles (shopkeeper, waiter...) are played by one of them.
const CODES = { "first-conversations": "fc", "french-sounds-starter": "fs", "everyday-french": "ef" };
const SCENES = {
  "greetings-through-the-day": "street", "introducing-yourself": "terrace", "numbers-and-prices": "market", "ordering-at-the-cafe": "terrace",
  "asking-for-directions": "street", "family-and-friends": "home", "buying-a-train-ticket": "station",
  "accents-and-the-alphabet": "classroom", "silent-letters-and-liaison": "restaurant", "nasal-vowels": "bakery", "the-french-u-and-r": "classroom",
  "reading-signs-and-menus": "street", "vowel-combinations": "classroom", "rhythm-and-questions": "park",
  "days-and-today": "home", "telling-the-time": "station", "likes-and-dislikes": "terrace", "making-plans": "street",
  "asking-for-help": "station", "weather-and-seasons": "park", "at-the-hotel": "home"
};
const ROLES = {
  "numbers-and-prices": { "Le vendeur": "Adrien" },
  "asking-for-directions": { "La passante": "Marinette" },
  "buying-a-train-ticket": { "L'employée": "Marinette" },
  "asking-for-help": { "L'employée": "Marinette" },
  "nasal-vowels": { "Le boulanger": "Adrien" }
};
const LINE_SPEAKER = { "nasal-vowels": { 5: "Marinette" } };   // dialogue index -> speaker
// Café has three speakers on the site; in the video Marinette is the waitress and Adrien orders for both.
const OVERRIDE = {
  "ordering-at-the-cafe": [
    ["Marinette", "Bonjour ! Vous désirez ?", "Hello! What would you like?"],
    ["Adrien", "Bonjour. Je voudrais un café et un thé au citron, s'il vous plaît.", "Hello. I'd like a coffee and a lemon tea, please."],
    ["Marinette", "Très bien. Et avec ça ?", "Very good. Anything else?"],
    ["Adrien", "Un croissant, s'il vous plaît.", "A croissant, please."],
    ["Marinette", "Voilà ! Un café, un thé et un croissant.", "Here you are! A coffee, a tea and a croissant."],
    ["Adrien", "Merci ! L'addition, s'il vous plaît ?", "Thank you! The bill, please?"],
    ["Marinette", "Tout de suite. Ça fait sept euros cinquante.", "Right away. That's seven euros fifty."],
    ["Adrien", "Voilà. Gardez la monnaie !", "Here you go. Keep the change!"],
    ["Marinette", "Merci, bonne journée !", "Thank you, have a nice day!"]
  ]
};
// Grammar boxes whose written form does not work when read aloud by a narrator.
const GRAMMAR_BODY = {
  "Numbers 0–20": "Learn the numbers in small groups. Zero to ten: zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix. Then eleven to sixteen: onze, douze, treize, quatorze, quinze, seize. Then seventeen, eighteen, nineteen and twenty: dix-sept, dix-huit, dix-neuf, vingt.",
  "The French letter names": "Every letter has a French name that is different from English. Listen, and repeat after me. The best practice is to spell your own name out loud."
};
const GRAMMAR_EX = {
  "The French letter names": [["A, B, C, D, E, F, G", "The first seven letters"], ["A, D, R, I, E, N", "Spelling Adrien"]]
};

const clean = (s) => String(s).replace(/\|/g, "/").replace(/\s+/g, " ").trim();
const spoken = (s) => clean(s).replace(/\s*\([^)]*\)/g, "").replace(/“|”/g, '"');

let n = 0;
for (const c of courses) for (const l of courseLessons.filter((x) => x.course === c.id).sort((a, b) => a.number - b.number)) {
  const code = CODES[c.id]; const file = `${code}-${String(l.number).padStart(2, "0")}-${l.id}.txt`;
  const roles = ROLES[l.id] || {}; const per = LINE_SPEAKER[l.id] || {};
  const dlg = OVERRIDE[l.id] || l.dialogue.filter((d) => d.who).map((d, i) => [per[i] || roles[d.who] || d.who, d.fr, d.en]);
  for (const [who] of dlg) if (who !== "Marinette" && who !== "Adrien") throw new Error(`${l.id}: speaker ${who} is not Marinette or Adrien`);
  const mcs = l.quiz.filter((q) => q.type === "mc");
  if (mcs.length < 3) throw new Error(`${l.id}: needs at least 3 multiple-choice questions for the video quiz`);
  const L = [`title: ${l.title}`, `episode: ${code.toUpperCase()}${l.number}`, `scene: ${SCENES[l.id] || "auto"}`, "", "[story]"];
  for (const [who, fr, en] of dlg) L.push(`${who}: ${clean(fr)} | ${clean(en)}`);
  L.push("", "[vocab]");
  for (const v of l.vocab) { L.push(`vocab: ${clean(v.fr)} | ${clean(v.en)} | ${clean(v.say)}`); L.push(`example: ${clean(v.ex)} | ${clean(v.exEn)}`); }
  L.push("", "[grammar]");
  for (const g of l.grammar) {
    L.push(`grammar: ${clean(g.title)} | ${GRAMMAR_BODY[g.title] || spoken(g.body)}`);
    for (const e of GRAMMAR_EX[g.title] || g.examples.map((x) => [x.fr, x.en])) L.push(`example: ${clean(e[0])} | ${clean(e[1])}`);
  }
  L.push("", "[quiz]");
  for (const q of mcs) {
    const opts = q.options.map(clean); if (opts.some((o) => /^[A-Da-d]$/.test(o))) throw new Error(`${l.id}: a quiz option is a single letter A-D`);
    L.push(`quiz: ${clean(q.q)} | ${opts.join(" | ")} | ${"ABCD"[q.options.indexOf(q.answer)]} | ${clean(q.explain)}`);
  }
  L.push("", "[ending]", "Marinette and Adrien: À bientôt ! | See you soon!", "");
  fs.writeFileSync(path.join(out, file), L.join("\n"), "utf-8"); n++;
}
console.log(`Wrote ${n} video scripts to ${out}/`);
