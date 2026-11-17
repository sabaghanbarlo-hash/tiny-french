// Anonymous page-view counter for the owner's dashboard. No cookies, no IP address and no personal data is stored:
// it sends only the site name, the page path and the name of the website the visitor came from.
const API = "https://pwenjqeclxxpfryxygzb.supabase.co/functions/v1/dashboard";
const SITE = "tiny-french";
try {
  if (!/^(localhost|127\.|\[::1\])/.test(location.hostname) && !/\/(admin|dashboard)(\.html)?\/?$/.test(location.pathname)) {
    let s = 0;
    try { if (!sessionStorage.getItem("tiny:s")) { sessionStorage.setItem("tiny:s", "1"); s = 1; } } catch { /* storage blocked */ }
    fetch(API, { method: "POST", headers: { "content-type": "text/plain" }, keepalive: true,
      body: JSON.stringify({ action: "hit", site: SITE, path: location.pathname, ref: document.referrer, s }) }).catch(() => {});
  }
} catch { /* never break the page */ }

// Logs one funnel event (buy_click, email_signup, paywall_view) with the site name and course id, using the same "hit" call.
// The dashboard function is unchanged, so each event also shows up as a page path /_event/<event>/<course>. No cookies, no personal data.
export function trackEvent(event, course) {
  try {
    if (/^(localhost|127\.|\[::1\])/.test(location.hostname)) return;
    const c = course || "site";
    fetch(API, { method: "POST", headers: { "content-type": "text/plain" }, keepalive: true,
      body: JSON.stringify({ action: "hit", site: SITE, path: `/_event/${event}/${c}`, ref: "", s: 0, event, course: c }) }).catch(() => {});
  } catch { /* never break the page */ }
}
