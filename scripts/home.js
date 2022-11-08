"use strict";

let isPlaying = false;
let timeElapsed = 0;
let gameInterval;
let gameConfig = {
  "board": 0,
  "gameMode": 0,
  "players": 0
};
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
  let formatedTime = time < 9 ? `0${time}` : new String(time);
  return formatedTime;
}

function clear(interval) {
  clearInterval(interval);
}

function handleNewGame() {
  console.log(gameConfig);
  if(gameConfig.board && gameConfig.players && gameConfig.gameMode) {

    const configElement = document.querySelector('#info-config');
    const modeElement = document.querySelector('#info-mode');
    const playerElement = document.querySelector('#info-players');

    modal1.hide();

    const configString = `${gameConfig.board}x${gameConfig.board}`;
    configElement.innerHTML = configString;

    const modeString = gameConfig.gameMode == 1 ? 'Clássica' : 'Contra o tempo';
    modeElement.innerHTML = modeString;

    const playerString = gameConfig.gameMode == 1 ? 'Single Player' : 'Multiplayer';
    playerElement.innerHTML = playerString;

    startNewGame();
  }
}

function startNewGame(){
  handleTime();
  createBoard();
  isPlaying = true;
}

function createBoard() {
  const gameBoard = document.getElementById('gameboard');
  const sectionBoard = document.createElement('section');
  sectionBoard.classList.add('board');

  for(let i = 0 ; i < gameConfig.board ; i++) {

    const newCard = document.createElement('div');
    newCard.setAttribute('data-card', piecesPath[i].key);
    newCard.classList.add('memory-card');

    const frontCard = document.createElement('img');
    frontCard.setAttribute('src', piecesPath[i].path);
    frontCard.classList.add('front-face');
    newCard.appendChild(frontCard)

    const backCard = document.createElement('img');
    backCard.setAttribute('src', fundoPath.path);
    backCard.classList.add('back-face');
    newCard.appendChild(backCard)

    const dupCard = newCard.cloneNode(true);
    sectionBoard.appendChild(newCard);
    sectionBoard.appendChild(dupCard);

  }
  gameBoard.appendChild(sectionBoard);
}

function clearBoard(boardElement) {
  while(boardElement.firstChild){
    boardElement.removeChild(boardElement.firstChild);
  }
}

function handleTrapaca() {
  if(!isPlaying){
    alert('Jogo ainda não iniciado');
    return;
  }

  const boardElement = document.querySelectorAll('.board-cell');

  boardElement.forEach(element => {
    const cellElement = element.children[0];
    if(cellElement.classList.contains('invisible')){
      cellElement.classList.toggle('invisible');
      setTimeout(() => {
        element.children[0].classList.toggle('invisible');
      }, 5000);
    }
  });

}

function handleClick(event) {
  console.log(event);
  event.path[0].children[0].classList.remove('invisible');
}