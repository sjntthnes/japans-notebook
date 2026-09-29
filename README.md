# Japan's Notebook — Landing page

Aplicación web estática (HTML/CSS/JS puro, sin build ni frameworks) que sirve de landing page
central del proyecto: showcase de los 24 videos, enlaces a las 3 redes, captura de lista de
espera para la futura tienda/viajes, chatbot de WhatsApp y espacio para publicidad. Funciona
también como **PWA** (instalable, con caché offline del shell de la página).

Publicada en GitHub Pages: **https://sjntthnes.github.io/japans-notebook/**

## Estructura

```
webapp/
  index.html              ← página única (todas las secciones)
  css/styles.css           ← sistema de diseño (tokens de MARCA.md) + layout + animaciones
  js/main.js                ← nav, scroll-reveal, grid de videos
  js/chatbot.js             ← widget de WhatsApp (FAQ + escalamiento)
  js/sw-register.js         ← registro del Service Worker
  sw.js                    ← Service Worker (caché offline del app-shell)
  manifest.json            ← manifiesto PWA (nombre, iconos, colores)
  assets/icons/            ← íconos PWA/favicon (generados desde el logo de marca)
  assets/img/branding/     ← logo y fondo del hero
  assets/img/portadas/     ← miniaturas optimizadas de las 12 portadas (480px de ancho)
```

No hay backend. El único servicio externo es el **Google Form** embebido en "Próximamente"
(lista de espera) — ver sección de Formularios más abajo.

## Cómo verla en local

Cualquier servidor estático sirve. Ejemplos:

```bash
# Python (ya instalado si generaste las portadas con este equipo)
python -m http.server 8420 --directory webapp

# Node
npx serve webapp
```

Abre `http://localhost:8420`. El Service Worker solo se registra en `https://` o en
`localhost` — es normal que no se active si abres el `index.html` directo con `file://`.

## Cómo desplegarlo (producción)

Es un sitio 100% estático: sirve **toda la carpeta `webapp/` tal cual**, sin paso de build.
Cualquiera de estas opciones funciona con arrastrar-y-soltar o `git push`:

- **Netlify / Vercel / Cloudflare Pages**: conectar el repo (o subir la carpeta) apuntando
  `webapp/` como raíz de publicación. Todas dan HTTPS gratis automático (necesario para PWA).
- **GitHub Pages**: publicar la carpeta `webapp/` como rama `gh-pages` o desde `/docs`.
- **Hosting tradicional (cPanel, etc.)**: subir el contenido de `webapp/` por FTP a `public_html/`.

## Antes de publicar — checklist

Cosas que dejé preparadas pero que necesitan un dato tuyo antes de salir a producción real:

- [ ] **Número de WhatsApp** — en `js/chatbot.js`, constante `WHATSAPP_NUMBER` (está vacía a
      propósito: mientras no la definas, el botón cae de forma honesta a "escribir por
      correo" en vez de mostrar un enlace roto).
- [x] **Dominio real** — publicado en GitHub Pages (`https://sjntthnes.github.io/japans-notebook/`),
      `canonical` y `og:url`/`og:image` ya apuntan ahí. Si más adelante se compra un dominio propio,
      actualizar estas 3 etiquetas en `index.html` y configurar el dominio custom en GitHub Pages.
- [ ] **Google AdSense** — hay 2 contenedores `.ad-slot` ya ubicados en el HTML (uno tras el
      hero, otro antes de "Próximamente"). Están en `display:none` hasta que tengan contenido
      real — así nunca se ve una caja vacía. Para activarlos: pega tu script de AdSense en
      `<head>`, pega el bloque `<ins class="adsbygoogle">` dentro de cada `.ad-slot`, y agrégale
      la clase `has-ad` a cada uno. AdSense requiere que el sitio ya esté en un dominio real y
      pase su revisión de cuenta antes de aprobar los anuncios.
- [ ] **Política de privacidad y términos** — la nota corta en el footer no reemplaza una
      política real. Antes de vender algo (tienda/viajes) o correr AdSense en serio, esa nota
      debe convertirse en una política de privacidad y unos términos de uso reales — te
      recomiendo que la revise alguien con criterio legal, no solo generarla con IA.
- [ ] **Confirmar que las 3 redes existen y están activas** con los handles usados en todo el
      sitio: `@Japan_notebook_` (TikTok e Instagram) y `@japan_notebook` (YouTube).

## Formulario de lista de espera (Google Forms)

El formulario embebido en "Próximamente" es real y ya está publicado:
`https://docs.google.com/forms/d/e/1FAIpQLSeVOFcT_PBuRQV5tQ8cp1-GQurN9Yeg6N2aYg0FWGImpdUIcw/viewform`

Las respuestas llegan a tu cuenta de Google (la que usaste al crearlo). Para verlas o
exportarlas a una hoja de cálculo: abre el formulario en Google Forms → pestaña
**Responses** → ícono de Sheets, para que cada respuesta caiga automáticamente en un Google
Sheet.

## Cómo actualizar contenido

- **Agregar un video nuevo al grid "Universo"**: edita el array `VIDEOS` al inicio de
  `js/main.js` (slug, kanji, título, hook) y coloca su portada en
  `assets/img/portadas/<slug>.jpg` (480px de ancho recomendado, incluido para mantener el
  sitio liviano).
- **Cambiar textos de marca / bios / CTA**: directo en `index.html`, están en español plano,
  sin plantillas.
- **Cambiar colores/tipografía**: variables CSS al inicio de `css/styles.css` (`:root`),
  tomadas 1:1 de `Japan's Notebook/MARCA.md` — si cambias la marca ahí, replica el cambio aquí.
- **Regenerar los íconos PWA o las portadas optimizadas**: hay un script de referencia en
  `Japan's Notebook/assets/branding/` usado para generarlas (Pillow); no forma parte del sitio
  en sí, es solo la herramienta que se usó para producir los archivos ya optimizados.

## QA realizado

Antes de entregar, se verificó (3 rondas):
1. **Visual + funcional completo**: las 8 secciones, el grid de 12 videos, el formulario
   embebido, el toggle de menú móvil, el chatbot (abrir, responder FAQ, fallback honesto de
   WhatsApp→correo) y las animaciones de scroll-reveal. Se encontró y corrigió un bug real
   (el fondo del hero tenía texto de marca incrustado que chocaba con el título — se regeneró
   el fondo sin texto).
2. **Consola + red**: 0 errores de JavaScript, 0 imágenes rotas, 0 enlaces rotos, 0 respuestas
   4xx/5xx en 67 requests verificadas a través de múltiples recargas.
3. **PWA + datos**: manifest.json válido, Service Worker se registra y activa correctamente,
   cachea el app-shell (verificado el contenido real de la caché), y los 12 kanji/títulos del
   grid se verificaron contra los 12 `publicacion.md` fuente — coinciden exactamente.

**Lo que no se pudo verificar visualmente en esta sesión**: la vista específica en viewport
móvil (375px) mostró un recorte en las capturas de pantalla que, tras investigar, resultó ser
una limitación del panel de vista previa de esta herramienta (ancho físico angosto), no un bug
del sitio — se confirmó por inspección directa del DOM que el layout es correcto a 375px de
ancho. Aun así, antes de publicar de verdad, vale la pena que abras el sitio en un celular real
una vez esté desplegado.
