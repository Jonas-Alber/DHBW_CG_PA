class Entity  {
//extends Parentclass

    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.degree = degree;
    }



    adjustPosition(amountX, amountY){

        //Get current position

        //Adjust the current position by amount
        let positionX = positionX + amountX;
        let positionY = positionY + amountY;

        return (positionX, positionY)

    }



    adjustRotation(degree){


        let newDegree = newDegree + degree;

        return (newDegree)

    }

}


//Entity.adjustPosition(5, 8);
