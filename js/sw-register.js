// Japan's Notebook — registro del Service Worker (PWA)
(function () {
  "use strict";
  if (!("serviceWorker" in navigator)) return;
  // https: o localhost son requisito del navegador para Service Workers.
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function (err) {
      console.warn("No se pudo registrar el Service Worker:", err);
    });
  });
})();
