import {Entity} from '/model/entity.js'

export class PlayerEntity extends Entity{

    constructor(model, hitbox, healthPoints = 1) {
        super(model, hitbox, healthPoints);
        this.userInput;

    }

    makeDecision(){
        switch(this.userInput){
            case 'd':
                console.log("rechts");
                break;
                //gehe nach rechts
            case 'a':
                console.log("links");
                break;
                //gehe nach links
            case 'w':
                console.log("oben");
                //gehe nach oben
                break;
            case 's':
                console.log("unten");
                //gehe nach unten
                break;
        }
        this.userInput = undefined;
    }

    storeUserInput(inputValue){
        this.userInput = inputValue;
    }

}

export class ProjectileEntity extends Entity{

    constructor(model, hitbox) {
        super(model, hitbox);

    }

    makeDecision(){

    }

}

export class AiEntity extends Entity{

    constructor(model, hitbox, healthPoints = 1) {
        super(model, hitbox, healthPoints);

    }

    makeDecision(){

    }

}
