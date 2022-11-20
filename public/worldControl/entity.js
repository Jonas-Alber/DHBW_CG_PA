/**
 * @Author Marvin Franke
 * @Version 1.0.0
 */


/**Start of import zone */
import { CompressedTextureLoader } from 'three';
import { Object } from '/model/object.js'
/**End of import zone */


/**Start of constant definition zone */
const speedMultiplier = 0.5;
const speedReduceFactor = speedMultiplier / 2;
const speedCap = 10;
const speedFactor = 0.07;
const shootCap = 15;
export class Entity extends Object {
    /**
    * @param {int} healthPoints -number of healthpoints a object e.g. player, enemy,... has
    * @param {Object} model -three.js model 
    * @param {Object} hitbox -three.js hitbox
    * @param {int} objectPosition - coordinates where the object is
    * @param {boolean} doSpeedDown -entity will decrease speed or not
    * @param {number} xSpeed -sets the velocity in x-direction
    * @param {number} ySpeed -sets the velocity in y-direction
    * @param {number} zSpeed -sets the velocity in z-direction
    * @param {number} haveShoot
    * @param {number} speedCap
    * @param {number} speedFactor
    * @param {number} shootCap
    * @param {int} maxPosition
    * @param {Array} subElements
   */

    constructor(model, hitbox, objectPosition, healthPoints = 1, doSpeedDown = true) {
        //Aufruf constructor von object.js
        super(model, hitbox, healthPoints); 

        this.objectPosition = objectPosition;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.zSpeed = 0;
        this.doSpeedDown = doSpeedDown;
        this.haveShoot = 0;
        this.speedCap = speedCap;
        this.speedFactor = speedFactor;
        this.shootCap = shootCap;
        this.subElements = [];
    }

    /**
    * Adds an sublement
    */
    addSubElement(subElement) {
        this.subElements.push(subElement);
    }

    /**
    * Tests, if sublement exists
    */
    haveSubElemet(sublement) {
        return this.subElements.length > 0;
    }

    /**
    * Retrieves the x-Position of the model
    */
    getXPos() {
        return this.model.position.x;
    }

    /**
    * Retrieves the y-Position of the model
    */
    getYPos() { 
        return this.model.position.y;
    }

    /**
    * Retrieves the z-Position of the model
    */
    getZPos() {
        return this.model.position.z;
    }

    /**
    * Sets the x and z-Position of the model
    */
    setPosition(xPos, zPos) {
        this.model.position.x = xPos;
        this.model.position.z = zPos;
    }

    makeDecision(canMove) {
        this.moveObject(canMove);
        if (this.doSpeedDown) {
            this.speedDown();
        }
        if (this.haveShoot > 0) {
            this.haveShoot -= 1;
        }
    }

    /**
    * Speeds the entity realistically down with physical acceleration
    */
    speedDown() {
        //Check, if velocity in x-Direction is negative
        if (this.xSpeed < 0) {
            //Check, if velocity is smaller than factor
            if (this.xSpeed < -speedReduceFactor) {
                //Reduce the velocity in negative x-Direction
                this.xSpeed += speedReduceFactor;
            }
            else { //velocity is greater than factor
                //Adjust velocity to 0
                this.xSpeed = 0;
            }
        }
        else { //Velocity in x-Direction is positive 
            //Check, if velocity is greater than factor
            if (this.xSpeed > speedReduceFactor) {
                //Reduce the velocity in positive x-Direction
                this.xSpeed -= speedReduceFactor;
            }
            else { //Velocity is smaller than factor
                //Adjust velocity to 0
                this.xSpeed = 0;
            }
        }


        //Check, if velocity in y-Direction is negative
        if (this.ySpeed < 0) {
            //Check, if velocity is smaller than factor
            if (this.ySpeed < -speedReduceFactor) {
                //Reduce the velocity in negative y-Direction
                this.ySpeed += speedReduceFactor;
            }
            else {//velocity is greater than factor
                //Adjust velocity to 0
                this.ySpeed = 0;
            }
        }
        else { //Velocity in y-Direction is positive 
            //Check, if velocity is greater than factor
            if (this.ySpeed > speedReduceFactor) {
                //Reduce the velocity in positive x-Direction
                this.ySpeed -= speedReduceFactor;
            }
            else {//Velocity is smaller than factor
                 //Adjust velocity to 0
                this.ySpeed = 0;
            }
        }


        //Check, if velocity in z-Direction is negative
        if (this.zSpeed < 0) {
            //Check, if velocity is smaller than factor
            if (this.zSpeed < -speedReduceFactor) {
                //Reduce the velocity in negative z-Direction
                this.zSpeed += speedReduceFactor;
            }
            else {//velocity is greater than factor
                 //Adjust velocity to 0
                this.zSpeed = 0;
            }
        }
        else { //Velocity in z-Direction is positive 
            //Check, if velocity is greater than factor
            if (this.zSpeed > speedReduceFactor) {
                //Reduce the velocity in positive z-Direction
                this.zSpeed -= speedReduceFactor;
            }
            else {//Velocity is smaller than factor
                //Adjust velocity to 0
                this.zSpeed = 0;
            }
        }
    }

    /**
    * Tests, whether object is shootable or not
    */
    shootObject() {
        //Checks, whether there is ammo available
        if (this.haveShoot == 0) {
            this.haveShoot = shootCap;
            return true;
        }
        return false;
    }

    /**
    * Sets the slope of the entity
    */
    setSlope() {
        //Set rotation in three direction using the math library
        this.model.rotation.z = Math.PI / (8 * this.speedCap) * -this.xSpeed;
        this.model.rotation.x = Math.PI / (6 * this.speedCap) * -this.ySpeed;
        this.model.rotation.x = Math.PI / (10 * this.speedCap) * this.zSpeed;
    }

    moveObject(canMove) {
      if((!canMove.left && this.xSpeed < 0)|| (!canMove.right && this.xSpeed > 0)) this.xSpeed = 0;
      if((!canMove.down && this.ySpeed < 0)|| (!canMove.up && this.ySpeed > 0)) this.ySpeed = 0;
      if((!canMove.forward && this.zSpeed < 0)|| (!canMove.backward && this.zSpeed > 0)) this.zSpeed = 0;
        this.model.position.z += this.speedFactor * this.zSpeed;
        this.model.position.y += this.speedFactor * this.ySpeed;
        this.model.position.x += this.speedFactor * this.xSpeed;
        this.setSlope();

        //Check, if SubElements exist
        if (this.subElements.length > 0) {
            //Set x and z Position for each subelement
            for (var element in this.subElements) {
                this.subElements[element].setXPos(this.model.position.x);
                this.subElements[element].setZPos(this.model.position.z);
            }
        }
        this.hitbox.setFromObject(this.model);
    }

    /**
    * All of the following 6 functions 
    * vary the velocity in each direction realistically of the entity
    */
    moveForward() {
      if (-this.zSpeed < this.speedCap) {
        this.zSpeed -= speedMultiplier;
      }
    }

    moveBackward() {
      if (this.zSpeed < this.speedCap) {
        this.zSpeed += speedMultiplier;
      }
    }

    moveLeft() {
        if (-this.xSpeed < this.speedCap && this.model.position.x > this.objectPosition.minPosition.x) {
            this.xSpeed -= speedMultiplier;
        }
    }

    moveRight() {
        if (this.xSpeed < this.speedCap && this.model.position.x < this.objectPosition.maxPosition.x) {
            this.xSpeed += speedMultiplier;
        }
    }

    moveUp() {
        if (this.ySpeed < this.speedCap && this.model.position.y < this.objectPosition.maxPosition.y) {
            this.ySpeed += speedMultiplier;
        }
    }

    moveDown() {
        if (-this.ySpeed < this.speedCap && this.model.position.y > this.objectPosition.minPosition.y) {
            this.ySpeed -= speedMultiplier;
        }
    }

    /**
    * Adjust position in x-direction
    */
    adjustXPosition(amountX) {
        this.model.position.x += amountX;
    }

    /**
    * Adjust position in y-direction
    */
    adjustYPosition(amountY) {
        this.model.position.y += amountY;
    }


    adjustRotation(degreeAdjustment) {
       
        //Adjust rotation of entity
        //Entity.rotation = rotation + degreeAdjustment;
    }

}
