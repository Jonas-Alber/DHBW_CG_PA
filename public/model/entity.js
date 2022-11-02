import * as Object from './object'


class Entity extends Object  {

    constructor(positionX, positionY) {
        super(); //Aufruf constructor von object.js


        this.positionX = positionX;
        this.positionY = positionY;
        this.rotation = rotation;
    }


    adjustXPosition(amountX){

        //Load current position into positionX var

        //Adjust position in x-direction

        Entity.position = positionX + amountX;
    }

    adjustYPosition(amountY){

        //Load current position into positionY var

        //Adjust position in y-direction

        Entity.position = positionY + amountY;
    }




    adjustRotation(degreeAdjustment){
        //Load current rotation into rotation var

        //Adjust rotation of entity
        Entity.rotation = rotation + degreeAdjustment;
    }

}

//Beispiel Aufruf
//Entity.adjustPosition(5, 8);
