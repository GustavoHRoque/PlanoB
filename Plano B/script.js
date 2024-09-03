const startBtn = document.querySelector("#start"),
  screens = document.querySelectorAll(".screen"),
  timeList = document.querySelector("#time-list"),
  difficultyList = document.querySelector("#difficulty-list"),
  timeEl = document.querySelector("#time"),
  board = document.querySelector("#board"),
  hitsEl = document.querySelector("#hits"),
  accuracyEl = document.querySelector("#accuracy"),
  hitsOver = document.querySelector("#hits-over"),
  accuracyOver = document.querySelector("#accuracy-over"),
  hearts = document.querySelector(".heart"),
  restartBtns = document.querySelectorAll(".restart"),
  fullScreenBtn = document.querySelector("#fullscreen"),
  minimizeBtn = document.querySelector("#minimize");

let time = 0,
  unlimited = false,
  difficulty = 0,
  playing = false,
  hits = 0,
  missed = 0,
  accuracy = 0,
  interval;

startBtn.addEventListener("click", () => {
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    unlimited = event.target.getAttribute("data-unlimited");
    screens[1].classList.add("up");
  }
});

difficultyList.addEventListener("click", (e) => {
  if (e.target.classList.contains("difficulty-btn")) {
    difficulty = e.target.getAttribute("data-difficulty");
    screens[2].classList.add("up");
    startGame();
  }
});

function startGame() {
  playing = true;
  interval = setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  //se ilimitado for selecionado
  if (unlimited) {
    setTime("∞");
    return;
  }
  if (time === 0) {
    //o jogo acaba quando atinge 0
    finishGame();
  }
  let current = --time;
  let miliseconds = time * 1000;

  let minutes = Math.floor(miliseconds / (1000 * 60));
  let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

  //Adicionando contagem ate 0

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  setTime(`${minutes}:${seconds}`);
}

function setTime(time) {
  timeEl.innerHTML = time;
}

// function createRandomCircle() {
//   if (!playing) {
//     //Se estiver jogando a função "false" não faz nada
//     return;
//   }

//   const circle = document.createElement("div");
//   const size = getRandomNumber(30, 100);
//   const colors = ["#03DAC6", "#FF0266", "#b3ff00", "#ccff00", "#9D00FF"];
//   const { width, height } = board.getBoundingClientRect();
//   const x = getRandomNumber(0, width - size);
//   const y = getRandomNumber(0, height - size);
//   circle.classList.add("circle");
//   circle.style.width = `${size}px`;
//   circle.style.height = `${size}px`;
//   circle.style.top = `${y}px`;
//   circle.style.left = `${x}px`;

//   let color = Math.floor(Math.random() * 5);
//   circle.style.background = `${colors[color]}`;
//   board.append(circle);

//   //Configurações de dificuldade!

//   if (difficulty === 1) {
//     circle.style.animationDuration = "2s";
//   } else if (difficulty === 2) {
//     circle.style.animationDuration = "1s";
//   } else {
//     circle.style.animationDuration = "3s";
//   }

//   //Criar um circulo novo quando o atual desaparecer

//   circle.addEventListener("animationend", () => {
//     circle.remove();
//     createRandomCircle();

//     //se o circulo sumir é um erro

//     addMissed();
//calcula a precisão apos um erro
//  calculateAccuracy();
//   });
// }

//acionar um evento quando clicar no circulo

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    //aumentar acerto em 1
    hits++;
    //remover circulo
    e.target.remove();
    //criar novo circulo
    createRandomCircle();
  } else {
    //se não clicar em um circulo é um erro
    missed++;
  }

  //mostrar acertos no documento
  hitsEl.innerHTML = hits;
  //Mostrar precisão
  calculateAccuracy();
});

function finishGame() {
  playing = false;
  clearInterval(interval);
  board.innerHTML = "";
  screens[3].classList.add("up");
  hitsEl.innerHTML = 0;
  timeEl.innerHTML = "00:00";
  accuracy.innerHTML = "0%";

  //Atualizar status

  hitsOver.innerHTML = hits;
  accuracyOver.innerHTML = `${accuracy}%`;
}

function addMissed() {
  //se um circulo sumir perde vida e precisão
  if (
    hearts[0].classList.contains("dead") &&
    hearts[1].classList.contains("dead") &&
    hearts[2].classList.contains("dead")
  ) {
    //se não tiver corações
    finishGame();
  } else {
    //se tiver corações
    missed++;

    //e perde um coração

    for (let i = 0; i < hearts.length; i++) {
      if (!hearts[i].classList.contains("dead")) {
        hearts[i].classList.add("dead");
        break;
      }
    }
  }
}

function calculateAccuracy() {
  accuracy = (hits / (hits + missed)) * 100;
  accuracy = accuracy.toFixed(2);
  accuracyEl.innerHTML = `${accuracy}%`;
}

function getRandomNumber(min, max) {
  //pega um aleatorio entre o minimo e o máximo
  return Math.random(Math.floor() * (max - min) + min);
}

restartBtns.forEach((btn) => {
  btn.addEventListener("click", restartGame);
});

function restartGame() {
  finishGame();
  screens[1].classList.remove("up");
  screens[2].classList.remove("up");
  screens[3].classList.remove("up");
  time = 0;
  difficulty = 0;
  hits = 0;
  missed = 0;
  accuracy = 0;
  playing = false;
  unlimited = false;
  hearts.forEach((heart) => {
    heart.classList.remove("dead");
  });
}

fullScreenBtn.addEventListener("click", fullScreen);

let elem = document.documentElement;

function fullScreen() {
  //
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  } else if (elem.msRequestFullScreen) {
    elem.msRequestFullScreen();
  }

  //esconder o botão de fullscreen e manter o de minimizar
  fullScreenBtn.style.display = "none";
  minimizeBtn.style.display = "block";
}

minimizeBtn.addEventListener("click", minimize);

function minimize() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen();
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen();
  }

  //esconder o botão de minimizar e manter o de fullscreen
  minimizeBtn.style.display = "none";
  fullScreenBtn.style.display = "block";
}
