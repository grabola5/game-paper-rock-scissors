'use strict';
(function(){

var output = document.getElementById('output');
var outputTop = document.getElementById('info');
var outputResult = document.getElementById('result');
var newGame = document.getElementById ('newGame');
var paper = document.getElementById ('buttonPaper');
var rock = document.getElementById ('buttonRock');
var scissors = document.getElementById ('buttonScissors');
var buttons = document.querySelectorAll('.player-move');
var log = function (text) {
  output.innerHTML = '<br>' + text + '<br><br>';
};
var logT = function (text) {
  outputTop.innerHTML = '<br>' + text + '<br>'; 
};
var params = {
  playerScore: 0,
  computerScore: 0,
  roundsAmount:0,
  rounds: 0
};

//funkcja chowająca przyciski//
var hideButtons = function () {
  paper.classList.add('hide');
  rock.classList.add ('hide');
  scissors.classList.add('hide');
};

//funkcja pokazująca przyciski//
var showButtons = function () {
  paper.classList.remove('hide');
  rock.classList.remove ('hide');
  scissors.classList.remove('hide');
};

//funkcja resetująca wynik//
var resetResult = function () {
  params.playerScore = 0;
  params.computerScore = 0;
};

//funkcja rozpoczynająca grę// 
newGame.addEventListener ('click', function () {
  outputResult.innerHTML = '';
  params.roundsAmount = window.prompt ('How many winning rounds you need to win the game?');
  if (params.roundsAmount==='' || isNaN(params.roundsAmount) || params.roundsAmount == null || params.roundsAmount == 0) {
    log ('Incorrect value! Write a number.');
    hideButtons ();
  } else {
      log('You have to win '  + params.roundsAmount + ' rounds to win the game');
      showButtons();
    }
});

//funkcja losująca //
var computerMove = function (){
  var randomNumber = Math.floor(Math.random()*3+1);
  if (randomNumber == 1) {
    return 'paper';
  } else if (randomNumber == 2) {
    return 'rock';
    } 
    return 'scissors';
};

//funkcja porównująca wyniki i wyświetlająca komunikat o wygranej//
var result = function (yourMove, opponentMove) {
  var opponentMove = computerMove ();
  if (yourMove == opponentMove) {
    log ('DRAW: you played ' + yourMove + ', computer played ' + opponentMove);
    } else if ((yourMove == 'paper' && opponentMove == 'rock') || 
               (yourMove == 'rock' && opponentMove == 'scissors') ||
               (yourMove == 'scissors' && opponentMove == 'paper')) {
        log ('You WON: you played ' + yourMove + ', computer played ' + opponentMove);
        params.playerScore ++;
      } else {
          log ('YOU LOST: you played ' + yourMove + ', computer played ' +  opponentMove);
          params.computerScore ++;
          }
  params.rounds ++;
};

//funkcja wyświetlająca wynik//
var score = function () {
  outputResult.innerHTML = '<br><br> You --- ' + params.playerScore + ' : ' + params.computerScore + ' --- Computer';
};

var playerMove = function (yourMove){ 
  result (yourMove);
  score ();
  endGame ();
  };

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener ('click', function () {
    playerMove (this.getAttribute('data-move'))
  })
};

/*paper.addEventListener ('click', function (){
  playerMove ('paper');
});
rock.addEventListener ('click', function (){
  playerMove ('rock');
});
scissors.addEventListener ('click', function (){
  playerMove ('scissors');
});
*/

//funkcja kończąca grę//
var endGame = function () {
  if (params.playerScore == params.roundsAmount) {
    logT ('Congratulations! You won the entire game!');
    log ('Game over, please press the new game button!');
    hideButtons ();
    showModal ('#modal-one');
    resetResult ();
  } else if (params.computerScore == params.roundsAmount) {
      logT ('Ups..You failed.');
      log ('Game over, please press the new game button!');
      hideButtons ();
      showModal ('#modal-one');
      resetResult ();
      }
};

//MODAL//

var modals = document.querySelectorAll ('.modal');
  var modalOverlay = document.querySelector ('#modal-overlay');
  var closeButtons = document.querySelectorAll('.modal .close');
  var modalLinks = document.querySelectorAll('.show-modal');
  
  //funckja otwierająca modal//
  var showModal = function (modalId) {
    modalOverlay.classList.add('show');
    for (var i = 0; i<modals.length; i++) {
      modals[i].classList.remove('show');
    };
    document.querySelector(modalId).classList.add('show');
  }
  var buttonClickHandler = function(event){
    event.preventDefault();
    var modalId = this.getAttribute('href');
    showModal (modalId);
  };
  
  for(var i = 0; i < modalLinks.length; i++){
    modalLinks[i].addEventListener('click', buttonClickHandler);
  };
  var hideModal = function(event){
    event.preventDefault();
    modalOverlay.classList.remove('show');
  };
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  modalOverlay.addEventListener('click', hideModal);
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }
})(); 
