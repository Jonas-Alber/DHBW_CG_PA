import { CompressedTextureLoader } from 'three';
import {Object} from '/model/object.js'

const speedMultiplier = 0.5;
const speedDivider = speedMultiplier / 4;
export class Entity extends Object  {

    constructor(model, hitbox, healthPoints=1) {
        super(model, hitbox, healthPoints); //Aufruf constructor von object.js
        this.xSpeed=0;
        this.zSpeed=0;
    }



    setPosition(xPos, zPos){
        this.model.position.x=xPos;
        this.model.position.z=zPos;
    }

    speedDown(){
        if(this.xSpeed < 0){
            if(this.xSpeed < -speedDivider){
                this.xSpeed+= speedDivider;
            }
            else{
                this.xSpeed = 0;
            } 
        }
        else{
            if(this.xSpeed > speedDivider){
                this.xSpeed-= speedDivider;
            }
            else{
                this.xSpeed = 0;
            } 
        }

        if(this.zSpeed < 0){
            if(this.zSpeed < -speedDivider){
                this.zSpeed+= speedDivider;
            }
            else{
                this.zSpeed = 0;
            } 
        }
        else{
            if(this.zSpeed > speedDivider){
                this.zSpeed-= speedDivider;
            }
            else{
                this.zSpeed = 0;
            } 
        }
    }

    moveObject(){
        this.model.position.z += 0.05 * this.zSpeed;
        this.model.position.x += 0.05 * this.xSpeed;
        this.hitbox.update();
    }

    moveForward(){
        this.zSpeed -= speedMultiplier; 
    }

    moveBackward(){
        this.zSpeed += speedMultiplier;
    }

    moveLeft(){
        this.xSpeed -= speedMultiplier;
    }

    moveRight(){
        this.xSpeed += speedMultiplier;
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
