// ✏️ PERSONALIZE AQUI
const NOMES = "Arthur & Sofia";
const INICIO = "2026-07-08T00:00:00"; // data de início do namoro
const MOTIVOS = [
  "O seu sorriso, porque ele melhora qualquer dia ruim.",
  "O seu olhar, porque ele me faz sentir especial.",
  "Sua voz, porque ela é música para os meus ouvidos.",
  "Você me faz me sentir amado todos os dias.",
  "Seu jeito de ser, porque cada detalhe seu me encanta.",
  "Você me faz querer ser uma pessoa melhor todos os dias.",
  "A sua risada, porque ouvir você rindo é uma das coisas que eu mais amo.",
  "A sua companhia, porque qualquer momento com você é perfeito.",
  "As suas mensagens, porque elas sempre me fazem sorrir.",
  "Simplesmente porque você é você."
];

document.getElementById("names").textContent = NOMES;

// Contador
const pad = n => String(n).padStart(2, "0");
function tick(){
  const diff = Math.max(0, Date.now() - new Date(INICIO).getTime());
  const sec = Math.floor(diff / 1000);
  document.getElementById("d").textContent = Math.floor(sec / 86400);
  document.getElementById("h").textContent = pad(Math.floor(sec % 86400 / 3600));
  document.getElementById("m").textContent = pad(Math.floor(sec % 3600 / 60));
  document.getElementById("s").textContent = pad(sec % 60);
}
tick(); setInterval(tick, 1000);

// Corações voando
const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
function burst(x, y, n){
  if (calmo) return;
  for (let i = 0; i < n; i++){
    const el = document.createElement("span");
    el.className = "fly";
    el.textContent = "♥";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = (16 + Math.random() * 20) + "px";
    el.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
    el.style.setProperty("--r", (Math.random() * 60 - 30) + "deg");
    el.style.animationDelay = (Math.random() * .25) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}
document.getElementById("heart").addEventListener("click", e => {
  const r = e.currentTarget.getBoundingClientRect();
  burst(r.left + r.width / 2 - 8, r.top + r.height / 2, 10);
});

// Motivos (sem repetir até acabar a lista)
let fila = [], visto = 0;
const txt = document.getElementById("reason");
document.getElementById("next").addEventListener("click", e => {
  if (!fila.length) fila = MOTIVOS.map((_, i) => i).sort(() => Math.random() - .5);
  const i = fila.pop(); visto++;
  txt.classList.add("out");
  setTimeout(() => { txt.textContent = MOTIVOS[i]; txt.classList.remove("out"); }, 220);
  document.getElementById("count").textContent = "Motivo " + visto + " (e ainda tem muito mais 👀👀)";
  const r = e.currentTarget.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top, 5);
});

// Carta
const env = document.getElementById("env"), letter = document.getElementById("letter");
env.addEventListener("click", () => {
  const open = letter.classList.toggle("open");
  env.setAttribute("aria-expanded", open);
  env.textContent = open ? "💌 Fechar carta" : "💌 Toque para abrir";
  if (open){
    const r = env.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + 20, 8);
    setTimeout(() => letter.scrollIntoView({behavior: calmo ? "auto" : "smooth", block: "center"}), 150);
  }
});
