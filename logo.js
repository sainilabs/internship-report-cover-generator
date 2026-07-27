/* ============================================================
   IGU emblem — pure SVG, scratch se banaya hua (no image file)
   Ye string index.html ke logo-wrap me inject hoti hai.
   ============================================================ */

window.IGU_LOGO_SVG = `
<svg id="logoDefault" class="logo-default" width="600" height="660"
     viewBox="0 0 600 660" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Indira Gandhi University emblem">
  <defs>
    <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ff6b7f"/>
      <stop offset="0.45" stop-color="#e01c34"/>
      <stop offset="1" stop-color="#b3122a"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0c761"/>
      <stop offset="1" stop-color="#c28f22"/>
    </linearGradient>

    <clipPath id="discClip"><circle cx="300" cy="262" r="168"/></clipPath>

    <!-- text arcs -->
    <path id="arcHindiTop"  fill="none" d="M 103.9 318.2 A 204 204 0 1 1 496.1 318.2"/>
    <path id="arcEngTop"    fill="none" d="M 129.2 304.6 A 176 176 0 1 1 470.8 304.6"/>
    <path id="arcEngBottom" fill="none" d="M 111.7 379.6 A 222 222 0 0 0 488.3 379.6"/>
    <path id="arcMotto"     fill="none" d="M 179.9 198.1 A 136 136 0 0 1 420.1 198.1"/>
    <path id="arcBanner"    fill="none" d="M 100 505 C 190 581, 410 581, 500 505"/>
    <path id="arcMotto2"    fill="none" d="M 118 560 C 200 647, 400 647, 482 560"/>

    <!-- ek laurel patta -->
    <ellipse id="lLeaf" cx="300" cy="233" rx="9" ry="17" fill="url(#goldGrad)"/>

    <!-- side sprig (green) -->
    <g id="sprig">
      <path d="M 104 358 C 94 322, 97 286, 114 254" fill="none"
            stroke="#20863a" stroke-width="7" stroke-linecap="round"/>
      <g fill="#2fa64f">
        <ellipse cx="84" cy="346" rx="22" ry="8.5" transform="rotate(-48 84 346)"/>
        <ellipse cx="80" cy="318" rx="22" ry="8.5" transform="rotate(-42 80 318)"/>
        <ellipse cx="80" cy="291" rx="22" ry="8.5" transform="rotate(-36 80 291)"/>
        <ellipse cx="85" cy="265" rx="21" ry="8"   transform="rotate(-28 85 265)"/>
        <ellipse cx="95" cy="242" rx="19" ry="7.5" transform="rotate(-18 95 242)"/>
        <ellipse cx="124" cy="336" rx="18" ry="7"  transform="rotate(46 124 336)"/>
        <ellipse cx="120" cy="306" rx="18" ry="7"  transform="rotate(40 120 306)"/>
        <ellipse cx="122" cy="277" rx="17" ry="6.5" transform="rotate(30 122 277)"/>
      </g>
    </g>
  </defs>

  <!-- ================= orange ring ================= -->
  <circle cx="300" cy="262" r="248" fill="#f26522"/>
  <circle cx="300" cy="262" r="171" fill="#ffffff"/>

  <!-- ================= inner scene ================= -->
  <g clip-path="url(#discClip)">
    <rect x="120" y="80" width="360" height="360" fill="#ffffff"/>

    <!-- rays -->
    <g fill="#a9d8ee">
      <polygon points="300,320 254,40 346,40" transform="rotate(-160 300 320)"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(-120 300 320)"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(-80 300 320)"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(-40 300 320)"/>
      <polygon points="300,320 254,40 346,40"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(40 300 320)"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(80 300 320)"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(120 300 320)"/>
      <polygon points="300,320 254,40 346,40" transform="rotate(160 300 320)"/>
    </g>

    <!-- mountains -->
    <path d="M 120 344 L 205 246 L 285 344 Z" fill="#5fb0dc"/>
    <path d="M 480 344 L 392 240 L 312 344 Z" fill="#5fb0dc"/>
    <path d="M 300 168 L 408 348 L 192 348 Z" fill="#ffffff" stroke="#2f86bd" stroke-width="4"/>
    <path d="M 300 168 L 408 348 L 300 348 Z" fill="#e8f5fc"/>
    <rect x="120" y="344" width="360" height="100" fill="#ffffff"/>

    <!-- laurel wreath -->
    <g>
      <use href="#lLeaf" transform="rotate(18 300 300)"/>
      <use href="#lLeaf" transform="rotate(38 300 300)"/>
      <use href="#lLeaf" transform="rotate(58 300 300)"/>
      <use href="#lLeaf" transform="rotate(78 300 300)"/>
      <use href="#lLeaf" transform="rotate(98 300 300)"/>
      <use href="#lLeaf" transform="rotate(118 300 300)"/>
      <use href="#lLeaf" transform="rotate(138 300 300)"/>
      <use href="#lLeaf" transform="rotate(-18 300 300)"/>
      <use href="#lLeaf" transform="rotate(-38 300 300)"/>
      <use href="#lLeaf" transform="rotate(-58 300 300)"/>
      <use href="#lLeaf" transform="rotate(-78 300 300)"/>
      <use href="#lLeaf" transform="rotate(-98 300 300)"/>
      <use href="#lLeaf" transform="rotate(-118 300 300)"/>
      <use href="#lLeaf" transform="rotate(-138 300 300)"/>
      <path d="M 300 246 C 262 250, 240 276, 238 306" fill="none" stroke="#b9861f" stroke-width="3"/>
      <path d="M 300 246 C 338 250, 360 276, 362 306" fill="none" stroke="#b9861f" stroke-width="3"/>
    </g>

    <!-- torch -->
    <rect x="294" y="300" width="12" height="52" fill="#c2601f"/>
    <path d="M 282 296 L 318 296 L 311 314 L 289 314 Z" fill="#d9772a"/>
    <path d="M 276 352 L 324 352 L 316 366 L 284 366 Z" fill="#c2601f"/>
    <path d="M 300 232 C 284 260, 276 280, 290 298 C 295 304, 305 304, 310 298 C 324 280, 316 260, 300 232 Z"
          fill="url(#flameGrad)"/>
    <path d="M 300 254 C 292 270, 289 282, 296 292 C 299 296, 303 296, 306 292 C 313 282, 308 270, 300 254 Z"
          fill="#ffd9e0" opacity="0.85"/>

    <!-- open book -->
    <path d="M 300 370 L 194 352 Q 186 351 186 359 L 186 409 Q 186 416 194 417 L 300 435 Z" fill="#14181c"/>
    <path d="M 300 370 L 406 352 Q 414 351 414 359 L 414 409 Q 414 416 406 417 L 300 435 Z" fill="#14181c"/>
    <path d="M 299 377 L 205 361 Q 198 360 198 366 L 198 404 Q 198 410 205 411 L 299 428 Z"
          fill="#ffffff" stroke="#8a939c" stroke-width="1.5"/>
    <path d="M 301 377 L 395 361 Q 402 360 402 366 L 402 404 Q 402 410 395 411 L 301 428 Z"
          fill="#ffffff" stroke="#8a939c" stroke-width="1.5"/>
    <text x="249" y="399" transform="rotate(-5 249 399)" text-anchor="middle"
          font-family="Nirmala UI, Mangal, Noto Sans Devanagari, sans-serif"
          font-size="19" font-weight="700" fill="#9d1b1b">विद्या या</text>
    <text x="351" y="399" transform="rotate(5 351 399)" text-anchor="middle"
          font-family="Nirmala UI, Mangal, Noto Sans Devanagari, sans-serif"
          font-size="19" font-weight="700" fill="#9d1b1b">विमुक्तये</text>

    <!-- motto inside disc -->
    <text font-family="Nirmala UI, Mangal, Noto Sans Devanagari, sans-serif"
          font-size="19" font-weight="700" fill="#3a3a3a">
      <textPath href="#arcMotto" startOffset="50%" text-anchor="middle">सत्यमेव जयते</textPath>
    </text>
  </g>

  <circle cx="300" cy="262" r="170" fill="none" stroke="#f26522" stroke-width="3"/>

  <!-- ================= side sprigs ================= -->
  <use href="#sprig"/>
  <use href="#sprig" transform="translate(600,0) scale(-1,1)"/>

  <!-- ================= ring text ================= -->
  <text font-family="Nirmala UI, Mangal, Noto Sans Devanagari, sans-serif"
        font-size="38" font-weight="700" fill="#ffffff">
    <textPath href="#arcHindiTop" startOffset="50%" text-anchor="middle">इन्दिरा गाँधी विश्वविद्यालय</textPath>
  </text>
  <text font-family="Cambria, Georgia, serif" font-size="28" font-weight="700"
        fill="#ffffff" letter-spacing="2">
    <textPath href="#arcEngTop" startOffset="50%" text-anchor="middle">INDIRA GANDHI UNIVERSITY</textPath>
  </text>
  <text font-family="Cambria, Georgia, serif" font-size="27" font-weight="700"
        fill="#ffffff" letter-spacing="2">
    <textPath href="#arcEngBottom" startOffset="50%" text-anchor="middle">MEERPUR, REWARI</textPath>
  </text>

  <!-- ================= bottom banner ================= -->
  <path d="M 56 466 L 78 540 C 180 590, 420 590, 522 540 L 544 466
           C 430 528, 170 528, 56 466 Z" fill="#f26522"/>
  <text font-family="Nirmala UI, Mangal, Noto Sans Devanagari, sans-serif"
        font-size="38" font-weight="700" fill="#ffffff">
    <textPath href="#arcBanner" startOffset="50%" text-anchor="middle">मीरपुर, रेवाड़ी</textPath>
  </text>
  <text font-family="Nirmala UI, Mangal, Noto Sans Devanagari, sans-serif"
        font-size="36" font-weight="700" fill="#f26522">
    <textPath href="#arcMotto2" startOffset="50%" text-anchor="middle">सा विद्या या विमुक्तये</textPath>
  </text>
</svg>
`;
