/*
* Author: Jonas Alber
*/
import { WorldGenFactory } from '/controller/worldGen.js'
import { EntityHandler, ObjectFactory } from '/controller/entityHandler.js'
import { InfoScreenHandler } from '/view/infoScreen.js'
import { add3DModel, render } from '/view/view.js';
//import * as ExampleAnimation from '/view/example.js'

export class GameMaster {

  /**
   * Initializes the game
   */
  constructor() {
    this.entityHandler = new EntityHandler();
    this.worldGenFactory = new WorldGenFactory();

  }

  initGame(){
    add3DModel(this.entityHandler,'3Dmodels/spaceship.glb', 0.5, 3);
    var test = new InfoScreenHandler("leftInfoScreen");
    var location = test.addDivWithText("ter2r23r332st");
    test.setInnerHTML(location, "Roffelson");
  }


/**
 * Takes a event and store the information in the player entity
 * @param {*} event 
 */
  userInputHandler(event){
    try{
      if(this.entityHandler.objects.length > 0){
        this.entityHandler.getObject(0).storeUserInput(event.key);
      }
    }catch(exception){
      console.warn("Player entity is not initialized: ",exception);
    }
  }
  
  /**
   * Tasks to be executed every frame
   */
  __task30ms() {
    render();
    this.entityHandler.moveObjects();
  }
}
