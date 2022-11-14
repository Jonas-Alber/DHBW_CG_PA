/*
* Author: Jonas Alber
*/
import { WorldGenFactory } from '/controller/worldGen.js'
import { EntityHandler} from '/controller/entityHandler.js'
import { InfoScreenHandler } from '/view/infoScreen.js'
import { addModel,render, getCamera} from '/view/view.js';
import { CameraEntity } from '/model/cameraEntity.js';
import { ObjectPosition } from '/model/helperClass.js';

//import * as ExampleAnimation from '/view/example.js'

const STATIC_CAM = false;
export class GameMaster {

  /**
   * Initializes the game
   */
  constructor(modelLoader) {
    this.entityHandler = new EntityHandler(modelLoader);
    this.worldGenFactory = new WorldGenFactory();

  }

  initGame(){
    var innerWidth = document.getElementById('animateScene').offsetWidth;
    var innerHeight = window.innerHeight;
    let camera;
    let playerPosition = new ObjectPosition();
    playerPosition.sizeFactor = 0.5;
    if(!STATIC_CAM){
      camera = new CameraEntity(getCamera(),innerWidth,innerHeight, 0,4);
    }
    this.entityHandler.addObject(this.entityHandler.objectSupplier.player(playerPosition,camera));
    this.spawnAsteroids();  //TODO: Temporary Function for random asteroid spawn. Should be removed
    var leftInfoScreen = new InfoScreenHandler("leftInfoScreen");
    var title = leftInfoScreen.addDivWithText("<h1>Roffelson</h1>");
    var subtitle = leftInfoScreen.addDivWithText("<h1>The Space Warior</h1>");
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
    let objectPosition = new ObjectPosition();
    for(let i = 0; i < 40; i++){
      objectPosition.position.x =  this.getRandomInt(-35,35);
      objectPosition.position.z = this.getRandomInt(-100,50);
      objectPosition.sizeFactor =this.getRandomArbitrary(0.01,0.05);
      objectPosition.rotation.x = Math.random() * Math.PI *2;
      objectPosition.rotation.y = Math.random() * Math.PI *2;
      objectPosition.rotation.z = Math.random() * Math.PI *2;
      this.entityHandler.addObject(this.entityHandler.objectSupplier.asteroid(objectPosition));
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
