import {WorldGenFactory} from '/controller/worldGen.js'
import {EntityHandler} from '/controller/entityHandler.js'
import {InfoScreenHandler} from '/view/infoScreen.js'
import * as ExampleAnimation from '/view/example.js'

const setFPS = 30;

export class GameMaster{

  /**
   * Initializes the game
   */
  constructor(){
    var entityHandler = new EntityHandler();
    var worldGenFactory = new WorldGenFactory();
  }

  /**
   * Start the game
   */
  startGame(){
    //TODO: Example Code to be Removed
    var test = new InfoScreenHandler("leftInfoScreen");
    var location = test.addDivWithText("ter2r23r332st");
    test.setInnerHTML(location, "Roffelson");
    //End of Example Code

    //TODO: Example Code for Animation Rendering
    ExampleAnimation.animateBlock();
    //End of Example Code
    this.resumeGame();
  }

  /**
   * Stop the game
   */
  stopGame(){
    this.pauseGame();
  }

  /**
   * Stop the animation rendering process
   */
  pauseGame(){
    clearInterval(this.__task30ms);
  }

  /**
   * Start the animation rendering process
   */
  resumeGame(){
    setInterval(this.__task30ms, setFPS);
  }

  /**
   * Tasks to be executed every frame
   */
  __task30ms(){
    
  }
}
