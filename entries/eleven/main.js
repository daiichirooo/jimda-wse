const infoName    = document.getElementById("infoName");
const infoSmells  = document.getElementById("infoSmells");
const infoPanel   = document.querySelector(".info-panel");
const sushiBtns   = document.querySelectorAll(".sushi");

let hideTimer = null;

sushiBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const name  = btn.dataset.name;
    const words = btn.dataset.words.split(",").map(w => w.trim());
    showInfo(name, words);
  });
});

function showInfo(name, words){
  // ベルトを一旦停止したい場合
  document.body.classList.add("paused");

  // 前回のタイマーがあればキャンセル
  if (hideTimer){
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  // フェードアウト状態なら戻す
  infoPanel.classList.remove("fade-out");

  // タイトル
  infoName.textContent = name;

  // 匂いワードをタグとして並べる
  infoSmells.innerHTML = "";
  const maxWords = Math.min(words.length, 7);

  for (let i = 0; i < maxWords; i++){
    const chip = document.createElement("span");
    chip.classList.add("info-chip");
    chip.textContent = words[i];
    infoSmells.appendChild(chip);
  }

  // 3秒後にふわっと消してベルト再開
  hideTimer = setTimeout(() => {
    infoPanel.classList.add("fade-out");

    setTimeout(() => {
      infoName.textContent = "";
      infoSmells.innerHTML = "";
      infoPanel.classList.remove("fade-out");
      document.body.classList.remove("paused");
    }, 500); // フェード時間よりちょい長め
  }, 3000);
}
