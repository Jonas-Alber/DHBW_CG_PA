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
    * @param {int} healthpoints -number of healthpoints a object e.g. player, enemy,... has
    */
    setHP(healthPoints) {
        this.healthpoints = healthPoints;
    }

    /**
    * Retrieves the healthpoints of the object
    * @return {number} -healthpoints
    */
    getHP() {
        return this.healthPoints;
    }

    /**
    * Retrieves the hitbox of the object
    * @return {Object} -hitbox object
    */
    getHitbox(){
        return this.hitbox;
    }

    /**
    * Retrieves the x-position of the object
    * @return {number} -x-position
    */
    getXPos(){
        return this.model.position.x;
    }

    /**
    * Retrieves the y-position of the object
    * @return {number} - y-position
    */
    getYPos(){
        return this.model.position.y;
    }

    /**
    * Retrieves the z-position of the object
    * @return {number} - z-position
    */
    getZPos(){
        return this.model.position.z;
    }


}
