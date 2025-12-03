const body = document.body;
const cloud = document.getElementById("cloud");
const cityButtons = document.querySelectorAll(".city-btn");

// 都市ごとの匂いワード
const cityWords = {
  newyork: [
    "street steam",
    "subway metal",
    "late-night pizza",
    "trash day",
    "wet cardboard",
    "coffee breath",
    "pretzel carts",
    "rain on asphalt",
    "cold stairwells",
    "hotdogs",
    "laundry vents",
    "midnight cigarettes",
    "gallery paint",
    "taxi exhaust"
  ],
  tokyo: [
    "konbini coffee",
    "plastic umbrella",
    "train brake dust",
    "rain on concrete",
    "neon air",
    "oden broth",
    "flower shop chill",
    "pachinko smoke",
    "fresh tatami",
    "subway breeze",
    "vending machine sugar",
    "shampoo in the crowd",
    "夜のコンビニ",
    "朝焼けの高架下"
  ],
  barcelona: [
    "sea salt air",
    "fried fish",
    "sunscreen",
    "orange peel",
    "red wine",
    "stale beer",
    "night jasmine",
    "bakery heat",
    "cigarette smoke",
    "stone warmed by sun",
    "湿った路地裏",
    "late tapas",
    "old wood doors",
    "harbor wind"
  ],
  auckland: [
    "harbor breeze",
    "rain on grass",
    "pine trees",
    "fresh petrol",
    "sunscreen",
    "wet pavement",
    "coffee to-go",
    "cold morning air",
    "海風",
    "wet sand",
    "bus exhaust",
    "afternoon bakery",
    "soggy hoodies",
    "green hills"
  ]
};


const cityClassMap = {
  newyork: "city-newyork",
  tokyo: "city-tokyo",
  barcelona: "city-barcelona",
  auckland: "city-auckland"
};

function activateCity(cityKey){

  body.className = cityClassMap[cityKey] || "city-default";


  cloud.innerHTML = "";

  const words = cityWords[cityKey];
  if (!words) return;


  const maxWords = 14; 
  const total = Math.min(words.length, maxWords);


  const ringEl = document.querySelector(".city-ring");
  const ring = ringEl.getBoundingClientRect();
  const screen = document.body.getBoundingClientRect();

  const ringTop = ring.top;
  const ringBottom = ring.bottom;
  const ringLeft = ring.left;
  const ringRight = ring.right;

  const margin = 30; 


  const zones = [];


  if (ringTop - margin > screen.top + 20) {
    zones.push({
      name: "top",
      xMin: screen.left + 20,
      xMax: screen.right - 20,
      yMin: screen.top + 20,
      yMax: ringTop - margin
    });
  }


  if (screen.bottom - 20 > ringBottom + margin) {
    zones.push({
      name: "bottom",
      xMin: screen.left + 20,
      xMax: screen.right - 20,
      yMin: ringBottom + margin,
      yMax: screen.bottom - 20
    });
  }


  if (ringLeft - margin > screen.left + 20) {
    zones.push({
      name: "left",
      xMin: screen.left + 20,
      xMax: ringLeft - margin,
      yMin: ringTop,
      yMax: ringBottom
    });
  }


  if (screen.right - 20 > ringRight + margin) {
    zones.push({
      name: "right",
      xMin: ringRight + margin,
      xMax: screen.right - 20,
      yMin: ringTop,
      yMax: ringBottom
    });
  }


  if (zones.length === 0) return;


  for (let i = 0; i < total; i++){
    const wordText = words[i];
    const span = document.createElement("span");
    span.classList.add("word");
    span.textContent = wordText;


    const zone = zones[i % zones.length];


    const x = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
    const y = zone.yMin + Math.random() * (zone.yMax - zone.yMin);

    span.style.left = `${x}px`;
    span.style.top = `${y}px`;


    const delay = (Math.random() * 1.0).toFixed(2) + "s";
    span.style.animationDelay = delay;

    cloud.appendChild(span);
  }
}






cityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const cityKey = btn.dataset.city;


    cityButtons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");


    activateCity(cityKey);
  });
});