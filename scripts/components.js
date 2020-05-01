// Starting animation
(() => {
  let title = document.querySelector('.title h1');
  let form = document.querySelector('.form-wrapper');
  title.addEventListener('animationend', e => {
    document.querySelector('.title').classList.toggle('title-small');
    form.style.visibility = 'visible';
    form.style.opacity = '1';
    form.style.transform = 'translateY(0)';
  });
  title.parentNode.addEventListener('webkitTransitionEnd', e => {
    setTimeout(() => form.firstElementChild[name="player-name"].focus(), 300);
  })
})()


// Form interface
Array.from(document.querySelectorAll('.name'))
     .forEach(input => {
       input.addEventListener('focus', (e) => e.target.placeholder = "Name");
       input.addEventListener('focusout', (e) => e.target.placeholder = "Player");
     });


(() => {
 let radio = document.querySelector('#player2');
 let input = document.querySelector('input[name="player2-name"]');
 input.addEventListener('focus', e => radio.checked = true);
 radio.addEventListener('click', e => input.focus());
})();


// Form handling
document.querySelector('.player-form').addEventListener('submit', e => {
  e.preventDefault();
  let form = e.target;

  Array.from(form.elements).forEach(input => input.disabled = true);

  let submit = form.start;
  submit.classList.toggle('clicked');
  submit.style.cursor = 'default';
  submit.style.opacity = 0;

  let radioButtons = Array.from(document.querySelectorAll('.radio'));
  radioButtons.forEach(radio => radio.style.opacity = '0');

  let player1 = form['player-name'];
  player1.value = player1.value || 'Player 1';

  let opponents = document.querySelector('.opponents');
  let player2Radio = form['player2'];
  let player2 = form['player2-name'];
  let bot = form['bot'];
  if(player2Radio.checked) {
    player2.value = player2.value || 'Player 2';
    opponents.style.top = 'calc(-1 * (1.25rem + 0.049 * (100vw - 20rem)))';
    bot.parentNode.style.opacity = '0';
    var unchecked = bot.parentNode;
    var checked = player2;
  } else {
    player2.parentNode.style.opacity = '0';
    opponents.style.top = 'calc(1.36rem + 0.052 * (100vw - 20rem))';
    var unchecked = player2.parentNode;
    var checked = bot.parentNode.querySelector('.name');
  }

  setTimeout(() => {
    submit.style.visibility = 'hidden';
    radioButtons.forEach(radio => radio.style.visibility = 'hidden');
    unchecked.style.visibility = 'hidden';
    player1.style.transform = 'scale(1.5)';
    checked.style.transform = 'scale(1.5)';
  }, 300);

  let title = document.querySelector('.title h1');

  setTimeout(() => {
    title.style.opacity = '0';
    title.style.transform = '1.5';
    form.parentNode.style.opacity = '0';
    form.parentNode.style.transform = 'translateY(-20%) scale(0.8)';
  }, 700);
})

// TODO: input values must be returned!!!
