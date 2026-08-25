# Invitación de cumpleaños de Jasmin

Tarjeta digital interactiva, responsive y lista para publicar en GitHub Pages.

## Evento

- **Cumpleañera:** Jasmin
- **Edad:** 23 años
- **Fecha:** sábado 29/08
- **Hora:** 5:00 p. m.
- **Lugar:** [Casa de Jasmin](https://maps.app.goo.gl/Biu3HGNGmLJcbiXt6)
- **Código de vestimenta:** casual

## Funciones

- Personalización del nombre del invitado en tiempo real.
- Valor inicial **Invitado**, que se limpia al hacer clic en el campo.
- Validación para evitar nombres vacíos.
- Restablecimiento del nombre y saludo inicial.
- Descarga de la tarjeta completa como `invitacion-cumpleanos-jasmin.png`.
- Compartir por WhatsApp con el enlace de la ubicación incluido.
- Captura PNG a escala 2, esperando la carga de las fuentes locales.
- Diseño pastel con castillo, destellos, corona y marco ornamental.
- Fuentes locales para que el diseño no dependa de Google Fonts.

## Estructura

```text
index.html
styles.css
script.js
base_castillo.webp
fonts/
  cinzel-decorative-latin.woff2
  great-vibes-latin.woff2
  montserrat-latin.woff2
.nojekyll
```

## Ejecutar localmente

Desde la carpeta del proyecto:

```powershell
python -m http.server 5500
```

Abre <http://localhost:5500> en el navegador.

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub.
2. Desde esta carpeta, configura Git y sube los archivos:

```powershell
git init
git add .
git commit -m "Crear invitacion de cumpleanos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cumpleanos-jasmin.git
git push -u origin main
```

3. En GitHub abre `Settings` → `Pages`.
4. Selecciona `Deploy from a branch`, rama `main` y carpeta `/ (root)`.
5. Guarda la configuración.

La página quedará disponible en:

```text
https://TU_USUARIO.github.io/cumpleanos-jasmin/
```

## Dominio personalizado

En `Settings` → `Pages` → `Custom domain`, escribe tu dominio y guarda. En el proveedor DNS configura cuatro registros `A` para `@`:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Para `www`, crea un registro `CNAME` apuntando a `TU_USUARIO.github.io`. Cuando GitHub lo permita, activa **Enforce HTTPS**.
