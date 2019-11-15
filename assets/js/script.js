$(document).ready(initializeApp);

function initializeApp() {
  $('.card').on('click', handleCardClick);
  $('#resetGameBtn').on('click', resetGame);

}

var firstCardClicked = null; // will be used to hold the infomation on the first card in the playfield that is clicked
var secondCardClicked = null; // will be used to hold the information on the second card in the playfield that is clicked
var matches = null; // will increase for every pair of cards that are matched
var maxMatches = 9; // 9 total pairs to be matched
var attempts = 0; // the initial value for the number of guesses variable
var gamesPlayed = 0;
var canBeClicked = true;

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
    var cssValue1 = firstCardClicked.find('.front').css("background-image");
    var cssValue2 = secondCardClicked.find('.front').css("background-image");
    if(cssValue1 === cssValue2){ //checks if the background-image url are equal
      console.log('cards match');
      matches ++;
      displayStats(); // function call to update side bar statistics
      firstCardClicked = null;
      secondCardClicked = null;
      canBeClicked = true; // allows cards that do not have class .hidden applied to .back to be clicked again
    } else{ // if background-image urls do not equal one another
      setTimeout(function(){
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
    console.log('You Win!')
    $('#winnerModal').removeClass('hidden');
    displayStats();
  }

}

function resetGame() { // this function will reset all values back to defaults
  matches = 0;
  attempts = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  $('.card').find('.back').removeClass('hidden');
  $('#winnerModal').addClass('hidden');
  gamesPlayed++;
  displayStats();
}

function calculateAccuracy(matches, totalAttempts) { // this function determines the average by dividing the total pairs matched with how many tries the player has made
  if(totalAttempts){ // Prevents divide by 0 error and NaN displaying in Accuracy result div
    var accuracy = matches / totalAttempts;
    accuracy = (accuracy.toFixed(2)) * 100;
    accuracy += '%';
    return accuracy;
  }
  return 0 + '%';
}

function displayStats() { // this function updates the DOM with the current number of games played, attempts to find a matching pair and the accuracy ratio of actual matches to attempts
  $('aside div:nth-child(3)').text(gamesPlayed);
  $('aside div:nth-child(5)').text(attempts);
  $('aside div:nth-child(7)').text(calculateAccuracy(matches, attempts));


}
