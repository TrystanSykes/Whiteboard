var wordArray = ['apple', 'banana', 'orange'];

var lowerInput = 'a';
var currentWord = "";
var currentWordBlanks = [];
var wrongGuesses = [];
var turnCounter = 10;

var keyboard = document.querySelector('.keyboard');
var wrong = document.querySelector('.wrong');
var turnsLeft = document.querySelector('.xs');
var wordDisplay = document.querySelector('.word-display')
var resethm = document.querySelector('.reset-hm');

keyboard.addEventListener('click', function() {
  if (event.target.tagName === 'UL') {
    return;
  } else {
    input = event.target.textContent;
    lowerInput = input.toLowerCase()
    compareInput(lowerInput);
  }
});


var displayWord = function() {
  var wordPos = getRandomNo(wordArray);
  currentWord = wordArray[wordPos]; 
  currentWordArr = currentWord.split('');
  currentWordBlanks = [];
  currentWordArr.forEach(function(letter) {
    currentWordBlanks.push('_');
  })
    wordDisplay.textContent = currentWordBlanks.join(' ');
}

var compareInput = function(input) {
  var currentGuess = input;
  currentWordArr.forEach(function(letter, index) {
    if (letter === currentGuess) {
      currentWordBlanks[index] = currentGuess; 
      wordDisplay.textContent = currentWordBlanks.join(' ');
      checkWinHM();
    }
  })
  pushGuess();
}

var decreaseTurnCounter = function() {
  turnCounter -= 1;
  turnsLeft.removeChild(turnsLeft.firstElementChild);
  if (turnCounter === 0) {
    console.log("rip");
  }
}

var checkWinHM = function() {
  if (currentWordBlanks.indexOf('_') < 0) {
    console.log('winner!')
  }
}

var pushGuess = function() {
  var currentGuess = lowerInput;
  if (currentWordArr.indexOf(currentGuess) < 0) {
    var currentGuessUpper = currentGuess.toUpperCase();
    wrongGuesses.push(currentGuessUpper);
    createLi(currentGuessUpper);
    decreaseTurnCounter();
  }
}

var getRandomNo = function (arr) {
  randomNo = Math.floor((Math.random() * arr.length));
  return randomNo;
}

var createLi = function(letter) {
  var wrongLetter = document.createElement('li');
  wrongLetter.textContent = letter;
  wrong.appendChild(wrongLetter);
}

displayWord();
