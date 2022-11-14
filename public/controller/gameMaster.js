/*
* Author: Jonas Alber
*/
import { WorldGenFactory } from '/controller/worldGen.js'
import { EntityHandler, ObjectFactory } from '/controller/entityHandler.js'
import { InfoScreenHandler } from '/view/infoScreen.js'
import { add3DModel, addDModel,render, getCamera} from '/view/view.js';
import { CameraEntity } from '/model/specialEntitys.js';
import { ObjectPosition } from '/model/helperClass.js';
import {ModelLoader} from '/view/modelLoader.js';
//import * as ExampleAnimation from '/view/example.js'

const STATIC_CAM = false;
export class GameMaster {

  /**
   * Initializes the game
   */
  constructor(modelLoader) {
    if(modelLoader instanceof ModelLoader){
      this.modelLoader = modelLoader;
    }
    this.entityHandler = new EntityHandler();
    this.worldGenFactory = new WorldGenFactory();

  }

  initGame(){
    let playerPosition = new ObjectPosition();
    playerPosition.sizeFactor  = 0.5;
    var innerWidth = document.getElementById('animateScene').offsetWidth;
    var innerHeight = window.innerHeight;
    let model = this.modelLoader.getModel('player');
    if(STATIC_CAM){
      addDModel(this.entityHandler,model, playerPosition, 3);
    }else{
      
      addDModel(this.entityHandler,model, playerPosition, 3, new CameraEntity(getCamera(),innerWidth, innerHeight, 0, 4));
    }
    this.spawnAsteroids();
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
    

  spawnAsteroids(){
    let model = this.modelLoader.getModel('asteroid');
    for(let i = 0; i < 40; i++){
      let objectPosition = new ObjectPosition();
      objectPosition.x =  this.getRandomInt(-35,35);
      objectPosition.z = this.getRandomInt(-100,50);
      objectPosition.sizeFactor =this.getRandomArbitrary(0.01,0.05);
      addDModel(this.entityHandler,model, objectPosition);
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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
