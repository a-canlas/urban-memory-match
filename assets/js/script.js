$(document).ready(initializeApp);

function initializeApp() {
  $('.card').on('click', handleCardClick);
  $('#resetGameBtn').on('click', resetGame);
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 2;

function handleCardClick(event){
  if(!firstCardClicked){
    firstCardClicked = $(event.currentTarget);
    firstCardClicked.find('.back').addClass('hidden');
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardClicked.find('.back').addClass('hidden');
  }
  if(firstCardClicked && secondCardClicked){
    var cssValue1 = firstCardClicked.find('.front').css("background-image");
    var cssValue2 = secondCardClicked.find('.front').css("background-image");
    if(cssValue1 === cssValue2){
      console.log('cards match');
      matches ++;
      firstCardClicked = null;
      secondCardClicked = null;
    } else{
      setTimeout(function(){
        firstCardClicked.find('.back').removeClass('hidden');
        secondCardClicked.find('.back').removeClass('hidden');
        firstCardClicked = null;
        secondCardClicked = null;

      }, 1500);
    }
    if(matches === maxMatches){
      console.log('You Win!')
      $('#winnerModal').removeClass('hidden');
    }

  }


}

function resetGame() {
  matches = null;
  firstCardClicked = null;
  secondCardClicked = null;
  $('.card').find('.back').removeClass('hidden');
  $('#winnerModal').addClass('hidden');
}
