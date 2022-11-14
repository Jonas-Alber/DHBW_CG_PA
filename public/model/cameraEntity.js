export class CameraEntity {
  constructor(camera, canvasWidth, canvasHeight, xOffset = 0, zOffset = 0) {
    this.camera = camera;
    this.xOffset = xOffset;
    this.zOffset = zOffset;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvasHalfHeight = canvasHeight / 8;
  }

  setXPos(xPos) {
    this.camera.position.x = xPos + this.xOffset;
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
