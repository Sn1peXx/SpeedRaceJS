const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'),
      restart = document.querySelector('.btn_res'),
      modal = document.querySelector('.modal__win'),
      modalScore = document.querySelector('.modal_score'),
      modalImg = document.querySelectorAll('.mod__img'),
      modalCar = document.querySelector('.modal__choose-car'),
      modalStart = document.querySelector('.modal__start'),
      btnLvl = document.querySelectorAll('.btn__lvl'),
      mainCar = document.querySelector('.main__car');

car.classList.add('car'); 
 
restart.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = { 
    start: false,
    score: 0,
    speed: 7,
    traffic: 2
};

let SPEED;

function getQuantityElements(heightElemnt) {
    return document.documentElement.clientHeight / heightElemnt + 1;
}

// Функция для начала игры
function startGame() {
    score.classList.add('show');
    gameArea.innerHTML = '';
    car.style.left = '199px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    for( let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        const line2 = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 85) + 'px';
        line.y = i * 100;

        line2.classList.add('line');
        line2.style.top = (i * 85) + 'px';
        line2.style.left = (150 + 140) + 'px';
        line2.y = i * 100;
        gameArea.appendChild(line);
        gameArea.appendChild(line2);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -150 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 95)) + 'px';
        enemy.style.top = enemy.y + 'px';
        
        //Рандомный выбор машины enemy      
        image = ['../image/enemy1.png', '../image/enemy2.png', '../image/enemy3.png', '../image/enemy4.png', '../image/enemy5.png', '../image/enemy6.png', '../image/enemyBig.png', '../image/enemy7.png', '../image/enemy8.png', '../image/enemy9.png'];

        let a = Math.round(Math.random() * 9); 
        enemy.style.background = `transparent url(${image[a]}) center / cover no-repeat`;
        delete image[a];
        
        gameArea.appendChild(enemy);
    }


    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
    
};

// ТОтслеживания нажатий во время игры
function playGame() {
    if (setting.start === true) {
        setting.score += setting.speed;
        score.innerHTML = 'SCROE<br>' + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);  
    }

};

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
};

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
};

// Создание полос на дороге
function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });

    let lines2 = document.querySelectorAll('.line2');
    lines2.forEach((line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

// остановка игры при аварии с enemy
function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(item => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && carRect.right >= enemyRect.left && carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top) {
            setting.start = false;
            score.style.top = start.offsetHeight; 
            openEndModal();
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';


        if (item.y >= document.documentElement.clientHeight) {
            item.y = -50 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }

    });
}


// ОТкрытие окна после поражения
function openEndModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    modalScore.innerHTML = `Ваш результат: ${setting.score}`;

    if (setting.score >= 10000) {
        window.image = [];
    }
}

// Закрытие окна после поражения
function closemodal() {
    restart.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        setting.speed = SPEED;
        setting.traffic = 2;
    });

}

closemodal();

function removeActive() {
    btnLvl.forEach(item => {
        item.classList.remove('active');
    });
}

function showActive(i = 1) {
    btnLvl[i].classList.add('active');
   
    if (i == 0) {
        SPEED = setting.speed = 7;
    }

    if (i == 1) {
        SPEED = setting.speed = 10;
    }

    if (i == 2) {
        SPEED = setting.speed = 13;
    }
}

removeActive();
showActive();

btnLvl.forEach(btns => {
    btns.addEventListener('click', (e) => {
        const target = e.target;
        
       if (target) {
        btnLvl.forEach((item, i) => {
            if (target == item) {
               removeActive();
               showActive(i);
               mainCar.classList.remove('hide');
            }
        });
       } 
    });
});

// Выбор машины перед началом игры
modalCar.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('mod__img')) {
        modalImg.forEach((items, i) => {
            if (target == items) {
                if (i == 0) {
                    car.style.background = `transparent url('../image/player1.png') center / cover no-repeat`;
                    closeModal();
                }
                if (i == 1) {
                    car.style.background = `transparent url('../image/player2.png') center / cover no-repeat`;
                    closeModal();
                }
                if (i == 2) {
                    car.style.background = `transparent url('../image/player3.png') center / cover no-repeat`;
                    closeModal();
                }
                if (i == 3) {
                    car.style.background = `transparent url('../image/player4.png') center / cover no-repeat`;
                    closeModal();
                }
                startGame();
            }
        });
    }
});

function closeModal() {
    modalStart.classList.add('hide');
}