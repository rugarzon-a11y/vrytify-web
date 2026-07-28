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

  function initNavDropdown() {
    var dropdown = document.querySelector(".nav-dropdown");
    if (!dropdown) return;
    document.addEventListener("click", function (e) {
      if (dropdown.hasAttribute("open") && !dropdown.contains(e.target)) {
        dropdown.removeAttribute("open");
      }
    });
    dropdown.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        dropdown.removeAttribute("open");
      });
    });
  }

  function initVideoCarousel() {
    var track = document.getElementById("vrytify-video-carousel");
    if (!track) return;
    var prevBtn = document.querySelector(".carousel-btn.prev");
    var nextBtn = document.querySelector(".carousel-btn.next");
    var step = 258; // card width + gap
    if (prevBtn) prevBtn.addEventListener("click", function () {
      track.scrollBy({ left: -step, behavior: "smooth" });
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      track.scrollBy({ left: step, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangSwitch();
    initMobileNav();
    initNavDropdown();
    initVideoCarousel();
  });
})();
