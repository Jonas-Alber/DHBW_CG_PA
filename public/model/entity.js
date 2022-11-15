import { CompressedTextureLoader } from 'three';
import {Object} from '/model/object.js'

const speedMultiplier = 0.5;
const speedReduceFactor = speedMultiplier / 2;
const speedCap = 10;
const speedFactor = 0.07;
const shootCap = 15;
const LeftRightCap = 25;
export class Entity extends Object  {

    constructor(model, hitbox, healthPoints=1, doSpeedDown=true) {
        super(model, hitbox, healthPoints); //Aufruf constructor von object.js
        this.xSpeed=0;
        this.zSpeed=0;
        this.doSpeedDown = doSpeedDown;
        this.haveShoot=0;
        this.speedCap = speedCap;
        this.speedFactor = speedFactor;
        this.shootCap = shootCap;
        this.maxPosition = {x:LeftRightCap,y:0,z:0};
    }

    getXPos(){
        return this.model.position.x;
    }
    getYPos(){ //quasi obsolet, da nur in x und z Position Bewegung erforderlich
        return this.model.position.y;
    }
    getZPos(){
        return this.model.position.z;
    }

    setPosition(xPos, zPos){
        this.model.position.x=xPos;
        this.model.position.z=zPos;
    }

    makeDecision(){
      this.moveObject();
      if(this.doSpeedDown){
        this.speedDown();
      }
      if(this.haveShoot>0){
        this.haveShoot-=1;
      }
    }

    speedDown(){
        if(this.xSpeed < 0){
            if(this.xSpeed < -speedReduceFactor){
                this.xSpeed+= speedReduceFactor;
            }
            else{
                this.xSpeed = 0;
            } 
        }
        else{
            if(this.xSpeed > speedReduceFactor){
                this.xSpeed-= speedReduceFactor;
            }
            else{
                this.xSpeed = 0;
            } 
        }

        if(this.zSpeed < 0){
            if(this.zSpeed < -speedReduceFactor){
                this.zSpeed+= speedReduceFactor;
            }
            else{
                this.zSpeed = 0;
            } 
        }
        else{
            if(this.zSpeed > speedReduceFactor){
                this.zSpeed-= speedReduceFactor;
            }
            else{
                this.zSpeed = 0;
            } 
        }
    }

    shootObject(){ 
      if(this.haveShoot==0){
        this.haveShoot=shootCap;
        return true;
      }
      return false;
    }

    moveObject(){
        this.model.position.z += this.speedFactor * this.zSpeed;
        this.model.position.x += this.speedFactor * this.xSpeed;
        /*if(this.model.position.x < this.maxPosition.x && this.model.position.x > -this.maxPosition.x){
            
        }
        else if(this.model.position.x >= this.maxPosition.x){
            if(this.speedFactor * this.xSpeed<0){
                this.model.position.x += this.speedFactor * this.xSpeed;
            }
        }else if(this.model.position.x <= -this.maxPosition.x){
            if(this.speedFactor * this.xSpeed>0){
                this.model.position.x += this.speedFactor * this.xSpeed;
            }
        }else{
            console.log("error")
        }*/
        this.hitbox.setFromObject(this.model);
    }

    moveForward(){
      if(-this.zSpeed < this.speedCap) this.zSpeed -= speedMultiplier; 
    }

    moveBackward(){
      if(this.zSpeed < this.speedCap) this.zSpeed += speedMultiplier;
    }

    moveLeft(){
      if(-this.xSpeed < this.speedCap && this.model.position.x > -this.maxPosition.x){
        this.xSpeed -= speedMultiplier;
      } 
    }

    moveRight(){
      if(this.xSpeed < this.speedCap && this.model.position.x < this.maxPosition.x){
        this.xSpeed += speedMultiplier;
      }
    }


    adjustXPosition(amountX){

        //Load current position into positionX var

        //Adjust position in x-direction

        this.model.position.x += amountX;
    }

    adjustYPosition(amountY){

        //Load current position into positionY var

        //Adjust position in y-direction

        this.model.position.y += amountY;
    }




    adjustRotation(degreeAdjustment){
        //Load current rotation into rotation var

        //Adjust rotation of entity
        //Entity.rotation = rotation + degreeAdjustment;
    }

}

//Beispiel Aufruf
//Entity.adjustPosition(5, 8);
