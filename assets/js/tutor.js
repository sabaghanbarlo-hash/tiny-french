// Ask the Tutor: premium AI tutor chat, shared design for Tiny French and Tiny Japanese.
// Loaded (dynamically, so a failure can never break the page) from auth.js on every page.
// Access: the same access codes that unlock the course lessons. The server checks the code; nothing here is a secret.
const CFG = {"site": "tiny-french", "prefix": "TF", "name": "Tiny French tutor", "language": "French", "icon": "💬", "accent": "#d6336c", "accentDark": "#b02458", "ink": "#17346f", "bg": "#f9f3fd", "soft": "#ffffff", "line": "#e6e0f7", "font": "'Nunito',ui-rounded,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif", "lockTitle": "Your personal French tutor", "lockText": "Stuck on a lesson or curious about something? Ask the AI tutor anything about French and get a friendly answer in seconds. It's included with every Tiny French course.", "welcome": "Bonjour! 👋 I'm your French tutor. Ask me anything: a word, a lesson, pronunciation, grammar, or how to say something.", "starters": ["How do I say \"nice to meet you\"?", "Tu or vous?", "Why are some letters silent?"]};
const API = "https://pwenjqeclxxpfryxygzb.supabase.co/functions/v1/tutor";
const COURSES_URL = new URL("../../courses/", import.meta.url).href;

const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } };
const deviceId = () => {
  let d = read("tinyp:device", "");
  if (!/^[A-Za-z0-9-]{8,64}$/.test(d)) { d = (crypto.randomUUID ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2) + "xxxxxxxx")).slice(0, 60); write("tinyp:device", d); }
  return d;
};
const CK = "tinyp:codes:" + CFG.site;
const codes = () => { const l = read(CK, []); return Array.isArray(l) ? l : []; };
const saveCode = (c) => write(CK, [c, ...codes().filter((x) => x !== c)].slice(0, 10));
const forget = (c) => write(CK, codes().filter((x) => x !== c));

async function call(body) {
  try {
    const r = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ site: CFG.site, device: deviceId(), ...body }) });
    let j = {}; try { j = await r.json(); } catch { /* no body */ }
    return { status: r.status, ...j };
  } catch { return { status: 0, error: "network" }; }
}

const ERR = {
  invalid_code: "That code doesn't look right. Check it and try again.",
  device_limit: "This code is already in use on the maximum number of devices. Message us and we'll help.",
  too_many_attempts: "Too many tries. Please wait a few minutes and try again.",
  limit_reached: "You've asked a lot of questions! Please come back a little later.",
  ai_unavailable: "The tutor is busy right now. Please try again in a moment.",
  network: "Couldn't reach the tutor. Check your connection and try again.",
};
const explain = (r) => ERR[r.error] || "Something went wrong. Please try again in a moment.";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function md(text) {
  const lines = esc(text).split("\n"); let out = "", list = false;
  for (const raw of lines) {
    const line = raw.trim().replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,!?]|$)/g, "$1<em>$2</em>");
    const li = /^[-*•]\s+(.*)$/.exec(line);
    if (li) { if (!list) { out += "<ul>"; list = true; } out += "<li>" + li[1] + "</li>"; continue; }
    if (list) { out += "</ul>"; list = false; }
    if (line) out += "<p>" + line + "</p>";
  }
  return out + (list ? "</ul>" : "");
}
function pageContext() {
  const el = document.querySelector("main") || document.body;
  return { title: document.title || "", text: ((el && el.innerText) || "").replace(/\s+/g, " ").trim().slice(0, 2500) };
}

const CSS = `
:host{all:initial;--ac:${CFG.accent};--acd:${CFG.accentDark};--ink:${CFG.ink};--bg:${CFG.bg};--soft:${CFG.soft};--line:${CFG.line};font-family:${CFG.font}}
*{box-sizing:border-box}
.fab{position:fixed;right:18px;bottom:18px;z-index:2147483000;display:flex;align-items:center;gap:8px;min-height:52px;padding:0 20px;border:0;border-radius:999px;background:var(--ac);color:#fff;font:700 15px/1 ${CFG.font};cursor:pointer;box-shadow:0 10px 28px rgba(0,0,0,.22);transition:transform .15s,background .15s}
.fab:hover{background:var(--acd);transform:translateY(-2px)}
.fab:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,a:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
.panel{position:fixed;right:18px;bottom:18px;z-index:2147483001;width:min(400px,calc(100vw - 24px));height:min(600px,calc(100dvh - 36px));display:none;flex-direction:column;background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:22px;box-shadow:0 24px 60px rgba(0,0,0,.28);overflow:hidden}
.panel.open{display:flex}
.head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--ac);color:#fff}
.head h2{margin:0;font:800 16px/1.2 ${CFG.font};flex:1}
.head small{display:block;font-weight:600;opacity:.9;font-size:12px}
.x{min-width:40px;min-height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.22);color:#fff;font-size:20px;cursor:pointer}
.view{flex:1;min-height:0;display:flex;flex-direction:column}
.body{flex:1;overflow:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:10px;font-size:15px;line-height:1.5}
.m{max-width:88%;padding:10px 13px;border-radius:16px;overflow-wrap:anywhere}
.m p{margin:0 0 6px}.m p:last-child{margin:0}.m ul{margin:4px 0 4px 18px;padding:0}
.u{align-self:flex-end;background:var(--ac);color:#fff;border-bottom-right-radius:5px}
.a{align-self:flex-start;background:var(--soft);border-bottom-left-radius:5px}
.chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 8px}
.chip{min-height:36px;padding:0 12px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--ink);font:600 13px ${CFG.font};cursor:pointer}
.chip:hover{border-color:var(--ac)}
.form{display:flex;gap:8px;padding:10px 12px 12px;border-top:1px solid var(--line);background:#fff}
textarea,input[type=text]{flex:1;min-width:0;min-height:44px;max-height:110px;padding:10px 12px;border:1px solid var(--line);border-radius:14px;font:15px/1.4 ${CFG.font};color:var(--ink);background:#fff;resize:none}
.send,.btn{min-height:44px;padding:0 16px;border:0;border-radius:14px;background:var(--ac);color:#fff;font:800 14px ${CFG.font};cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
.send:hover,.btn:hover{background:var(--acd)}
.send:disabled{opacity:.5;cursor:wait}
.btn.ghost{background:#fff;color:var(--ac);border:2px solid var(--ac)}
.lock{padding:20px;display:flex;flex-direction:column;gap:12px;overflow:auto;flex:1}
.lock h3{margin:0;font:800 20px/1.25 ${CFG.font}}
.lock p{margin:0;line-height:1.5}
.row{display:flex;gap:8px}
.msg{min-height:1.3em;font-size:14px}.msg.no{color:#b3261e}.msg.ok{color:#1d7a52}
.dots{display:inline-flex;gap:4px}.dots i{width:7px;height:7px;border-radius:50%;background:var(--ink);opacity:.35;animation:b 1s infinite}.dots i:nth-child(2){animation-delay:.15s}.dots i:nth-child(3){animation-delay:.3s}
@keyframes b{0%,80%,100%{transform:none}40%{transform:translateY(-4px);opacity:.8}}
@media (prefers-reduced-motion:reduce){.fab{transition:none}.dots i{animation:none}}
@media (max-width:480px){.panel{right:8px;bottom:8px;width:calc(100vw - 16px);height:calc(100dvh - 16px)}.fab{right:12px;bottom:12px}}
`;

function boot() {
  if (document.getElementById("tiny-tutor")) return;
  const host = document.createElement("div"); host.id = "tiny-tutor";
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = `<style>${CSS}</style>
  <button class="fab" type="button" aria-haspopup="dialog" aria-expanded="false"><span aria-hidden="true">${CFG.icon}</span> Ask the tutor</button>
  <section class="panel" role="dialog" aria-label="${esc(CFG.name)}">
    <div class="head"><h2>${esc(CFG.name)}<small>Ask anything about ${esc(CFG.language)}</small></h2><button class="x" type="button" aria-label="Close tutor">×</button></div>
    <div class="view" data-view></div>
  </section>`;
  document.body.appendChild(host);
  const fab = root.querySelector(".fab"), panel = root.querySelector(".panel"), view = root.querySelector("[data-view]");
  let code = "", history = [], busy = false, checked = false;
  try { history = JSON.parse(sessionStorage.getItem("tinytutor:" + CFG.site) || "[]"); if (!Array.isArray(history)) history = []; } catch { history = []; }
  const persist = () => { try { sessionStorage.setItem("tinytutor:" + CFG.site, JSON.stringify(history.slice(-20))); } catch { /* ignore */ } };

  const open = async () => {
    panel.classList.add("open"); fab.style.display = "none"; fab.setAttribute("aria-expanded", "true");
    if (!checked) { view.innerHTML = `<div class="lock"><p>Checking your access…</p></div>`; await findCode(); checked = true; }
    render();
  };
  const close = () => { panel.classList.remove("open"); fab.style.display = ""; fab.setAttribute("aria-expanded", "false"); fab.focus(); };
  fab.addEventListener("click", open);
  root.querySelector(".x").addEventListener("click", close);
  root.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  async function findCode() {
    for (const c of codes()) {
      const r = await call({ action: "check", code: c });
      if (r.ok) { code = c; return; }
      if (r.error === "invalid_code") forget(c);
      if (r.error === "too_many_attempts" || r.error === "network") break;
    }
  }

  function render() { code ? renderChat() : renderLock(); }

  function renderLock(note) {
    view.innerHTML = `<div class="lock">
      <h3>${esc(CFG.lockTitle)}</h3>
      <p>${esc(CFG.lockText)}</p>
      <a class="btn" href="${esc(COURSES_URL)}">See the courses</a>
      <form data-unlock><label for="tt-code"><strong>Already bought a course?</strong> Enter your access code:</label>
        <div class="row" style="margin-top:6px"><input id="tt-code" name="code" type="text" placeholder="${esc(CFG.prefix)}-XXXX-XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false" required><button class="btn ghost" type="submit">Unlock</button></div>
        <p class="msg ${note ? "no" : ""}" data-msg role="status" aria-live="polite">${esc(note || "")}</p></form>
      <p style="font-size:13px;opacity:.75">Your code is the same one that unlocks your course lessons.</p></div>`;
    const f = view.querySelector("form"), msg = view.querySelector("[data-msg]");
    f.addEventListener("submit", async (e) => {
      e.preventDefault(); const c = f.elements.code.value.trim(); msg.className = "msg"; msg.textContent = "Checking…";
      const r = await call({ action: "check", code: c });
      if (!r.ok) { msg.className = "msg no"; msg.textContent = explain(r); return; }
      saveCode(c); code = c; renderChat();
    });
  }

  function renderChat() {
    view.innerHTML = `<div class="body" data-log aria-live="polite"></div>
      <div class="chips" data-chips></div>
      <form class="form" data-ask><textarea name="q" rows="1" maxlength="800" placeholder="Type your question…" aria-label="Your question"></textarea><button class="send" type="submit">Send</button></form>`;
    const log = view.querySelector("[data-log]"), chips = view.querySelector("[data-chips]"), form = view.querySelector("[data-ask]");
    const add = (role, text) => { const d = document.createElement("div"); d.className = "m " + (role === "user" ? "u" : "a"); d.innerHTML = role === "user" ? `<p>${esc(text)}</p>` : md(text); log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
    add("assistant", CFG.welcome);
    history.forEach((m) => add(m.role, m.content));
    chips.innerHTML = history.length ? "" : CFG.starters.map((s) => `<button class="chip" type="button">${esc(s)}</button>`).join("");
    chips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) ask(b.textContent); });
    const ta = form.elements.q;
    ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
    form.addEventListener("submit", (e) => { e.preventDefault(); const q = ta.value.trim(); if (q) { ta.value = ""; ask(q); } });
    async function ask(q) {
      if (busy) return; busy = true; chips.innerHTML = ""; form.querySelector(".send").disabled = true;
      add("user", q);
      const wait = document.createElement("div"); wait.className = "m a"; wait.innerHTML = `<span class="dots" aria-label="Thinking"><i></i><i></i><i></i></span>`; log.appendChild(wait); log.scrollTop = log.scrollHeight;
      const r = await call({ action: "ask", code, question: q, history: history.slice(-8), page: pageContext() });
      wait.remove(); busy = false; form.querySelector(".send").disabled = false;
      if (r.ok) { history.push({ role: "user", content: q }, { role: "assistant", content: r.reply }); persist(); add("assistant", r.reply); }
      else if (r.error === "invalid_code" || r.error === "device_limit") { forget(code); code = ""; renderLock(explain(r)); }
      else add("assistant", explain(r));
      ta.focus();
    }
  }
}

if (!document.querySelector("[data-account-page]") && !/(^|\/)(admin|dashboard)(\.html|\/|$)/.test(location.pathname)) {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
}
