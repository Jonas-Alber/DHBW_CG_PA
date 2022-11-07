import {Object} from '/model/object.js'


export class Entity extends Object  {

    constructor(model, hitbox, healthPoints=1) {
        super(model, hitbox, healthPoints); //Aufruf constructor von object.js
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
