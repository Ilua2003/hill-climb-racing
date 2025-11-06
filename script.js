let canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");
let score = 0;
let count = 0;
let scoreNew = document.getElementById("score");

let pLine = document.getElementById("petrol-line");
let start = 250;
let A = [];
c.fillStyle = "#6495ED";

const trigno = (a, b, c) => {
  return a + b + (a - b) * Math.cos(Math.PI * c);
};
let layers = [];

function land(x) {
  x = x / 150;
  layers.push(Math.random() * 50);
  return trigno(layers[Math.floor(x)], layers[Math.ceil(x)], x - Math.floor(x));
}

let carDistance = 0;
let img = new Image();

function dCaclulate() {
  distance.innerHTML = carDistance;
}

function dPosition() {
  let dPoint = 480;
  setInterval(() => {
    dPoint += 0.4;
    d.style.left = dPoint + "px";
  }, 300);
}

let car = new Image();
let carKeys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
car.src = "images/car2.jpg"; // ИСПРАВЛЕН ПУТЬ
let cX = 280;
let cY = -100;
let carMove = (dY) => {
  c.drawImage(car, cX, dY, 130, 150);
};
let d = document.getElementById("distance");

function dCaclulate() {
  var p = 500;
  count += cX;
  distance.innerHTML = Math.floor(count / 1000);
}

let i5 = 0;
let h1 = 1;
let s = 0;
let coinDistance = canvas.width;

function coin(d) {
  s = d;
  let coin = new Image();
  coin.src = "images/coin.png"; // ИСПРАВЛЕН ПУТЬ
  c.drawImage(coin, coinDistance, d - 120, 70, 50);
  coinDistance = coinDistance - h1;
  if (coinDistance <= 380) {
    coinDistance = canvas.width;
    score += 50;
  }
}

let coinDistance1 = canvas.width / 2;

function coin1(d) {
  let coin = new Image();
  coin.src = "images/coin.png"; // ИСПРАВЛЕН ПУТЬ
  c.drawImage(coin, coinDistance1, d - 120, 70, 50);
  coinDistance1 = coinDistance1 - h1;
  if (coinDistance1 <= 380) {
    coinDistance1 = canvas.width;
    score += 50;
  }
}

let coinDistance2 = canvas.width / 4;

function coin2(d) {
  let petrol9 = new Image();
  petrol9.src = "images/petrolTanker.png"; // ИСПРАВЛЕН ПУТЬ
  c.drawImage(petrol9, coinDistance2, d - 120, 70, 50);
  coinDistance2 = coinDistance2 - h1;
  if (coinDistance2 <= 380) {
    coinDistance2 = canvas.width;
    pLine.style.backgroundColor = "rgb(21, 139, 41)";
    start = 250;
  }
}

let count2 = 0;
let position = 0;
let o = canvas.width / 4 + 20;

function animate() {
  c.fillRect(0, 0, canvas.width, canvas.height);
  dCaclulate();
  img.src = "images/trackNew.jpeg"; // ИСПРАВЛЕН ПУТЬ
  position += 1;
  let i;

  for (i = 0; i < canvas.width; i++) {
    g = canvas.height - land(i + position);
    A.push(g);
    c.drawImage(img, i, g - 40);
  }
  if (carKeys.right.pressed) {
    position += 5;
    o += 5;
    carDistance++;
  } else if (carKeys.left.pressed) {
    position -= 5;
    o -= 5;
    carDistance--;
  }
  carMove(A[o] - 180);
  coin(A[canvas.width - 1]);
  coin1(A[canvas.width / 2 - 1]);
  coin2(A[canvas.width / 4 - 1]);
  o++;
  scoreNew.innerHTML = score;
  requestAnimationFrame(animate);
}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    carKeys.right.pressed = true;
    h1 = 5;
  }
  if (event.key == "ArrowLeft") {
    carKeys.left.pressed = true;
    h1 = -5;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight") {
    carKeys.right.pressed = false;
    h1 = 1;
  }
  if (event.key == "ArrowLeft") {
    carKeys.left.pressed = false;
    h1 = 1;
  }
});

let fuel1 = document.getElementById("fuel1");
let petrol = document.getElementById("petrol");
let PBar = setInterval(petrolWork, 500);

function petrolWork() {
  if (start < 150 && start > 80) {
    pLine.style.backgroundColor = "#FFFF00";
    pLine.style.transition = "0.1s linear";
  }
  if (start < 80) {
    pLine.style.backgroundColor = "#FF0000";
    pLine.style.transition = "0.2s ease";
  }
  start = start - 5;
  if (start < -2) {
    window.location.assign("html/out.html"); // ИСПРАВЛЕН ПУТЬ
  }
  pLine.style.width = start + "px";
}

petrolWork();

let section = document.getElementById("section1");
let load = document.getElementById("click-me");
let fuelImage = document.getElementById("fuel-image");
let coinImage = document.getElementById("coin-image");

function startShow() {
  load.style.visibility = "hidden";
}

let bar = document.getElementById("line");
load.addEventListener("click", () => {
  const cDown = setInterval(carDown, 50);
  function carDown() {
    cY += 50;
    if (cY > canvas.height - 160 - img.height) clearInterval(cDown);
    setTimeout(startShow(), 2000);
  }
  section.style.visibility = "hidden";
  petrol.style.visibility = "visible";
  pLine.style.visibility = "visible";
  d.style.visibility = "visible";
  bar.style.visibility = "visible";
  scoreNew.style.visibility = "visible";
  fuel1.style.visibility = "visible";
  fuelImage.style.visibility = "visible";
  coinImage.style.visibility = "visible";
  dPosition();
  animate();
});