// Account page: log in, create an account, reset a password, log out.
import * as A from "./auth.js";

const root = document.getElementById("account-root");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let msg;
const say = (t, ok = false) => { if (msg) { msg.textContent = t; msg.className = "acct-msg " + (ok ? "ok" : "no"); } };
const msgHTML = '<p class="acct-msg" data-msg role="status" aria-live="polite"></p>';
const show = (html) => { root.innerHTML = `<div class="acct-card">${html}</div>`; msg = root.querySelector("[data-msg]"); };

// Runs an async action while the button is disabled; shows any error under the form.
async function run(btn, fn) {
  const label = btn.textContent; btn.disabled = true; btn.textContent = "One moment…"; say("");
  try { await fn(); } catch (e) { say(e.message || "Something went wrong. Please try again."); } finally { btn.disabled = false; btn.textContent = label; }
}

function loggedOut(tab = "login", note = "") {
  const signup = tab === "signup";
  show(`<div class="acct-tabs" role="tablist" aria-label="Log in or create an account">
   <button type="button" role="tab" aria-selected="${!signup}" data-tab="login">Log in</button>
   <button type="button" role="tab" aria-selected="${signup}" data-tab="signup">Create account</button></div>
  <form data-form novalidate>
   <label for="acct-email">Email</label>
   <input id="acct-email" name="email" type="email" autocomplete="email" inputmode="email" required>
   <label for="acct-pw">Password</label>
   <input id="acct-pw" name="password" type="password" autocomplete="${signup ? "new-password" : "current-password"}" minlength="${signup ? 8 : 1}" required>
   ${signup ? '<p class="acct-fine">At least 8 characters.</p>' : ""}
   <button class="btn" type="submit">${signup ? "Create my account" : "Log in"}</button>
   ${msgHTML}
  </form>
  ${signup ? '<p class="acct-fine">Free, and you can log out any time. Your lesson progress is still saved in this browser only; an account does not sync it between devices yet.</p>'
    : '<p class="acct-fine"><button type="button" class="acct-link" data-forgot>Forgot your password?</button></p>'}`);
  if (note) say(note, true);
  root.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => loggedOut(b.dataset.tab)));
  const f = root.querySelector("[data-form]");
  f.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const email = f.email.value.trim(), password = f.password.value;
    if (!EMAIL_OK.test(email)) return say("Please enter a valid email address.");
    if (signup && password.length < 8) return say("Please use at least 8 characters for your password.");
    if (!password) return say("Please enter your password.");
    run(f.querySelector("button[type=submit]"), async () => {
      if (!signup) { await A.signIn(email, password); return loggedIn(await A.getSession()); }
      const r = await A.signUp(email, password);
      if (r.signedIn) return loggedIn(await A.getSession(), "Welcome! Your account is ready.");
      show(`<h2>Check your email</h2><p>We've sent a link to <strong>${esc(email)}</strong>. Tap it to confirm your address and you'll be logged in.</p>
        <p class="acct-fine">Nothing there after a few minutes? Check your spam folder. If you already have an account with this address, just <button type="button" class="acct-link" data-back>log in</button> or reset your password instead.</p>`);
      root.querySelector("[data-back]").addEventListener("click", () => loggedOut("login"));
    });
  });
  const fg = root.querySelector("[data-forgot]");
  if (fg) fg.addEventListener("click", () => forgot(f.email.value.trim()));
}

function forgot(email = "") {
  show(`<h2>Reset your password</h2><p>Enter your email and we'll send you a link to choose a new password.</p>
  <form data-form novalidate><label for="acct-email">Email</label>
   <input id="acct-email" name="email" type="email" autocomplete="email" inputmode="email" value="${esc(email)}" required>
   <button class="btn" type="submit">Send reset link</button>${msgHTML}</form>
  <p class="acct-fine"><button type="button" class="acct-link" data-back>Back to log in</button></p>`);
  root.querySelector("[data-back]").addEventListener("click", () => loggedOut("login"));
  const f = root.querySelector("[data-form]");
  f.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const e = f.email.value.trim();
    if (!EMAIL_OK.test(e)) return say("Please enter a valid email address.");
    run(f.querySelector("button[type=submit]"), async () => {
      await A.resetPassword(e);
      say("If that address has an account, a reset link is on its way. Check your inbox (and spam).", true);
    });
  });
}

function recovery() {
  show(`<h2>Choose a new password</h2>
  <form data-form novalidate><label for="acct-pw">New password</label>
   <input id="acct-pw" name="password" type="password" autocomplete="new-password" minlength="8" required>
   <p class="acct-fine">At least 8 characters.</p>
   <label for="acct-pw2">Type it again</label>
   <input id="acct-pw2" name="again" type="password" autocomplete="new-password" required>
   <button class="btn" type="submit">Save new password</button>${msgHTML}</form>`);
  const f = root.querySelector("[data-form]");
  f.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (f.password.value.length < 8) return say("Please use at least 8 characters.");
    if (f.password.value !== f.again.value) return say("The two passwords don't match.");
    run(f.querySelector("button[type=submit]"), async () => {
      await A.updatePassword(f.password.value);
      loggedIn(await A.getSession(), "Your password has been changed.");
    });
  });
}

function loggedIn(session, note = "") {
  const email = session && session.user ? session.user.email : "";
  show(`<h2>You're logged in</h2><p>Signed in as <strong>${esc(email)}</strong>.</p>
  <p class="acct-fine">Your lesson progress is saved in this browser only. It does not sync between devices yet.</p>
  <button class="btn ghost" type="button" data-out>Log out</button>${msgHTML}`);
  if (note) say(note, true);
  root.querySelector("[data-out]").addEventListener("click", async () => { await A.signOut(); loggedOut("login", "You're logged out."); });
}

(async () => {
  if (!root) return;
  const h = await A.consumeHash();
  if (h && h.error) { loggedOut("login"); return say(h.error); }
  if (h && h.type === "recovery") return recovery();
  const s = await A.getSession();
  if (s) loggedIn(s, h && h.type === "signup" ? "Your email is confirmed. Welcome!" : "");
  else loggedOut(new URLSearchParams(location.search).get("tab") === "signup" ? "signup" : "login");
})();
