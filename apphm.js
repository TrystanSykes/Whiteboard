var wordArray = ['poised', 'elegant', 'wrap', 'snatch', 'serve', 'debonair', 'fork', 'report', 'belligerent', 'prefer', 'random', 'develop', 'money', 'curved', 'polish', 'skinny', 'flame', 'obedient', 'gate', 'treat'];

var lowerInput = 'a';
var currentWord = "";
var currentWordBlanks = [];
var wrongGuesses = [];
var turnCounter = 10;

var keyboard = document.querySelector('.keyboard');
var wrong = document.querySelector('.wrong');
var turnsLeft = document.querySelector('.xs');
var wordDisplay = document.querySelector('.word-display')
var resetHmBtn = document.querySelector('.reset-hm');
var changeBack = document.querySelector('.change-back');
var flipper = document.querySelector('.flipper');

keyboard.addEventListener('click', function() {
  if (event.target.tagName === 'UL') {
    return;
  } else {
    input = event.target.textContent;
    event.target.classList.toggle('used');
    lowerInput = input.toLowerCase()
    compareInput(lowerInput);
  }
});


var displayWord = function() {
  var wordPos = getRandomNo(wordArray);
  currentWord = wordArray[wordPos]; 
  wordArrSplice(wordPos);
  currentWordArr = currentWord.split('');
  currentWordBlanks = [];
  currentWordArr.forEach(function(letter) {
    currentWordBlanks.push('_');
  })
    wordDisplay.textContent = currentWordBlanks.join(' ');
}

var wordArrSplice = function (wordPos) {
  wordArray.splice(wordPos, 1)
  if (wordArray.length === 0) {
    wordArray = ['poised', 'elegant', 'wrap', 'snatch', 'serve', 'debonair', 'fork', 'report', 'belligerent', 'prefer', 'random', 'develop', 'money', 'curved', 'polish', 'skinny', 'flame', 'obedient', 'gate', 'treat'];
  }
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
    displayHmLose();
  }
}

var checkWinHM = function() {
  if (currentWordBlanks.indexOf('_') < 0) {
    console.log('winner!');
    displayHmWin();
  }
}

var pushGuess = function() {
  var currentGuess = lowerInput;
  var duplicate = null;
  if (currentWordArr.indexOf(currentGuess) < 0) {
    wrong.childNodes.forEach(function(node){
      var upperCurrent = currentGuess.toUpperCase();
      if (upperCurrent === node.textContent) {
        duplicate = true;
        return;
      }
    }) 
    if (duplicate === true) {
      return;
    }
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

var displayHmWin = function () {
  var winBox = document.createElement('div');
  winBox.className = 'win-box';
  winBox.textContent = 'Correct!';
  results.appendChild(winBox);
  results.classList.add('cover-all');
  results.style.display = 'block';
}

var displayHmLose = function () {
  var winBox = document.createElement('div');
  winBox.className = 'win-box';
  winBox.textContent = 'You Lose!';
  results.appendChild(winBox);
  results.classList.add('cover-all');
  results.style.display = 'block';
}


var resetHangman = function () {
  lowerInput = ' ';
  currentWord = "";
  currentWordBlanks = [];
  wrongGuesses = [];
  turnCounter = 10;
  turnsLeft.innerHTML = '<span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span>';
  displayWord();
  keyboard.childNodes.forEach(function(key) {
    if (key.tagName === 'LI') { 
      key.classList.remove('used');
    }
  })
  while (wrong.hasChildNodes()) {
    wrong.removeChild(wrong.firstChild);
  }
}

var flip = function () {
  flipper.classList.toggle("flip");
  tictactoe.classList.remove('display-none');
  hangman.classList.add('display-none');
}

resetHmBtn.addEventListener('click', resetHangman);
changeBack.addEventListener('click', flip);
displayWord();
