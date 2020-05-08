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
    var isBot = false;
  } else {
    var opponentName = document.querySelector('label[for="bot"] .name').textContent;
    player2.parentNode.style.opacity = '0';
    opponents.style.top = 'calc(1.36rem + 0.052 * (100vw - 20rem))';
    var unchecked = player2.parentNode;
    var checked = bot.parentNode.querySelector('.name');
    var isBot = true;
  }

  // set player names to objects;
  p1.setName(player1Name);
  p2.setName(opponentName);

  // set bootmatch or pvp
  GB.setBotMatch(isBot);

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
  GB.assignSigns();

  // Enter gameboard screen
  setTimeout(() => {
    setMainScreen();
  }, 1400);

  setTimeout(() => {
    GB.set();
  }, 4200);
});

function setMainScreen() {
  let scoreboardUp = document.querySelector('.scoreboard-up');
  let scoreboardDown = document.querySelector('.scoreboard-down');
  let bg = document.querySelector('.background');
  let footer = document.querySelector('.footer');
  let lines = Array.from(document.querySelectorAll('.line'));

  bg.style.opacity = 0.05;
  scoreboardUp.style.opacity = 1;
  scoreboardUp.style.transform = 'translate(0)';
  scoreboardDown.style.opacity = 1;
  scoreboardDown.style.transform = 'translate(0)';
  lines.forEach(line => line.style.flexGrow = '1');
  footer.style.opacity = 0.5;
}

function restart() {
  GB.removeResults();
  GB.assignSigns();
  setTimeout(() => {
    GB.set();
  }, 600);
}
