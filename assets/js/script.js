$(document).ready(initializeApp);

function initializeApp() {
  $('.card').on('click', handleCardClick);
}

function handleCardClick(event){
  var selectedCard = event.currentTarget;
  var selectedCardBack = $(selectedCard).find('.back');
  var selectedCardFront = $(selectedCard).find('.front');
  selectedCardBack.addClass('hidden');
  selectedCardFront.addClass('js-logo');
  // console.log(selectedCardBack);
}
