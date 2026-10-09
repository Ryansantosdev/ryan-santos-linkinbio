document.documentElement.classList.add('kb-ready');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const keys=$$('#plate .key'), sig=$('#sig'), allKeys=[sig,...keys], intro=$('#intro'), app=$('#app'), rig=$('#rig'), gate=$('#gate'), title=$('#title'), big=$('#big'), flash=$('#flash'), impact=$('#impact'), oledEl=$('#oled');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, isIOS=/iPhone|iPad|iPod/.test(navigator.userAgent);
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
// analytics: no site final vira track() do @vercel/analytics
function track(name,props){try{window.va&&window.va('event',{name,data:props})}catch(e){}}

/* ---------- som ---------- */
let ac,master,nb;
function audio(){
  if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=.7;master.connect(ac.destination);
    const len=ac.sampleRate;nb=ac.createBuffer(1,len,ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;}catch(e){ac=null}}
  if(ac&&ac.state==='suspended')ac.resume();if(ac&&sprRaw&&!sprBuf&&!sprDec){sprDec=true;ac.decodeAudioData(sprRaw.slice(0)).then(b=>sprBuf=b).catch(()=>{});}return ac;
}
/* gravação real de teclado (Freesound, licença livre): cortes de apertar/soltar num único arquivo */
const SPR={"down":[[0,0.1039],[0.1539,0.0595],[0.2633,0.0583],[0.3716,0.0597],[0.4812,0.0588],[0.5901,0.0593],[0.6994,0.0663],[0.8156,0.0657]],"up":[[0.9314,0.0624],[1.0437,0.0441],[1.1378,0.0402],[1.2281,0.0443],[1.3224,0.0402],[1.4126,0.0392],[1.5018,0.0434],[1.5952,0.0446]]};let sprRaw=null,sprBuf=null,sprDec=false;
fetch("/keyboard/keys.wav").then(r=>r.ok?r.arrayBuffer():null).then(b=>{sprRaw=b;if(ac)audio();}).catch(()=>{});
function spr(kind,rate,vol){if(!audio()||!sprBuf)return false;const l=SPR[kind],c=l[Math.random()*l.length|0];
  const src=ac.createBufferSource(),g=ac.createGain();src.buffer=sprBuf;src.playbackRate.value=(rate||1)*(.96+Math.random()*.08);g.gain.value=vol||1.25;src.connect(g).connect(master);src.start(ac.currentTime,c[0],c[1]);return true;}
function noise(t,dur,type,f,q,vol,f2){const s=ac.createBufferSource();s.buffer=nb;const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+dur);fl.Q.value=q;
  const g=ac.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(fl).connect(g).connect(master);s.start(t,Math.random()*.5);s.stop(t+dur+.03);}
function tone(t,dur,f1,f2,vol,type){const o=ac.createOscillator();o.type=type||'sine';o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+dur);
  const g=ac.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g).connect(master);o.start(t);o.stop(t+dur+.03);}
const sfx={
  down(){if(spr('down'))return;if(!audio())return;const t=ac.currentTime,p=.9+Math.random()*.2;noise(t,.016,'bandpass',3400*p,1.3,1);noise(t+.003,.05,'lowpass',1000*p,.7,.55);tone(t+.002,.075,230*p,120*p,.42,'triangle');},
  up(){if(spr('up',1,1))return;if(!audio())return;const t=ac.currentTime,p=.9+Math.random()*.2;noise(t,.012,'bandpass',4400*p,1.6,.4);tone(t,.04,340*p,210*p,.12,'triangle');},
  spaceDown(){if(spr('down',.86,1.3)){const t=ac.currentTime;tone(t,.1,120,70,.25,'sine');return;}sfx.down();},
  spaceUp(){if(spr('up',.88,1.1))return;sfx.up();},
  type(){sfx.down();setTimeout(sfx.up,38);},
  resin(){if(spr('down',.78,1.3)){const t=ac.currentTime;tone(t,.09,150,88,.3,'sine');return;}if(!audio())return;const t=ac.currentTime,p=.97+Math.random()*.06;
    noise(t,.006,'highpass',3200*p,.7,.3);noise(t,.03,'bandpass',950*p,.9,.85);tone(t,.055,430*p,260*p,.5,'sine');tone(t,.085,155*p,92*p,.45,'sine');},
  resinUp(){if(spr('up',.82,1))return;if(!audio())return;const t=ac.currentTime,p=.97+Math.random()*.06;noise(t,.018,'bandpass',1500*p,1,.22);tone(t,.035,540*p,420*p,.1,'sine');},
  thock(){if(!audio())return;const t=ac.currentTime;tone(t,.14,155,70,.75,'triangle');noise(t,.09,'lowpass',520,.7,.55);noise(t,.014,'bandpass',2600,1.2,.45);},
  tick(){if(!audio())return;const t=ac.currentTime;noise(t,.012,'highpass',5200,.8,.7);tone(t,.025,2300,1700,.14,'square');},
  pop(){if(!audio())return;const t=ac.currentTime;noise(t,.05,'bandpass',1300,1.2,.6,3000);tone(t,.12,260,620,.25,'sine');},
  plug(){if(!audio())return;const t=ac.currentTime;noise(t,.02,'highpass',3000,.8,.9);tone(t,.05,1400,900,.2,'square');tone(t+.01,.12,140,70,.6,'triangle');},
  beep(){if(!audio())return;const t=ac.currentTime;tone(t,.07,1900,1900,.08,'square');},
  boing(){if(!audio())return;const t=ac.currentTime;tone(t,.25,190,120,.18,'sine');noise(t,.05,'bandpass',800,2,.15);},
  boom(){if(!audio())return;const t=ac.currentTime;tone(t,.5,115,30,1);noise(t,.32,'lowpass',380,.7,.8);},
  crack(){if(!audio())return;const t=ac.currentTime;for(let i=0;i<10;i++)noise(t+i*.011+Math.random()*.01,.035,'highpass',2400+Math.random()*3500,.8,.7);
    tone(t,.6,3150,2950,.07);tone(t,.7,4700,4500,.05);tone(t,.5,95,28,.9);noise(t,.25,'lowpass',500,.7,.6);}
};
function vib(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}

/* áudios do Ryan: baixam já, decodificam quando o som estiver liberado */
const VOICES=[50,100,200,500,1000],raw={},dec={};let voice;
VOICES.forEach(n=>fetch('/keyboard/audio-'+n+'.mp3').then(r=>r.ok?r.arrayBuffer():null).then(b=>{if(b)raw[n]=b}).catch(()=>{}));
async function say(n){
  if(!audio()||!raw[n])return;
  try{ if(!dec[n]) dec[n]=await ac.decodeAudioData(raw[n].slice(0));
    if(voice)try{voice.stop()}catch(e){}
    const s=ac.createBufferSource(),g=ac.createGain();g.gain.value=1.1;s.buffer=dec[n];s.connect(g).connect(ac.destination);s.start();voice=s;
  }catch(e){}
}

/* ---------- inclinação ---------- */
let tiltLock=false;
function setTilt(rx,ry,fast){if(reduce)return;rig.style.transition=fast?'transform .12s ease-out':'transform .5s cubic-bezier(.2,.8,.2,1)';rig.style.transform=`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;}
function tiltTo(x,y,amt){const r=rig.getBoundingClientRect();const dx=Math.max(-1,Math.min(1,(x-(r.left+r.width/2))/(r.width/2+120))),dy=Math.max(-1,Math.min(1,(y-(r.top+r.height/2))/(r.height/2+120)));setTilt(-dy*4*amt,dx*5*amt,true);}
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||tiltLock||!intro.hidden)return;tiltTo(e.clientX,e.clientY,1);});
document.addEventListener('mouseleave',()=>setTilt(0,0));

/* ---------- OLED ---------- */
const VT=(oledEl.dataset.title||'').toUpperCase();
const MQ='◂ TOQUE NA RESINA  ▸  '+(VT?'ÚLTIMO VÍDEO: '+VT:'ÚLTIMO VÍDEO NO AR')+'  ▸  APERTE ESPAÇO  ▸  @RYANSANTOSDG  ▸  ';
let oledT;
function oled(msg,ms){clearTimeout(oledT);const l=$('#oled1');if(msg){l.textContent=msg;if(ms)oledT=setTimeout(()=>oled(),ms);}else{l.innerHTML=`<span class="mq">${MQ}${MQ}</span>`;}}
function oledLong(msg,ms){clearTimeout(oledT);const l=$('#oled1');l.innerHTML=`<span class="mq" style="animation-duration:9s">${msg}   ${msg}   </span>`;oledT=setTimeout(()=>oled(),ms);}
function clock(){const d=new Date();$('#clock').textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function greeting(){const h=new Date().getHours();return h>=5&&h<12?'BOM DIA ✦':h>=12&&h<18?'BOA TARDE ✦':'BOA NOITE ✦';}
clock();setInterval(clock,20000);oled();

/* ---------- RGB / efeitos ---------- */
function ripple(src,dur){
  if(rig.dataset.rgb==='off')return;
  const r=src.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  allKeys.forEach(k=>{const b=k.getBoundingClientRect(),d=Math.hypot(b.left+b.width/2-cx,b.top+b.height/2-cy);
    ['.base','.refl','.rim'].forEach(s=>{const el=k.querySelector(s);el&&el.animate([{opacity:1,offset:.3}],{duration:dur||600,delay:d*.9,easing:'ease-out'});});});
}
function jump(){keys.forEach((k,i)=>setTimeout(()=>{k.animate([{transform:'translateY(0)'},{transform:'translateY(-22px)',offset:.4},{transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.3,1.4,.5,1)'});sfx.thock();},i*90));}
function rainCaps(n){
  if(reduce)return;const srcs=['/keyboard/cap-peach.webp','/keyboard/cap-lavender.webp','/keyboard/cap-blue.webp','/keyboard/cap-mint.webp','/keyboard/sig.webp'],box=$('#rain');
  for(let i=0;i<n;i++){const im=document.createElement('img');im.src=srcs[i%srcs.length];const w=34+Math.random()*30;im.style.width=w+'px';im.style.left=(Math.random()*100)+'vw';box.appendChild(im);
    const rot=(Math.random()-.5)*720;im.animate([{transform:'translateY(0) rotate(0)'},{transform:`translateY(${innerHeight+180}px) rotate(${rot}deg)`}],{duration:1300+Math.random()*1300,delay:Math.random()*700,easing:'cubic-bezier(.4,0,.9,.6)',fill:'forwards'}).onfinish=()=>im.remove();}
}
function party(ms){rig.classList.add('party');setTimeout(()=>rig.classList.remove('party'),ms);}
function shakeRig(){rig.animate([{translate:'0 0'},{translate:'-6px 2px'},{translate:'6px -2px'},{translate:'-4px 1px'},{translate:'3px 0'},{translate:'0 0'}],{duration:380});}

/* ---------- teclas de link + saca-tecla ---------- */
function press(k,e){if(k.classList.contains('down'))return;k.classList.add('down');k.classList.contains('space')?sfx.spaceDown():sfx.down();vib(12);ripple(k);
  if(!e||e.pointerType!=='mouse'){const r=k.getBoundingClientRect();tiltTo(r.left+r.width/2,r.top+r.height/2,.7);}}
function release(k,go){if(!k.classList.contains('down'))return;k.classList.remove('down');k.classList.contains('space')?sfx.spaceUp():sfx.up();if(!matchMedia('(pointer:fine)').matches)setTilt(0,0);
  if(go){oled('> ABRINDO '+k.dataset.n+'_',1600);track('link_click',{key:k.dataset.n});}}
keys.forEach(k=>{
  k.addEventListener("pointerdown",e=>press(k,e));
  k.addEventListener("pointerup",()=>release(k,true));
  ["pointerleave","pointercancel"].forEach(ev=>k.addEventListener(ev,()=>release(k,false)));
  k.addEventListener("contextmenu",e=>e.preventDefault());
});
const map={};keys.forEach(k=>map[k.dataset.k]=k);
addEventListener('keydown',e=>{if(!intro.hidden||e.repeat||e.metaKey||e.ctrlKey||e.altKey||(e.target.closest&&e.target.closest('button')))return;const k=map[e.key.toLowerCase()];if(k){e.preventDefault();press(k);}});
addEventListener('keyup',e=>{if(!intro.hidden)return;const k=map[e.key.toLowerCase()];if(k&&k.classList.contains('down')){e.preventDefault();release(k,true);setTilt(0,0);k.click();}});

/* ---------- tecla assinatura (contador) ---------- */
const MARKS=[10,25,50,100,200,500,1000];
let taps=store.get('rs-sig')||0;
function setGold(on){document.body.classList.toggle('gold',on);}
setGold(taps>=50);
function countLabel(){const b=$("#resetBtn");if(b)b.textContent=taps+(taps===1?" toque":" toques")+" ↺";}
countLabel();
$$('.key .shine').forEach(s=>{const img=s.parentElement.querySelector('img.d');s.style.webkitMaskImage=s.style.maskImage=`url(${img.getAttribute('src')})`;});
function sigTap(){
  taps++;store.set('rs-sig',taps);countLabel();
  sfx.resin();vib(14);ripple(sig,700);
  sig.querySelector('.inner').animate([{opacity:1},{opacity:0}],{duration:650,easing:'ease-out'});
  const next=MARKS.find(m=>m>taps);
  if(MARKS.includes(taps)){milestone(taps);return;}
  if(taps>1000&&taps%100===0){ripple(sig,900);jump();oled('× '+taps+' ✦',1500);return;}
  oled('× '+taps+(next&&taps<50?' · FALTAM '+(next-taps):''),1400);
}
function milestone(n){
  track('secret_'+n,{});
  if(n===10){oled('TÁ GOSTANDO, NÉ? ✦',1800);allKeys.forEach((k,i)=>setTimeout(()=>ripple(k,800),i*80));}
  if(n===25){oled('METADE DO CAMINHO…',1800);jump();}
  if(n===50){setGold(true);oledLong('✦ EDIÇÃO DOURADA DESBLOQUEADA ✦',9000);say(50);party(1600);rainCaps(14);}
  if(n===100){oledLong('× 100 ✦ CHUVA DE TECLAS',5000);say(100);rainCaps(30);}
  if(n===200){oledLong('× 200 ✦ MODO FESTA',6000);say(200);party(6500);}
  if(n===500){oledLong('× 500 ✦ LEVEMENTE MALUCO',5000);say(500);shakeRig();party(3000);}
  if(n===1000){oledLong('TIRA PRINT E ME MARCA @RYANSANTOSDG ✦',14000);say(1000);rainCaps(40);party(9000);}
}
sig.addEventListener('pointerdown',e=>{sig.classList.add('down');sigTap();});
['pointerup','pointerleave','pointercancel'].forEach(ev=>sig.addEventListener(ev,()=>{if(sig.classList.contains('down')){sig.classList.remove('down');sfx.resinUp();}}));
sig.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!e.repeat)sigTap();}});
sig.addEventListener('contextmenu',e=>e.preventDefault());
$('#resetBtn')?.addEventListener('click',()=>{taps=0;store.set('rs-sig',0);countLabel();setGold(false);oled('CONTADOR ZERADO',1200);});

/* ---------- knob (RGB) ---------- */
const MODES=[['ARCO-ÍRIS',null],['AZUL',212],['CIANO',188],['MENTA',152],['ÂMBAR',40],['CORAL',12],['ROSA',325],['ROXO',268],['DESLIGADO','off']];
const STEP=360/MODES.length,ring=$('#ring'),dial=$('#dial'),knob=$('#knob');
const dots=MODES.map((m,i)=>{const d=document.createElement('i');const a=i*STEP*Math.PI/180;d.style.transform=`translate(${Math.sin(a)*34}px,${-Math.cos(a)*34}px)`;ring.appendChild(d);return d;});
let mode=0,steps=0;
function setMode(i,quiet){
  mode=(i%MODES.length+MODES.length)%MODES.length;const [n,h]=MODES[mode];
  rig.dataset.rgb=h===null?'rainbow':h==='off'?'off':'solid';
  if(typeof h==='number'){rig.style.setProperty('--hk',h);rig.style.setProperty('--dk',h);}else rig.style.setProperty('--dk',210);
  dots.forEach((d,j)=>{d.className='';if(j===mode){d.classList.add('on');if(h===null)d.classList.add('rb');else if(h==='off')d.classList.add('off');else d.style.setProperty('--dh',h);}});
  $('#oled2a').textContent='RGB '+n;
  if(!quiet){sfx.tick();vib(6);oled('> RGB: '+n,1200);if(h!=='off')ripple(keys[4]);store.set('rs-rgb',mode);}
}
function step(dir){steps+=dir;dial.style.setProperty('--a',(steps*STEP)+'deg');setMode(mode+dir);}
let kd=null;
knob.addEventListener('pointerdown',e=>{e.preventDefault();knob.setPointerCapture(e.pointerId);const r=knob.getBoundingClientRect();kd={cx:r.left+r.width/2,cy:r.top+r.height/2,acc:0,moved:false};kd.a=Math.atan2(e.clientY-kd.cy,e.clientX-kd.cx);tiltLock=true;audio();});
knob.addEventListener('pointermove',e=>{if(!kd)return;const a=Math.atan2(e.clientY-kd.cy,e.clientX-kd.cx);let d=a-kd.a;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;kd.a=a;kd.acc+=d*180/Math.PI;
  while(kd.acc>=STEP){kd.acc-=STEP;step(1);kd.moved=true;}while(kd.acc<=-STEP){kd.acc+=STEP;step(-1);kd.moved=true;}});
const kEnd=()=>{if(!kd)return;if(!kd.moved)step(1);kd=null;tiltLock=false;};
knob.addEventListener('pointerup',kEnd);knob.addEventListener('pointercancel',kEnd);
knob.addEventListener('wheel',e=>{e.preventDefault();step(e.deltaY>0?1:-1);},{passive:false});
knob.addEventListener('keydown',e=>{const m={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1,Enter:1,' ':1}[e.key];if(m){e.preventDefault();step(m);}});
{const saved=store.get('rs-rgb');const m=typeof saved==='number'?saved:0;steps=m;dial.style.setProperty('--a',(steps*STEP)+'deg');setMode(m,true);}

/* ---------- cabo espiral + conector aviador ---------- */
{const P0=[150,52],C=[150,0],P2=[340,-40],pts=[[150,60],[150,52]];let av=null;
  for(let i=0;i<=440;i++){const t=i/440,u=1-t;
    const x=u*u*P0[0]+2*u*t*C[0]+t*t*P2[0],y=u*u*P0[1]+2*u*t*C[1]+t*t*P2[1];
    let tx=2*u*(C[0]-P0[0])+2*t*(P2[0]-C[0]),ty=2*u*(C[1]-P0[1])+2*t*(P2[1]-C[1]);const L=Math.hypot(tx,ty)||1;tx/=L;ty/=L;
    const flat=t<.05||(t>.34&&t<.46),ph=t*Math.PI*2*11,r=flat?0:7.5;
    if(!av&&t>=.4)av=[x,y,Math.atan2(ty,tx)*180/Math.PI];
    pts.push([x+(-ty)*r*Math.sin(ph)+tx*r*.55*Math.cos(ph),y+tx*r*Math.sin(ph)+ty*r*.55*Math.cos(ph)]);}
  const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L');['#cS','#cO','#cC','#cD','#cH','#cHit'].forEach(s=>$(s).setAttribute('d',d));
  $('#aviator').innerHTML=`<g transform="translate(${av[0].toFixed(1)},${av[1].toFixed(1)}) rotate(${av[2].toFixed(1)})">
    <rect x="-13" y="-6.5" width="26" height="13" rx="3" fill="url(#metal)" stroke="#111" stroke-width="2"/>
    <rect x="-2" y="-7.5" width="4" height="15" rx="1" fill="#2A2C33" stroke="#111" stroke-width="1.5"/>
    <path d="M-9 -4v8M-6 -4v8M6 -4v8M9 -4v8" stroke="rgba(0,0,0,.25)" stroke-width="1"/></g>`;
  const g=$('#cableG');g.style.transformBox='view-box';g.style.transformOrigin='150px 56px';
  $('#cHit').addEventListener('pointerdown',e=>{e.stopPropagation();sfx.boing();vib(8);g.animate([{transform:'rotate(0)'},{transform:'rotate(-9deg)'},{transform:'rotate(7deg)'},{transform:'rotate(-4deg)'},{transform:'rotate(2deg)'},{transform:'rotate(0)'}],{duration:800,easing:'ease-out'});});}

/* ---------- dia / noite ---------- */
function setNight(on){document.body.classList.toggle('night',on);$('#modeBtn').setAttribute('aria-checked',on);}
{const h=new Date().getHours();setNight(h>=18||h<6);}
$('#modeBtn').addEventListener('click',()=>{setNight(!document.body.classList.contains('night'));sfx.down();});

/* ---------- abertura ---------- */
const GLY=[[0.1367,0,0.3235,0.4464],[0.3227,0.0926,0.4948,0.5598],[0.4861,0.0812,0.6657,0.4579],[0.5741,0.4932,0.6729,1],[0.6801,0.0812,0.8486,0.4464],[0,0.589,0.192,0.999],[0.2024,0.5879,0.4036,1],[0.4151,0.5879,0.5681,0.9886],[0.6709,0.5879,0.8355,1],[0.8414,0.589,1,0.999]]
  .map(g=>({g,line:(g[1]+g[3])/2>0.5?1:0})).sort((a,b)=>a.line-b.line||a.g[0]-b.g[0]);
const LINE=[[0.0812,0.4464],[0.589,0.999]],cursor=$('#cursor');
const glyphs=GLY.map(({g,line})=>{const im=document.createElement('img');im.src='/keyboard/logo.webp';im.alt='';
  im.style.clipPath=`inset(${(g[1]*100).toFixed(2)}% ${((1-g[2])*100).toFixed(2)}% ${((1-g[3])*100).toFixed(2)}% ${(g[0]*100).toFixed(2)}%)`;
  im.style.transformOrigin=`${((g[0]+g[2])*50).toFixed(1)}% ${((g[1]+g[3])*50).toFixed(1)}%`;title.appendChild(im);return {im,g,line};});
let timers=[],playing=false;
const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
function shake(ms,amp){const f=[];for(let i=0;i<8;i++)f.push({transform:`translate(${(Math.random()-.5)*amp}px,${(Math.random()-.5)*amp}px)`});f.push({transform:'translate(0,0)'});intro.animate(f,{duration:ms});}
function drawCrack(){
  const w=innerWidth,hh=innerHeight,cx=w/2,cy=hh/2,R=Math.hypot(w,hh)*.6,n=14,rays=[];$('#crack').setAttribute('viewBox',`0 0 ${w} ${hh}`);let d='';
  for(let i=0;i<n;i++){let a=i/n*Math.PI*2+(Math.random()-.5)*.3,r=0;const p=[[cx,cy,0]];while(r<R){r+=18+Math.random()*55;a+=(Math.random()-.5)*.22;p.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r,r]);}
    rays.push(p);d+='M'+p.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join('L');}
  [.07,.16,.3].forEach(f=>{const rr=R*f,pick=ray=>ray.reduce((b,q)=>Math.abs(q[2]-rr)<Math.abs(b[2]-rr)?q:b);
    for(let i=0;i<n;i++){if(Math.random()<.25)continue;const a=pick(rays[i]),b=pick(rays[(i+1)%n]);const mx=(a[0]+b[0])/2+(Math.random()-.5)*14,my=(a[1]+b[1])/2+(Math.random()-.5)*14;
      d+=`M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${mx.toFixed(1)} ${my.toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;}});
  ['#crackB','#crackW'].forEach(s=>{const p=$(s);p.setAttribute('d',d);p.style.strokeDasharray='1';p.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:140,easing:'ease-out',fill:'forwards'});});
}
function powered(on){allKeys.forEach(k=>k.classList.toggle('off',!on));oledEl.classList.toggle('dark',!on);$('#pwr').classList.toggle('on',on);
  $('#cableMove').style.transform=on?'':'translateY(-30px)';}
function resetIntro(){timers.forEach(clearTimeout);timers=[];intro.getAnimations({subtree:true}).forEach(a=>a.cancel());app.getAnimations().forEach(a=>a.cancel());
  allKeys.forEach(k=>k.getAnimations().forEach(a=>a.cancel()));['#crackB','#crackW'].forEach(s=>$(s).setAttribute('d',''));$('#start').classList.remove('down');cursor.hidden=true;
  $('#cableMove').getAnimations().forEach(a=>a.cancel());}
function done(){try{sessionStorage.setItem('rs-intro','1')}catch(e){}
  oled(greeting(),1800);if(isIOS)setTimeout(()=>oled('♪ SEM SOM? TIRE DO SILENCIOSO',2400),1900);}
function finish(){resetIntro();intro.hidden=true;playing=false;powered(true);done();}
function showIntro(){resetIntro();intro.hidden=false;playing=false;setTilt(0,0);powered(false);$('#oled1').textContent='';}
function powerOn(){
  intro.animate([{opacity:1},{opacity:0}],{duration:440,fill:'forwards'});
  app.animate([{transform:'scale(1.3)',filter:'blur(8px)'},{transform:'scale(1)',filter:'blur(0)'}],{duration:560,easing:'cubic-bezier(.2,.8,.2,1)'});
  at(450,()=>{intro.hidden=true;});
  at(720,()=>{$('#cableMove').animate([{transform:'translateY(-30px)'},{transform:'translateY(0)'}],{duration:150,easing:'cubic-bezier(.6,0,1,1)',fill:'forwards'});});
  at(870,()=>{sfx.plug();vib(20);shakeRig();$('#cableMove').style.transform='';});
  at(1000,()=>{$('#pwr').classList.add('on');sfx.beep();});
  at(1120,()=>{oledEl.classList.remove('dark');let b=0;const l=$('#oled1');l.textContent='RS-01 ▸ BOOT ';const iv=setInterval(()=>{l.textContent='RS-01 ▸ '+'▮'.repeat(++b);if(b>=8)clearInterval(iv);},55);timers.push(iv);});
  const rows=[[sig],[keys[0],keys[1]],[keys[2],keys[3]],[keys[4]]];
  rows.forEach((row,i)=>at(1650+i*150,()=>{row.forEach(k=>{k.classList.remove('off');['.base','.refl','.rim'].forEach(s=>{const el=k.querySelector(s);el&&el.animate([{opacity:1,offset:.3}],{duration:620,easing:'ease-out'});});});sfx.type();vib(8);}));
  at(1650+rows.length*150+120,()=>{playing=false;resetIntro();powered(true);done();});
}
function startIntro(){
  if(playing){finish();return;}
  playing=true;audio();vib(15);$('#start').classList.add('down');sfx.down();
  at(110,()=>{$('#start').classList.remove('down');sfx.up();gate.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.92)'}],{duration:170,fill:'forwards'});
    $('#spot').animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});});
  let t=320;
  glyphs.forEach((G,i)=>{at(t,()=>{const g=G.g,L=LINE[G.line];cursor.hidden=false;cursor.style.left=(g[2]*100+1.2)+'%';cursor.style.top=(L[0]*100)+'%';cursor.style.height=((L[1]-L[0])*100)+'%';
      G.im.animate([{opacity:0,transform:'translateY(4%) scale(1.25)'},{opacity:1,transform:'none'}],{duration:95,easing:'cubic-bezier(.2,.9,.3,1)',fill:'forwards'});sfx.type();});
    t+=72+Math.random()*26+(i===3?120:0);});
  at(t+300,()=>{cursor.hidden=true;sfx.boom();shake(160,8);vib(25);
    big.animate([{opacity:0,transform:'scale(.04) rotate(-16deg)'},{opacity:1,transform:'scale(.45) rotate(-7deg)',offset:.45},{opacity:1,transform:'scale(2.6) rotate(2deg)'}],{duration:400,easing:'cubic-bezier(.65,0,1,1)',fill:'forwards'});
    title.animate([{opacity:1,transform:'scale(1)',filter:'blur(0)'},{opacity:1,transform:'scale(1.05)',offset:.5},{opacity:0,transform:'scale(1.6)',filter:'blur(10px)'}],{duration:400,easing:'ease-in',fill:'forwards'});});
  at(t+700,()=>{sfx.crack();vib([30,40,50]);drawCrack();shake(300,18);
    flash.animate([{opacity:0},{opacity:.85},{opacity:0}],{duration:240});
    impact.animate([{opacity:0,transform:'scale(.3)'},{opacity:1,transform:'scale(1)',offset:.2},{opacity:0,transform:'scale(1.3)'}],{duration:420});});
  at(t+1000,()=>{big.animate([{opacity:1,transform:'scale(2.6) rotate(2deg)'},{opacity:0,transform:'scale(.35) rotate(0)'}],{duration:440,easing:'cubic-bezier(.3,0,.2,1)',fill:'forwards'});powerOn();});
}
intro.addEventListener('pointerdown',e=>{e.preventDefault();startIntro();});
intro.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();startIntro();}});
$('#replayBtn')?.addEventListener('click',showIntro);

let seen=false;try{seen=!!sessionStorage.getItem('rs-intro')}catch(e){}
if(!reduce&&!seen)showIntro();else{intro.hidden=true;}
