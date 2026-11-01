// Tiny accounts (shared by Tiny Japanese and Tiny French): sign up and log in with email + password.
// Powered by Supabase Auth. The key below is a *publishable* key: it is meant to be public and is safe in front-end code.
// Lesson progress is still saved in each visitor's own browser; an account does not sync it (yet).
import "./track.js";
const SB = "https://pwenjqeclxxpfryxygzb.supabase.co";
const KEY = "sb_publishable_zqkjcNltzjgrACSiARNPIw_0HXOg-hK";
const SK = "tiny:auth";
export const ACCOUNT_URL = new URL("../../account/", import.meta.url).href;

export class AuthError extends Error { constructor(code, message) { super(message); this.code = code; } }

const MSG = {
  invalid_credentials: "That email and password don't match. Please try again.",
  email_not_confirmed: "Please confirm your email first. We sent you a link when you signed up.",
  weak_password: "Please choose a stronger password (at least 8 characters).",
  over_email_send_rate_limit: "We've sent a few emails already. Please wait a little and try again.",
  over_request_rate_limit: "Too many tries. Please wait a minute and try again.",
  signup_disabled: "New sign-ups are paused right now. Please try again later.",
  same_password: "Your new password must be different from your old one.",
  validation_failed: "Please check your email address and try again.",
  email_address_invalid: "Please enter a valid email address.",
  user_banned: "This account can't be used right now."
};

const read = () => { try { const s = JSON.parse(localStorage.getItem(SK)); return s && s.access_token ? s : null; } catch { return null; } };
const write = (s) => { try { s ? localStorage.setItem(SK, JSON.stringify(s)) : localStorage.removeItem(SK); } catch { /* storage blocked: you just stay logged out */ } };
const emit = () => { try { window.dispatchEvent(new Event("tiny-auth")); } catch { /* ignore */ } };
const now = () => Math.floor(Date.now() / 1000);

async function api(path, { method = "POST", body, token } = {}) {
  let res;
  try {
    res = await fetch(SB + "/auth/v1" + path, {
      method,
      headers: { apikey: KEY, "content-type": "application/json", ...(token ? { authorization: "Bearer " + token } : {}) },
      body: body ? JSON.stringify(body) : undefined
    });
  } catch { throw new AuthError("network", "Couldn't reach the server. Please check your connection and try again."); }
  let data = null; try { data = await res.json(); } catch { /* empty body */ }
  if (!res.ok) {
    const code = String((data && (data.error_code || data.error)) || "error");
    throw new AuthError(code, MSG[code] || (data && (data.msg || data.error_description || data.message)) || "Something went wrong. Please try again.");
  }
  return data;
}

const toSession = (d, prev) => ({
  access_token: d.access_token,
  refresh_token: d.refresh_token,
  expires_at: d.expires_at || now() + (d.expires_in || 3600),
  user: d.user ? { id: d.user.id, email: d.user.email } : prev && prev.user
});
const redirect = (to) => (to ? "?redirect_to=" + encodeURIComponent(to) : "");

/** Create an account. Returns { signedIn } (false means a confirmation email was sent). */
export async function signUp(email, password, redirectTo = ACCOUNT_URL) {
  const d = await api("/signup" + redirect(redirectTo), { body: { email, password, data: { site: "tiny-french" } } });
  if (d && d.access_token) { write(toSession(d)); emit(); return { signedIn: true }; }
  return { signedIn: false };
}

export async function signIn(email, password) {
  const d = await api("/token?grant_type=password", { body: { email, password } });
  write(toSession(d)); emit();
  return read();
}

export async function signOut() {
  const s = read(); write(null); emit();
  if (s) { try { await api("/logout?scope=local", { token: s.access_token }); } catch { /* already logged out locally */ } }
}

export const resetPassword = (email, redirectTo = ACCOUNT_URL) => api("/recover" + redirect(redirectTo), { body: { email } });

export async function updatePassword(password) {
  const s = await getSession();
  if (!s) throw new AuthError("no_session", "Your link has expired. Please request a new one.");
  await api("/user", { method: "PUT", token: s.access_token, body: { password } });
}

/** The current session (refreshed when it is about to expire), or null. */
export async function getSession() {
  let s = read();
  if (!s) return null;
  if (s.expires_at - 60 > now()) return s;
  try {
    const d = await api("/token?grant_type=refresh_token", { body: { refresh_token: s.refresh_token } });
    s = toSession(d, s); write(s); return s;
  } catch (e) {
    if (e.code === "network") return s;
    write(null); emit(); return null;
  }
}

export const currentUser = () => (read() || {}).user || null;

/** Reads the #access_token=... that Supabase puts in the address after an email link (confirm / reset password). */
export async function consumeHash() {
  const h = new URLSearchParams(location.hash.replace(/^#/, ""));
  const clean = () => history.replaceState(null, "", location.pathname + location.search);
  if (h.get("error_description")) { const error = h.get("error_description"); clean(); return { error: /expired|invalid/i.test(error) ? "That link has expired or was already used. Please request a new one." : error }; }
  if (!h.get("access_token")) return null;
  const s = { access_token: h.get("access_token"), refresh_token: h.get("refresh_token"), expires_at: Number(h.get("expires_at")) || now() + Number(h.get("expires_in") || 3600) };
  clean();
  try { const u = await api("/user", { method: "GET", token: s.access_token }); s.user = { id: u.id, email: u.email }; }
  catch (e) { return { error: e.message }; }
  write(s); emit();
  return { type: h.get("type") || "" };
}

// ---- every page: "Log in" / "My account" link in the menu ----
function mountNav() {
  const menu = document.querySelector("#menu .nav-main") || document.querySelector("#menu");
  if (!menu || menu.querySelector("[data-auth-link]")) return;
  const a = document.createElement("a");
  a.className = "auth-link"; a.setAttribute("data-auth-link", ""); a.href = ACCOUNT_URL;
  const set = () => { a.textContent = read() ? "My account" : "Log in"; };
  set(); window.addEventListener("tiny-auth", set); window.addEventListener("storage", set);
  menu.insertBefore(a, menu.querySelector(".nav-cta"));
}

// If an email link lands on another page of the site (for example the home page), carry it over to the account page.
if (!document.querySelector("[data-account-page]") && /(^|[#&])(access_token|error_description)=/.test(location.hash)) {
  location.replace(ACCOUNT_URL + location.hash);
} else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountNav);
else mountNav();
