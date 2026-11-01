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
