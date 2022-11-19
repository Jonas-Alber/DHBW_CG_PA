export class Object {

    constructor(model, hitbox, healthPoints=1) {
        this.healthPoints = healthPoints;
        this.model = model;
        this.hitbox = hitbox;
        // this.objectPosition
    }

    setHP(healthPoints) {
        //set the healthpoints of an object
        this.healthpoints = healthPoints;
    }

    getHP() {
        //retrieve healthpoints
        return this.healthPoints;
    }

    getHitbox(){
        return this.hitbox;
    }

    getXPos(){
        return this.model.position.x;
    }
    getYPos(){
        return this.model.position.y;
    }
    getZPos(){
        return this.model.position.z;
    }


}
