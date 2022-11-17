/*
* Author: Jonas Alber
*/
import { WorldGenFactory } from '/controller/worldGen.js'
import { EntityHandler} from '/controller/entityHandler.js'
import { InfoScreenHandler } from '/view/infoScreen.js'
import { addModel,render, getCamera} from '/view/view.js';
import { CameraEntity } from '/model/cameraEntity.js';
import { ObjectPosition } from '/model/helperClass.js';
import { getAmbientLight } from '/view/view.js';
import { LightEntity} from '/model/lightEntity.js';

//import * as ExampleAnimation from '/view/example.js'


export class GameMaster {

  /**
   * Initializes the game
   */
  constructor(modelLoader) {
    this.worldGenFactory = new WorldGenFactory(modelLoader, 130, 1);
    this.gameIsActive = true;

  }
  initGame(){
    this.rightInfoScreen = new InfoScreenHandler("rightInfoScreen");
    this.rightInfoScreen.addDivWithText("<h1>Backstory</h1>");
    this.rightInfoScreen.addDivWithText("Hello stranger,");
    this.rightInfoScreen.addDivWithText("apparently Tokrok has captured you too. Inside his ship are already stranded dozens of ships. But there is a way to escape. <h3>Destroy all of Tokrok's children and freedom will be yours.</h3>");
    this.rightInfoScreen.addDivWithText("<h3>But be careful, they use transphasic torpedoes that can fly through backstops.</h3>");
    this.rightInfoScreen.addDivWithText("Good luck!");
    this.leftInfoScreen = new InfoScreenHandler("leftInfoScreen");
    var title = this.leftInfoScreen.addDivWithText("<h1>Roffelson</h1>");
    var subtitle = this.leftInfoScreen.addDivWithText("<h1>The Space Warior</h1>");
    var tutorial = this.leftInfoScreen.addDivWithText(
      "<table style='width:90%;text-align: left; margin: 5%;'\
      <tr><td>W</td><td><i class='fa-solid fa-arrow-up'></i></td><td>Ship moves forward</td></tr>\
      <tr><td>S</td><td><i class='fa-solid fa-arrow-down'></td><td>Ship moves backward</td></tr>\
      <tr><td>A</td><td><i class='fa-solid fa-arrow-left'></td><td>Ship moves left</td></tr>\
      <tr><td>D</td><td><i class='fa-solid fa-arrow-right'></td><td>Ship moves right</td></tr>\
      <tr><td>Space</td><td><i class='fa-solid fa-meteor'></i></td><td>Ship shoot a projectile</td></tr>\
      </table>"
      );
      this.enemyStatusIndex = this.leftInfoScreen.addDivWithText("");
  }
    

  /*spawnAsteroids(){
    let objectPosition = new ObjectPosition();
    for(let i = 0; i < 40; i++){
      objectPosition.position.x =  this.getRandomInt(-35,35);
      objectPosition.position.z = this.getRandomInt(-400,-10);
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
  }*/


/**
 * Takes a event and store the information in the player entity
 * @param {*} event 
 */

  isPlayerNearBorder(buffer){
    var playerIndex = this.worldGenFactory.entityHandler.objects.findIndex(this.worldGenFactory.entityHandler.checkIsPlayerEntity);
    var player = this.worldGenFactory.entityHandler.getObject(playerIndex);
    var maxXAmount = this.worldGenFactory.worldSize;
    var playerX = player.model.position.x;
    var playerY = player.model.position.y;
    if(playerX > maxXAmount-buffer || playerX < -(maxXAmount-buffer)){
      return true;
    }else if(playerY > maxXAmount-buffer || playerY < -(maxXAmount-buffer)){
      return true;
    }
    return false;
  }

  /**
   * 
   * @param {event} event - Keyboard input event
   */
  userInputHandler(event){
    try{
      if(this.worldGenFactory.entityHandler.objects.length > 0){
        var playerIndex = this.worldGenFactory.entityHandler.objects.findIndex(this.worldGenFactory.entityHandler.checkIsPlayerEntity);
        if(event instanceof KeyboardEvent){
          this.worldGenFactory.entityHandler.getObject(playerIndex).storeUserInput(event.key);
        }
        else{
          this.worldGenFactory.entityHandler.getObject(playerIndex).storeUserInput(event);
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
    var playerIndex = this.worldGenFactory.entityHandler.getPlayerEntityIndex();
    if(!this.worldGenFactory.checkLoadStatus(playerIndex)){
      return false;
    }
    this.worldGenFactory.entityHandler.moveObjects();
    this.leftInfoScreen.setInnerHTML(this.enemyStatusIndex,
      `<h3>Remaining Enemies <a>${this.worldGenFactory.enemyAmount-this.worldGenFactory.entityHandler.destroyedEnemies}</a> out of <a>${this.worldGenFactory.enemyAmount}</a></h3>`
    );
    if(this.worldGenFactory.enemyAmount-this.worldGenFactory.entityHandler.destroyedEnemies<=0){
      this.gameIsActive = false;
      return true;
    }
    return true;
  }
}
