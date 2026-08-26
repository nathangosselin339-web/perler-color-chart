const FAMS = [
  ["all","All"],["white","Whites"],["yellow","Yellows"],["orange","Oranges"],
  ["red","Reds"],["pink","Pinks"],["purple","Purples"],["blue","Blues"],
  ["green","Greens"],["brown","Browns"],["gray","Grays"],["special","Stripes"]
];

const grid = document.getElementById("grid");
const chipsEl = document.getElementById("chips");
const searchEl = document.getElementById("search");
const toastEl = document.getElementById("toast");
const countEl = document.getElementById("n");

let fam = "all";
let q = "";

function norm(s){ return (s||"").toLowerCase().replace(/[\s#-]/g,""); }

function stripeBg(hexes){
  const stops = [];
  const n = hexes.length;
  hexes.forEach((h,i)=>stops.push(`${h} ${i*100/n}% ${((i+1)*100/n)}%`));
  return `repeating-linear-gradient(115deg, ${stops.join(",")})`;
}

function beadStyle(c){
  const [,,sku,hex,type] = c;
  const base = hex.split("|")[0];
  if(type.includes("stripe")) return {backgroundImage:stripeBg(hex.split("|")),backgroundColor:"#222"};
  let bg = `background-color:${base};`;
  if(type.includes("pearl")) bg += `background-image:linear-gradient(135deg,rgba(255,255,255,.45) 5%,rgba(255,255,255,0) 35%,rgba(255,255,255,.3) 55%,rgba(255,255,255,0) 80%);`;
  if(type.includes("metallic")) bg += `background-image:conic-gradient(from 210deg,rgba(255,255,255,.4),rgba(0,0,0,.25),rgba(255,255,255,.35),rgba(0,0,0,.2),rgba(255,255,255,.4));`;
  if(type.includes("glitter")) bg += `background-image:radial-gradient(circle at 22% 30%,rgba(255,255,255,.95) 0 1.6px,transparent 2px),radial-gradient(circle at 70% 60%,rgba(255,255,255,.9) 0 1.4px,transparent 2px),radial-gradient(circle at 45% 78%,rgba(255,255,255,.85) 0 1.2px,transparent 2px),radial-gradient(circle at 80% 25%,rgba(255,255,255,.8) 0 1.3px,transparent 2px);`;
  return {style:bg};
}

function statusOf(c){
  if(c[8]==="New") return ["Available","ok"];
  if(c[8]) return [c[8],"retired"];
  if(c[2]==="mix") return ["Mix only","mixes"];
  if(c[2]==="retired") return ["Retired","retired"];
  return ["Available","ok"];
}

function render(){
  const nq = norm(q);
  const list = COLORS.filter(c=>{
    if(fam!=="all" && c[5]!==fam) return false;
    if(!nq) return true;
    const hay = norm(c[0]+c[1]+c[2]+c[3]+c[4]+c[5]+(c[7]||""));
    return hay.includes(nq);
  });
  countEl.textContent = list.length + " / " + COLORS.length;
  grid.innerHTML = list.length ? "" : `<div class="empty">No colors match &ldquo;${q}&rdquo;</div>`;
  for(const c of list){
    const [code,name,sku,hex,type,family,est,sku6k] = c;
    const single = !hex.includes("|");
    const card = document.createElement("div");
    card.className = "card";
    const bd = beadStyle(c);
    const beadCls = "bead" + (type.includes("stripe") ? " flat" : "");
    const glow = type.includes("glow") ? `box-shadow:inset 0 -4px 8px rgba(0,0,0,.35),0 0 20px ${hex}66;` : "";
    const styleAttr = `${bd.style||""}${glow}`;
    const tagText = type.replace(/\|.*/,"").replace("-"," ");
    const st = statusOf(c);
    const metaSku = sku==="mix" ? "Mix only &mdash; no single bag"
      : sku==="retired" ? "No single bag"
      : `SKU ${sku}${sku6k?` <small>6,000 bag: ${sku6k}</small>`:""}`;
    card.innerHTML = `
      ${code?`<span class="pcode">${code}</span>`:(c[8]==="New"?`<span class="newtag">new</span>`:"")}
      <span class="type-tag">${tagText}</span>
      <div class="${beadCls}" style="${styleAttr}"></div>
      <div class="name">${name}</div>
      <div class="meta">${metaSku}</div>
      <div class="hexrow">
        ${single?`<span class="hexc" style="background:${hex}"></span><span class="hexval">${hex.toUpperCase()}</span>${est?'<span class="badge">approx</span>':""}`
         :`<span class="hexval">multi-color</span>`}
      </div>
      <span class="status ${st[1]}">${st[0]}</span>`;
    card.addEventListener("click",()=>{
      const copyVal = single ? hex.toUpperCase() : name;
      navigator.clipboard.writeText(copyVal).then(()=>{
        toastEl.textContent = "Copied " + copyVal;
        toastEl.classList.add("show");
        setTimeout(()=>toastEl.classList.remove("show"),1200);
      });
    });
    grid.appendChild(card);
  }
}

FAMS.forEach(([key,label])=>{
  const b = document.createElement("button");
  b.className = "chip" + (key==="all"?" on":"");
  b.textContent = label;
  b.dataset.key = key;
  b.type = "button";
  b.addEventListener("click",()=>{
    fam = key;
    chipsEl.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===b));
    render();
  });
  chipsEl.appendChild(b);
});

searchEl.addEventListener("input",e=>{ q = e.target.value.trim(); render(); });
render();
