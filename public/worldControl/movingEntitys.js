import { Entity } from '/model/entity.js'
import { getRandomInt, getRandomArbitrary, ObjectPosition } from '/model/helperClass.js';

export class PlayerEntity extends Entity {

  constructor(model, hitbox, objectPosition, healthPoints = 1) {
    super(model, hitbox, objectPosition, healthPoints);
    this.userInput = [];
    this.cameraEntity = undefined;
  }

  setCameraEntity(cameraEntity) {
    this.cameraEntity = cameraEntity;
  }

  getCameraEntity() {
    return this.cameraEntity;
  }

  makeDecision(canMove) {
    let doShoot = false;
    super.makeDecision(canMove);
    if (this.cameraEntity != undefined) {
      this.cameraEntity.setXPos(this.getXPos());
      this.cameraEntity.setYPos(this.getYPos());
      this.cameraEntity.setZPos(this.getZPos());
    }
    for (var element in this.userInput) {
      switch (this.userInput[element]) {
        case 'd':
          this.moveRight();
          break;
        //gehe nach rechts
        case 'a':
          this.moveLeft();
          break;
        //gehe nach links
        case 'w':
          this.moveForward();
          //gehe vorwärts
          break;
        case 's':
          this.moveBackward(); //geht das überhaupt?
          //gehe nach unten
          break;
        case 'q':
          this.moveUp(); //geht das überhaupt?
          //gehe nach unten
          break;
        case 'e':
          this.moveDown(); //geht das überhaupt?
          //gehe nach unten
          break;
        case ' ':
          //Feuer
          doShoot = this.shootObject();
          break;
      }
    }
    this.userInput = undefined;
    return { doShoot: doShoot };
  }

  storeUserInput(inputValue) {
    this.userInput = inputValue;
  }

}
export class ProjectileEntity extends Entity {

  constructor(model, hitbox, objectPosition, healthpoints = 1) {
    super(model, hitbox, objectPosition);
    this.doSpeedDown = false;
    this.parentType = undefined;
    //this.userInput;

  }


  //The projectile will be shot by the player/enemy in z-Direction

  makeDecision(canMove) {
    super.makeDecision(canMove);
    if (this.objectPosition.faceDirection == 0) {
      this.moveForward();
    } else if (this.objectPosition.faceDirection == 2) {
      this.moveBackward();
    } else {
    }
    /*
      if(collisionBool === null) { //no collision
          this.projectile.position.z += 1; //Speed muss noch konkretisiert werden
      }else { //Collision at collisionBool
          While(this.projectile.position.z < collisionBool){
          this.projectile.position.z += 1; //Speed muss noch konkretisiert werden
      }
      }*/
  }


}

export class AiEntity extends Entity {

  constructor(model, hitbox, objectPosition, healthPoints = 1) {
    super(model, hitbox, objectPosition, healthPoints);
    this.nextDecision = 0;
    this.decision = 0;
    this.playerPosition = undefined;

  }

  setPlayerPosition(xPos, yPos, zPos){
    this.playerPosition = {x: xPos, y: yPos, z: zPos};
  }
  makeDecision(canMove) {
    ;
    super.makeDecision(canMove);
    var doShoot = false;
    if (this.nextDecision <= 0) {
      this.nextDecision = getRandomInt(20, 61);
      this.decision = getRandomInt(1, 5);
      this.doRandom = getRandomInt(1,3);
      doShoot = this.shootObject();
    } else {
      this.nextDecision -= 1;
      if(this.playerPosition == undefined){
        this.__getRandomDecision();
      }
      else{
        this.__getDecision();
      }
    }
    return { doShoot: doShoot };
  }

  __getDecision(){
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
