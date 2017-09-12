 var teamX = {
  piece: 'X'
};

var teamO = {
  piece: 'O'
};
var line = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
var board = [];

var boardPos;
var linePos;
var currentPos = ' '
var winArr = [];

var displayedBoard = document.querySelector('.board');
var xTurnBox = document.querySelector('.xturn-box');
var oTurnBox = document.querySelector('.oturn-box');
var results = document.querySelector('.results');

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
  } else {
    boardPos = event.target.dataset['1st'];
    linePos = event.target.dataset['2nd'];
    currentPos = event.target.className;
  }
  runTurn();
}


var playerTurn = function(team, boardPos, linePos, currentPos) {
  if (board[boardPos][linePos] === ' ') {
    board[boardPos][linePos] = team.piece;
    var boxToChange = document.querySelector('.' + currentPos);
    boxToChange.textContent = team.piece;
  } else {
    return;
  }
  displayTurn();
  checkWin(team);
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
      console.log(team.piece + ' wins!');
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
      console.log(team.piece + ' wins!');
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
      console.log(team.piece + ' wins!');
    } else {
        winArr.splice(0,3);
        winArr.push(board[0][2]);
        winArr.push(board[1][1]);
        winArr.push(board[2][0]);
        diag = winArr.join('');
        if (diag === 'XXX' || diag === 'OOO') {
          displayWin(team);
          console.log(team.piece + ' wins!');
        } else {
          winArr.splice(0,3);
    }
  }
};

var displayWin = function(team) {
  oTurnBox.style.opacity = 0;
  xTurnBox.style.opacity = 0;
  var winBox = document.createElement('div');
  winBox.textContent = team.piece + " WINS!";
  results.appendChild(winBox);
}

var turn = pickTrueorFalse();
createBoard();
displayTurn();
displayedBoard.addEventListener('click', capturePos);
