import { Entity } from '/model/entity.js'

export class PlayerEntity extends Entity {

  constructor(model, hitbox, healthPoints = 1) {
    super(model, hitbox, healthPoints);
    this.userInput = [];
    this.cameraEntity = undefined;
  }

  setCameraEntity(cameraEntity) {
    this.cameraEntity = cameraEntity;
  }

  getCameraEntity() {
    return this.cameraEntity;
  }

  makeDecision() {
    let doShoot = false;
    super.makeDecision();
    if (this.cameraEntity != undefined) {
      this.cameraEntity.setXPos(this.getXPos());
      this.cameraEntity.setZPos(this.getZPos());
    }
    for(var element in this.userInput){
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

  constructor(model, hitbox, healthpoints = 1) {
    super(model, hitbox);
    this.doSpeedDown = false;
    //this.userInput;

  }


  //The projectile will be shot by the player/enemy in z-Direction

  makeDecision() {
    super.makeDecision();
    this.moveForward();
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

  constructor(model, hitbox, healthPoints = 1) {
    super(model, hitbox, healthPoints);
    //this.userInput = [];
    this.cameraEntity = undefined;
    this.randomInput = [];
  }

  makeDecision() {
    let doShoot = false;
    super.makeDecision();

    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }




      function* shuffle(array) {

        var i = array.length;

        while (i--) {
          yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
        }

      }

      var randomNumbers = shuffle([1,2,3,4,5,6,7,8,9,10]);

    delay(2000).then(() => {
      let randomX = randomNumbers.next().value;

      console.log(randomX);

      if(randomX > 4){
        this.moveRight();
      }else {
        this.moveLeft();
      }

    })





    /*

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    let randomValue = getRandomInt(10, 100);

    console.log(randomValue);

    if(randomValue > 44) { //move right

        this.moveRight();

    }

    else{ //move left
      this.moveLeft();
    }

     */


    this.randomInput = undefined;
   // return { doShoot: doShoot };
  }
  /*
  storeUserInput(inputValue) {
    this.userInput = inputValue;
  }
   */
}
