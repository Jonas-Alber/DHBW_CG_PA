import * as Object from './object'
import * as Entity from './entity'

class Projectile extends Entity{

    constructor() {
        super();

    }

    makeDecision(){


    }

}


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
})
