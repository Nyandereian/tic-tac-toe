const GB = (() => {
  const gameboard = document.querySelector('.gameboard');
  const cells = Array.from(gameboard.querySelectorAll('td'));

  // Set eventlisteners to inactive when not set
  let active = false;

  const set = () => {
    gameboard.style.display = 'grid';

    let table = gameboard.querySelector('table');
    let rows = Array.from(table.querySelectorAll('tr'));
    let cells = Array.from(table.querySelectorAll('td'));
    setTimeout(() => {
      gameboard.style.opacity = 1;
      table.style.height = '100%';
      table.style.width = '100%';
      rows.forEach(row => row.style.height = '33.33%');
      cells.forEach(cell => cell.style.width = '33.33%');
    }, 100);

    // Set event listeners active aftr transitions ended
    setTimeout(() => {
      showTurn();
      active = true;
    }, 500);
  };

  const fadeOut = () => {
    active = false;
    gameboard.style.opacity = 0;
    gameboard.style.transform = 'scale(0.7)';
    setTimeout(() => {
      gameboard.style.display = 'none';
    }, 400);
  };

  const reset = () => {
    gameboard.removeAttribute('style');

    let table = gameboard.querySelector('table');
    table.removeAttribute('style');

    let rows = Array.from(table.querySelectorAll('tr'));
    rows.forEach(row => row.removeAttribute('style'));

    let cells = Array.from(table.querySelectorAll('td'));
    cells.forEach(cell => {
      cell.removeAttribute('style');
      cell.textContent = '';
      cell.classList.remove('placed');
    });
  };

  let p1Sign;
  let p2Sign;

  const assignSigns = () => {
    let signs = ['O', 'X'];
    p1Sign = signs[Math.floor(Math.random() * 2)];
    p2Sign = (p1Sign == 'O') ? 'X' : 'O';

    let p1SBSign = document.querySelector('.scoreboard-name-1 .sign');
    let p2SBSign = document.querySelector('.scoreboard-name-2 .sign');
    p1SBSign.textContent = `(${p1Sign})`;
    p2SBSign.textContent = `(${p2Sign})`;
  };

  let isBotMatch;
  const setBotMatch = (bool) => isBotMatch = bool;

  let turns = 0;
  const updateTurns = () => {
    turns++; //TODO: if sign is bots sign, trigger ai move
    checkGameOver();
    (!isGameOver) ? showTurn() : hideTurn();
  };

  let p1SBName = document.querySelector('.scoreboard-name-1').firstElementChild;
  let p2SBName = document.querySelector('.scoreboard-name-2').firstElementChild;
  const showTurn = () => {
    if(turns == 0) {
      s = getSign();
      (p1Sign == s) ? p1SBName.classList.add('turn') : p2SBName.classList.add('turn');
    } else {
      p1SBName.classList.toggle('turn');
      p2SBName.classList.toggle('turn');
    }
  }

  const hideTurn = () => {
    p1SBName.classList.remove('turn');
    p2SBName.classList.remove('turn');
  }

  const getSign = () => (turns % 2) ? 'O' : 'X';

  let isGameOver = false;

  const r1 = cells.filter(cell => cell.dataset.cell.includes('1-'));
  const r2 = cells.filter(cell => cell.dataset.cell.includes('2-'));
  const r3 = cells.filter(cell => cell.dataset.cell.includes('3-'));
  const c1 = cells.filter(cell => cell.dataset.cell.includes('-1'));
  const c2 = cells.filter(cell => cell.dataset.cell.includes('-2'));
  const c3 = cells.filter(cell => cell.dataset.cell.includes('-3'));
  const dltr = cells.filter(cell => ['1-1', '2-2', '3-3'].includes(cell.dataset.cell));
  const drtl = cells.filter(cell => ['1-3', '2-2', '3-1'].includes(cell.dataset.cell));
  const lines = {r1, r2, r3, c1, c2, c3, dltr, drtl};
  const winLine = document.querySelector('.win-line');
  const checkGameOver = () => {
    for(let [name, line] of Object.entries(lines)) {
      if(line[0].textContent && line[0].textContent == line[1].textContent && line[1].textContent == line[2].textContent) {
        turns = 0;
        winLine.classList.toggle(name);
        setTimeout(() => getResults(line[0].textContent), 1000);
        setTimeout(() => winLine.classList.toggle(name), 1500);
        isGameOver = true;
      } else if(turns == 9) {
        turns = 0;
        getResults('draw');
        setTimeout(() => isGameOver = true, 600);
      }
    }
  };

  const getResults = (winner) => {
    switch(winner) {
      case 'draw': showResults("It's a draw!"); break;
      case 'O':
        if(p1Sign == 'O') {
          showResults(`${p1.getName()} won!`);
          p1.addWin();
        } else {
          showResults(`${p2.getName()} won!`);
          p2.addWin()
        }
        break;
      case 'X':
        if(p1Sign == 'X') {
          showResults(`${p1.getName()} won!`);
          p1.addWin();
        } else {
          showResults(`${p2.getName()} won!`);
          p2.addWin();
        }
        break;
    }
  };

  const showResults = (msg) => {
    GB.fadeOut();

    let endScreen = document.querySelector('.endscreen');
    document.querySelector('.results p').textContent = msg;
    setTimeout(() => {
      endScreen.style.display = 'block';
    }, 400);

    let results = document.querySelector('.results');
    let buttons = document.querySelector('.endbuttons');
    setTimeout(() => {
      results.style.opacity = 1;
      results.style.transform = "translateY(0)";
      buttons.style.opacity = 1;
      buttons.style.transform = "translateY(0)";

      GB.reset();
      isGameOver = false;
    }, 500);

    buttons.addEventListener('click', e => restart());
  };

  const removeResults = () => {
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
  };

  gameboard.addEventListener('mouseover', e => {
    let t = e.target;
    if(active && t.tagName == "TD" && !t.classList.contains('placed')) {
      if(!isBotMatch || isBotMatch && getSign() != p2Sign) t.textContent = getSign();
    }
  });

  gameboard.addEventListener('mouseout', e => {
    let t = e.target;
    if(active && t.tagName == "TD" && !t.classList.contains('placed')) {
      if(!isBotMatch || isBotMatch && getSign() != p2Sign) t.textContent = '';
    }
  });

  gameboard.addEventListener('click', e => {
    let t = e.target;
    if(active && t.tagName == "TD" && !t.classList.contains('placed')) {
      if(!isBotMatch || isBotMatch && getSign() != p2Sign) {
        t.classList.add('placed');
        t.textContent = getSign();
        updateTurns();
      }
    }
  });

  return {set, fadeOut, reset, assignSigns, showTurn, setBotMatch, showResults, removeResults};
})();

const Player = (pNr) => {
  let name;
  const setName = (n) => name = n;
  const getName = () => name;

  let wins = 0;
  const scoreboardPoint = document.querySelector(`.player${pNr}-points`);
  const addWin =  () => setTimeout(() => scoreboardPoint.textContent = ++wins, 1000);

  return {setName, getName, addWin};
};

const p1 = Player(1);
const p2 = Player(2);


const AI = (() => {

})();
