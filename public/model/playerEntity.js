import {Entity} from '/model/entity.js'

export class PlayerEntity extends Entity{

    constructor(model, hitbox, healthPoints = 1) {
        super(model, hitbox, healthPoints);
        this.userInput;

    }

    makeDecision(){
        switch(this.userInput){
            case 39:
                //gehe nach rechts
            case 37:
                //gehe nach links
            case 38:
                //gehe nach oben
            case 40:
                //gehe nach unten
        }

    }

    storeUserInput(inputValue){
        this.userInput = inputValue;
    }

}
