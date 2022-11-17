export class CameraEntity {
  constructor(camera, canvasWidth, canvasHeight, xOffset = 0, yOffset, zOffset = 0) {
    this.camera = camera;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = zOffset;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvasHalfHeight = canvasHeight / 8;
  }

  setXPos(xPos) {
    this.camera.position.x = xPos + this.xOffset;
  }

  setYPos(yPos){
    this.camera.position.y = yPos + this.yOffset;
  }

  setZPos(zPos) {
    this.camera.position.z = zPos + this.zOffset + 5;
  }

  adjustXPos(xAdjust) {
    this.camera.position.x += xAdjust;
  }

  adjustZPos(zAdjust) {
    this.camera.position.z += zAdjust;
  }

  setCameraOffset(xOffset, zOffset) {
    this.xOffset = xOffset;
    this.zOffset = zOffset;
  }
}
