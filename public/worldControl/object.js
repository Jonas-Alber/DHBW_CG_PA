/**
 * @Author Marvin Franke
 * @Version 1.0.0
 */


export class Object {
    /**
   * @param {int} healthPoints -number of healthpoints a object e.g. player, enemy,... has
   * @param {Object} model -three.js model 
   * @param {Object} hitbox -three.js hitbox
   */

    constructor(model, hitbox, healthPoints=1) {
        this.healthPoints = healthPoints;
        this.model = model;
        this.hitbox = hitbox;
    }

    /**
    * Sets the healthpoints of the object
    */
    setHP(healthPoints) {
        this.healthpoints = healthPoints;
    }

    /**
    * Retrieves the healthpoints of the object
    */
    getHP() {
        return this.healthPoints;
    }

    /**
    * Retrieves the hitbox of the object
    */
    getHitbox(){
        return this.hitbox;
    }

    /**
    * Retrieves the x-position of the object
    */
    getXPos(){
        return this.model.position.x;
    }

    /**
    * Retrieves the y-position of the object
    */
    getYPos(){
        return this.model.position.y;
    }

    /**
    * Retrieves the z-position of the object
    */
    getZPos(){
        return this.model.position.z;
    }


}
