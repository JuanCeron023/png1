document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var html = document.querySelector('html'),
    menuOpenIcon = document.querySelector(".icon__menu"),
    menuCloseIcon = document.querySelector(".nav__icon-close"),
    menuList = document.querySelector(".main-nav"),
    searchOpenIcon = document.querySelector(".icon__search"),
    searchCloseIcon = document.querySelector(".search__close"),
    searchInput = document.querySelector(".search__text"),
    search = document.querySelector(".search"),
    searchBox = document.querySelector(".search__box"),
    toggleTheme = document.querySelector(".toggle-theme"),
    btnScrollToTop = document.querySelector(".top");


  /* =======================================================
  // Menu + Search + Theme Switcher
  ======================================================= */
  menuOpenIcon.addEventListener("click", () => {
    menuOpen();
  });

  menuCloseIcon.addEventListener("click", () => {
    menuClose();
  });

  function menuOpen() {
    menuList.classList.add("is-open");
  }
  
  function menuClose() {
    menuList.classList.remove("is-open");
  }

  searchOpenIcon.addEventListener("click", () => {
    searchOpen();
  });

  searchCloseIcon.addEventListener("click", () => {
    searchClose();
  });

  function searchOpen() {
    search.classList.add("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 250);
  }

  function searchClose() {
    search.classList.remove("is-visible");
  }

  searchBox.addEventListener("keydown", function(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      search.classList.remove('is-visible');
    }
  });

  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      darkMode();
    });
  };


  // Theme Switcher
  function darkMode() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("dark");
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  }


  // =====================
  // Simple Jekyll Search
  // =====================
  SimpleJekyllSearch({
    searchInput: document.getElementById("js-search-input"),
    resultsContainer: document.getElementById("js-results-container"),
    json: "/search.json",
    searchResultTemplate: '{article}',
    noResultsText: '<h3 class="no-results">No results found</h3>'
  });


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img, .gallery__image img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .gallery__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .gallery__image img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }



  /* =================================
  // Smooth scroll for in-page anchor links
  ================================= */
  document.querySelectorAll(".tag__link, .top__link").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });


  /* =======================
  // Table of Contents
  ======================= */
  var tocContainer = document.getElementById("table-of-contents");
  if (tocContainer) {
    var tocList = tocContainer.querySelector(".toc__list");
    var headings = document.querySelectorAll(".post__content h2, .post__content h3");

    if (headings.length > 0 && tocList) {
      var currentH2Item = null;

      headings.forEach(function(heading) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + heading.id;
        a.textContent = heading.textContent;
        a.className = "toc__link";
        a.addEventListener("click", function(e) {
          e.preventDefault();
          heading.scrollIntoView({ behavior: "smooth" });
        });
        li.appendChild(a);

        if (heading.tagName === "H2") {
          tocList.appendChild(li);
          currentH2Item = li;
        } else if (heading.tagName === "H3" && currentH2Item) {
          var subList = currentH2Item.querySelector("ol");
          if (!subList) {
            subList = document.createElement("ol");
            currentH2Item.appendChild(subList);
          }
          subList.appendChild(li);
        } else {
          tocList.appendChild(li);
        }
      });

      // Highlight active section
      var tocLinks = tocContainer.querySelectorAll(".toc__link");
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function(link) { link.classList.remove("is-active"); });
            var activeLink = tocContainer.querySelector('a[href="#' + entry.target.id + '"]');
            if (activeLink) activeLink.classList.add("is-active");
          }
        });
      }, { rootMargin: "0px 0px -70% 0px" });

      headings.forEach(function(heading) {
        observer.observe(heading);
      });
    }
  }


  /* =======================
  // Wrap tables for horizontal scroll on mobile
  ======================= */
  var contentTables = document.querySelectorAll(".post__content table");
  contentTables.forEach(function(table) {
    if (table.parentElement && table.parentElement.classList.contains("table-container")) return;
    var wrapper = document.createElement("div");
    wrapper.className = "table-container";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

});