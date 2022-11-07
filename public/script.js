import {GameMaster} from '/controller/gameMaster.js'

const setFPS = 30;

var gameMaster = new GameMaster();
gameMaster.initGame();
startGame();


/**
* Start the game
*/
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
    setInterval(function(){
        gameMaster.__task30ms();
    }, 
    1000/setFPS
    );
  }
