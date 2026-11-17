// Browser side of the funnel: logs buy_click, and sends the e-mail sign-up forms (then logs email_signup).
// Uses the same anonymous "hit" call as track.js: no cookies, no personal data (the e-mail goes only to the sign-up form provider).
import { trackEvent } from "./track.js";

document.addEventListener("click", (e) => {
  const a = e.target.closest && e.target.closest("[data-buy]");
  if (a) trackEvent("buy_click", a.dataset.course);
});

document.addEventListener("submit", async (e) => {
  const f = e.target.closest && e.target.closest("form[data-signup]");
  if (!f) return;
  e.preventDefault();
  const msg = f.querySelector("[data-msg]"), btn = f.querySelector("button"), action = (f.getAttribute("action") || "").trim();
  if (!action || /^\[.*\]$/.test(action)) { msg.textContent = "E-mail sign-up isn't switched on yet. Please check back soon."; msg.className = "pm-msg no"; return; }
  btn.disabled = true; msg.textContent = "Sending…"; msg.className = "pm-msg";
  try {
    await fetch(action, { method: "POST", mode: "no-cors", body: new FormData(f) });
    trackEvent("email_signup", f.dataset.course);
    msg.className = "pm-msg ok"; msg.textContent = "Thank you! ";
    const dl = document.createElement("a"); dl.href = f.dataset.lead; dl.textContent = `Open your ${f.dataset.leadTitle}`;
    msg.appendChild(dl); f.reset();
  } catch { msg.className = "pm-msg no"; msg.textContent = "Couldn't send that. Check the address and try again."; }
  btn.disabled = false;
});
