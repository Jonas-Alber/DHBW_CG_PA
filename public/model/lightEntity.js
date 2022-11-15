export class LightEntity {
    constructor(model, xOffset = 0, zOffset = -10) {
      this.model = model;
      this.xOffset = xOffset;
      this.zOffset = zOffset;
    }
  
    setXPos(xPos) {
      this.model.position.x = xPos + this.xOffset;
    }
  
    setZPos(zPos) {
      this.model.position.z = zPos + this.zOffset + 5;
    }
  
    adjustXPos(xAdjust) {
      this.model.position.x += xAdjust;
    }
  
    adjustZPos(zAdjust) {
      this.model.position.z += zAdjust;
    }
  }
  