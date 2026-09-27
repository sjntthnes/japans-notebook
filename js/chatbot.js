// Japan's Notebook — chatbot.js
// Asistente 100% cliente (sin backend). Responde preguntas frecuentes y
// ofrece escalar a un humano por WhatsApp o correo en cualquier momento.
(function () {
  "use strict";

  /* =====================================================================
     CONFIGURA AQUÍ el número de WhatsApp real cuando lo tengas.
     Formato: código de país + número, sin espacios ni símbolos.
     Ejemplo Venezuela: "584121234567"   Ejemplo México: "521XXXXXXXXXX"
     Mientras esté vacío, el botón de WhatsApp cae de forma honesta al
     correo de contacto en vez de mostrar un enlace roto.
     ===================================================================== */
  var WHATSAPP_NUMBER = ""; // TODO: reemplazar con el número real
  var CONTACT_EMAIL = "libro.viajes.japon@gmail.com";

  var FAQ = [
    {
      q: "¿Qué es Japan's Notebook?",
      a: "Somos un proyecto de video corto que explica un concepto japonés por pieza — kaizen, omotenashi, kintsugi y más — en menos de 60 segundos, siempre conectado a algo que puedes aplicar en tu día a día."
    },
    {
      q: "¿Dónde puedo ver los videos?",
      a: "Primero en TikTok (@Japan_notebook_), luego en YouTube Shorts (@japan_notebook) e Instagram Reels (@Japan_notebook_). Puedes tocar los botones de arriba para seguirnos."
    },
    {
      q: "¿Cuándo suben contenido nuevo?",
      a: "Publicamos con calendario fijo en las tres redes. La forma más segura de no perderte nada es seguirnos — avisamos ahí primero."
    },
    {
      q: "¿Cómo colaboro con la marca?",
      a: "Escríbenos a libro.viajes.japon@gmail.com contándonos tu propuesta, o pídeme abajo que te pase con una persona del equipo por WhatsApp."
    },
    {
      q: "¿Ya existe la tienda o los viajes a Japón?",
      a: "Todavía no — están en camino. Puedes anotarte en la lista de espera en la sección \"Próximamente\" de esta página para enterarte apenas lancemos."
    }
  ];

  var els = {};

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function addMessage(text, from) {
    var msg = el('<div class="chat-msg ' + from + '"></div>');
    msg.textContent = text;
    els.messages.appendChild(msg);
    els.messages.scrollTop = els.messages.scrollHeight;
  }

  function renderQuickReplies() {
    els.quickReplies.innerHTML = "";
    FAQ.forEach(function (item) {
      var btn = el('<button type="button"></button>');
      btn.textContent = item.q;
      btn.addEventListener("click", function () {
        addMessage(item.q, "user");
        setTimeout(function () { addMessage(item.a, "bot"); }, 350);
      });
      els.quickReplies.appendChild(btn);
    });

    var human = el('<button type="button">Hablar con una persona</button>');
    human.addEventListener("click", function () {
      addMessage("Hablar con una persona", "user");
      setTimeout(function () {
        addMessage(
          WHATSAPP_NUMBER
            ? "Claro — toca \"Hablar por WhatsApp\" abajo y seguimos la conversación ahí."
            : "Todavía no tenemos el número de WhatsApp activo en el sitio — escríbenos a " + CONTACT_EMAIL + " y te respondemos directamente.",
          "bot"
        );
      }, 350);
    });
    els.quickReplies.appendChild(human);
  }

  function setupWhatsappLink() {
    if (!els.waLink) return;
    if (WHATSAPP_NUMBER) {
      var msg = encodeURIComponent("Hola, vengo de la web de Japan's Notebook y tengo una pregunta.");
      els.waLink.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;
      els.waLink.textContent = "Hablar por WhatsApp";
    } else {
      els.waLink.href = "mailto:" + CONTACT_EMAIL;
      els.waLink.textContent = "Escribir por correo";
      els.waLink.title = "WhatsApp aún no está activo — te llevamos a correo mientras tanto.";
    }
  }

  function openPanel() {
    els.panel.hidden = false;
    els.fab.setAttribute("aria-expanded", "true");
    if (!els.messages.childElementCount) {
      addMessage(
        "¡Hola! 👋 Soy el asistente de Japan's Notebook. Elige una pregunta o pásame directo con una persona del equipo.",
        "bot"
      );
    }
  }

  function closePanel() {
    els.panel.hidden = true;
    els.fab.setAttribute("aria-expanded", "false");
  }

  function init() {
    els.fab = document.getElementById("chatFab");
    els.panel = document.getElementById("chatPanel");
    els.close = document.getElementById("chatClose");
    els.messages = document.getElementById("chatMessages");
    els.quickReplies = document.getElementById("chatQuickReplies");
    els.waLink = document.getElementById("chatWhatsappLink");
    els.openTriggers = document.querySelectorAll("#openChatbot");

    if (!els.fab || !els.panel) return;

    renderQuickReplies();
    setupWhatsappLink();

    els.fab.addEventListener("click", function () {
      els.panel.hidden ? openPanel() : closePanel();
    });
    els.close.addEventListener("click", closePanel);
    els.openTriggers.forEach(function (btn) {
      btn.addEventListener("click", openPanel);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !els.panel.hidden) closePanel();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
