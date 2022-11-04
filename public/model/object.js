class Object {

    constructor(healthPoints, model, hitbox) {
        this.healthPoints = healthPoints;
        this.model = model;
        this.hitbox = hitbox;
    }

    setHP(healthPoints) {
        //set the healthpoints of an object
        let healthpoints = this.healthPoints;
    }

    getHP() {
        //retrieve healthpoints
        return this.healthPoints
    }


}
