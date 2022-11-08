import {Entity} from '/model/entity.js'

export class PlayerEntity extends Entity{

    constructor(model, hitbox, healthPoints = 1) {
        super(model, hitbox, healthPoints);
        this.userInput;

    }

    makeDecision(){
        this.moveObject();
        switch(this.userInput){
            case 'd':
                this.moveRight();
                break;
                //gehe nach rechts
            case 'a':
                this.moveLeft();
                break;
                //gehe nach links
            case 'w':
                this.moveForward();
                break;
            case 's':
                this.moveBackward();
                //gehe nach unten
                break;
            case ' ':
                console.log("FEUER FREI!");
                //gehe nach unten
                break;
            default:
                this.noBoost();
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
