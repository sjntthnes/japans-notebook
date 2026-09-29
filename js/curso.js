// Japan's Notebook — Curso de Japonés
// Datos de las lecciones. Para escalar el curso (Nivel 1, 2...), agrega objetos
// nuevos a este mismo array — el resto del sitio no necesita tocarse.
(function () {
  "use strict";

  var LECCIONES = [
    {
      num: 1,
      slug: "curso-de-japones/leccion-1-sonidos.html",
      kana: "あいうえお",
      title: "Los sonidos del japonés",
      desc: "Las 5 vocales y por qué el japonés es más fácil de pronunciar de lo que crees."
    },
    {
      num: 2,
      slug: "curso-de-japones/leccion-2-hiragana.html",
      kana: "ひらがな",
      title: "Hiragana",
      desc: "El primer alfabeto: 46 sonidos que te dejan leer japonés real."
    },
    {
      num: 3,
      slug: "curso-de-japones/leccion-3-katakana.html",
      kana: "カタカナ",
      title: "Katakana",
      desc: "El alfabeto de las palabras que vienen de otros idiomas: sushi, terebi, konbini."
    },
    {
      num: 4,
      slug: "curso-de-japones/leccion-4-saludos.html",
      kana: "こんにちは",
      title: "Saludos básicos",
      desc: "Cómo saludar, agradecer y despedirte sin sonar de manual de turista."
    },
    {
      num: 5,
      slug: "curso-de-japones/leccion-5-palabras-basicas.html",
      kana: "はい・いいえ",
      title: "Palabras básicas",
      desc: "Sí, no, por favor, los números del 1 al 10 y el vocabulario que usarás desde el día uno."
    }
  ];

  function renderLeccionGrid() {
    var grid = document.getElementById("leccionGrid");
    if (!grid) return;
    var html = LECCIONES.map(function (l, i) {
      return (
        '<a class="leccion-card reveal" href="' + l.slug + '" style="transition-delay:' + (i % 3) * 60 + 'ms">' +
          '<span class="leccion-num">' + l.num + '</span>' +
          '<span class="leccion-kana-preview" lang="ja">' + l.kana + '</span>' +
          '<h3>' + l.title + '</h3>' +
          '<p>' + l.desc + '</p>' +
          '<span class="leccion-go">Empezar →</span>' +
        '</a>'
      );
    }).join("");
    grid.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", renderLeccionGrid);

  // Exponer para que las páginas de lección individuales puedan construir su propio prev/next.
  window.JN_LECCIONES = LECCIONES;
})();
