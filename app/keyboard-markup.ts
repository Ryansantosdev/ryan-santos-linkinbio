// Markup do teclado (portado do protótipo). Valores dinâmicos: último vídeo.
export function keyboardMarkup({ href, title, isNew }: { href: string; title: string; isNew: boolean }) {
  return `<div id="app">

  <header class="head">
    <div class="ph"><img src="/perfil.webp" alt="Foto de Ryan Santos"></div>
    <div class="who">
      <h1>Ryan <mark>Santos</mark></h1>
      <div class="handle">@ryansantosdg ✓</div>
    </div>
    <div class="tools"><button id="modeBtn" class="tgl" type="button" role="switch" aria-checked="false" aria-label="Modo noturno"><i></i><span class="s">☀</span><span class="m">☾</span></button><button id="replayBtn" class="rbtn" type="button" aria-label="Rever abertura" title="Rever abertura">↺</button></div>
  </header>
  <p class="bio">Ouça o silêncio da mente. É de lá que vem o verdadeiro crescimento.</p>

  <div class="rig" id="rig" data-rgb="rainbow">
    <div class="desk"></div>
    <svg class="cable" viewBox="0 0 170 80" aria-hidden="true">
      <defs>
        <linearGradient id="fg" gradientUnits="userSpaceOnUse" x1="235" y1="0" x2="335" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
        <mask id="fade" maskUnits="userSpaceOnUse" x="0" y="-160" width="420" height="260"><rect x="0" y="-160" width="420" height="260" fill="url(#fg)"/></mask>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F6F8"/><stop offset=".5" stop-color="#A9B0BA"/><stop offset="1" stop-color="#6E747D"/></linearGradient>
      </defs>
      <g id="cableMove">
        <g id="cableG" mask="url(#fade)">
          <path id="cS" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" transform="translate(2.5,4)"/>
          <path id="cO" fill="none" stroke="#111" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="cC" fill="none" stroke="var(--cable)" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="cD" fill="none" stroke="rgba(120,40,90,.35)" stroke-width="1.6" stroke-linecap="round" transform="translate(.9,1.1)"/>
          <path id="cH" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2" stroke-linecap="round" transform="translate(-.9,-.9)"/>
          <g id="aviator"></g>
          <path id="cHit" class="hit" fill="none" stroke="transparent" stroke-width="18"/>
        </g>
        <rect x="143" y="52" width="14" height="10" rx="2" fill="#2A2C33" stroke="#111" stroke-width="2"/>
        <rect x="141" y="60" width="18" height="14" rx="3" fill="url(#metal)" stroke="#111" stroke-width="2"/>
        <rect x="145" y="73" width="10" height="8" fill="#C9CED6" stroke="#111" stroke-width="2"/>
      </g>
    </svg>

    <span class="bubble" id="bResin">toque aqui ▾</span><span class="bubble" id="bKnob">gire pra mudar a luz ▾</span><span class="bubble" id="bCable">toque no cabo ▸</span>
    <section class="case" aria-label="Links">
      <i class="pwr on" id="pwr"></i>
      <div class="topbar">
        <button class="key sig" id="sig" type="button" aria-label="Tecla assinatura: toque aqui" style="--h0:200;--c:#BFE3FF">
          <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
          <span class="cap"><img class="d keep" src="/keyboard/sig.webp" alt=""><span class="inner"></span></span>
        </button>
        <div class="oled" id="oled" aria-live="polite" data-title="${title}">
          <div class="o1" id="oled1"></div>
          <div class="o2"><span id="oled2a">RGB ARCO-ÍRIS</span><span id="clock">--:--</span></div>
        </div>
        <div class="knobwrap">
          <div class="ring" id="ring"></div>
          <button class="knob" id="knob" type="button" aria-label="Girar para mudar a cor da iluminação"><span class="dial" id="dial"></span></button>
        </div>
      </div>

      <div class="plate" id="plate">
        <a class="key" data-k="y" data-n="YOUTUBE" data-sw="CLICKY" href="https://www.youtube.com/@ryansantosdg" target="_blank" rel="noopener noreferrer" style="--c:#FFB59E;--h0:14">
          <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
          <span class="cap"><img class="d" src="/keyboard/cap-peach.webp" alt=""><img class="n" src="/keyboard/cap-dark.webp" alt=""><span class="shine"></span><span class="rim"></span>
            <span class="leg"><b class="ch">Y</b><span class="lab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>YouTube</span></span>
          </span>
        </a>
        <a class="key" data-k="i" data-n="INSTAGRAM" href="https://www.instagram.com/ryansantosdg" target="_blank" rel="noopener noreferrer" style="--c:#C9C2F0;--h0:255">
          <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
          <span class="cap"><img class="d" src="/keyboard/cap-lavender.webp" alt=""><img class="n" src="/keyboard/cap-dark.webp" alt=""><span class="shine"></span><span class="rim"></span>
            <span class="leg"><b class="ch">I</b><span class="lab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/><path d="M17.5 6.5h.01"/></svg>Instagram</span></span>
          </span>
        </a>
        <a class="key" data-k="t" data-n="TIKTOK" href="https://www.tiktok.com/@ryansantosdg" target="_blank" rel="noopener noreferrer" style="--c:#A9D6F5;--h0:205">
          <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
          <span class="cap"><img class="d" src="/keyboard/cap-blue.webp" alt=""><img class="n" src="/keyboard/cap-dark.webp" alt=""><span class="shine"></span><span class="rim"></span>
            <span class="leg"><b class="ch">T</b><span class="lab"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>TikTok</span></span>
          </span>
        </a>
        <a class="key" data-k="l" data-n="LINKEDIN" href="https://www.linkedin.com/in/ryansantosdg/" target="_blank" rel="noopener noreferrer" style="--c:#A8E6C9;--h0:150">
          <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
          <span class="cap"><img class="d" src="/keyboard/cap-mint.webp" alt=""><img class="n" src="/keyboard/cap-dark.webp" alt=""><span class="shine"></span><span class="rim"></span>
            <span class="leg"><b class="ch">L</b><span class="lab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>LinkedIn</span></span>
          </span>
        </a>
        <a class="key space" data-k=" " data-n="ÚLTIMO VÍDEO" href="${href}" target="_blank" rel="noopener noreferrer" style="--c:#FFE39A;--h0:45">
          <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
          <span class="cap"><img class="d" src="/keyboard/space-yellow.webp" alt=""><img class="n" src="/keyboard/space-dark.webp" alt=""><span class="shine"></span><span class="rim"></span>
            <span class="leg"><span class="ttl"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>ÚLTIMO VÍDEO</span>${isNew?'<span class="new"><i class="led"></i>NOVO</span>':''}</span>
          </span>
        </a>
      </div>
      <div class="nameplate"><i></i>RS-01 · RYAN SANTOS<i></i></div>
    </section>
  </div>

  <p class="hint"><span id="tip"><b>Toque</b> na tecla de resina</span>
    <span class="desk-only">Atalhos: <kbd>Y</kbd><kbd>I</kbd><kbd>T</kbd><kbd>L</kbd><kbd>ESPAÇO</kbd> · gire o botão</span></p>
  <footer>© 2026 Ryan Santos</footer>
</div>
<div id="rain"></div>

<div id="intro">
  <div id="spot"></div>
  <div id="gate">
    <div class="ph"><img src="/perfil.webp" alt=""></div>
    <img class="logo" src="/keyboard/logo.webp" alt="Ryan Santos">
    <button id="start" class="key space" type="button" aria-label="Toca pra começar">
      <span class="refl"></span><span class="amb"></span><span class="base"></span><span class="shade"></span>
      <span class="cap"><img class="d" src="/keyboard/space-yellow.webp" alt=""><span class="rim"></span>
        <span class="leg" style="justify-content:center"><span class="ttl"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>TOCA PRA COMEÇAR</span></span>
      </span>
    </button>
    <div class="snd">ligue o som</div>
  </div>
  <div id="title" aria-hidden="true"><span id="cursor" hidden></span></div>
  <div id="big" class="key" aria-hidden="true"><span class="cap"><img src="/keyboard/sig.webp" alt=""></span></div>
  <div id="impact"></div>
  <svg id="crack" aria-hidden="true"><path id="crackB" stroke="rgba(0,0,0,.6)" stroke-width="3" pathLength="1"/><path id="crackW" stroke="rgba(255,255,255,.92)" stroke-width="1.4" pathLength="1"/></svg>
  <div id="flash"></div>
</div>`;
}
