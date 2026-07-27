# Internship Report Cover Page Generator

Simple browser-based tool to fill in student/report details and generate an
A4 internship report cover page as a PDF — styled after the Indira Gandhi
University / Government College Mahendergarh format.

## Usage

No build step, no dependencies. Just open `index.html` in a browser
(or serve the folder with any static server, e.g. `python -m http.server`).

1. Fill in the form on the left (name, class, roll numbers, subject, etc.)
2. The A4 preview on the right updates live
3. Click **Download PDF** to export, or **Print** to use the browser's
   "Save as PDF"

Entered details and the logo are saved in the browser's `localStorage`, so
they persist across reloads. Use **Reset** to clear everything.

## Logo

Drop a logo image named `logo.png` (or `.jpg` / `.jpeg` / `.webp` / `.svg`)
into this folder and the app will pick it up automatically. If no such file
is present, a built-in SVG emblem (`logo.js`) is used as a fallback, or you
can upload one manually from the form.

## Files

- `index.html` — page structure / form / preview markup
- `style.css` — A4 page styling + form layout
- `app.js` — form binding, localStorage persistence, PDF export
- `logo.js` — fallback inline SVG emblem
- `logo.png` / `igu logo.png` — the university logo used in the preview
- `make_logo.py` — helper script used to clean up a low-res source logo
  (background removal / upscaling); not needed if you supply your own
  high-resolution logo file
