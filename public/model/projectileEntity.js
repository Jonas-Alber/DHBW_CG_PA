import {Entity} from '/model/entity.js'

export class ProjectileEntity extends Entity{

    constructor(model, hitbox) {
        super(model, hitbox);

    }

    makeDecision(){


    }

}

/*
   //User Input:

document.addEventListener("keypress", function(event) {

    switch(event.key){
        case 39:
            //gehe nach rechts
        case 37:
            //gehe nach links
        case 38:
            //gehe nach oben
        case 40:
            //gehe nach unten
    }
})*/
