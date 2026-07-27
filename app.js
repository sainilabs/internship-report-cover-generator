/* ============================================================
   Internship Report Cover Page Generator
   - Form -> live A4 preview -> high-res PDF
   - Logo: folder ka logo.png (default) > uploaded logo (agar user daale)
   - Data + logo browser me (localStorage) save rehte hain
   ============================================================ */

const STORE_KEY = "internshipCover.v1";
const LOGO_KEY = "internshipCover.logo";

const DEFAULTS = {
  college: "GOVERNMENT COLLEGE MAHENDERGARH",
  title: "INTERNSHIP REPORT",
  subject: "AYUSHMAN BHARAT",
  uni1: "INDIRA GANDHI UNIVERSITY,",
  uni2: "MEERPUR-REWARI",
  supHead: "Supervisor & Coordinator",
  sup1: "Dr. Pinki Yadav",
  sup2: "Dr. Ashok Kumar",
  sup3: "",
  name: "HARSHIT",
  klass: "B.A. 2nd Year",
  collegeRoll: "1241203151",
  uniRoll: "241111101442"
};

/* folder ka default logo (final, sirf ek hi file use hoti hai) */
const DEFAULT_LOGO_FILE = "logo.png";

const inputs = Array.from(document.querySelectorAll("[data-bind]"));
const page = document.getElementById("page");
const scaler = document.querySelector(".page-scaler");
const logoWrap = document.getElementById("logoWrap");
const logoImg = document.getElementById("logoImg");
const logoInput = document.getElementById("logoInput");
const qualitySelect = document.getElementById("pdfQuality");

/* ---------- helpers ---------- */

function render(key, value) {
  document.querySelectorAll(`[data-out="${key}"]`).forEach(el => { el.textContent = value; });
}

function readForm() {
  const data = {};
  inputs.forEach(i => { data[i.dataset.bind] = i.value.trim(); });
  return data;
}

function applyToPreview() {
  const data = readForm();
  Object.keys(DEFAULTS).forEach(key => {
    const val = data[key] !== undefined && data[key] !== "" ? data[key] : DEFAULTS[key];
    render(key, key === "sup3" ? (data[key] || "") : val);
  });
  fitCollegeName();
  save();
}

/* Lamba college name ho to font auto chhota (layout na bigde) */
function fitCollegeName() {
  const el = document.querySelector(".college");
  let size = 26.5;
  el.style.fontSize = size + "pt";
  let guard = 0;
  while (el.scrollHeight > el.clientHeight + 2 && size > 13 && guard < 40) {
    size -= 0.8;
    el.style.fontSize = size + "pt";
    guard++;
  }
}

/* ---------- persistence ---------- */

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(readForm())); } catch (e) { /* ignore */ }
}

function load() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; } catch (e) { saved = {}; }

  inputs.forEach(i => {
    const k = i.dataset.bind;
    if (saved[k] !== undefined) i.value = saved[k];
    else if (k !== "sup3") i.value = DEFAULTS[k];
  });

  const stored = localStorage.getItem(LOGO_KEY);
  if (stored) setLogo(stored);
  else loadDefaultLogo();

  applyToPreview();
}

/* ---------- logo ---------- */

function setLogo(src) {
  logoImg.src = src;
  logoWrap.classList.add("has-logo");
}

function clearLogo() {
  localStorage.removeItem(LOGO_KEY);
  logoInput.value = "";
  loadDefaultLogo();
}

/* cache-bust: logo.png replace karne par turant naya version dikhe */
function loadDefaultLogo() {
  setLogo(DEFAULT_LOGO_FILE + "?v=" + Date.now());
}

logoInput.addEventListener("change", () => {
  const file = logoInput.files && logoInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = String(reader.result);
    setLogo(dataUrl);
    try { localStorage.setItem(LOGO_KEY, dataUrl); }
    catch (e) { console.warn("logo save skipped (too large)"); }
  };
  reader.readAsDataURL(file);
});

document.getElementById("btnLogoClear").addEventListener("click", clearLogo);

/* ---------- live binding ---------- */

inputs.forEach(i => i.addEventListener("input", applyToPreview));
document.getElementById("coverForm").addEventListener("submit", e => e.preventDefault());

/* ---------- preview scaling ---------- */

function scalePreview() {
  const panel = document.querySelector(".preview-panel");
  const available = panel.clientWidth - 8;
  const scale = Math.min(1, available / page.offsetWidth);
  scaler.style.transform = `scale(${scale})`;
  scaler.style.height = (page.offsetHeight * scale) + "px";
}

window.addEventListener("resize", scalePreview);

/* ---------- PDF (high quality) ---------- */

function safeFileName() {
  const name = document.getElementById("f_name").value.trim() || DEFAULTS.name;
  return "Internship-Report-" + name.replace(/[^a-z0-9]+/gi, "_") + ".pdf";
}

async function downloadPdf() {
  const btn = document.getElementById("btnPdf");

  if (typeof html2pdf === "undefined") {
    alert("PDF library load nahi hui (internet check karo). 'Print' se Save as PDF kar lo.");
    return;
  }

  btn.disabled = true;
  const oldText = btn.textContent;
  btn.textContent = "Generating...";

  /* preview ka scale transform hata do, warna canvas crop/blur hota hai */
  const oldTransform = scaler.style.transform;
  const oldHeight = scaler.style.height;
  scaler.style.transform = "none";
  scaler.style.height = "auto";

  const scale = parseFloat(qualitySelect.value) || 4;

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: safeFileName(),
        image: { type: "png", quality: 1 },          /* lossless - text/logo sharp */
        html2canvas: {
          scale: scale,                              /* 4 => ~380 DPI on A4 */
          dpi: 300,
          letterRendering: true,
          useCORS: true,
          backgroundColor: "#ffffff",
          windowWidth: page.offsetWidth,
          windowHeight: page.offsetHeight
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait", compress: true }
      })
      .from(page)
      .save();
  } catch (e) {
    console.error(e);
    alert("PDF banane me problem aayi. Quality kam karke ya 'Print' se try karo.");
  } finally {
    scaler.style.transform = oldTransform;
    scaler.style.height = oldHeight;
    btn.disabled = false;
    btn.textContent = oldText;
  }
}

document.getElementById("btnPdf").addEventListener("click", downloadPdf);
document.getElementById("btnPrint").addEventListener("click", () => window.print());

document.getElementById("btnReset").addEventListener("click", () => {
  if (!confirm("Sari details default par le aayein?")) return;
  localStorage.removeItem(STORE_KEY);
  inputs.forEach(i => { i.value = DEFAULTS[i.dataset.bind] || ""; });
  applyToPreview();
});

/* ---------- init ---------- */

load();
scalePreview();
window.addEventListener("load", () => { scalePreview(); fitCollegeName(); });
