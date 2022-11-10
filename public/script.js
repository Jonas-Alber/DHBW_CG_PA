import {GameMaster} from '/controller/gameMaster.js'

/**
* Start the game
*/
const setFPS = 30;

let activeControlButton = [];
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
    document.addEventListener("keydown", function(event){
      pressControlButton(event.key);
    });
    document.addEventListener("keyup", function(event){
      releaseControlButton(event.key);
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
    var parameterExists = false;
    for(var indexPoint in activeControlButton){
      if(activeControlButton[indexPoint].key === parameter){
        parameterExists = true;
        break;
      }
    }
    if(!parameterExists){
      var interval = setInterval(function(){
        gameMaster.userInputHandler(parameter);
      }, 1000/setFPS);
      activeControlButton.push({key: parameter, function: interval});
    }
  }

/**Test */
  function releaseControlButton(parameter){
    for(var indexPoint in activeControlButton){
      if(activeControlButton[indexPoint].key == parameter){
        clearInterval(activeControlButton[indexPoint].function);
        activeControlButton.splice(indexPoint, 1);
        break;
      }
    }
  }

  function registerControlButtonEventListener(buttonId, buttonValue){
    document.getElementById(buttonId).addEventListener("mousedown", function(){
      pressControlButton(buttonValue);
    });
    document.getElementById(buttonId).addEventListener("mouseup", function(){
      releaseControlButton(buttonValue);
    });
  }
