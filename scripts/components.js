// Starting animation
(() => {
  // Apply visual fade-in effects
  let title = document.querySelector('.title h1');
  let form = document.querySelector('.form-wrapper');
  setTimeout(() => {
    document.querySelector('.title').classList.toggle('title-small');
    form.style.visibility = 'visible';
    form.style.opacity = '1';
    form.style.transform = 'translateY(0)';
  }, 1800);

  title.classList.toggle('typing-animation');

  // Autofocus on player 1 name input for an efficient flow
  title.parentNode.addEventListener('webkitTransitionEnd', e => {
    setTimeout(() => form.firstElementChild[name="player-name"].focus(), 300);
  });

  configForm();
})();

// Create smooth form UI
function configForm() {
  // Tell user to enter name
  Array.from(document.querySelectorAll('.name'))
       .forEach(input => {
         input.addEventListener('focus', (e) => e.target.placeholder = "Name");
         input.addEventListener('focusout', (e) => e.target.placeholder = "Player");
       });
  // Smooth player 2 selection
  let radio = document.querySelector('#player2');
  let player2 = document.querySelector('input[name="player2-name"]');
  player2.addEventListener('focus', e => radio.checked = true);
  radio.addEventListener('click', e => player2.focus());
}

function removeFormButtons(form) {
  // Disable form elements so they can't be changed / clicked during animations
  Array.from(form.elements).forEach(input => input.disabled = true);

  // Smoothly remove start button through transitions
  let submit = form.start;
  submit.classList.toggle('clicked');
  submit.style.cursor = 'default';
  submit.style.opacity = 0;

  // Remove radio buttons too
  let radioButtons = Array.from(document.querySelectorAll('.radio'));
  radioButtons.forEach(radio => radio.style.opacity = '0');

  setTimeout(() => {
    submit.style.visibility = 'hidden';
    radioButtons.forEach(radio => radio.style.visibility = 'hidden');
  }, 400);
}

function playerSelectionHandler(form) {
  // Give default name when no input is given for user-friendliness
  let player1 = form['player-name'];
  let player1Name = player1.value = player1.value || 'Player 1';

  // Check selected opponent and remove the other to get a vs screen
  // Adjust top / bottom for horizontal text alignment
  let opponents = document.querySelector('.opponents');
  let player2Radio = form['player2'];
  let player2 = form['player2-name'];
  let bot = form['bot'];
  if(player2Radio.checked) {
    var opponentName = player2.value = player2.value || 'Player 2';
    opponents.style.top = 'calc(-1 * (1.25rem + 0.049 * (100vw - 20rem)))';
    bot.parentNode.style.opacity = '0';
    var unchecked = bot.parentNode;
    var checked = player2;
  } else {
    var opponentName = document.querySelector('label[for="bot"] .name').textContent;
    player2.parentNode.style.opacity = '0';
    opponents.style.top = 'calc(1.36rem + 0.052 * (100vw - 20rem))';
    var unchecked = player2.parentNode;
    var checked = bot.parentNode.querySelector('.name');
  }

  // Set player names in scoreboard
  document.querySelector('.scoreboard-name-1 p').textContent = player1Name;
  document.querySelector('.scoreboard-name-2 p').textContent = opponentName;

  // Wait for transitions to end before hiding the visibility
  // for a fade-out effect
  setTimeout(() => {
    unchecked.style.visibility = 'hidden';
    // Emphasize the opponents on the vs screen
    player1.style.transform = 'scale(1.5)';
    checked.style.transform = 'scale(1.5)';
  }, 300);
}

function fadeOutForm(form) {
  let title = document.querySelector('.title h1');

  // Apply effects for smooth transitioning to the play screen
  setTimeout(() => {
    title.style.opacity = '0';
    title.style.transform = 'scale(0.6)';
    form.parentNode.style.opacity = '0';
    form.parentNode.style.transform = 'translateY(-20%) scale(0.8)';
  }, 700);

  setTimeout(() => {
    form.parentNode.style.display = 'none';
    title.parentNode.style.display = 'none';
  }, 1300);
}

// Form handling
document.querySelector('.player-form').addEventListener('submit', e => {
  e.preventDefault();
  let form = e.target;
  removeFormButtons(form);
  playerSelectionHandler(form);
  fadeOutForm(form);
  assignSigns();

  // Enter gameboard screen
  setTimeout(() => {
    setMainScreen();
  }, 1400);

  setTimeout(() => {
    setBoard();
  }, 4200);
});

function setMainScreen() {
  let scoreboardUp = document.querySelector('.scoreboard-up');
  let scoreboardDown = document.querySelector('.scoreboard-down');
  let bg = document.querySelector('.background');
  let footer = document.querySelector('.footer');
  let lines = Array.from(document.querySelectorAll('.line'));
  let gameboard = document.querySelector('.gameboard');

  bg.style.opacity = 0.05;
  scoreboardUp.style.opacity = 1;
  scoreboardUp.style.transform = 'translate(0)';
  scoreboardDown.style.opacity = 1;
  scoreboardDown.style.transform = 'translate(0)';
  lines.forEach(line => line.style.flexGrow = '1');
  footer.style.opacity = 0.5;
}

function setBoard() {
  let gameboard = document.querySelector('.gameboard');
  gameboard.style.display = 'grid';

  let table = gameboard.querySelector('table');
  let rows = Array.from(table.querySelectorAll('tr'));
  let cells = Array.from(table.querySelectorAll('td'));
  setTimeout(() => {
    gameboard.style.opacity = 1;
    table.style.height = '100%';
    table.style.width = '100%';
    rows.forEach(row => row.style.height = '30%');
    cells.forEach(cell => cell.style.width = '30%');
  }, 100);
}

function assignSigns() {
  let signs = ['O', 'X'];
  let p1Sign = document.querySelector('.scoreboard-name-1 .sign');
  let p2Sign = document.querySelector('.scoreboard-name-2 .sign');
  p1Sign.textContent = `(${signs[Math.floor(Math.random() * 2)]})`;
  p2Sign.textContent = (p1Sign.textContent == '(O)') ? '(X)' : '(O)';
}

function showResults() {
  let gameboard = document.querySelector('.gameboard');
  gameboard.style.opacity = 0;
  gameboard.style.transform = 'scale(0.7)';

  let endScreen = document.querySelector('.endscreen');
  setTimeout(() => {
    gameboard.style.display = 'none';
    endScreen.style.display = 'block';
  }, 400);

  let results = document.querySelector('.results');
  let buttons = document.querySelector('.endbuttons');
  setTimeout(() => {
    results.style.opacity = 1;
    results.style.transform = "translateY(0)";
    buttons.style.opacity = 1;
    buttons.style.transform = "translateY(0)";

    resetGameboard(gameboard);
  }, 500);

  buttons.addEventListener('click', e => restart());
}

function removeEndScreen() {
  let endScreen = document.querySelector('.endscreen');
  let results = document.querySelector('.results');
  let buttons = document.querySelector('.endbuttons');

  results.style.opacity = 0;
  buttons.style.opacity = 0;

  setTimeout(() => {
    results.removeAttribute('style');
    buttons.removeAttribute('style');
    endScreen.removeAttribute('style');
  }, 600);
}

function resetGameboard(gameboard) {
  gameboard.removeAttribute('style');

  let table = gameboard.querySelector('table');
  table.removeAttribute('style');

  let rows = Array.from(table.querySelectorAll('tr'));
  rows.forEach(row => row.removeAttribute('style'));

  let cells = Array.from(table.querySelectorAll('td'));
  cells.forEach(cell => cell.removeAttribute('style'));
}

function restart() {
  removeEndScreen();
  assignSigns();
  setTimeout(() => {
    setBoard();
  }, 600);
}
