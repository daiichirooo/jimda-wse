const overlay   = document.getElementById("infoOverlay");
const infoImg   = document.getElementById("infoImg");
const infoName  = document.getElementById("infoName");
const bubblesEl = document.getElementById("smellBubbles");
const closeBtn  = document.querySelector(".close-info");
const sushiBtns = document.querySelectorAll(".sushi");

let hideTimer = null;

/* 寿司クリック → 情報表示 */
sushiBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const name  = btn.dataset.name;
    const img   = btn.dataset.img;
    const words = btn.dataset.words.split(",").map(w => w.trim());

    showOverlay(name, img, words);
  });
});

/* オーバーレイを表示する */
function showOverlay(name, imgSrc, words){
  // ベルトアニメを停止
  document.body.classList.add("paused");

  // 古いタイマーがあれば消す
  if (hideTimer){
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  // 前回のバブル削除
  bubblesEl.innerHTML = "";

  // 寿司情報セット
  infoImg.src = imgSrc;
  infoImg.alt = name;
  infoName.textContent = name;

  // オーバーレイを表示
  overlay.classList.add("active");

  // バブル生成
  const total = Math.min(words.length, 8);
  const center = { x: 50, y: 50 }; // コンテナ内のほぼ中央（%）

  for (let i = 0; i < total; i++){
    const word = words[i];
    const b = document.createElement("div");
    b.classList.add("bubble");
    b.textContent = word;

    // 円周＋少しランダムに散らす
    const angle = (Math.PI * 2 / total) * i + (Math.random() * 0.6 - 0.3);
    const radius = 26 + Math.random() * 8;  // コンテナ内での半径(%)

    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;

    b.style.left = x + "%";
    b.style.top  = y + "%";
    b.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s";

    bubblesEl.appendChild(b);
  }

  // 3秒後にふわっと消す
  hideTimer = setTimeout(() => {
    fadeOutOverlay();
  }, 3000);
}

/* オーバーレイをふわっと消してから閉じる */
function fadeOutOverlay(){
  const bubbles = bubblesEl.querySelectorAll(".bubble");
  bubbles.forEach(b => b.classList.add("fade-out"));
  infoName.classList.add("fade-out");

  setTimeout(() => {
    overlay.classList.remove("active");
    document.body.classList.remove("paused");
    bubblesEl.innerHTML = "";
    infoName.textContent = "";
    infoName.classList.remove("fade-out");
  }, 550); // フェード時間より少し長め
}

/* ×ボタン or オーバーレイ背景クリック で即閉じる */
closeBtn.addEventListener("click", () => {
  fadeOutOverlay();
  if (hideTimer){
    clearTimeout(hideTimer);
    hideTimer = null;
  }
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay){
    fadeOutOverlay();
    if (hideTimer){
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }
});
