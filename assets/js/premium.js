// Premium lessons: the lesson content is fetched from the server only after a valid access code is checked.
import { createPremium } from "./premium-core.js";

const cfg = window.TFP;
if (cfg) {
  const pm = createPremium(cfg);
  const slot = document.getElementById("premium-slot");
  if (slot) {
    const art = slot.closest("article.lesson");
    const lessonId = art.dataset.lockedLesson;
    const show = async (code) => {
      const r = await pm.lesson(cfg.course, lessonId, code);
      if (!r.ok) return r;
      slot.innerHTML = r.payload.html;
      art.dataset.lesson = lessonId; delete art.dataset.lockedLesson;
      if (window.TF && window.TF.initLesson) window.TF.initLesson();
      return r;
    };
    pm.wireLock(slot, { onUnlock: async (code) => { const r = await show(code); if (!r.ok) { const m = slot.querySelector("[data-unlock] [data-msg]"); if (m) m.textContent = pm.explain(r); } } });
    await pm.tryStored(show);
  } else {
    const unlocked = () => {
      document.querySelectorAll("[data-pm]").forEach((p) => p.setAttribute("hidden", ""));
      document.querySelectorAll(".pm-lock-tag").forEach((t) => t.remove());
      document.querySelectorAll("[data-pm-unlocked]").forEach((n) => n.removeAttribute("hidden"));
    };
    pm.wireLock(document, { onUnlock: unlocked });
    if (await pm.tryStored((code) => pm.courseAccess(cfg.course, code))) unlocked();
  }
}
