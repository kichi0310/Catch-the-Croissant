
let score = 0;
let timeLeft = 15;
let gameInterval;
let timerInterval;

const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const resultPopup = document.getElementById('result-popup');
const finalScore = document.getElementById('final-score');
const rewardMessage = document.getElementById('reward-message');

const catchSound = new Audio('catch.mp3');
const rewardSound = new Audio('reward.mp3');

startBtn.addEventListener('click', startGame);

function startGame() {
  startBtn.style.display = 'none';
  timerInterval = setInterval(updateTimer, 1000);
  gameInterval = setInterval(dropCroissant, 800);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft === 0) {
    endGame();
  }
}

function dropCroissant() {
  const croissant = document.createElement('img');
  const isGold = Math.random() < 1 / 20;
  croissant.src = isGold ? 'gold-croissant.png' : 'croissant.png';
  croissant.classList.add('croissant');
  if (isGold) croissant.classList.add('gold');

  croissant.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
  croissant.style.top = '-60px';

  gameArea.appendChild(croissant);

  let fall = setInterval(() => {
    const top = parseInt(croissant.style.top);
    if (top > gameArea.clientHeight) {
      croissant.remove();
      clearInterval(fall);
    } else {
      croissant.style.top = top + 5 + 'px';
    }
  }, 30);

  croissant.addEventListener('click', () => {
    catchSound.play();
    score += isGold ? 50 : 5;
    scoreDisplay.textContent = score;
    croissant.remove();

    if (isGold) {
      rewardSound.play();
      alert('🎉 You caught a Lucky Croissant! Get a surprise reward at Crème & Crust!');
    }
  });
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(gameInterval);
  finalScore.textContent = score;

  let reward = '';
  if (score >= 300) {
    reward = "🏆 'Thợ săn Croissant' Badge + Post vinh danh trên page!";
  } else if (score >= 250) {
    reward = '🥤 1 Cà phê muối hoặc Matcha Latte miễn phí!';
  } else if (score >= 200) {
    reward = '🎉 Giảm 10% hóa đơn từ 150k trở lên!';
  } else {
    reward = '👍 Chơi lại để giành phần thưởng nhé!';
  }

  rewardMessage.innerHTML = `<p>${reward}</p><p>📍 Đến Crème & Crust nhận quà!</p><p><a href='https://m.me/yourfanpage' target='_blank'>Inbox Fanpage ngay!</a></p>`;
  resultPopup.classList.remove('hidden');
}
