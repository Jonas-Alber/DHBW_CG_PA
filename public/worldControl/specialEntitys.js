/**
 * @Author Marvin Franke
 * @Version 1.0.0
 */

/**
  * The light entity initializes a lightsource with a specific offset in z and x directions
*/
export class LightEntity {
  /** 
  * @param {number} xOffset -offset in x-direction from lightsource
  * @param {number} zOffset -offset in z-direction from lightsource
  * @param {Object} model - a three.js model
  */
  constructor(model, xOffset = 0, zOffset = -10) {
    this.model = model;
    this.xOffset = xOffset;
    this.zOffset = zOffset;
  }

  /**
  * Sets the x-Coordinate of the lightsource with specific offset
  * @param {number} xPos - x-Coordinate of the lightsource
  */
  setXPos(xPos) {
    this.model.position.x = xPos + this.xOffset;
  }

  /**
  * Sets the z-Coordinate of the lightsource with specific offset
  * @param {number} zPos - z-Coordinate of the lightsource
  */
  setZPos(zPos) {
    this.model.position.z = zPos + this.zOffset + 5;
  }

  /**
  * Adjusts the XPos of the lightsource by a specific value
  * @param {number} xAdjust - x-Adjustment to be added to the x-Coordinate of the lightsource
  */
  adjustXPos(xAdjust) {
    this.model.position.x += xAdjust;
  }

  /**
  * Adjusts the ZPos of the lightsource by a specific value
  * @param {number} zAdjust - z-Adjustment to be added to the z-Coordinate of the lightsource
  */
  adjustZPos(zAdjust) {
    this.model.position.z += zAdjust;
  }
}


/**
  * The camera entity allows the player to see the current scenario by displaying the scene from
  * a bird's-eye view of the players spaceship
*/
export class CameraEntity {
  /** 
  * @param {Object} camera -the camera object
  * @param {number} canvasWidth - width of the canvas in which the game will be displayed
  * @param {number} canvasHeight - height of the canvas in which the game will be displayed
  * @param {number} xOffset -offset in x-direction from camera to player position
  * @param {number} yOffset -offset in y-direction from camera to player position
  * @param {number} zOffset -offset in z-direction from camera to player position 
  */
  constructor(camera, canvasWidth, canvasHeight, xOffset = 0, yOffset, zOffset = 0) {
    this.camera = camera;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = zOffset;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvasHalfHeight = canvasHeight / 8;
  }

  /**
  * Sets the x-Coordinate of the Camera with specific offset
  * @param {number} xPos - x-Coordinate of the camera
  */
  setXPos(xPos) {
    this.camera.position.x = xPos + this.xOffset;
  }

  /**
  * Sets the y-Coordinate of the Camera with specific offset
  * @param {number} yPos - y-Coordinate of the camera
  */
  setYPos(yPos){
    this.camera.position.y = yPos + this.yOffset;
  }

  /**
  * Sets the z-Coordinate of the Camera with specific offset
  * @param {number} zPos - z-Coordinate of the camera
  */
  setZPos(zPos) {
    this.camera.position.z = zPos + this.zOffset + 5;
  }

  /**
  * Adjusts the XPos of the camera by a specific value
  * @param {number} xAdjust - x-Adjustment to be added to the x-Coordinate of the camera
  */
  adjustXPos(xAdjust) {
    this.camera.position.x += xAdjust;
  }

  /**
  * Adjusts the ZPos of the camera by a specific value
  * @param {number} zAdjust - z-Adjustment to be added to the z-Coordinate of the camera
  */
  adjustZPos(zAdjust) {
    this.camera.position.z += zAdjust;
  }

  /**
  * Sets the offset between camera and player
  * @param {number} xOffset - the offset from camera and player in x-Direction
  * @param {number} zOffset - the offset from camera and player in z-Direction
  */
  setCameraOffset(xOffset, zOffset) {
    this.xOffset = xOffset;
    this.zOffset = zOffset;
  }
}
