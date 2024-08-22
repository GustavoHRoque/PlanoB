const startBtn = document.querySelector("#start"),
  screens = document.querySelectorAll(".screen"),
  timeList = document.querySelector("#time-list"),
  difficultyList = document.querySelector("#difficulty-list"),
  timeEl = document.querySelector("#time"),
  board = document.querySelector("#board");

let time = 0,
  unlimited = false,
  difficulty = 0,
  playing = false,
  hits = 0,
  missed = 0,
  accuracy = "0%",
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
    //fim de jogo
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

function createRandomCircle() {
  if (!playing) {
    //Se estiver jogando a função "false" não faz nada
    return;
  }

  const circle = document.createElemet("div");
  const size = getRandomNumber(30, 100);
  const colors = ["#03DAC6", "#FF0266", "#b3ff00", "#ccff00", "#9D00FF"];
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  let color = Math.floor(Math.random() * 5);
  circle.style.background = `${colors[color]}`;
  board.append(circle);
}

function getRandomNumber(min, max) {
  //pega um aleatorio entre o minimo e o máximo
  return Math.random(Math.floor() * (max - min) + min);
}
