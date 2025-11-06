document.addEventListener('DOMContentLoaded', function() {
    // Функция для загрузки изображений с обработкой ошибок
    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            img.src = url;
        });
    }

    let canvas = document.getElementById("canvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
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
    let car = new Image();
    let gameImages = {};

    // Загрузка всех изображений
    async function loadAllImages() {
        try {
            const basePath = window.location.origin + '/hill-climb-racing/images/';
            
            gameImages.car = await loadImage(basePath + 'car2.jpg');
            gameImages.coin = await loadImage(basePath + 'coin.png');
            gameImages.petrol = await loadImage(basePath + 'petrolTanker.png');
            gameImages.track = await loadImage(basePath + 'trackNew.jpeg');
            
            console.log('All images loaded successfully');
            return true;
        } catch (error) {
            console.error('Error loading images:', error);
            
            // Попробуем альтернативные пути
            try {
                const altPath = 'https://ilua2003.github.io/hill-climb-racing/images/';
                gameImages.car = await loadImage(altPath + 'car2.jpg');
                gameImages.coin = await loadImage(altPath + 'coin.png');
                gameImages.petrol = await loadImage(altPath + 'petrolTanker.png');
                gameImages.track = await loadImage(altPath + 'trackNew.jpeg');
                console.log('Images loaded from alternative path');
                return true;
            } catch (altError) {
                console.error('All image loading attempts failed');
                return false;
            }
        }
    }

    function dCaclulate() {
        if (distance) distance.innerHTML = carDistance;
    }

    function dPosition() {
        let dPoint = 480;
        setInterval(() => {
            dPoint += 0.4;
            if (d) d.style.left = dPoint + "px";
        }, 300);
    }

    let carKeys = {
        right: {
            pressed: false,
        },
        left: {
            pressed: false,
        },
    };
    
    let cX = 280;
    let cY = -100;
    let carMove = (dY) => {
        if (gameImages.car) {
            c.drawImage(gameImages.car, cX, dY, 130, 150);
        }
    };
    
    let d = document.getElementById("distance");

    function dCaclulate() {
        var p = 500;
        count += cX;
        if (distance) distance.innerHTML = Math.floor(count / 1000);
    }

    let i5 = 0;
    let h1 = 1;
    let s = 0;
    let coinDistance = canvas.width;

    function coin(d) {
        if (!gameImages.coin) return;
        
        s = d;
        c.drawImage(gameImages.coin, coinDistance, d - 120, 70, 50);
        coinDistance = coinDistance - h1;
        if (coinDistance <= 380) {
            coinDistance = canvas.width;
            score += 50;
        }
    }

    let coinDistance1 = canvas.width / 2;

    function coin1(d) {
        if (!gameImages.coin) return;
        
        c.drawImage(gameImages.coin, coinDistance1, d - 120, 70, 50);
        coinDistance1 = coinDistance1 - h1;
        if (coinDistance1 <= 380) {
            coinDistance1 = canvas.width;
            score += 50;
        }
    }

    let coinDistance2 = canvas.width / 4;

    function coin2(d) {
        if (!gameImages.petrol) return;
        
        c.drawImage(gameImages.petrol, coinDistance2, d - 120, 70, 50);
        coinDistance2 = coinDistance2 - h1;
        if (coinDistance2 <= 380) {
            coinDistance2 = canvas.width;
            if (pLine) {
                pLine.style.backgroundColor = "rgb(21, 139, 41)";
                start = 250;
            }
        }
    }

    let count2 = 0;
    let position = 0;
    let o = canvas.width / 4 + 20;

    function animate() {
        if (!gameImages.track) return;
        
        c.fillRect(0, 0, canvas.width, canvas.height);
        dCaclulate();
        
        position += 1;
        let i;

        for (i = 0; i < canvas.width; i++) {
            g = canvas.height - land(i + position);
            A.push(g);
            c.drawImage(gameImages.track, i, g - 40);
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
        
        if (scoreNew) scoreNew.innerHTML = score;
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
        if (!pLine) return;
        
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
            window.location.assign("out.html");
        }
        pLine.style.width = start + "px";
    }

    let section = document.getElementById("section1");
    let load = document.getElementById("click-me");
    let fuelImage = document.getElementById("fuel-image");
    let coinImage = document.getElementById("coin-image");

    function startShow() {
        if (load) load.style.visibility = "hidden";
    }

    let bar = document.getElementById("line");
    
    if (load) {
        load.addEventListener("click", async () => {
            // Ждем загрузки изображений перед запуском игры
            const imagesLoaded = await loadAllImages();
            
            if (!imagesLoaded) {
                alert('Ошибка загрузки изображений. Проверьте консоль для подробностей.');
                return;
            }

            const cDown = setInterval(carDown, 50);
            function carDown() {
                cY += 50;
                if (cY > canvas.height - 160 - img.height) clearInterval(cDown);
                setTimeout(startShow(), 2000);
            }
            
            if (section) section.style.visibility = "hidden";
            if (petrol) petrol.style.visibility = "visible";
            if (pLine) pLine.style.visibility = "visible";
            if (d) d.style.visibility = "visible";
            if (bar) bar.style.visibility = "visible";
            if (scoreNew) scoreNew.style.visibility = "visible";
            if (fuel1) fuel1.style.visibility = "visible";
            if (fuelImage) fuelImage.style.visibility = "visible";
            if (coinImage) coinImage.style.visibility = "visible";
            
            dPosition();
            animate();
        });
    } else {
        console.error('Start button not found');
    }
});
