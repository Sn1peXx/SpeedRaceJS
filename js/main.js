const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'),
      restart = document.querySelector('.btn_res'),
      modal = document.querySelector('.modal__win'),
      modalScore = document.querySelector('.modal_score'),
      modalImg = document.querySelectorAll('.mod__img'),
      modalImg2 = document.querySelectorAll('.mod__img2'),
      modalCar = document.querySelector('.modal__choose-car'),
      modalStart = document.querySelector('.modal__start'),
      btnLvl = document.querySelectorAll('.btn__lvl'),
      mainCar = document.querySelector('.main__car'),
      openStartModall = document.querySelector('.home__modal'),
      modalRecord = document.querySelector('.modal_record'),
      animationText = document.querySelector('.area'),
      downButton = document.querySelector('.fa-sort-down'),
      a = document.querySelectorAll('a'),
      importt = document.querySelector('.important');

modal.classList.add('hide');

car.classList.add('car'); 
 
restart.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

const setting = { 
    start: false,
    score: 0,
    speed: 7,
    traffic: 2
};

let SPEED;
let RECORD = 0;
let COUNT = true;
let FGAME = true;



function getQuantityElements(heightElemnt) {
    return document.documentElement.clientHeight / heightElemnt + 1;
}



// Функция для начала игры
function startGame() {
    score.classList.add('show');
    gameArea.innerHTML = '';
    gameArea.appendChild(animationText);
    animationText.style.zIndex = 2000;
    car.style.left = 45 + "%";
    car.style.top = 'auto';
    car.style.bottom = '10px';
    for( let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        const line2 = document.createElement('div');
        const line3 = document.createElement('div');

        line.classList.add('line');
        line.style.top = (i * 85) + 'px';
        line.y = i * 100;

        line2.classList.add('line');
        line2.style.top = (i * 85) + 'px';
        line2.style.left = (150 + 140) + 'px';
        line2.y = i * 100;

        // 3 линия
        line3.classList.add('line');
        line3.style.top = (i * 85) + 'px';
        line3.style.left = (300 + 140) + 'px';
        line3.y = i * 100;

        gameArea.appendChild(line);
        gameArea.appendChild(line2);
        gameArea.appendChild(line3);
    }

    for (let i = 0; i < getQuantityElements(120 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -310 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth -125)) + 'px';
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

        // Сохраняем рекрод 
        if (setting.score > RECORD) {
            RECORD = setting.score;
            // Появление надписи рекорд
            while(!FGAME) {
                while(COUNT) {
                animationText.innerHTML = 'Рекорд';
                score.classList.remove('show');
                score.classList.add('hide');
                setTimeout(() => {
                    animationText.innerHTML = ''
                    score.classList.add('show');
                    score.classList.remove('hide');
                   
                }, 1800)
                COUNT=false;
            };
            FGAME = true;
        };
        
        //  Если рекорд новый
            score.innerHTML = 'SCORE<br>' + setting.score;
            
            modalRecord.innerHTML = `Новый рекорд: <span class="red">${RECORD}</span>!`;
        } else {
            //  Если рекорд старый
            modalRecord.innerHTML = `Рекорд: <span class="red">${RECORD}</span>!`;
            animationText.innerHTML = ''
            score.classList.add('show');
            score.classList.remove('hide');
            score.innerHTML = 'SCROE<br>' + setting.score;
        }
        
        
        // Записываем RECORD в localStorage
        localStorage.setItem("RECORD", RECORD);
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

    // Открытие новых машин при рекорде
    if (RECORD >= 15000) {
        addImport();
        addRedButton();
        openFirstCar();
    }
    
    if (RECORD >= 30000) {
        addImport1();
        openFirstCar();
        openSecondCar();
    }

    if (RECORD >= 50000) {
        addImport2();
        openFirstCar();
        openSecondCar();
        openThirdCar();
    }

    if (RECORD >= 80000) {
        addImport3();
        openFirstCar();
        openSecondCar();
        openThirdCar();
        openFourthCar();
    }
};

// Запрет выбора закрытого авто
modalImg2.forEach(item => {
    item.style.pointerEvents = 'none';
});

// Переменные для единичного вызова функции
let q = true;
let l = true;
let c = true;
let p = true;
let z = true;


// Добавление анимации и красного цвета для кнопки
function addRedButton () {
    if (l){
        downButton.style.color = "red";
        downButton.classList.add('size');
    }
    l = false;
}

// ДОбавление воскл знака при открытии нового авто
function addImport () {
    if (q){
        importt.classList.remove('hide');
        importt.classList.add('show');
    }
    q = false;
}

function addImport1 () {
    if (c){
        importt.classList.remove('hide');
        importt.classList.add('show');
    }
    c = false;
}

function addImport2 () {
    if (p){
        importt.classList.remove('hide');
        importt.classList.add('show');
    }
    p= false;
}

function addImport3 () {
    if (z){
        importt.classList.remove('hide');
        importt.classList.add('show');
    }
    z = false;
}

// Убираем воскл знак
function removeImport() {
    importt.classList.add('hide');
    importt.classList.remove('show');
}


// Функции для открытия нового авто
function openFirstCar() {
    modalImg2[0].src = './image/mitsubishi_PNG189.png';
    // Изменение курсорв
    modalImg2[0].style.cursor = "pointer"; 
    // Черный цвет для картинки
    modalImg2[0].style.filter = "brightness(1)";
    modalImg2[0].style.pointerEvents = 'auto';
}

function openSecondCar() {
    modalImg2[1].src = './image/porsche.png';
    modalImg2[1].style.cursor = "pointer"; 
    modalImg2[0, 1].style.filter = "brightness(1)";
    modalImg2[0, 1].style.pointerEvents = 'auto';
}

function openThirdCar() {
    modalImg2[2].src = './image/mini.png';
    modalImg2[2].style.cursor = "pointer"; 
    modalImg2[0, 1, 2].style.filter = "brightness(1)";
    modalImg2[0, 1, 2].style.pointerEvents = 'auto';
}

function openFourthCar() {
    modalImg2[3].src = './image/bugatti.png';
    modalImg2[3].style.cursor = "pointer"; 
    modalImg2[0, 1, 2, 3].style.filter = "brightness(1)";
    modalImg2[0, 1, 2, 3].style.pointerEvents = 'auto';
}



function showNewRecord() {
    animationText.classList.remove('hide'); 
    animationText.classList.add('show');
}

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

    //Дорога
    let lines3 = document.querySelectorAll('.line3');
    lines3.forEach((line) => {
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
}

// Закрытие окна после поражения
function closemodal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        setting.speed = SPEED;
        setting.traffic = 2;
        animationText.style.opacity = 1;
        FGAME = false;
        COUNT = true;
}

//Закрытие по Enter
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key == 'Enter') {
        if(document.querySelector(".modal__start").classList.contains("hide") && 
           document.querySelector(".modal__win").classList.contains("show")){
            closemodal();
            startGame();
        }
        
        
    }
});

//Рестарт игры после аварии
restart.addEventListener('click', () => {    
    closemodal();
});


function removeActive() {
    btnLvl.forEach(item => {
        item.classList.remove('active');
    });
}

// Показываем выбранную сложность
function showActive(i = 1) {
    btnLvl[i].classList.add('active');
   
    if (i == 0) {
        SPEED = setting.speed = 7;
        gameArea.style.width = 600 + 'px';
    }

    if (i == 1) {
        SPEED = setting.speed = 10;   
        gameArea.style.width = 440 + 'px';  
    }

    if (i == 2) {
        SPEED = setting.speed = 12;
        gameArea.style.width = 440 + 'px';
    }
}

removeActive();
showActive();

//  Выбор уровня сложности
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
function openStartModa() {
modalCar.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('mod__img')) {
        modalImg.forEach((items, i) => {
            if (target == items) {
                if (i == 0) {
                    car.style.background = `transparent url('../image/player1.png') center / cover no-repeat`;
                    closeModa();
                }
                if (i == 1) {
                    car.style.background = `transparent url('../image/player2.png') center / cover no-repeat`;
                    closeModa();
                }
                if (i == 2) {
                    car.style.background = `transparent url('../image/player3.png') center / cover no-repeat`;
                    closeModa();
                }
                if (i == 3) {
                    car.style.background = `transparent url('../image/player4.png') center / cover no-repeat`;
                    closeModa();
                }
                
                startGame();
            }
        });
    }

    // Выбор машин со 2 страницы
    if (target && target.classList.contains('mod__img2')) {
        modalImg2.forEach((items, i) => {
            if (target == items) {
                if (i == 0) {
                    car.style.background = `transparent url('../image/player5.png') center / cover no-repeat`;
                    closeModa();
                }
                if (i == 1) {
                    car.style.background = `transparent url('../image/player7.png') center / cover no-repeat`;
                    closeModa();
                }
                if (i == 2) {
                    car.style.background = `transparent url('../image/player8.png') center / cover no-repeat`;
                    closeModa();
                }
                if (i == 3) {
                    car.style.background = `transparent url('../image/player6.png') center / cover no-repeat`;
                    closeModa();
                }

                startGame();
            }
        });
    }
});
}

openStartModa();

function closeModa() {
    modalStart.classList.add('hide');
}

//Открытие стартового окна после поражения
function startModalOpen() {
    openStartModall.addEventListener('click', () => {
        removeImport();
        modal.classList.remove('show');
        modal.classList.add('hide');
        modalStart.classList.remove('hide');
    });
}

startModalOpen();

// Показ новый скрытых машин
downButton.addEventListener('click', () => {
    downButton.classList.remove('size');
    downButton.style.color = "black";
    // переворачиваем кнопку 
    downButton.classList.toggle('rotate');   
    showHideCar(); 
});

// Переключение страниц с машиинами
function showHideCar() {
    modalImg.forEach(item => {
        item.classList.toggle("hide");
    });
    
    modalImg2.forEach(item => {
        item.classList.toggle("hide");
    });
}
