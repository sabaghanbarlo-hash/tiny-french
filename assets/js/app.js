// Tiny French front-end: navigation, progress (localStorage), speech, filters, flashcards, quizzes. No dependencies.
(() => {
"use strict";
const TF = window.TF || { base: "" };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const jsonOf = (id) => { const n = document.getElementById(id); try { return n ? JSON.parse(n.textContent) : null; } catch { return null; } };
const short = (s) => s.replace(/\s*\(.*\)\s*$/, "");
const loose = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const exact = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");

// ---------- progress store (browser only). Swap this object for an account-backed one later; the rest of the code only uses load/update. ----------
const KEY = "tinyfrench:v1";
const empty = () => ({ completed: {}, last: null, saved: {}, wrong: {}, best: {} });
const store = {
  load() { try { return Object.assign(empty(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch { return empty(); } },
  save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage unavailable: progress just won't persist */ } },
  update(fn) { const d = this.load(); fn(d); this.save(d); return d; },
  clear() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
};
window.TF.store = store;

// ---------- nav ----------
const burger = $(".burger"), menu = $("#menu");
if (burger && menu) {
  const set = (o) => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
  burger.addEventListener("click", () => set(!menu.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { set(false); burger.focus(); } });
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
}
document.addEventListener("error", (e) => { if (e.target.tagName === "IMG") e.target.classList.add("broken"); }, true);

// ---------- speech (Web Speech API, free, browser-only) ----------
const canSpeak = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
let frVoice = null;
if (canSpeak) { const pick = () => { const v = speechSynthesis.getVoices(); frVoice = v.find((x) => /^fr[-_]FR/i.test(x.lang)) || v.find((x) => /^fr/i.test(x.lang)) || null; }; pick(); speechSynthesis.addEventListener?.("voiceschanged", pick); }
const speak = (t) => { if (!canSpeak) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "fr-FR"; if (frVoice) u.voice = frVoice; u.rate = 0.85; speechSynthesis.speak(u); };
if (canSpeak) $$(".say").forEach((b) => (b.hidden = false));
else if ($("[data-say]")) { const m = $("main"); if (m) m.insertAdjacentHTML("afterbegin", '<p class="wrap small muted">Your browser cannot read French aloud, so the 🔊 buttons are hidden. The “say it” guides still show how to pronounce each word.</p>'); }
document.addEventListener("click", (e) => { const b = e.target.closest(".say[data-say]"); if (b) speak(b.dataset.say); });

// ---------- saved words ----------
function syncSaves() {
  const s = store.load().saved;
  $$(".save[data-save]").forEach((b) => { const on = !!s[b.dataset.save]; b.setAttribute("aria-pressed", on); b.textContent = on ? "★ Saved" : "☆ Save word"; });
}
document.addEventListener("click", (e) => {
  const b = e.target.closest(".save[data-save]"); if (!b) return;
  store.update((d) => { d.saved[b.dataset.save] ? delete d.saved[b.dataset.save] : (d.saved[b.dataset.save] = Date.now()); });
  syncSaves(); document.dispatchEvent(new Event("tf:saved"));
});
syncSaves();

// ---------- flashcards ----------
function flash(root, cards, { empty: emptyMsg = "No cards to show yet." } = {}) {
  let list = cards.slice(), i = 0, flipped = false;
  const render = (focus) => {
    if (!list.length) { root.innerHTML = `<p class="muted">${esc(emptyMsg)}</p>`; return; }
    i = Math.min(i, list.length - 1);
    const c = list[i], saved = !!store.load().saved[c.id];
    root.innerHTML = `<div class="fc-count" aria-live="polite">Card ${i + 1} of ${list.length}</div>
<button type="button" class="fc-card${flipped ? " flipped" : ""}" aria-pressed="${flipped}" aria-label="Flashcard: ${esc(c.fr)}. Press Enter to flip.">${flipped
      ? `<span class="big">${esc(c.en)}</span><span class="v-say">${esc(c.say)}</span><span class="small">${esc(c.ex)} — ${esc(c.exEn)}</span>`
      : `<span class="big" lang="fr">${esc(c.fr)}</span><span class="small muted">Tap to reveal the English meaning</span>`}</button>
<div class="fc-ctl"><button type="button" class="btn ghost small" data-a="prev">← Previous</button><button type="button" class="btn ghost small" data-a="next">Next →</button><button type="button" class="btn ghost small" data-a="shuffle">Shuffle</button>${canSpeak ? `<button type="button" class="icon-btn say" data-say="${esc(c.fr)}" aria-label="Listen to ${esc(c.fr)}">🔊</button>` : ""}<button type="button" class="btn ghost small" data-a="save" aria-pressed="${saved}">${saved ? "★ Saved" : "☆ Save"}</button></div>`;
    if (focus) $(focus, root)?.focus();
  };
  root.onclick = (e) => {
    const card = e.target.closest(".fc-card"), a = e.target.closest("[data-a]")?.dataset.a;
    if (card) { flipped = !flipped; render(".fc-card"); }
    else if (a === "next") { i = (i + 1) % list.length; flipped = false; render('[data-a="next"]'); }
    else if (a === "prev") { i = (i - 1 + list.length) % list.length; flipped = false; render('[data-a="prev"]'); }
    else if (a === "shuffle") { list = shuffle(list); i = 0; flipped = false; render('[data-a="shuffle"]'); }
    else if (a === "save") { const id = list[i].id; store.update((d) => { d.saved[id] ? delete d.saved[id] : (d.saved[id] = Date.now()); }); syncSaves(); render('[data-a="save"]'); }
  };
  root.onkeydown = (e) => { if (!list.length) return; if (e.key === "ArrowRight") { i = (i + 1) % list.length; flipped = false; render(".fc-card"); } else if (e.key === "ArrowLeft") { i = (i - 1 + list.length) % list.length; flipped = false; render(".fc-card"); } };
  render();
  return { set(newCards) { list = newCards.slice(); i = 0; flipped = false; render(); } };
}

// ---------- quiz engine ----------
function runQuiz(root, questions, o = {}) {
  let qs = [], idx = 0, score = 0, missed = [];
  const intro = () => {
    root.onkeydown = null;
    root.innerHTML = `<p>${esc(o.introText || `${questions.length} questions. Take your time — you can retry as often as you like.`)}</p><button type="button" class="btn" data-start>Start quiz</button>`;
    $("[data-start]", root).onclick = () => begin(questions);
  };
  const begin = (list) => { qs = shuffle(list); idx = 0; score = 0; missed = []; show(); };
  const show = () => {
    const q = qs[idx];
    const opts = q.type === "fill" ? null : shuffle(q.options);
    root.innerHTML = `<div class="q-meta"><span>Question ${idx + 1} of ${qs.length}</span><span>Score: ${score}</span></div>
<div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${(idx / qs.length) * 100}%"></div></div>
<p class="q-text" id="qt">${esc(q.q)}</p>
${q.type === "fill"
      ? `<div class="fill"><label class="sr" for="qa">Your answer</label><input id="qa" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" aria-describedby="qt"><button type="button" class="btn" data-check>Check</button></div>${q.hint ? `<p class="small muted">Hint: ${esc(q.hint)}</p>` : ""}`
      : `<div class="opts" role="group" aria-labelledby="qt">${opts.map((t, n) => `<button type="button" class="opt" data-o="${n}">${n + 1}. ${esc(t)}</button>`).join("")}</div>`}
<div class="feedback" role="status" aria-live="polite" hidden></div><div class="q-actions"></div>`;
    const fb = $(".feedback", root), act = $(".q-actions", root);
    let done = false;
    const finish = (ok, note) => {
      if (done) return; done = true;
      if (ok) score++; else missed.push(q);
      store.update((d) => { ok ? delete d.wrong[q.id] : (d.wrong[q.id] = Date.now()); });
      fb.hidden = false; fb.className = "feedback " + (ok ? "good" : "bad");
      fb.innerHTML = `${ok ? "✓ Correct!" : "✗ Not quite."}${!ok ? ` The answer is <b>${esc(q.answer)}</b>.` : ""}${note ? ` ${esc(note)}` : ""}${q.explain ? `<p>${esc(q.explain)}</p>` : ""}`;
      const last = idx === qs.length - 1;
      act.innerHTML = `<button type="button" class="btn" data-next>${last ? "See my score" : "Next question"}</button>`;
      $("[data-next]", act).onclick = () => (last ? end() : (idx++, show()));
      $("[data-next]", act).focus();
    };
    if (q.type === "fill") {
      const input = $("#qa", root), check = () => {
        const v = input.value.trim(); if (!v) { input.focus(); return; }
        const okLoose = loose(v) === loose(q.answer), okExact = exact(v) === exact(q.answer);
        input.disabled = true; $("[data-check]", root).disabled = true;
        finish(okLoose, okLoose && !okExact ? `Watch the accents and punctuation: it is written “${q.answer}”.` : "");
      };
      $("[data-check]", root).onclick = check;
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      input.focus();
    } else {
      $$(".opt", root).forEach((b) => (b.onclick = () => {
        if (done) return;
        const chosen = b.textContent.replace(/^\d+\.\s/, "");
        $$(".opt", root).forEach((x) => { x.disabled = true; if (x.textContent.replace(/^\d+\.\s/, "") === q.answer) x.classList.add("right"); });
        if (chosen !== q.answer) b.classList.add("wrong");
        finish(chosen === q.answer);
      }));
      root.onkeydown = (e) => { if (/^[1-9]$/.test(e.key) && !done && !e.target.matches("input")) $$(".opt", root)[+e.key - 1]?.click(); };
    }
  };
  const end = () => {
    root.onkeydown = null;
    const pct = Math.round((score / qs.length) * 100);
    if (o.id) store.update((d) => { const b = d.best[o.id]; if (!b || score / qs.length >= b.score / b.total) d.best[o.id] = { score, total: qs.length }; });
    root.innerHTML = `<p class="score" aria-live="polite">${score} / ${qs.length}</p><p class="center"><b>${pct >= 80 ? "Excellent work! 🎉" : pct >= 50 ? "Good effort! Keep going 💪" : "Every mistake is practice. Try again! 🌱"}</b></p>
${o.endNote ? `<p class="center">${o.endNote}</p>` : ""}<div class="q-actions" style="justify-content:center"><button type="button" class="btn" data-retry>Try again</button>${missed.length ? `<button type="button" class="btn ghost" data-miss>Retry ${missed.length} missed</button>` : ""}${o.extra || ""}</div>
<p class="small muted center">Missed questions are saved on your <a href="${TF.base}/revise/">revision page</a> (this browser only).</p>`;
    $("[data-retry]", root).onclick = () => begin(questions); $("[data-retry]", root).focus();
    $("[data-miss]", root)?.addEventListener("click", () => begin(missed));
    o.onEnd?.({ score, total: qs.length });
  };
  intro();
}

// ---------- vocabulary quiz builder ----------
function vocabPool(vocab) {
  const count = {}; vocab.forEach((v) => { const k = short(v.en); count[k] = (count[k] || 0) + 1; });
  return (v, dir) => {
    if (dir === "ef" && count[short(v.en)] > 1) dir = "fe";
    const others = shuffle(vocab.filter((x) => x.id !== v.id && short(x.en) !== short(v.en) && x.fr !== v.fr)).slice(0, 3);
    return dir === "fe"
      ? { id: `v:${v.id}:fe`, type: "mc", q: `What does “${v.fr}” mean?`, options: [short(v.en), ...others.map((x) => short(x.en))], answer: short(v.en), explain: `${v.fr} = ${v.en}. Example: ${v.ex} (${v.exEn})` }
      : { id: `v:${v.id}:ef`, type: "mc", q: `How do you say “${short(v.en)}” in French?`, options: [v.fr, ...others.map((x) => x.fr)], answer: v.fr, explain: `${v.en} = ${v.fr}. Example: ${v.ex} (${v.exEn})` };
  };
}

// ---------- every page ----------
const d0 = store.load();
const lessonCount = $$("#lesson-grid .lesson-card").length;
$$("[data-continue]").forEach((box) => {
  const last = d0.last; if (!last) return;
  box.hidden = false;
  box.innerHTML = `<span><b>Welcome back!</b> Continue with <b>${esc(last.title)}</b></span><a class="btn small" href="${TF.base}${last.url}">Continue lesson</a>`;
});
$$(".lesson-card[data-id]").forEach((c) => { if (d0.completed[c.dataset.id]) $("[data-done]", c).hidden = false; });
const sum = $("[data-summary]");
if (sum && lessonCount) {
  const n = Object.keys(d0.completed).filter((id) => $(`#lesson-grid [data-id="${id}"]`)).length;
  sum.hidden = false;
  sum.innerHTML = `You have completed ${n} of ${lessonCount} lessons<div class="bar-track"><div class="bar-fill" style="width:${(n / lessonCount) * 100}%"></div></div>`;
}

// ---------- lesson library filters ----------
const grid = $("#lesson-grid");
if (grid) {
  const f = { q: $("#f-q"), level: $("#f-level"), topic: $("#f-topic"), type: $("#f-type") };
  const cards = $$(".lesson-card", grid), empty = $("#f-empty"), count = $("#f-count"), newest = $("#newest");
  const params = new URLSearchParams(location.search);
  Object.keys(f).forEach((k) => { if (params.get(k)) f[k].value = params.get(k); });
  const apply = () => {
    const terms = loose(f.q.value).split(" ").filter(Boolean);
    let shown = 0;
    cards.forEach((c) => {
      const ok = terms.every((t) => c.dataset.search.includes(t)) && (!f.level.value || c.dataset.level === f.level.value) && (!f.topic.value || c.dataset.topics.split("|").includes(f.topic.value)) && (!f.type.value || c.dataset.type === f.type.value);
      c.hidden = !ok; if (ok) shown++;
    });
    const active = !!(terms.length || f.level.value || f.topic.value || f.type.value);
    if (newest) newest.hidden = active;
    empty.hidden = shown !== 0;
    count.textContent = active ? `Showing ${shown} of ${cards.length} lessons` : "";
    const p = new URLSearchParams(); Object.entries(f).forEach(([k, el]) => el.value && p.set(k, el.value));
    history.replaceState(null, "", p.toString() ? `?${p}` : location.pathname);
  };
  Object.values(f).forEach((el) => el.addEventListener("input", apply));
  const reset = () => { Object.values(f).forEach((el) => (el.value = "")); apply(); f.q.focus(); };
  $("#f-reset").onclick = reset; $("#f-reset2").onclick = reset;
  apply();
}

// ---------- lesson page ----------
const lessonEl = $("article.lesson[data-lesson]");
if (lessonEl) {
  const id = lessonEl.dataset.lesson, title = $("h1", lessonEl).textContent;
  store.update((d) => { d.last = { id, title, url: location.pathname.slice(TF.base.length), at: Date.now() }; });
  const btn = $("[data-complete]"), msg = $("[data-complete-msg]");
  const paint = () => {
    const on = !!store.load().completed[id];
    btn.setAttribute("aria-pressed", on);
    btn.textContent = on ? "✓ Lesson completed (tap to undo)" : "Mark lesson as complete";
    $$("[data-done]", lessonEl).forEach((c) => (c.hidden = !on));
  };
  btn.onclick = () => { const on = !store.load().completed[id]; store.update((d) => { on ? (d.completed[id] = Date.now()) : delete d.completed[id]; }); paint(); msg.textContent = on ? "Great job! Progress saved in this browser." : "Marked as not completed."; };
  paint();
  const qd = jsonOf("quiz-data"), vd = jsonOf("vocab-data") || [];
  const box = $("[data-quiz=lesson]");
  if (qd && box) runQuiz(box, qd.questions, { id: qd.id, endNote: 'Done? <a href="#c-h">Mark the lesson as complete ↓</a>' });
  const fcRoot = $("[data-flash=lesson]"), det = $(".fc-wrap");
  if (fcRoot && det) { let inst; det.addEventListener("toggle", () => { if (det.open && !inst) inst = flash(fcRoot, vd); }); }
}

// ---------- share ----------
const shareBox = $(".share");
if (shareBox) {
  const url = ($("link[rel=canonical]")?.href || location.href).split("#")[0], t = shareBox.dataset.title + " — Learn French with Tiny French";
  const links = { whatsapp: `https://wa.me/?text=${encodeURIComponent(t + " " + url)}`, x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(url)}`, facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` };
  $$("[data-share]", shareBox).forEach((a) => (a.href = links[a.dataset.share]));
  const nat = $("[data-share-native]", shareBox);
  if (navigator.share) { nat.hidden = false; nat.onclick = () => navigator.share({ title: t, url }).catch(() => {}); }
  $("[data-copy]", shareBox).onclick = async (e) => {
    const m = $("[data-copy-msg]", shareBox);
    try { await navigator.clipboard.writeText(url); e.target.textContent = "Link copied!"; m.textContent = "Link copied"; }
    catch { window.prompt("Copy this link:", url); }
  };
}

// ---------- vocabulary page ----------
const vlist = $("#v-list");
if (vlist) {
  const vocab = jsonOf("vocab-data") || [], items = $$(".vcard", vlist);
  const q = $("#v-q"), cat = $("#v-cat"), sv = $("#v-saved"), count = $("#v-count"), empty = $("#v-empty"), panel = $("#v-fc");
  let inst = null;
  const visibleIds = () => items.filter((c) => !c.hidden).map((c) => c.dataset.vid);
  const apply = () => {
    const terms = loose(q.value).split(" ").filter(Boolean), saved = store.load().saved;
    items.forEach((c) => { c.hidden = !(terms.every((t) => c.dataset.search.includes(t)) && (!cat.value || c.dataset.cat === cat.value) && (!sv.checked || saved[c.dataset.vid])); });
    const n = visibleIds().length;
    count.textContent = `Showing ${n} of ${items.length} words`; empty.hidden = n !== 0;
    if (inst) inst.set(vocab.filter((v) => visibleIds().includes(v.id)));
  };
  [q, cat, sv].forEach((e) => e.addEventListener("input", apply));
  $("#v-reset").onclick = () => { q.value = ""; cat.value = ""; sv.checked = false; apply(); q.focus(); };
  $("#v-practice").onclick = () => { panel.hidden = false; const cards = vocab.filter((v) => visibleIds().includes(v.id)); inst = inst || flash($("[data-flash=page]"), cards, { empty: "No words match your filters." }); inst.set(cards); $(".fc-card", panel)?.focus(); };
  document.addEventListener("tf:saved", () => sv.checked && apply());
  apply();
}

// ---------- quizzes page ----------
$$(".qcard[data-qid]").forEach((c) => { const b = d0.best[c.dataset.qid]; if (b) $("[data-best]", c).textContent = `Your best: ${b.score} / ${b.total}`; });
const mixer = $("[data-quiz=mixer]");
if (mixer) {
  const vocab = jsonOf("vocab-data") || [], build = vocabPool(vocab);
  const qs = () => shuffle(vocab).slice(0, 10).map((v) => build(v, Math.random() < 0.5 ? "fe" : "ef"));
  const go = () => runQuiz(mixer, qs(), { id: "mixer", introText: "10 random questions about the words in the vocabulary library.", extra: '<button type="button" class="btn ghost" data-newmix>New questions</button>', onEnd: () => $("[data-newmix]", mixer)?.addEventListener("click", go) });
  go();
}

// ---------- revise page ----------
const rev = $("[data-quiz=revise]");
if (rev) {
  const vocab = jsonOf("vocab-data") || [], qd = jsonOf("questions-data") || [], build = vocabPool(vocab);
  const savedHTML = (saved) => saved.map((v) => `<li class="vcard"><span class="v-fr" lang="fr">${esc(v.fr)}</span><span class="v-say">${esc(v.say)}</span><span class="v-en">${esc(v.en)}</span><p class="v-ex"><span lang="fr">${esc(v.ex)}</span> — ${esc(v.exEn)}</p><button type="button" class="btn ghost small save" data-save="${esc(v.id)}" aria-pressed="true">★ Saved</button></li>`).join("");
  const paint = () => {
    const d = store.load(), wrongIds = Object.keys(d.wrong);
    const list = wrongIds.map((id) => { if (id.startsWith("v:")) { const [, vid, dir] = id.split(":"); const v = vocab.find((x) => x.id === vid); return v ? build(v, dir) : null; } return qd.find((q) => q.id === id) || null; }).filter(Boolean);
    $("[data-wrong-count]").textContent = list.length ? `${list.length} question${list.length === 1 ? "" : "s"} to retry.` : "Nothing to retry right now. Take a lesson quiz and the questions you miss will appear here.";
    rev.innerHTML = "";
    if (list.length) runQuiz(rev, list, { introText: `Retry the ${list.length} question(s) you missed. Answer one correctly and it leaves this list.` });
    const saved = vocab.filter((v) => d.saved[v.id]);
    $("[data-saved-count]").textContent = saved.length ? `${saved.length} saved word${saved.length === 1 ? "" : "s"}.` : "No saved words yet. Tap “Save word” on any vocabulary card.";
    $("#saved-list").innerHTML = savedHTML(saved);
    const fcRoot = $("[data-flash=saved]"); fcRoot.hidden = !saved.length; if (saved.length) flash(fcRoot, saved);
  };
  paint();
  document.addEventListener("tf:saved", () => { const saved = vocab.filter((v) => store.load().saved[v.id]); $("#saved-list").innerHTML = savedHTML(saved); $("[data-saved-count]").textContent = `${saved.length} saved word${saved.length === 1 ? "" : "s"}.`; });
  $("#reset-progress").onclick = () => { if (confirm("Erase all progress, saved words and missed questions on this browser?")) { store.clear(); location.reload(); } };
}
})();
