import * as Object from './object'


class Entity extends Object  {
//extends Parentclass

    constructor(positionX, positionY) {
        super(); //Aufruf constructor von object.js


        this.positionX = positionX;
        this.positionY = positionY;
        this.degree = degree;
    }


//Trenne positions
    adjustPosition(amountX, amountY){

        //Get current position

        //Adjust the current position by amount
        let positionX = positionX + amountX;
        let positionY = positionY + amountY;

        //   cube.rotation.x += 0.01
        //     cube.rotation.y += 0.01

        return (positionX, positionY)

    }



    adjustRotation(degree){


        let newDegree = newDegree + degree;

        return (newDegree)

    }

}


//Entity.adjustPosition(5, 8);
