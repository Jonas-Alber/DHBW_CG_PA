import {Object} from '/model/object.js'


export class Entity extends Object  {

    constructor(model, hitbox, healthPoints=1) {
        super(model, hitbox, healthPoints); //Aufruf constructor von object.js
        this.xSpeed=0;
        this.zSpeed=0;
    }

    noBoost(){
        if(this.xSpeed > 0) this.xSpeed-= 0.25;
        if(this.xSpeed < 0) this.xSpeed+= 0.25;
        if(this.zSpeed > 0) this.zSpeed-= 0.25;
        if(this.zSpeed < 0) this.zSpeed+= 0.25;
    }

    moveObject(){
        this.model.position.z += 0.05 * this.zSpeed;
        this.model.position.x += 0.05 * this.xSpeed;
        this.hitbox.update();
        console.log(this.xSpeed, this.zSpeed);
    }

    moveForward(){
        this.zSpeed += 1; 
    }

    moveBackward(){
        this.zSpeed -= 1;
    }

    moveLeft(){
        this.xSpeed -= 1;
    }

    moveRight(){
        this.xSpeed += 1;
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
