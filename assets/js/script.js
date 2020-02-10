$(document).ready(initializeApp);

function initializeApp() {
  $('#resetGameBtn').on('click', resetGame);
  $('.playfield').on('click', ".card", handleCardClick);
  shuffleCards();

}

let firstCardClicked = null; // will be used to hold the infomation on the first card in the playfield that is clicked
let secondCardClicked = null; // will be used to hold the information on the second card in the playfield that is clicked
let matches = null; // will increase for every pair of cards that are matched
let maxMatches = 9; // 9 total pairs to be matched
let attempts = 0; // the initial value for the number of guesses variable
let gamesPlayed = 0;
let canBeClicked = true;

function handleCardClick(event){
  // The condition below prevents the same matching pairs or more than two cards to be clicked
  if($(event.currentTarget).find('.back').hasClass('hidden') || !canBeClicked){
    return;
  }

  if(!firstCardClicked){ // if firstCardClicked is null, set a value to it
    firstCardClicked = $(event.currentTarget);
    firstCardClicked.find('.back').addClass('hidden'); // reveals background-image on .front div by hiding the background-image on .back
  } else { // sets a truthy value to secondCardClicked
    canBeClicked = false // prevents more than two cards to be clicked
    secondCardClicked = $(event.currentTarget);
    secondCardClicked.find('.back').addClass('hidden');
    attempts++; // increments attempts at finding matching cards
    let cssValue1 = firstCardClicked.find('.front').css("background-image");
    let cssValue2 = secondCardClicked.find('.front').css("background-image");
    if(cssValue1 === cssValue2){ //checks if the background-image url are equal
      matches ++;
      displayStats(); // function call to update side bar statistics
      firstCardClicked = null;
      secondCardClicked = null;
      canBeClicked = true; // allows cards that do not have class .hidden applied to .back to be clicked again
    } else{ // if background-image urls do not equal one another
      setTimeout(() => {
        firstCardClicked.find('.back').removeClass('hidden');
        secondCardClicked.find('.back').removeClass('hidden');
        displayStats();
        firstCardClicked = null;
        secondCardClicked = null;
        canBeClicked = true;

      }, 1500);
    }
  }

  if(matches === maxMatches){ // condition to determine when game is won
    $('#winnerModal').removeClass('hidden');
    displayStats();
  }

}

function resetGame() { // this function will reset all values back to defaults
  matches = 0;
  attempts = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  $('#winnerModal').addClass('hidden');
  $('.playfield').empty();
  shuffleCards();
  gamesPlayed++;
  displayStats();
}

function calculateAccuracy(matches, totalAttempts) { // this function determines the average by dividing the total pairs matched with how many tries the player has made
  if(totalAttempts){ // Prevents divide by 0 error and NaN displaying in Accuracy result div
    let accuracy = matches / totalAttempts;
    accuracy = (accuracy * 100).toFixed(0);
    return accuracy + '%';
  }
  return 0 + '%';
}

function displayStats() {
  $('#drinks').text(gamesPlayed);
  $('#accuracyPercent').text(calculateAccuracy(matches, attempts));

}

function shuffleCards() { // this function randomizes the cards in the playfield then dynamically adds them to the DOM
  let imageClassList = ['tanuk-e', 'fox', 'tea', 'leaf', 'red', 'dawson', 'matcha', 'hat', 'heart', 'tanuk-e', 'fox', 'tea', 'leaf', 'red', 'dawson', 'matcha', 'hat', 'heart']; // contains a listing of all the image classes
  while(imageClassList.length > 0){
    let cardDiv = $('<div>').addClass('card'); // Creates a div element with the class of card
    let cardBack = $('<div>').addClass('back'); // Creates a div element with the class of back
    let cardFront = $('<div>').addClass('front'); // Creates a div element with the class of front
    let randomIndex = Math.floor(Math.random() * imageClassList.length); // Random array index number is created and saved to a variable
    let randomImageClass = imageClassList.splice(randomIndex, 1); // Removes the referenced array index value and stores it in a variable
    cardFront.addClass(randomImageClass); // The value above is passed in the addClass method
    cardDiv.append(cardBack, cardFront); // Appends child divs to cardDiv
    $('.playfield').append(cardDiv); // Appends child cardDiv to parent .playfield

  }
}
