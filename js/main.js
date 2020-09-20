const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'),
      restart = document.querySelector('.btn_res'),
      modal = document.querySelector('.modal__win'),
      modalScore = document.querySelector('.modal_score'),
      modalImg = document.querySelectorAll('.mod__img'),
      modalCar = document.querySelector('.modal__choose-car'),
      modalStart = document.querySelector('.modal__start');

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
    speed: 5,
    traffic: 3
};

function getQuantityElements(heightElemnt) {
    return document.documentElement.clientHeight / heightElemnt + 1;
}

function startGame() {
    score.classList.add('show');
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    for( let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 85) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -150 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 95)) + 'px';
        enemy.style.top = enemy.y + 'px';
        
        //Рандомный выбор машины enemy
        function chooseRandomCar() {
            let a = Math.round(Math.random()*7); 
        
            image = ['../image/enemy1.png', '../image/enemy2.png', '../image/enemy3.png', '../image/enemy4.png', '../image/enemy5.png', '../image/enemy6.png', '../image/enemyBig.png'];
            enemy.style.background = `transparent url(${image[a]}) center / cover no-repeat`;
        
            gameArea.appendChild(enemy);
        }

        chooseRandomCar();
    }


    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
    
};

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

        speedEnemy(5000);
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

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

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

// Изменение скорости enemy
function speedEnemy(startSpeed) {

    if (setting.score >= startSpeed) {
        setting.traffic = 2;
    }

    if (setting.score >= (startSpeed * 2)) {
        setting.speed = 6;
        setting.traffic = 3;
    }

    if (setting.score >= (startSpeed * 3)) {
        setting.speed = 7;
        setting.traffic = 3;
    }

    if (setting.score >= (startSpeed * 4)) {
        setting.speed = 8;
        setting.traffic = 2;
    }
}

function openEndModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    modalScore.innerHTML = `Ваш результат: ${setting.score}`;
}

function closemodal() {
    restart.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        setting.speed = 5;
        setting.traffic = 3;
    });

}

closemodal();


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