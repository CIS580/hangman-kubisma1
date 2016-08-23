var stickman = document.getElementById('scaffold');
var wordDiv = document.getElementById('word');
var lettersDiv = document.getElementById('letters');
var guessesDiv = document.getElementById('guesses');
var secretWord = "";
var blanks = "";
var rightGuesses = 0;
var wrongGuesses = 0;
var maxWrongGuesses = 6;

/**
 * Initializes a new game.
 */
function init() {
  clearGuesses();
  resetLetters();
  drawStickMan(0);
  chooseSecretWord();
  drawBlanks();
};
init();

/**
 * Clear the guesses div of all prior guesses
 */
function clearGuesses() {
  guessesDiv.innerHTML = "";
}

/**
 * Resets the letters div with an anchor tag for each letter
 * in the alphabet
 */
function resetLetters() {
  var letters = [];
  for(i=0; i<26; i++) {
    var letter = String.fromCharCode(65 + i);
    letters.push('<a id="' + letter + '" onclick=guessLetter(' + letter + ') href="#' + letter + '">' + letter + '</a>');
  }
  lettersDiv.innerHTML = letters.join('');
}

/**
 * Guesses a single letter, removes it from possible guesses,
 * checks to see if it is in the secret word, and if it is
 * adds it to the secret word, if not, draws another hangman part
 * @param {elm} the element clicked
 */
function guessLetter(elm) {
  var letter = elm.id;

  // Remove the letter from possible guesses element
  var node = document.getElementById(letter);
  node.parentElement.removeChild(node);

  // Add the letter to the guesses div
  node = document.createElement('span');
  node.innerHTML = letter;
  guessesDiv.appendChild(node);

  // TODO: Determine if the letter is in the secret word,
  // if so, reveal it in the secretWordDiv, otherwise
  // add a part to our hangman
  var rightGuessCnt = 0;
  for (var i = 0; i < secretWord.length; i++) {
    if (secretWord[i].toUpperCase() == letter) {
      rightGuessCnt++;
      wordDiv.childNodes[i].textContent = letter;
    }
  }

  if (rightGuessCnt > 0) {
    rightGuesses += rightGuessCnt;
  } else {
    wrongGuesses++;
    if (wrongGuesses <= maxWrongGuesses) drawStickMan(wrongGuesses);
  }

  // TODO: Determine if the game is over, and if so,
  // let the player know if they have won or lost
  if (rightGuesses == secretWord.length) {
    alert('You\'ve won!');
    lettersDiv.innerHTML = '';
  }else if (wrongGuesses == maxWrongGuesses) {
    alert('You\'ve lost!\nThe secret word was: ' + secretWord.toUpperCase());
    lettersDiv.innerHTML = '';
  }

}

/**
 * Draws the stickman
 * @param {wrongGuesses} the number of wrong guesses
 */
function drawStickMan(wrongGuesses) {
  if(wrongGuesses == 0) {
    scaffold.src = "scaffold.png";
  }
  else {
    scaffold.src = "stickman" + wrongGuesses + ".png";
  }
}

/**
 * Chooses a random word from the dictionary to be our secret word
 * and set blanks to match the number of letters.
 */
function chooseSecretWord() {
  var index = Math.floor(Math.random() * dictionary.length);
  secretWord = dictionary[index].word;
  blanks = '';
  for(i = 0; i < secretWord.length; i++) {
    blanks += '_';
  }
}

/**
 * Renders the blanks and known letters of the secret word into
 * the wordDiv
 */
function drawBlanks(){
  var html = [];
  for(i=0; i < blanks.length; i++) {
    html.push('<span>' + blanks.charAt(i) + '</span>');
  }
  wordDiv.innerHTML = html.join('');
}
