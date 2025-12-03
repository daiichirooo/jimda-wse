
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  setTimeout(() => {
    intro.classList.add("hide");
  }, 3000);
});





const dishNameEl = document.getElementById("dishName");
const bubblesEl  = document.getElementById("bubbles");
const buttons    = document.querySelectorAll(".dish-btn");

let clearTimer = null;




const dishData = {
  miso: {
    name: "miso soup",
    words: ["steam", "soy", "dashi", "seaweed", "tofu", "warm bowl"]
  },
  sushi: {
    name: "sushi",
    words: ["vinegar rice", "sea breeze", "soy sauce", "wasabi", "nori", "fresh fish"]
  },
  udon: {
    name: "udon",
    words: ["broth", "spring onion", "soft noodles", "umami", "katsuobushi"]
  },
  yakitori: {
    name: "yakitori",
    words: ["charcoal", "tare sauce", "smoke", "grilled skin", "sweet soy"]
  },
  tamago: {
    name: "tamagoyaki",
    words: ["egg", "sweet dashi", "pan heat", "soft custard"]
  },
  shogayaki: {
    name: "ginger pork",
    words: ["ginger", "garlic", "soy", "pan sizzle", "rice steam"]
  },
  inari: {
    name: "inari sushi",
    words: ["sweet tofu", "fried oil", "vinegar rice", "soy glaze"]
  },
  edamame: {
    name: "edamame",
    words: ["green pods", "salt", "steam", "fresh bean"]
  },
  gyoza: {
    name: "gyoza",
    words: ["garlic chive", "sesame oil", "crispy bottom", "vinegar dip"]
  },
  rice: {
    name: "white rice",
    words: ["plain steam", "warm pot", "soft grains"]
  },
  oyakodon: {
    name: "oyakodon",
    words: ["egg", "chicken", "sweet soy", "stewed onion", "comforting steam"]
  },
  onigiri: {
    name: "onigiri",
    words: ["nori", "salted rice", "filling", "hand-shaped"]
  }
};





function showDish(key){
  const data = dishData[key];
  if (!data) return;



  if (clearTimer){
    clearTimeout(clearTimer);
    clearTimer = null;
  }




  bubblesEl.innerHTML = "";
  dishNameEl.textContent = data.name;




  const center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };



  const total = Math.min(data.words.length, 9);



  for (let i = 0; i < total; i++){
    const w = data.words[i];
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = w;



    const angle = (Math.PI * 2 / total) * i + (Math.random() * 0.6 - 0.3);
    const radius = 170 + Math.random() * 40;


    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;


    bubble.style.left = `${x}px`;
    bubble.style.top  = `${y}px`;

    bubble.style.animationDelay = (Math.random() * 0.3).toFixed(2) + "s";

    bubblesEl.appendChild(bubble);
  }







  clearTimer = setTimeout(() => {

    dishNameEl.classList.add("fade-out");


    const currentBubbles = bubblesEl.querySelectorAll(".bubble");
    currentBubbles.forEach(b => {
      b.classList.add("fade-out"); 
    });


    setTimeout(() => {
      dishNameEl.textContent = "";
      dishNameEl.classList.remove("fade-out");
      bubblesEl.innerHTML = "";
    }, 550);
  }, 3000);
}




buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.dish;
    showDish(key);
  });
});
