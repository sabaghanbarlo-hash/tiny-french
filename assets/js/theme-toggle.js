/* Light / dark mode switch. A tiny inline script in <head> applies the saved choice (or the visitor's system setting) before the page paints; this file adds the buttons. */
(function () {
  var KEY = "tiny-theme", root = document.documentElement, buttons = [];
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  function saved() { try { var t = localStorage.getItem(KEY); return t === "dark" || t === "light" ? t : null; } catch (e) { return null; } }
  function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function paint() {
    var dark = current() === "dark";
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", dark ? "true" : "false");
      b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      b.title = dark ? "Light mode" : "Dark mode";
      b.innerHTML = dark ? SUN : MOON;
    });
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { if (!m.hasAttribute("data-light")) m.setAttribute("data-light", m.getAttribute("content")); m.setAttribute("content", dark ? "#1a1719" : m.getAttribute("data-light")); }
  }
  function set(t, remember) {
    root.setAttribute("data-theme", t);
    if (remember) { try { localStorage.setItem(KEY, t); } catch (e) { /* storage unavailable: the choice lasts for this page only */ } }
    paint();
  }
  function make(cls) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "theme-toggle " + cls;
    b.addEventListener("click", function () { set(current() === "dark" ? "light" : "dark", true); });
    buttons.push(b); return b;
  }
  function mount() {
    var burger = document.querySelector(".burger"), right = document.querySelector(".nav-right"), nav = document.querySelector("header.nav nav");
    var home = document.body.classList.contains("home");
    if (!home && (right || nav)) {
      var host = right || nav;
      host.insertBefore(make("in-nav"), right ? host.firstChild : null);
      if (burger && burger.parentNode) burger.parentNode.insertBefore(make("in-bar"), burger);
    } else document.body.appendChild(make("float"));
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)"), follow = function () { if (!saved()) set(mq.matches ? "dark" : "light", false); };
    if (mq.addEventListener) mq.addEventListener("change", follow); else if (mq.addListener) mq.addListener(follow);
  }
})();
