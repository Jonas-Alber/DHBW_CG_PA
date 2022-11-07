/*
* Author: Jonas Alber
*/
import { WorldGenFactory } from '/controller/worldGen.js'
import { EntityHandler } from '/controller/entityHandler.js'
import { InfoScreenHandler } from '/view/infoScreen.js'
import * as ExampleAnimation from '/view/example.js'

const setFPS = 30;

export class GameMaster {

  /**
   * Initializes the game
   */
  constructor() {
    this.entityHandler = new EntityHandler();
    this.worldGenFactory = new WorldGenFactory();
    document.addEventListener("keypress", this.__userInputHandler(event));
  }


/**
 * Takes a event and store the information in the player entity
 * @param {*} event 
 */
  __userInputHandler(event){
    try{
      this.entityHandler.getObject(0).storeUserInput(event.key);
    }catch(exception){
      console.warn("Player entity is not initialized: ",exception);
    }
  }

  /**
   * Start the game
   */
  startGame() {
    //TODO: Example Code to be Removed
    var test = new InfoScreenHandler("leftInfoScreen");
    var location = test.addDivWithText("ter2r23r332st");
    test.setInnerHTML(location, "Roffelson");
    //End of Example Code

    //TODO: Example Code for Animation Rendering
    ExampleAnimation.animateBlock();
    //End of Example Code

    //Load Player Entity

    //End of Player Load
    this.resumeGame();
  }

  /**
   * Stop the game
   */
  stopGame() {
    this.pauseGame();
  }

  /**
   * Stop the animation rendering process
   */
  pauseGame() {
    clearInterval(this.__task30ms);
  }

  /**
   * Start the animation rendering process
   */
  resumeGame() {
    setInterval(this.__task30ms, setFPS);
  }

  /**
   * Tasks to be executed every frame
   */
  __task30ms() {
    this.entityHandler.moveObjects();
  }
}
