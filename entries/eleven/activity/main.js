
let body = document.body;
let headline = document.querySelector("h1");
let headlines = document.querySelectorAll("h1");

console.log(headline);
console.log(headlines);


function addRed() {
  headline.classList.toggle("red");
}

headline.addEventListener("click", addRed);

