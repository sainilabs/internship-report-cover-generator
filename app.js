/* ============================================================
   Internship Report Cover Page Generator
   - Form -> live A4 preview -> high-res PDF
   - Poora format 2 language me: English / Hindi (top-right toggle)
   - Naam (student + supervisors) dono language me alag-alag save hote hain
   - Logo fixed: folder ka logo.png
   ============================================================ */

const STORE_KEY = "internshipCover.v3";
const LANG_KEY = "internshipCover.lang";
const LOGO_KEY = "internshipCover.logo"; /* purana key - cleanup ke liye */

/* ---------- dropdown options (value = stable key, text = language wise) ---------- */

const OPTION_SETS = {
  college: [
    { key: "gc_mgarh",    en: "GOVERNMENT COLLEGE MAHENDERGARH",               hi: "राजकीय महाविद्यालय, महेंद्रगढ़" },
    { key: "gpgcw_mgarh", en: "GOVERNMENT PG COLLEGE FOR WOMEN, MAHENDERGARH", hi: "राजकीय स्नातकोत्तर महिला महाविद्यालय, महेंद्रगढ़" }
  ],
  klass: [
    { key: "ba2",       en: "B.A. 2nd Year",                 hi: "बी.ए. द्वितीय वर्ष" },
    { key: "bsc2",      en: "B.Sc. 2nd Year",                hi: "बी.एससी. द्वितीय वर्ष" },
    { key: "bcom2",     en: "B.Com. 2nd Year",               hi: "बी.कॉम. द्वितीय वर्ष" },
    { key: "bca2",      en: "BCA 2nd Year",                  hi: "बी.सी.ए. द्वितीय वर्ष" },
    { key: "ma_hin2",   en: "M.A. (Hindi) 2nd Year",         hi: "एम.ए. (हिन्दी) द्वितीय वर्ष" },
    { key: "ma_eng2",   en: "M.A. (English) 2nd Year",       hi: "एम.ए. (अंग्रेज़ी) द्वितीय वर्ष" },
    { key: "msc_chem2", en: "M.Sc. (Chemistry) 2nd Year",    hi: "एम.एससी. (रसायन) द्वितीय वर्ष" },
    { key: "msc_phy2",  en: "M.Sc. (Physics) 2nd Year",      hi: "एम.एससी. (भौतिकी) द्वितीय वर्ष" },
    { key: "msc_math2", en: "M.Sc. (Mathematics) 2nd Year",  hi: "एम.एससी. (गणित) द्वितीय वर्ष" }
  ],
  subject: [
    { key: "gram_panchayat", en: "GRAM PANCHAYAT",           hi: "ग्राम पंचायत" },
    { key: "beti_bachao",    en: "BETI BACHAO BETI PADHAO",  hi: "बेटी बचाओ बेटी पढ़ाओ" },
    { key: "ayushman",       en: "AYUSHMAN BHARAT",          hi: "आयुष्मान भारत" },
    { key: "nagar_palika",   en: "NAGAR PALIKA",             hi: "नगर पालिका" }
  ]
};

/* ---------- fixed texts / labels ---------- */

const I18N = {
  en: {
    reportTitle: "INTERNSHIP REPORT",
    subjectLabel: "Subject :",
    uni1: "INDIRA GANDHI UNIVERSITY,",
    uni2: "MEERPUR-REWARI",
    supHead: "Supervisor & Coordinator",
    submittedBy: "Submitted By",
    lblName: "Name",
    lblClass: "Class",
    lblCollegeRoll: "College Roll No.",
    lblUniRoll: "University Roll No.",
    lblCollege: "College Name",
    lblSubject: "Subject",
    legendStudent: "Student Details",
    legendReport: "Report Details",
    lblSup1: "Name 1",
    lblSup2: "Name 2",
    lblSup3: "Name 3 (optional)",
    lblSup4: "Name 4 (optional)",
    lblSup5: "Name 5 (optional)",
    autoHindiLabel: "Auto Hindi (Roman → हिन्दी)"
  },
  hi: {
    reportTitle: "इंटर्नशिप रिपोर्ट",
    subjectLabel: "विषय :",
    uni1: "इंदिरा गांधी विश्वविद्यालय,",
    uni2: "मीरपुर-रेवाड़ी",
    supHead: "पर्यवेक्षक एवं समन्वयक",
    submittedBy: "प्रस्तुतकर्ता",
    lblName: "नाम",
    lblClass: "कक्षा",
    lblCollegeRoll: "कॉलेज रोल नं.",
    lblUniRoll: "विश्वविद्यालय रोल नं.",
    lblCollege: "महाविद्यालय का नाम",
    lblSubject: "विषय",
    legendStudent: "विद्यार्थी विवरण",
    legendReport: "रिपोर्ट विवरण",
    lblSup1: "नाम 1",
    lblSup2: "नाम 2",
    lblSup3: "नाम 3 (वैकल्पिक)",
    lblSup4: "नाम 4 (वैकल्पिक)",
    lblSup5: "नाम 5 (वैकल्पिक)",
    autoHindiLabel: "ऑटो हिन्दी (Roman → हिन्दी)"
  }
};

/* language ke hisab se badalne wale free-text fields */
const LANG_FIELDS = ["name", "sup1", "sup2", "sup3", "sup4", "sup5"];

/* dono language me same rehne wale fields */
const SHARED_DEFAULTS = {
  college: "gc_mgarh",
  subject: "ayushman",
  klass: "ba2",
  collegeRoll: "1241203151",
  uniRoll: "241111101442"
};

const LANG_DEFAULTS = {
  en: { name: "HARSHIT", sup1: "Dr. Pinki Yadav",  sup2: "Dr. Ashok Kumar", sup3: "", sup4: "", sup5: "" },
  hi: { name: "हर्षित",   sup1: "डॉ. पिंकी यादव", sup2: "डॉ. अशोक कुमार",  sup3: "", sup4: "", sup5: "" }
};

/* ye fields khali reh sakte hain - default se fill nahi karne */
const OPTIONAL_KEYS = ["sup3", "sup4", "sup5"];

const DEFAULT_LOGO_FILE = "logo.png";
const PDF_SCALE = 4; /* ~380 DPI on A4 */

const inputs = Array.from(document.querySelectorAll("[data-bind]"));
const page = document.getElementById("page");
const scaler = document.querySelector(".page-scaler");
const logoWrap = document.getElementById("logoWrap");
const logoImg = document.getElementById("logoImg");
const langButtons = Array.from(document.querySelectorAll(".lang-btn"));

let lang = "en";
let store = { shared: {}, en: {}, hi: {} };
let ready = false;

/* ---------- helpers ---------- */

function isLangField(key) { return LANG_FIELDS.includes(key); }

function defaultFor(key) {
  return isLangField(key) ? LANG_DEFAULTS[lang][key] : SHARED_DEFAULTS[key];
}

function render(key, value) {
  document.querySelectorAll(`[data-out="${key}"]`).forEach(el => { el.textContent = value; });
}

function optionLabel(field, key) {
  const found = OPTION_SETS[field].find(o => o.key === key);
  return found ? found[lang] : "";
}

function readForm() {
  const data = {};
  inputs.forEach(i => { data[i.dataset.bind] = i.value.trim(); });
  return data;
}

/* dropdown me sirf wahi value set ho jo options me maujood ho */
function setFieldValue(field, value) {
  if (field.tagName === "SELECT") {
    const ok = Array.from(field.options).some(o => o.value === value);
    field.value = ok ? value : (SHARED_DEFAULTS[field.dataset.bind] || field.options[0].value);
    return;
  }
  field.value = value || "";
}

/* ---------- language ---------- */

function buildSelects() {
  Object.keys(OPTION_SETS).forEach(field => {
    const sel = document.querySelector(`select[data-bind="${field}"]`);
    if (!sel) return;
    const current = sel.value || SHARED_DEFAULTS[field];
    sel.innerHTML = "";
    OPTION_SETS[field].forEach(o => {
      const opt = document.createElement("option");
      opt.value = o.key;
      opt.textContent = o[lang];
      sel.appendChild(opt);
    });
    setFieldValue(sel, current);
  });
}

function applyStaticText() {
  const dict = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });
}

/* naam wale fields current language ki values se bhar do */
function fillLangFields() {
  inputs.forEach(i => {
    const k = i.dataset.bind;
    if (!isLangField(k)) return;
    const saved = store[lang][k];
    setFieldValue(i, saved !== undefined ? saved : LANG_DEFAULTS[lang][k]);
    i.placeholder = LANG_DEFAULTS[lang][k] || "";
  });
}

function setLang(next) {
  if (ready) save();                       /* current language ki values pehle sambhaal lo */
  lang = I18N[next] ? next : "en";
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }

  document.documentElement.lang = lang;
  page.classList.toggle("lang-hi", lang === "hi");

  langButtons.forEach(b => {
    const on = b.dataset.lang === lang;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", String(on));
  });

  applyStaticText();
  buildSelects();
  fillLangFields();
  if (ready) applyToPreview();
}

langButtons.forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

/* ---------- preview ---------- */

function applyToPreview() {
  const data = readForm();

  Object.keys(OPTION_SETS).forEach(key => {
    render(key, optionLabel(key, data[key] || SHARED_DEFAULTS[key]));
  });

  ["collegeRoll", "uniRoll"].forEach(key => {
    render(key, data[key] !== "" ? data[key] : SHARED_DEFAULTS[key]);
  });

  LANG_FIELDS.forEach(key => {
    if (OPTIONAL_KEYS.includes(key)) { render(key, data[key] || ""); return; }
    render(key, data[key] !== "" ? data[key] : LANG_DEFAULTS[lang][key]);
  });

  fitCollegeName();
  fitDetails();
  save();
}

/* Lamba college name ho to font auto chhota (layout na bigde) */
function fitCollegeName() {
  const el = document.querySelector(".college");
  let size = lang === "hi" ? 24 : 26.5;
  el.style.fontSize = size + "pt";

  /* max 2 lines, warna font chhota karte jao */
  let guard = 0;
  while (guard < 40 && size > 12) {
    const lh = parseFloat(getComputedStyle(el).lineHeight) || 0;
    if (!lh || el.scrollHeight <= lh * 2 + 2) break;
    size -= 0.8;
    el.style.fontSize = size + "pt";
    guard++;
  }
}

/* Submitted-By table lamba ho jaye to font auto chhota,
   taaki value green border ko touch/cross na kare */
function fitDetails() {
  const table = document.querySelector(".detail-table");
  const box = table.parentElement;
  let size = lang === "hi" ? 10 : 10.5;

  table.classList.remove("wrap-values");
  table.style.fontSize = size + "pt";

  let guard = 0;
  while (table.scrollWidth > box.clientWidth && size > 7.5 && guard < 30) {
    size -= 0.3;
    table.style.fontSize = size + "pt";
    guard++;
  }

  /* itna bhi na bane to value ko wrap kar do (border cross na ho) */
  if (table.scrollWidth > box.clientWidth) table.classList.add("wrap-values");
}

/* ============================================================
   Roman -> Hindi auto transliteration (sirf Hindi mode ke naam fields)
   Pehle Google Input Tools try hota hai (best quality),
   net na ho to local rule-based fallback chalta hai.
   ============================================================ */

const AUTO_HINDI_KEY = "internshipCover.autoHindi";
const TRANSLIT_ENDPOINT = "https://inputtools.google.com/request";
const translitCache = new Map();
const autoHindiBox = document.getElementById("autoHindi");

/* aam titles - inko API pe bhejne ki zarurat nahi */
const TITLE_MAP = {
  dr: "डॉ.", doctor: "डॉ.", prof: "प्रो.", professor: "प्रोफ़ेसर",
  mr: "श्री", shri: "श्री", sh: "श्री",
  mrs: "श्रीमती", smt: "श्रीमती",
  ms: "सुश्री", miss: "सुश्री", km: "कु.", kumari: "कुमारी"
};

/* local fallback: seedha-saral roman -> devanagari mapping */
const CONSONANTS = [
  ["chh", "छ"], ["sh", "श"], ["ss", "ष"], ["ch", "च"], ["th", "थ"], ["dh", "ध"],
  ["ph", "फ"], ["bh", "भ"], ["gh", "घ"], ["jh", "झ"], ["kh", "ख"], ["ng", "ंग"],
  ["ny", "ञ"], ["tt", "ट"], ["dd", "ड"], ["k", "क"], ["g", "ग"], ["c", "क"],
  ["j", "ज"], ["t", "त"], ["d", "द"], ["n", "न"], ["p", "प"], ["b", "ब"],
  ["m", "म"], ["y", "य"], ["r", "र"], ["l", "ल"], ["v", "व"], ["w", "व"],
  ["s", "स"], ["h", "ह"], ["f", "फ़"], ["z", "ज़"], ["q", "क़"], ["x", "क्स"]
];
const VOWELS = [
  ["aa", "आ", "ा"], ["ai", "ऐ", "ै"], ["au", "औ", "ौ"], ["ee", "ई", "ी"],
  ["ii", "ई", "ी"], ["oo", "ऊ", "ू"], ["uu", "ऊ", "ू"], ["ea", "ी", "ी"],
  ["a", "अ", ""], ["i", "इ", "ि"], ["e", "ए", "े"], ["u", "उ", "ु"], ["o", "ओ", "ो"]
];

function localTranslit(word) {
  const s = word.toLowerCase();
  let out = "";
  let i = 0;
  let atStart = true;

  while (i < s.length) {
    const rest = s.slice(i);

    const cons = CONSONANTS.find(c => rest.startsWith(c[0]));
    if (cons) {
      /* 'n' ke baad consonant aaye to anusvara (pinki -> पिंकी) */
      if (cons[0] === "n" && !atStart && /^n[bcdfghjklmnpqrstvwxyz]/.test(rest)) {
        out += "ं";
        i += 1;
        continue;
      }

      i += cons[0].length;
      out += cons[1];

      const after = s.slice(i);
      const vow = VOWELS.find(v => after.startsWith(v[0]));
      if (vow) {
        i += vow[0].length;
        const tail = s.slice(i);
        let matra = vow[2];
        /* aakhri syllable ka 'a' aksar लंबा hota hai (kumar -> कुमार, sunita -> सुनिता) */
        if (vow[0] === "a" && (tail === "" || /^[a-z]$/.test(tail))) matra = "ा";
        /* shabd ke aakhir ka 'i' लंबा (pinki -> पिंकी) */
        if (vow[0] === "i" && tail === "") matra = "ी";
        out += matra;
      } else if (i < s.length) {
        out += "्";                       /* aage consonant hai -> halant */
      } else if (!atStart) {
        /* shabd ke aakhir me schwa nahi lagate (Harshit -> हर्षित) */
      }
      atStart = false;
      continue;
    }

    const vow = VOWELS.find(v => rest.startsWith(v[0]));
    if (vow) {
      i += vow[0].length;
      out += vow[1];                        /* independent vowel */
      atStart = false;
      continue;
    }

    out += s[i];
    i += 1;
  }

  return out.replace(/्$/, "");
}

async function translitWord(word) {
  const key = word.toLowerCase();
  if (translitCache.has(key)) return translitCache.get(key);

  const title = TITLE_MAP[key.replace(/\.+$/, "")];
  if (title) { translitCache.set(key, title); return title; }

  let result = "";
  try {
    const url = TRANSLIT_ENDPOINT +
      "?text=" + encodeURIComponent(key) +
      "&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8";
    const res = await fetch(url);
    const json = await res.json();
    if (json && json[0] === "SUCCESS") result = (json[1][0][1] || [])[0] || "";
  } catch (e) { /* offline / blocked -> fallback */ }

  if (!result) result = localTranslit(key);
  translitCache.set(key, result);
  return result;
}

/* text ke sirf roman tukde badalte hain, spaces/punctuation waise hi rehte hain */
async function translitText(text) {
  const parts = text.split(/([^A-Za-z'.]+)/);
  const done = await Promise.all(parts.map(p => {
    if (!/[A-Za-z]/.test(p)) return Promise.resolve(p);
    const m = p.match(/^([A-Za-z'.]+?)(\.*)$/);
    const core = m ? m[1] : p;
    return translitWord(core.replace(/\.+$/, "")).then(hi => hi + (m ? m[2] : ""));
  }));
  return done.join("");
}

function autoHindiOn() {
  return lang === "hi" && autoHindiBox && autoHindiBox.checked;
}

async function maybeTransliterate(input) {
  if (!autoHindiOn()) return;
  const original = input.value;
  if (!/[A-Za-z]/.test(original)) return;

  const converted = await translitText(original);
  /* beech me user ne aur type kar diya ho to skip */
  if (input.value !== original) return;
  if (!converted || converted === original) return;

  input.value = converted;
  applyToPreview();
}

function attachAutoHindi(input) {
  let timer = null;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => maybeTransliterate(input), 700);
  });
  input.addEventListener("blur", () => {
    clearTimeout(timer);
    maybeTransliterate(input);
  });
}

if (autoHindiBox) {
  autoHindiBox.addEventListener("change", () => {
    try { localStorage.setItem(AUTO_HINDI_KEY, autoHindiBox.checked ? "1" : "0"); } catch (e) { /* ignore */ }
  });
}

/* ---------- persistence ---------- */

function save() {
  const data = readForm();
  Object.keys(data).forEach(k => {
    if (isLangField(k)) store[lang][k] = data[k];
    else store.shared[k] = data[k];
  });
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ }
}

function load() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) { saved = null; }
  if (saved && typeof saved === "object") {
    store = {
      shared: saved.shared || {},
      en: saved.en || {},
      hi: saved.hi || {}
    };
  }

  if (autoHindiBox) {
    let pref = "1";
    try { pref = localStorage.getItem(AUTO_HINDI_KEY) || "1"; } catch (e) { /* ignore */ }
    autoHindiBox.checked = pref !== "0";
  }

  let storedLang = "en";
  try { storedLang = localStorage.getItem(LANG_KEY) || "en"; } catch (e) { /* ignore */ }
  setLang(storedLang);

  /* shared fields */
  inputs.forEach(i => {
    const k = i.dataset.bind;
    if (isLangField(k)) return;
    const val = store.shared[k] !== undefined ? store.shared[k] : SHARED_DEFAULTS[k];
    setFieldValue(i, val);
  });

  /* logo fixed hai: sirf folder ka logo.png. purana uploaded logo hata dete hain */
  try { localStorage.removeItem(LOGO_KEY); } catch (e) { /* ignore */ }
  loadDefaultLogo();

  ready = true;
  applyToPreview();
}

/* ---------- logo ---------- */

function setLogo(src) {
  logoImg.src = src;
  logoWrap.classList.add("has-logo");
}

/* cache-bust: logo.png replace karne par turant naya version dikhe */
function loadDefaultLogo() {
  setLogo(DEFAULT_LOGO_FILE + "?v=" + Date.now());
}

/* ---------- live binding ---------- */

inputs.forEach(i => {
  i.addEventListener("input", applyToPreview);
  if (i.tagName === "SELECT") i.addEventListener("change", applyToPreview);
  /* naam wale text fields: Hindi mode me roman -> hindi auto */
  if (i.tagName === "INPUT" && isLangField(i.dataset.bind)) attachAutoHindi(i);
});
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
  const raw = document.getElementById("f_name").value.trim();
  const ascii = raw.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");
  return "Internship-Report-" + (ascii || "cover") + "-" + lang + ".pdf";
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

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: safeFileName(),
        image: { type: "png", quality: 1 },
        html2canvas: {
          scale: PDF_SCALE,
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
    alert("PDF banane me problem aayi. 'Print' se Save as PDF try karo.");
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
  store = { shared: {}, en: {}, hi: {} };
  inputs.forEach(i => setFieldValue(i, defaultFor(i.dataset.bind) || ""));
  applyToPreview();
});

/* ---------- init ---------- */

load();
scalePreview();
window.addEventListener("load", () => { scalePreview(); fitCollegeName(); fitDetails(); });
