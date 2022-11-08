import {GameMaster} from '/controller/gameMaster.js'

/**
* Start the game
*/
const setFPS = 30;

let activeControlButton;
var gameMaster = new GameMaster();
gameMaster.initGame();
startGame();


function startGame() {
    //TODO: Example Code to be Removed
    
    //End of Example Code

    //TODO: Example Code for Animation Rendering
    //ExampleAnimation.animateBlock();
    //End of Example Code

    //Load Player Entity

    //End of Player Load
    resumeGame();
  }

  /**
   * Stop the game
   */
  function stopGame() {
    pauseGame();
  }

  /**
   * Stop the animation rendering process
   */
  function pauseGame() {
    clearInterval(this.__task30ms);
  }

  /**
   * Start the animation rendering process
   */
  function resumeGame() {
    document.addEventListener("keypress", function(event){
        gameMaster.userInputHandler(event);
    });
    registerControlButtonEventListener("controlMoveUp",'w');
    registerControlButtonEventListener("controlMoveDown",'s');
    registerControlButtonEventListener("controlMoveLeft",'a');
    registerControlButtonEventListener("controlMoveRight",'d');
    registerControlButtonEventListener("controlShoot",' ');
    setInterval(function(){
        gameMaster.__task30ms();
    }, 
    1000/setFPS
    );
  }

  function pressControlButton(parameter){
    activeControlButton = setInterval(function(){
      gameMaster.userInputHandler(parameter);
    }, 1000/setFPS);
  }
  function releaseControlButton(){
    clearInterval(activeControlButton);
  }

  function registerControlButtonEventListener(buttonId, buttonValue){
    document.getElementById(buttonId).addEventListener("mousedown", function(){
      pressControlButton(buttonValue);
    });
    document.getElementById(buttonId).addEventListener("mouseup", function(){
      releaseControlButton();
    });
  }
