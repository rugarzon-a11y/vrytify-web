(function () {
  "use strict";

  var LANGS = ["fr", "es", "en"];
  var STORAGE_KEY = "veronexo-lang";

  function getSavedLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return null;
  }

  function detectLang() {
    var saved = getSavedLang();
    if (saved) return saved;
    var nav = (navigator.language || "fr").slice(0, 2).toLowerCase();
    if (LANGS.indexOf(nav) !== -1) return nav;
    return "fr";
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-lang-content]").forEach(function (el) {
      var isMatch = el.getAttribute("data-lang-content") === lang;
      el.classList.toggle("is-visible", isMatch);
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function initLangSwitch() {
    var lang = detectLang();
    applyLang(lang);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangSwitch();
    initMobileNav();
  });
})();
