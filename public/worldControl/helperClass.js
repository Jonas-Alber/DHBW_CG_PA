/**
 * @Author Marvin Franke
 * @Version 1.0.0
 */

/**
  *This Class helps other objects to correct their velocity, positioning etc.
  */
export class ObjectPosition{
  constructor(){
    this.position = {x:0,y:0,z:20};
    this.maxPosition = {x:0,y:0,z:0};
    this.minPosition = {x:0,y:0,z:0};
    this.sizeFactor = 1;
    this.speed = {x:0,y:0,z:0};
    this.rotation = {x:0,y:0,z:0}
    this.faceDirection = 0; //0 = up, 1 = right, 2 = down, 3 = left
  }
}

 /**
    * Creates a random integer for the Ai Entity between min and max
    * @param {number} min -minimum number of the integer that will be returned
    * @param {number} max -maximum number of the integer that will be returned
    * @returns {int} -random integer to be returned
    */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


/**
    * Creates a random integer for the Ai Entity between min and max
    * @param {number} min -minimum number of the integer that will be returned
    * @param {number} max -maximum number of the integer that will be returned
    * @returns {int} -random integer to be returned
    */
export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
