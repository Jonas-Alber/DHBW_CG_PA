export class Object {

    constructor(model, hitbox, healthPoints=1) {
        this.healthPoints = healthPoints;
        this.model = model;
        this.hitbox = hitbox;
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


}
