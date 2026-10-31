// Premium access (shared by Tiny Japanese and Tiny French).
// Lesson content is NOT in this site's files: it is stored on the server and only sent after a valid access code is checked.
// Pure functions (lockPanelHTML) also run in Node at build time; browser-only code is inside functions that need it.

const escH = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function lockPanelHTML({ course, courseTitle, price, payUrl, site, heading = "This is a premium lesson", intro = "" }) {
  const prefix = site === "tiny-french" ? "TF" : "TJ";
  return `<section class="pm-box block" data-pm data-course="${escH(course)}" aria-labelledby="pm-h-${escH(course)}">
 <h2 id="pm-h-${escH(course)}">${escH(heading)}</h2>
 ${intro ? `<p>${escH(intro)}</p>` : ""}
 <p class="pm-price"><strong>${escH(price)}</strong> · one-time payment for <em>${escH(courseTitle)}</em>, no subscription</p>
 <p class="pm-actions"><a class="btn" href="${escH(payUrl)}" target="_blank" rel="noopener">Buy this course (${escH(price)})</a></p>
 <form class="pm-form" data-unlock>
  <label for="pm-code-${escH(course)}">Already have an access code?</label>
  <div class="pm-row"><input id="pm-code-${escH(course)}" name="code" type="text" placeholder="${prefix}-XXXX-XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false" required><button class="btn" type="submit">Unlock</button></div>
  <p class="pm-msg" data-msg role="status" aria-live="polite"></p>
 </form>
 <details class="pm-pay"><summary>I've paid. How do I get my code?</summary>
  <ol><li>Pay with the button above and keep your payment confirmation.</li><li>Send the form below with the email you want the code sent to.</li><li>Your access code arrives by email, usually within 24 hours. Enter it above and everything unlocks.</li></ol>
  <form class="pm-form" data-request>
   <label>Your email <input name="email" type="email" autocomplete="email" required></label>
   <label>Your name <input name="name" type="text" autocomplete="name"></label>
   <label>Payment reference or last digits (so we can find your payment) <input name="reference" type="text"></label>
   <button class="btn ghost" type="submit">Send my payment details</button>
   <p class="pm-msg" data-msg role="status" aria-live="polite"></p>
  </form>
 </details>
 <noscript><p class="muted">Unlocking needs JavaScript turned on.</p></noscript>
</section>`;
}

export function createPremium(cfg) {
  const CK = `tinyp:codes:${cfg.site}`, DK = "tinyp:device";
  const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked: code just isn't remembered */ } };
  const deviceId = () => {
    let d = read(DK, "");
    if (!/^[A-Za-z0-9-]{8,64}$/.test(d)) { d = (crypto.randomUUID ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2) + "xxxxxxxx")).slice(0, 60); write(DK, d); }
    return d;
  };
  const savedCodes = () => { const l = read(CK, []); return Array.isArray(l) ? l : []; };
  const saveCode = (code) => write(CK, [code, ...savedCodes().filter((c) => c !== code)].slice(0, 10));
  const forget = (code) => write(CK, savedCodes().filter((c) => c !== code));

  async function call(body) {
    try {
      const r = await fetch(cfg.api, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ site: cfg.site, device: deviceId(), ...body }) });
      let j = {}; try { j = await r.json(); } catch { /* no body */ }
      return { status: r.status, ...j };
    } catch { return { status: 0, error: "network" }; }
  }
  const lesson = (course, lessonId, code) => call({ action: "lesson", course, lesson: lessonId, code });
  const courseAccess = (course, code) => call({ action: "course", course, code });

  // Tries every code saved in this browser; returns { code, r } for the first that works.
  async function tryStored(fn) {
    for (const code of savedCodes()) {
      const r = await fn(code);
      if (r.ok) return { code, r };
      if (r.error === "invalid_code") forget(code);
      if (r.error === "too_many_attempts" || r.error === "network") break;
    }
    return null;
  }

  const explain = (r, courseTitle = "this course") => ({
    invalid_code: "That code doesn't look right. Check it and try again (letters and numbers only, dashes optional).",
    wrong_course: `That code is for a different course, not ${courseTitle}.`,
    device_limit: "This code is already in use on the maximum number of devices. Message us and we'll help.",
    too_many_attempts: "Too many tries. Please wait a few minutes and try again.",
    network: "Couldn't reach the server. Check your connection and try again.",
    not_found: "This lesson isn't available yet. Please check back soon.",
  }[r.error] || "Something went wrong. Please try again in a moment.");

  // Wires the unlock form and the "I've paid" form inside a lock panel.
  function wireLock(root, { onUnlock, courseTitle } = {}) {
    root.querySelectorAll("[data-pm]").forEach((box) => {
      const course = box.dataset.course;
      const uf = box.querySelector("form[data-unlock]"), rf = box.querySelector("form[data-request]");
      if (uf) uf.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = uf.querySelector("[data-msg]"), btn = uf.querySelector("button");
        const code = uf.elements.code.value.trim();
        msg.textContent = "Checking…"; btn.disabled = true;
        const r = await courseAccess(course, code);
        btn.disabled = false;
        if (!r.ok) { msg.textContent = explain(r, courseTitle); msg.className = "pm-msg no"; return; }
        saveCode(code);
        msg.textContent = "Unlocked! Loading…"; msg.className = "pm-msg ok";
        onUnlock && onUnlock(code, r);
      });
      if (rf) rf.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = rf.querySelector("[data-msg]"), btn = rf.querySelector("button");
        btn.disabled = true; msg.textContent = "Sending…";
        const r = await call({ action: "request", courses: [course], email: rf.elements.email.value, name: rf.elements.name.value, reference: rf.elements.reference.value });
        btn.disabled = false;
        if (r.ok) { msg.textContent = "Thank you! We'll check your payment and email your access code, usually within 24 hours."; msg.className = "pm-msg ok"; rf.reset(); }
        else { msg.textContent = r.error === "too_many_attempts" ? "Too many requests. Please try again later." : "Couldn't send that. Check the email address and try again."; msg.className = "pm-msg no"; }
      });
    });
  }
  return { deviceId, savedCodes, saveCode, forget, call, lesson, courseAccess, tryStored, explain, wireLock };
}
