/*
* Author: Jonas Alber
*/
import { WorldGenFactory } from '/controller/worldGen.js'
import { EntityHandler, ObjectFactory } from '/controller/entityHandler.js'
import { InfoScreenHandler } from '/view/infoScreen.js'
import { add3DModel, render, getCamera } from '/view/view.js';
import { CameraEntity } from '/model/specialEntitys.js';
//import * as ExampleAnimation from '/view/example.js'

const STATIC_CAM = false;
export class GameMaster {

  /**
   * Initializes the game
   */
  constructor() {
    this.entityHandler = new EntityHandler();
    this.worldGenFactory = new WorldGenFactory();

  }

  initGame(){
    if(STATIC_CAM){
      add3DModel(this.entityHandler,'3Dmodels/spaceship.glb', 0.5, 3);
    }else{
      add3DModel(this.entityHandler,'3Dmodels/spaceship.glb', 0.5, 3, new CameraEntity(getCamera(), 0, 4));
    }
    add3DModel(this.entityHandler,'3Dmodels/asteroid.glb', 0.05);
    
    var leftInfoScreen = new InfoScreenHandler("leftInfoScreen");
    var title = leftInfoScreen.addDivWithText("<h1>Roffelson</h1>");
    var subtitle = leftInfoScreen.addDivWithText("<h1>The Space Warior</h1>");
    //var tutorial = leftInfoScreen.addDivWithText("Controls: w || Arrow Up Ship moves forward. s || Arrow Down Ship moves to the rear. a || Arrow Left Ship moves to the left. d || Arrow Right Vessel moves to the right. Space || Shoot Ship shoots.");
    var tutorial = leftInfoScreen.addDivWithText(
      "<table style='width:90%;text-align: left; margin: 5%;'\
      <tr><td>W</td><td><i class='fa-solid fa-arrow-up'></i></td><td>Ship moves forward</td></tr>\
      <tr><td>S</td><td><i class='fa-solid fa-arrow-down'></td><td>Ship moves backward</td></tr>\
      <tr><td>A</td><td><i class='fa-solid fa-arrow-left'></td><td>Ship moves left</td></tr>\
      <tr><td>D</td><td><i class='fa-solid fa-arrow-right'></td><td>Ship moves right</td></tr>\
      <tr><td>Space</td><td><i class='fa-solid fa-meteor'></i></td><td>Ship shoot a projectile</td></tr>\
      </table>"
      );
  }


/**
 * Takes a event and store the information in the player entity
 * @param {*} event 
 */
  userInputHandler(event){
    try{
      if(this.entityHandler.objects.length > 0){
        var playerIndex = this.entityHandler.objects.findIndex(this.entityHandler.checkIsPlayerEntity);
        if(event instanceof KeyboardEvent){
          this.entityHandler.getObject(playerIndex).storeUserInput(event.key);
        }
        else{
          this.entityHandler.getObject(playerIndex).storeUserInput(event);
        }
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
