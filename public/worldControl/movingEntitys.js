/**
 * @Author Marvin Franke
 * @Version 1.0.0
 */

/**Start of import zone */
import { Entity } from '/model/entity.js'
import { getRandomInt, getRandomArbitrary, ObjectPosition } from '/model/helperClass.js';
/**End of import zone */

export class PlayerEntity extends Entity {
  /**
   * @param {int} healthPoints -number of healthpoints a object e.g. player, enemy,... has
   * @param {Object} model -three.js model 
   * @param {Object} hitbox -three.js hitbox
   * @param {Array} userInput -Keyboard Events from the user
   */

  constructor(model, hitbox, objectPosition, healthPoints = 1) {
    super(model, hitbox, objectPosition, healthPoints);
    this.userInput = [];
    this.cameraEntity = undefined;
  }

  /**
    *Initializes the cameraEntity
    @param {Object} cameraEntity -object, representing the camera
  */
  setCameraEntity(cameraEntity) {
    this.cameraEntity = cameraEntity;
  }

  /**
    *Retrieves the cameraEntity
    @returns {Object} -returns the cameraEntity Object
  */
  getCameraEntity() {
    return this.cameraEntity;
  }


  /**
    *Sets camera position, reads user input and moves entity accordingly
    * @param {Object} canMove -list of booleans declaring, 
    * whether entity can move or not in specific direction
    * @returns {boolean} -true, if user shoots
    */
  makeDecision(canMove) {
    let doShoot = false;
    super.makeDecision(canMove);
    if (this.cameraEntity != undefined) {
      this.cameraEntity.setXPos(this.getXPos());
      this.cameraEntity.setYPos(this.getYPos());
      this.cameraEntity.setZPos(this.getZPos());
    }

    //Go through each element of the user's input
    for (var element in this.userInput) {
      //In each specific case, call a specific movement action
      switch (this.userInput[element]) {
        case 'd':
          this.moveRight();
          break;    
        case 'a':
          this.moveLeft();
          break;
        case 'w':
          this.moveForward();
          break;
        case 's':
          this.moveBackward(); 
          break;
        case 'q':
          this.moveUp(); 
          break;
        case 'e':
          this.moveDown(); 
          break;
        case ' ':
          doShoot = this.shootObject();
          break;
      }
    }
    this.userInput = undefined;
    return { doShoot: doShoot };
  }

   /**
    *Store user's input in Object to retrieve it later
    @param {Object} inputValue -conatins user input information
  */
  storeUserInput(inputValue) {
    this.userInput = inputValue;
  }

}


export class ProjectileEntity extends Entity {
  /**
   * @param {int} healthPoints -number of healthpoints a object e.g. player, enemy,... has
   * @param {Object} model -three.js model 
   * @param {Object} hitbox -three.js hitbox
   * @param {int} objectPosition - coordinates where the object is
   */

  constructor(model, hitbox, objectPosition, healthpoints = 1) {
    super(model, hitbox, objectPosition);
    this.doSpeedDown = false;
    this.parentType = undefined;
  }


  /**
    *Moves the projectile in direction according to the facing direction
    * @param {Object} canMove -list of booleans declaring, 
    * whether entity can move or not in specific direction
  */
  makeDecision(canMove) {
    super.makeDecision(canMove);
    //Check, what the facing direction of the projectile is: shot by enemy or player
    if (this.objectPosition.faceDirection == 0) {
      this.moveForward();
    } else if (this.objectPosition.faceDirection == 2) {
      this.moveBackward();
    } else {
    }
  }
}



export class AiEntity extends Entity {

  /**
   * @param {int} healthPoints -number of healthpoints a object e.g. player, enemy,... has
   * @param {Object} model -three.js model 
   * @param {Object} hitbox -three.js hitbox
   * @param {int} objectPosition - coordinates where the object is
   */

  constructor(model, hitbox, objectPosition, healthPoints = 1) {
    super(model, hitbox, objectPosition, healthPoints);
    this.nextDecision = 0;
    this.decision = 0;
    this.playerPosition = undefined;

  }

 /**
    *Moves the projectile in direction according to the facing direction
    * @param {Number} xPos -xPosition of Player
    * @param {Number} yPos -yPosition of Player
    * @param {Number} zPos -zPosition of Player
  */
  setPlayerPosition(xPos, yPos, zPos){
    this.playerPosition = {x: xPos, y: yPos, z: zPos};
  }

  /**
    *Regulates the movement and shoot behaviour of the 'Ai'
    * @param {Object} canMove -list of booleans declaring, 
    * whether entity can move or not in specific direction
    * @returns {boolean} -true, if Ai has shot
  */
  makeDecision(canMove) {
    ;
    super.makeDecision(canMove);
    var doShoot = false;
    //Create random integers for Ai purposes
    if (this.nextDecision <= 0) {
      this.nextDecision = getRandomInt(20, 61);
      this.decision = getRandomInt(1, 5);
      this.doRandom = getRandomInt(1,3);
      doShoot = this.shootObject();
    } else {
      this.nextDecision -= 1;
      //Check, if player Position is available 
      if(this.playerPosition == undefined){
        this.__getRandomDecision();
      }
      else{ //Player position is available
        this.__getDecision();
      }
    }
    return { doShoot: doShoot };
  }


   /**
    *Ai tracks movements of player and then adapts it's behaviour to the one of the player
    *to be more realistic and challenging for the player
  */
  __getDecision(){
    //One third chance to call the RandomDecision 
    if(this.doRandom == 1){
      this.__getRandomDecision()
    }
    else{
      if(this.model.position.x-this.playerPosition.x > 1){
        this.moveLeft();
      }else if(this.model.position.x-this.playerPosition.x < -1){
        this.moveRight();
      }
      if(this.model.position.y-this.playerPosition.y > 1){
        this.moveDown();
      }else if(this.model.position.y-this.playerPosition.y < -1){
        this.moveUp();
      }
    }
  }

/**
    *Ai will make completly random movements
  */
  __getRandomDecision(){
      switch (this.decision) {
        case 1:
          this.moveRight();
          break;
        case 2:
          this.moveLeft();
          break;
        case 3:
          this.moveUp();
        case 4:
          this.moveDown();
      }
  }

}
