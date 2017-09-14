 var teamX = {
  piece: 'X'
};

var teamO = {
  piece: 'O'
};

var line = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var board = [];

var boardPos;
var linePos;
var currentPos = ' '
var winArr = [];



var displayedBoard = document.querySelector('.board');
var xTurnBox = document.querySelector('.xturn-box');
var oTurnBox = document.querySelector('.oturn-box');
var results = document.querySelector('.results');
var resetBtn = document.querySelector('.reset-ttt');
var xWins = document.querySelector('.x-wins');
var oWins = document.querySelector('.o-wins');
var changeBtn = document.querySelector('.change-game');
var flipper = document.querySelector('.flipper');
var hangman = document.querySelector('.hangman');
var tictactoe = document.querySelector('.tictactoe');

var createBoard = function() {
  while (board.length < 3) {
    board.push(line.splice(0,3));
  }
}
  
var pickTrueorFalse = function() {
  var randomNo = Math.random();
  if (randomNo < 0.5) {
    return true;
  } else {
    return false;
  }
};

var displayTurn = function() {
  if (turn === true) {
    oTurnBox.style.opacity = 0
    xTurnBox.style.opacity = 1;
  } else {
    xTurnBox.style.opacity = 0;
    oTurnBox.style.opacity = 1;
  }
}

var capturePos = function() {
  if (event.target.className === 'board') {
    return;
  } else if (event.target.className === 'tablerows') {
    return;
  } else {
    boardPos = event.target.dataset['1st'];
    linePos = event.target.dataset['2nd'];
    currentPos = event.target.classList[0];
    if (board[boardPos][linePos] !== " ") {
      return;
    } else
      runTurn();
  }
}


var playerTurn = function(team, boardPos, linePos, currentPos) {
  if (board[boardPos][linePos] === ' ') {
    board[boardPos][linePos] = team.piece;
    var boxToChange = document.querySelector('.' + currentPos);
    boxToChange.textContent = team.piece;
    if (team === teamX) {
      boxToChange.classList.add('red');
    } else {
      boxToChange.classList.add('blue');
    }
  } else {
    return;
  }
  displayTurn();
  checkWin(team);
  checkDraw();
}

var runTurn = function() {
  if (turn === true) {
    turn = false;
    playerTurn(teamX, boardPos, linePos, currentPos);
  } else {
    turn = true;
    playerTurn(teamO, boardPos, linePos, currentPos);
  }
};

var checkWin = function(team) {
horizWin(team);
vertWin(team);
diagWin(team);
};

var horizWin = function(team) {
  board.forEach(function(line) {
    winArr.push(line);
    horiz = winArr[0].join('');
    if (horiz === 'XXX' || horiz === 'OOO') {
      displayWin(team);
      winArr.splice(0,3);
    } else {
      winArr.splice(0,3);
    }
  })
};

var vertWin = function(team) {
  for (var i = 0; i < board.length; i++) {
    board.forEach(function(line) {
      winArr.push(line[i])
      })
    vert = winArr.join('');
    if (vert === 'XXX' || vert === 'OOO') {
      displayWin(team);
      winArr.splice(0,3);
    } else {
      winArr.splice(0,3);
    }
  }
};

var diagWin = function (team) {
  winArr.push(board[0][0]);
  winArr.push(board[1][1]);
  winArr.push(board[2][2]);
  diag = winArr.join('');
    if (diag === 'XXX' || diag === 'OOO') {
      displayWin(team);
      winArr.splice(0,3);
    } else {
        winArr.splice(0,3);
        winArr.push(board[0][2]);
        winArr.push(board[1][1]);
        winArr.push(board[2][0]);
        diag = winArr.join('');
        if (diag === 'XXX' || diag === 'OOO') {
          displayWin(team);
          winArr.splice(0,3);
        } else {
          winArr.splice(0,3);
    }
  }
};

var displayWin = function(team) {
  oTurnBox.style.opacity = 0;
  xTurnBox.style.opacity = 0;
  var winBox = document.createElement('div');
  winBox.className = 'win-box';
  if (team === teamX) {
    winBox.classList.add('red')
    win = createWinRecord();
    xWins.appendChild(win);
  } else {
    winBox.classList.add('blue')
    win = createWinRecord();
    oWins.appendChild(win);
  }
  winBox.textContent = team.piece + " WINS!";
  results.appendChild(winBox);
  results.classList.add('cover-all');
  results.style.display = 'block';
}

var createWinRecord = function () {
  var win = document.createElement('li');
  win.textContent = 'I';
  return win;
}

var reset = function () { 
  resetWinBox();
  resetBoardValues();
  resetBoard();
  resetHangman();
}

var resetWinBox = function () {
  if (results.hasChildNodes()) {
    var winBox = document.querySelector('.win-box');
    results.removeChild(winBox);
    results.style.display = 'none';
  }
};

var resetBoardValues = function () {
  turn = pickTrueorFalse();
  displayTurn();
  for (var i = 1; i <= 9; i++) {
    var boxToClear = document.querySelector('.pos' + i);
    boxToClear.textContent = ' ';
    if (boxToClear.classList.length === 2) {
      boxToClear.classList.remove('red', 'blue');
    }
  }
};

var resetBoard = function () {
  line = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  board = [];
  createBoard();
  displayedBoard = document.querySelector('.board');
  displayedBoard.addEventListener('click', capturePos);
};

var checkDraw = function () {
  var drawArr = [];
  board.forEach(function(line) {
    drawArr.push(line);
    })
  var wholeBoard = drawArr[0].concat(drawArr[1], drawArr[2]);
  var blank = wholeBoard.indexOf(' ');
  if (blank < 0) {
    if (results.hasChildNodes() === false) {
      var winBox = document.createElement('div');
      winBox.className = 'win-box';
      winBox.textContent = 'Draw!';
      results.appendChild(winBox);
      results.classList.add('cover-all');
      results.style.display = 'block';
    }
  }
};

var flip = function () {
  flipper.classList.toggle("flip");
  tictactoe.classList.add('display-none');
  hangman.classList.remove('display-none');
}

var turn = pickTrueorFalse();
createBoard();
displayTurn();
hangman.classList.add('display-none');
displayedBoard.addEventListener('click', capturePos);
changeBtn.addEventListener('click', flip);
results.addEventListener('click', reset);
resetBtn.addEventListener('click', reset);
