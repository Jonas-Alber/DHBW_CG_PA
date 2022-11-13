import {Entity} from '/model/entity.js'


export class projectileEntity extends Object {


    constructor(model, hitbox, healthPoints=1) {
        super(model, hitbox, healthPoints); //Aufruf constructor von object.js
        this.xSpeed=0;
        this.zSpeed=0;
    }

//The projectile will be shot by the enemy randomly from the top of the screen to the bottom
    makeDecision(){

//Get current position

//Check if current position is on the left or right side of the screen

//Get a shoot angle: random number between -30 and 30, depends on which side enemy is

//Let the projectile move in given direction


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
