// 1) 文章を順番にフェードインさせる
document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".reveal-seq");

  lines.forEach((el, index) => {
    const delay = 600 * index; // 0ms, 600ms, 1200ms, 1800ms...
    setTimeout(() => {
      el.classList.add("is-visible");
    }, delay);
  });
});

// 2) 香りの粒をランダムに生成
document.addEventListener("DOMContentLoaded", () => {
  const layer = document.querySelector(".scent-layer");
  if (!layer) return;

  const ORB_COUNT = 26;

  for (let i = 0; i < ORB_COUNT; i++){
    const orb = document.createElement("div");
    orb.classList.add("scent-orb");

    // 画面全体にランダム配置（少し中央寄りにしてもOK）
    const x = Math.random() * 100;   // 0〜100vw
    const y = Math.random() * 100;   // 0〜100vh
    orb.style.left = x + "vw";
    orb.style.top  = y + "vh";

    // それぞれ少しずつサイズを変える
    const size = 10 + Math.random() * 18; // 10〜28px
    orb.style.width  = size + "px";
    orb.style.height = size + "px";

    // アニメーション速度＆開始タイミングもバラす
    const duration = 10 + Math.random() * 10; // 10〜20秒
    const delay    = Math.random() * 8;       // 0〜8秒
    orb.style.animationDuration = duration + "s";
    orb.style.animationDelay    = delay + "s";

    layer.appendChild(orb);
  }
});
