import {Entity} from '/model/entity.js'

export class PlayerEntity extends Entity{

    constructor(model, hitbox, healthPoints = 1, cameraEntity = undefined) {
        super(model, hitbox, healthPoints);
        this.userInput;
        this.cameraEntity = cameraEntity;
    }

    setCameraEntity(cameraEntity) {
        this.cameraEntity = cameraEntity;
    }

    getCameraEntity() {
        return this.cameraEntity;
    }

    makeDecision(){
        this.speedDown();
        this.moveObject();
        if(this.cameraEntity != undefined){
            this.cameraEntity.setXPos(this.getXPos());
            this.cameraEntity.setZPos(this.getZPos());
        }
        switch(this.userInput){
            case 'd':
                this.moveRight();
                break;
                //gehe nach rechts
            case 'a':
                this.moveLeft();
                break;
                //gehe nach links
            case 'w':
                this.moveForward();
                //gehe vorwärts
                break;
            case 's':
                this.moveBackward(); //geht das überhaupt?
                //gehe nach unten
                break;
            case ' ':
                console.log("FEUER FREI!");
                //Feuer
                break;
        }
        this.userInput = undefined;
    }

    storeUserInput(inputValue){
        this.userInput = inputValue;
    }

}

export class CameraEntity{
    constructor(camera, canvasWidth, canvasHeight, xOffset=0, zOffset=0) {
        this.camera = camera;
        this.xOffset = xOffset;
        this.zOffset = zOffset;
        this.canvasWidth =  canvasWidth;
        this.canvasHeight = canvasHeight;
        this.canvasHalfHeight = canvasHeight/8;
    }

    setXPos(xPos){
        this.camera.position.x = xPos + this.xOffset;
    }

    setZPos(zPos){
        this.camera.position.z = zPos + this.zOffset+5;
    }

    adjustXPos(xAdjust){
        this.camera.position.x += xAdjust;
    }

    adjustZPos(zAdjust){
        this.camera.position.z += zAdjust;
    }

    setCameraOffset(xOffset, zOffset){
        this.xOffset = xOffset;
        this.zOffset = zOffset;
    }
}
export class ProjectileEntity extends Entity {

    constructor(projectile, hitbox, healthpoints = 1) {
        //super(model, hitbox);
        //this.userInput;

    }

    //The projectile will be shot by the player/enemy in z-Direction
    makeDecision(collisionBool) {

        if(collisionBool === null) { //no collision
            this.projectile.position.z += 1; //Speed muss noch konkretisiert werden
        }else { //Collision at collisionBool
            While(this.projectile.position.z < collisionBool){
            this.projectile.position.z += 1; //Speed muss noch konkretisiert werden
        }


        }
    }
}

export class AiEntity extends Entity{

    constructor(model, hitbox, healthPoints = 1) {
        super(model, hitbox, healthPoints);

    }

    makeDecision(){



    }

}
