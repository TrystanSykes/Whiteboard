var wordArray = ['poised', 'elegant', 'wrap', 'snatch', 'serve', 'debonair', 'fork', 'report', 'belligerent', 'prefer', 'random', 'develop', 'money', 'curved', 'polish', 'skinny', 'flame', 'obedient', 'gate', 'treat', 'admire', 'level', 'flowery', 'describe', 'wipe', 'brick', 'ants', 'bless', 'snake', 'absurd', 'truck', 'multiply', 'structure', 'unknown', 'dinosaurs', 'match', 'hard', 'potato', 'cool', 'fang'];

var lowerInput = 'a';
var currentWord = "";
var currentWordBlanks = [];
var wrongGuesses = [];
var turnCounter = 10;
var score = 0;
var highScore = 0;
var hsName = 'Trys';

var keyboard = document.querySelector('.keyboard');
var wrong = document.querySelector('.wrong');
var turnsLeft = document.querySelector('.xs');
var wordDisplay = document.querySelector('.word-display')
var resetHmBtn = document.querySelector('.reset-hm');
var changeBack = document.querySelector('.change-back');
var flipper = document.querySelector('.flipper');
var displayedScore = document.querySelector('.score');
var displayedHighScore = document.querySelector('.high-score');
var enterHsBox = document.querySelector('.enter-hs');
var hsInput = document.querySelector('.hs-input');
var saveHs = document.querySelector('.save-hs');


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
    wordArray = ['poised', 'elegant', 'wrap', 'snatch', 'serve', 'debonair', 'fork', 'report', 'belligerent', 'prefer', 'random', 'develop', 'money', 'curved', 'polish', 'skinny', 'flame', 'obedient', 'gate', 'treat', 'admire', 'level', 'flowery', 'describe', 'wipe', 'brick', 'ants', 'bless', 'snake', 'absurd', 'truck', 'multiply', 'structure', 'unknown', 'dinosaurs', 'match', 'hard', 'potato', 'cool', 'fang'];
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
  score += (currentWordBlanks.length - 4);
  score += turnCounter;
}

var displayHmLose = function () {
  var winBox = document.createElement('div');
  winBox.className = 'win-box';
  winBox.textContent = 'You Lose!' + '\n' + 'Score: ' + score;
  results.appendChild(winBox);
  results.classList.add('cover-all');
  results.style.display = 'block';
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highscore", highScore);
    hangman.classList.add('display-none');
    enterHsBox.classList.remove('display-none');
  }
  score = 0;
  // if (score > highScore) {
  //   resetWinBox();
  //   var enterHighScore = document.createElement('div');
  //   var enterName = document.createElement('input');
  //   var confirmButton  =  document.createElement('button');
  //   enterHighScore.classList.add('enter-score');
  //   enterHighScore.textContent = 'Enter your initials';
  //   enterName.style.placeholder = 'AAA'
  //   results.appendChild(enterHighScore);
  //   enterHighScore.appendChild(enterName);
  //   enterHighScore.appendChild(confirmButton);
  //   // confirmButton.addEventListener('click', function(){
  //   //   if (enterName.textContent)
  //   //   localStorage.setItem('initials', en)
  //   // })
// } 
}


var resetHangman = function () {
  lowerInput = ' ';
  currentWord = "";
  currentWordBlanks = [];
  wrongGuesses = [];
  turnCounter = 10;
  turnsLeft.innerHTML = '<span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span> <span>X</span>';
  displayWord();
  displayedScore.textContent = 'Score: ' + score;
  displayedHighScore.textContent = 'High Score: ' + localStorage.getItem("name") + ' ' + localStorage.getItem("highscore");
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

var getHs = function () {
  hsName = hsInput.value;
  localStorage.setItem("name", hsName);
  hangman.classList.remove('display-none');
  enterHsBox.classList.add('display-none');
  resetHangman();
}


enterHsBox.classList.add('display-none');
saveHs.addEventListener('click', getHs);
resetHmBtn.addEventListener('click', resetHangman);
changeBack.addEventListener('click', flip);
displayWord();
displayedHighScore.textContent = 'High Score: ' + localStorage.getItem("name") + ' ' + localStorage.getItem("highscore");
