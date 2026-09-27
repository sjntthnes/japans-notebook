// Japan's Notebook — main.js
(function () {
  "use strict";

  /* ---------------- Video data (24 piezas ya producidas) ---------------- */
  var VIDEOS = [
    { slug: "01-religiones-en-japon", kanji: "神道・仏教", title: "Religiones en Japón", hook: "Japón tiene más templos que semáforos, y casi nadie ahí se dice religioso." },
    { slug: "02-kintsugi", kanji: "金継ぎ", title: "Kintsugi", hook: "Hay una técnica japonesa que repara la cerámica rota con oro, a propósito." },
    { slug: "03-el-arte-del-kaizen", kanji: "改善", title: "El arte del Kaizen", hook: "En Japón no te piden que cambies de vida. Te piden que cambies un 1%." },
    { slug: "04-el-genkan", kanji: "玄関", title: "El Genkan", hook: "Antes de entrar a una casa japonesa, hay un escalón que te obliga a hacer algo." },
    { slug: "05-el-secreto-del-1porciento", kanji: "改善", title: "El secreto del 1%", hook: "Nadie que domina algo empezó dominándolo." },
    { slug: "06-fallos-cero", kanji: "ポカヨケ", title: "Fallos Cero", hook: "En una fábrica japonesa no se corrige el error después. Se rediseña el proceso." },
    { slug: "07-omotenashi", kanji: "おもてなし", title: "Omotenashi", hook: "En Japón te atienden como si ya supieran lo que necesitas, antes de pedirlo." },
    { slug: "08-no-propinas-en-japon", kanji: "おもてなし", title: "No Propinas en Japón", hook: "Si dejas propina en un restaurante en Japón, el mesero puede salir corriendo tras de ti." },
    { slug: "09-oubaitori", kanji: "桜梅桃李", title: "Oubaitori", hook: "Un ciruelo, un cerezo, un durazno y un albaricoque florecen en primavera, pero nunca igual." },
    { slug: "10-poka-yoke", kanji: "ポカヨケ", title: "Poka Yoke", hook: "¿Y si el error no fuera tuyo, sino del diseño que te dejó cometerlo?" },
    { slug: "11-como-funciona-el-metodo-kaizen", kanji: "改善", title: "Cómo funciona el método Kaizen", hook: "Todo el mundo conoce la palabra kaizen. Casi nadie conoce el mecanismo." },
    { slug: "12-shikata-ga-nai", kanji: "仕方がない", title: "Shikata ga nai", hook: "Hay una frase japonesa para lo que no se puede cambiar." },
    { slug: "13-influencia-cultural-japonesa", kanji: "文化", title: "Influencia Cultural Japonesa", hook: "Japón lleva décadas exportando algo que casi nadie identifica como suyo." },
    { slug: "14-betsu-betsu", kanji: "別々", title: "Betsu-betsu", hook: "En Japón, cuando la cuenta llega a la mesa, nadie hace el cálculo incómodo de quién debe qué a quién." },
    { slug: "15-namazu", kanji: "鯰", title: "Namazu", hook: "Antes de que existiera la sismología, Japón ya tenía una explicación para los terremotos: un bagre gigante durmiendo bajo tierra." },
    { slug: "16-etiqueta-en-la-mesa", kanji: "作法", title: "Etiqueta en la Mesa", hook: "En una mesa japonesa, hay reglas que nadie te explica pero que todos rompen sin saberlo la primera vez." },
    { slug: "17-saludo-japones", kanji: "お辞儀", title: "Saludo Japonés", hook: "En Japón casi nadie te va a tender la mano al conocerte." },
    { slug: "18-las-geishas-y-geiko", kanji: "芸者", title: "Las Geishas y Geiko", hook: "La palabra \"geisha\" en Occidente se volvió sinónimo de algo que nunca fue." },
    { slug: "19-no-sostener-la-puerta", kanji: "自立", title: "No Sostener la Puerta", hook: "En Japón es común que la persona de adelante deje que la puerta se cierre justo antes de que llegues tú." },
    { slug: "20-irasshaimase", kanji: "いらっしゃいませ", title: "Irasshaimase", hook: "Entras a una tienda en Japón y, sin excepción, alguien grita una palabra que no significa \"hola\"." },
    { slug: "21-karoshi", kanji: "過労死", title: "Karōshi", hook: "En Japón existe una palabra oficial para una causa de muerte: trabajar hasta que el cuerpo no aguanta más." },
    { slug: "22-sin-precios", kanji: "お任せ", title: "Sin Precios", hook: "Te sientas en una barra de omakase y notas algo raro: el menú no tiene precios." },
    { slug: "23-hikikomori", kanji: "引き籠もり", title: "Hikikomori", hook: "En Japón hay cientos de miles de personas que llevan meses, o años, sin salir de su cuarto." },
    { slug: "24-aimai", kanji: "曖昧", title: "Aimai", hook: "En Japón, un \"tal vez\" casi nunca significa \"tal vez\"." }
  ];

  function renderVideoGrid() {
    var grid = document.getElementById("videoGrid");
    if (!grid) return;
    var html = VIDEOS.map(function (v, i) {
      return (
        '<article class="video-card reveal" style="transition-delay:' + (i % 4) * 60 + 'ms">' +
          '<img src="assets/img/portadas/' + v.slug + '.jpg" alt="Portada del video: ' + v.title + '" loading="lazy" width="480" height="860">' +
          '<div class="vc-overlay">' +
            '<span class="vc-kanji" lang="ja">' + v.kanji + '</span>' +
            '<p class="vc-title">' + v.title + '</p>' +
            '<p class="vc-hook">' + v.hook + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    grid.innerHTML = html;
    observeReveals();
  }

  /* ---------------- Header scroll state ---------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
  var revealObserver = null;
  function observeReveals() {
    var targets = document.querySelectorAll(".reveal:not(.in-view)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    targets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initNavToggle();
    renderVideoGrid();
    observeReveals();
  });
})();
