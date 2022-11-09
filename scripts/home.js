"use strict";

// Configurações do jogo
const POINT_VALUE = 10;
let singlePlayer;
let timeElapsed = 0;
let gameInterval;
let isPlaying = false;
let hasFlippedCard = false;
let lockBoard = false;
let card1, card2;
let score = {
  player1: 0,
  player2: 0
};
let gameConfig = {
  "board": 0,
  "gameMode": 0,
  "players": 0
};
let isPlayerOne = true;
let cards;

// Caminhos das imagens
let fundoPath = {path: './assets/peças_jpg/dado.png', key: 'dado' };
let piecesPath = [
  {path: './assets/peças_jpg/arch.png', key: 'arch' },
  {path: './assets/peças_jpg/bat.png', key: 'bat' },
  {path: './assets/peças_jpg/bomb.png', key: 'bomb' },
  {path: './assets/peças_jpg/book.png', key: 'book' },
  {path: './assets/peças_jpg/boots.png', key: 'boots' },
  {path: './assets/peças_jpg/chest.png', key: 'chest' },
  {path: './assets/peças_jpg/dagger.png', key: 'dagger' },
  {path: './assets/peças_jpg/demon_mage.png', key: 'demon_mage' },
  {path: './assets/peças_jpg/demon.png', key: 'demon' },
  {path: './assets/peças_jpg/dinamite.png', key: 'dinamite' },
  {path: './assets/peças_jpg/flag.png', key: 'flag' },
  {path: './assets/peças_jpg/ghost.png', key: 'ghost' },
  {path: './assets/peças_jpg/goblin_mg.png', key: 'goblin_mg' },
  {path: './assets/peças_jpg/goblin.png', key: 'goblin' },
  {path: './assets/peças_jpg/gold.png', key: 'gold' },
  {path: './assets/peças_jpg/hammer.png', key: 'hammer' },
  {path: './assets/peças_jpg/helmet.png', key: 'helmet' },
  {path: './assets/peças_jpg/key.png', key: 'key' },
  {path: './assets/peças_jpg/mage.png', key: 'mage' },
  {path: './assets/peças_jpg/ogre.png', key: 'ogre' },
  {path: './assets/peças_jpg/poison.png', key: 'poison' },
  {path: './assets/peças_jpg/potion.png', key: 'potion' },
  {path: './assets/peças_jpg/rune.png', key: 'rune' },
  {path: './assets/peças_jpg/rupee.png', key: 'rupee' },
  {path: './assets/peças_jpg/shield.png', key: 'shield' },
  {path: './assets/peças_jpg/skeleton.png', key: 'skeleton' },
  {path: './assets/peças_jpg/slime.png', key: 'slime' },
  {path: './assets/peças_jpg/sword.png', key: 'sword' },
  {path: './assets/peças_jpg/thief.png', key: 'thief' },
  {path: './assets/peças_jpg/torch.png', key: 'torch' },
  {path: './assets/peças_jpg/trophy.png', key: 'trophy' },
  {path: './assets/peças_jpg/warrior.png', key: 'warrior' }
];


// Modal
const modal1 = new Modal("my-modal-1");

document.getElementById('show-modal-1').addEventListener('click', (e) => {
    modal1.show();
});

init();

function init() {
  loadGameModes();
  loadBoardConfig();
  loadPlayerConfig();
}

function loadPlayerConfig(){
  const players = ['Single Player', 'Multiplayer'];
  const selectElement = document.querySelector('#config-player');

  players.forEach((e, index) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', index + 1);
    newOption.textContent = e;
    selectElement.appendChild(newOption);
  });
}

function loadGameModes() {
  const gameModes = ['Clássica', 'Contra o tempo'];
  const selectElement = document.querySelector('#config-mode');

  gameModes.forEach((e, index) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', index + 1);
    newOption.textContent = e;
    selectElement.appendChild(newOption);
  });
}

function loadBoardConfig() {
  const boardSizes = [2, 4, 6, 8];

  const selectElement = document.querySelector('#config-tab');

  boardSizes.forEach((e) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', e);
    newOption.textContent = `${e}x${e}`;
    selectElement.appendChild(newOption);
  });
}

function handlePlayers() {
  const selectElement = document.querySelector('#config-player');
  var value = selectElement.options[selectElement.selectedIndex].label;
  gameConfig.players = value === 'Single Player' ? 1 : 2;
  singlePlayer = gameConfig.players === 1;
}

function handleBoard() {
    const selectElement = document.querySelector('#config-tab');
    var value = selectElement.options[selectElement.selectedIndex].value;
    gameConfig.board = Number(value);
}

function handleMode() {
  const selectElement = document.querySelector('#config-mode');
  var value = selectElement.options[selectElement.selectedIndex].value;
  gameConfig.gameMode = Number(value); 
}

function handleTime() {
  console.log(gameConfig.gameMode);
  const minutes = 1 * gameConfig.gameMode;
  if(gameConfig.gameMode === 1) {
    if (!isPlaying && timeElapsed == 0) {
      const timerElement = document.querySelector("#info-time");
      gameInterval = setInterval(function () {
        let minutes = Math.floor(timeElapsed / 60);
        let seconds = timeElapsed % 60;
        timerElement.innerHTML = formatTime(minutes) + ":" + formatTime(seconds);
        timeElapsed++;
      }, 1000);
    } else {
      isPlaying = false;
      timeElapsed = 0;
      clear(gameInterval);
      handleTime();
    }
  }else {
    timeElapsed = minutes * 10;
    console.log('Tempo no contra o tempo ' + timeElapsed);
    if (!isPlaying && timeElapsed !== 0) {
      const timerElement = document.querySelector("#info-time");
      gameInterval = setInterval(function () {
        let minutes = Math.floor(timeElapsed / 60);
        let seconds = timeElapsed % 60;
        timerElement.innerHTML = formatTime(minutes) + ":" + formatTime(seconds);
      if (timeElapsed !== 0){
        timeElapsed--;
      }else {
        gameOver();
        clear(gameInterval);
      };
      console.log(timeElapsed);
      }, 1000);
    } else {
      isPlaying = false;
      timeElapsed = 0;
      clear(gameInterval);
      handleTime();
    }
  }

}

function gameOver(){
  const gameBoard = document.getElementById('gameboard');
  alert('Perdeu o jogo, seu tempo acabou');
  clearBoard(gameBoard);
}

function formatTime(time) {
  let formatedTime = time <= 9 ? `0${time}` : new String(time);
  return formatedTime;
}

function clear(interval) {
  clearInterval(interval);
}

function handleNewGame() {
  if(gameConfig.board && gameConfig.players && gameConfig.gameMode) {

    const configElement = document.querySelector('#info-config');
    const modeElement   = document.querySelector('#info-mode');
    const playerElement = document.querySelector('#info-players');
    const pointsElement = document.querySelector('#info-points');

    modal1.hide();

    const configString = `${gameConfig.board}x${gameConfig.board}`;
    configElement.innerHTML = configString;

    const modeString = gameConfig.gameMode === 1 ? 'Clássica' : 'Contra o tempo';
    modeElement.innerHTML = modeString;

    const playerString = gameConfig.players === 1 ? 'Single Player' : 'Multiplayer';
    playerElement.innerHTML = playerString;

    const pointsString = gameConfig.players === 1 ? `${score.player1}` : `P1:${score.player1} | P2: ${score.player2}`;
    pointsElement.innerHTML = pointsString;

    startNewGame();
  }
}

function startNewGame(){
  const gameBoard = document.getElementById('gameboard');
  clearBoard(gameBoard);
  handleTime();
  createBoard();
  isPlaying = true;
}

function createBoard() {
  const gameBoard = document.getElementById('gameboard');
  const sectionBoard = document.createElement('section');
  const boardSize = 100 * gameConfig.board;
  sectionBoard.classList.add('board');
  sectionBoard.style.width = boardSize + 'px';

  const numberOfCards = (gameConfig.board * gameConfig.board) / 2;

  for(let i = 0 ; i < numberOfCards; i++){

    for(let j = 0 ; j < 2 ; j++) {
      const newCard = document.createElement('div');
      newCard.setAttribute('data-card', piecesPath[i].key);
      newCard.classList.add('memory-card');
    
      // Criação da frente da carta
      const frontCard = document.createElement('img');
      frontCard.setAttribute('src', piecesPath[i].path);
      frontCard.classList.add('front-face');
      newCard.appendChild(frontCard);
    
      // Criação do fundo da carta
      const backCard = document.createElement('img');
      backCard.setAttribute('src', fundoPath.path);
      backCard.classList.add('back-face');
      newCard.appendChild(backCard);

      newCard.addEventListener('click', flip);

      // Adicionando a nova carta ao conjunto de cartas
      sectionBoard.appendChild(newCard);
    }

  }

  gameBoard.appendChild(sectionBoard);
  shuffle();
}

function clearBoard(boardElement) {
  while(boardElement.firstChild){
    boardElement.removeChild(boardElement.firstChild);
  }
}

function shuffle() {
  const cards = document.querySelectorAll('.memory-card');
  const numberOfCards = (gameConfig.board * gameConfig.board);
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * numberOfCards);
    card.style.order = randomPos;
  });
}

function flip(){
  if(lockBoard) return;
  if(this === card1) return;

  this.classList.add('flip');

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    card1 = this;

    return;
  }

  card2 = this;

  check();
}

function check() {
  if(singlePlayer){
    const pointsElement = document.getElementById('info-points');
    pointsElement.innerHTML = ++score.player1;
  }
  let match = card1.getAttribute('data-card') === card2.getAttribute('data-card');
  match ? disableCards() : unflipCards();
  checkWinner();
}

function disableCards() {
  card1.removeEventListener('click', flip);
  card2.removeEventListener('click', flip);

  resetBoard();
  countPoint();
}

function countPoint() {
  const pointsElement = document.querySelector('#info-points');
  
  if(isPlayerOne && !singlePlayer){
    score.player1 += POINT_VALUE;
  }else{
    score.player2 += POINT_VALUE;
  }

  isPlayerOne = !isPlayerOne;

  const pointsString = singlePlayer ? `${score.player1}` : `P1:${score.player1} | P2: ${score.player2}`;
  pointsElement.innerHTML = pointsString;
  
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [card1, card2] = [null, null];
}

function checkWinner() {
  const cards = document.querySelectorAll('.flip');
  const endGame = cards.length === (gameConfig.board * gameConfig.board);

  if(endGame){
    if(gameConfig.players === 1){
      const gameBoard = document.getElementById('gameboard');
      clearBoard(gameBoard);
      alert(`Venceu o jogo com ${score.player1} jogadas.`);
    }else{
      const winner = score.player1 > score.player2 ? `O jogador 1 venceu o jogo com ${score.player1} pontos.` : `O jogador 1 venceu o jogo com ${score.player2} pontos.`
      alert(winner);
    }
    clear(gameInterval);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    card1.classList.remove('flip');
    card2.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function handleTrapaca() {
  if(!isPlaying){
    alert('Jogo ainda não iniciado');
    return;
  }
  const cards = document.querySelectorAll('.memory-card');

  cards.forEach(e => {
    e.classList.add('flip');
    setTimeout(() => {
      e.classList.remove('flip');
    }, 5000);
  })

  console.log(cards);

}