import { EntityHandler } from '/controller/entityHandler.js';
import { ObjectPosition } from '/model/helperClass.js';
import { CameraEntity } from '/model/cameraEntity.js';
import { LightEntity} from '/model/lightEntity.js';
import { addModel,render, getCamera, getAmbientLight} from '/view/view.js';

const STATIC_CAM = false;
const ASTEROID_AMOUNT = 30;
const ASTEROID_SPREAD = 70;
const WORLD_SIZE = 25;
export class WorldGenFactory {
  constructor(modelLoader, viewDistance, difficulty = 1) {
    this.difficulty = difficulty;
    this.worldSize = WORLD_SIZE;
    this.viewDistance = viewDistance;
    this.__calculateWorldSettings();
    this.entityHandler = new EntityHandler(modelLoader,this.mapLength);
    console.log(this.mapLength);
    this.__spawnPlayer();
    this.playerRegion = 0;
    this.__generateWorld();
    this.playerRegion = 1;
    this.__generateWorld();
  }

  __spawnPlayer() {
    var innerWidth = document.getElementById('animateScene').offsetWidth;
    var innerHeight = window.innerHeight;
    let camera;
    let playerPosition = new ObjectPosition();
    playerPosition.sizeFactor = 0.5;
    if (!STATIC_CAM) {
      camera = new CameraEntity(getCamera(), innerWidth, innerHeight, 0, 20, 0);
    }
    var light = new LightEntity(getAmbientLight(0xcfc4c4));
    this.entityHandler.addObject(this.entityHandler.objectSupplier.player(playerPosition, camera, light));
  }

  __calculateWorldSettings() {
    this.enemyAmount = getRandomInt(
      3 * this.difficulty,          //calculation for low chance of enemy spawn
      5 * this.difficulty           //calculation for low chance of enemy spawn
    );
    this.mapLength = 2 * this.viewDistance + (this.viewDistance * this.difficulty * 0.5);
    this.enemyPerSection = Math.round(this.enemyAmount / (this.mapLength / this.viewDistance));
    this.enemyAmount = this.enemyPerSection*Math.round(this.mapLength / this.viewDistance);
  }
  checkLoadStatus(playerIndex) {
    var playerObject = this.entityHandler.getObject(playerIndex)
    if(playerObject == undefined) {
      return false;
    }
    var playerPosition = this.entityHandler.getObject(playerIndex).model.position.z;
    if (playerPosition < (-this.viewDistance * this.playerRegion)) {
      console.log("Load new World Element");
      this.playerRegion += 1;
      this.__generateWorld();
    }
    return true;
  }

  __generateWorld() {
    if(this.playerRegion*this.viewDistance >= -(this.mapLength-this.viewDistance)){
      console.log("made")
      this.__spawnAsteroids(this.playerRegion);
    this.__spawnEnemy(this.playerRegion);
    }
  }

  __spawnAsteroids(playerRegion) {
    let objectPosition = new ObjectPosition();
    for (let i = 0; i < ASTEROID_AMOUNT; i++) {
      objectPosition.position.x = getRandomInt(-ASTEROID_SPREAD, ASTEROID_SPREAD);
      objectPosition.position.y = getRandomInt(-ASTEROID_SPREAD, ASTEROID_SPREAD);
      objectPosition.position.z = getRandomInt(-(this.viewDistance*(playerRegion+1)), -10-((this.viewDistance*playerRegion)));
      objectPosition.sizeFactor = getRandomArbitrary(0.01, 0.05);
      objectPosition.rotation.x = Math.random() * Math.PI * 2;
      objectPosition.rotation.y = Math.random() * Math.PI * 2;
      objectPosition.rotation.z = Math.random() * Math.PI * 2;
      this.entityHandler.addObject(this.entityHandler.objectSupplier.asteroid(objectPosition));
    }
  }

  __spawnEnemy(playerRegion){   
    let objectPosition = new ObjectPosition();
    var zPosition = 0;
    for (let i = 0; i < this.enemyPerSection; i++) {
      console.log("Spawn Enemy")
      objectPosition.position.x = getRandomInt(-WORLD_SIZE, WORLD_SIZE);
      objectPosition.position.y = getRandomInt(-WORLD_SIZE, WORLD_SIZE);
      zPosition = getRandomInt(-(this.viewDistance*(playerRegion+1)), -30-((this.viewDistance*playerRegion)));
      if(zPosition >= this.mapLength) {
        zPosition = this.mapLength -10;
      }
      objectPosition.position.z = zPosition;
      objectPosition.rotation.y = Math.PI + Math.PI/2;
      objectPosition.sizeFactor = 0.02;
      this.entityHandler.addObject(this.entityHandler.objectSupplier.enemy(objectPosition));
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
