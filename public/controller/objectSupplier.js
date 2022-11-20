/**
 * @file Provides required objects
 * @Author Jonas Alber
 * @Version 1.0.0
 */

/**Start of import zone */
import { addModel } from '/view/view.js';
import { PlayerEntity, ProjectileEntity, AiEntity } from '/model/movingEntitys.js';
import { Object } from '/model/object.js';
/**End of import zone */

/**
 * @file Provides required objects
 */
export class ObjectSupplier {
  /**
   * @param {ModelLoader} modelLoader - Instance of class ModelLoader which contain all 3D models
   * @param {AudioLoader} audioLoader - instance of class audioLoader, containing all audio files
  */
  constructor(modelLoader,audioLoader) {
    this.modelLoader = modelLoader;
    this.audioLoader = audioLoader;
  }

  /**
   * Takes a position instance and optional an instance of camera and light classes 
   * and return an instance of the class PlayerEntity
   * @param {ObjectPosition} objectPosition - instance of class position which determent player position
   * @param {CameraEntity} camera - camera that should follow the player
   * @param {LightEntity} light -light that should follow the player
   * @returns {PlayerEntity} returns a PlayerEntity class instance
   */
  player(objectPosition, camera = undefined, light = undefined) {
    //Get a THREEE.js Model with the 3D Model of player
    var playerModel = addModel(this.modelLoader.getModel('player'), objectPosition);
    //Send the model to the ObjectFactory to get a Object instance.
    var playerObject = ObjectFactory(playerModel.object, playerModel.hitbox, objectPosition, 3);
    //Check if a camera is passed.
    if (camera != undefined) {
      //If it is, add the camera to the player object
      playerObject.setCameraEntity(camera);
    }
    //Check if a light is passed.
    if (light != undefined) {
      //If it is, add the light to the player object
      playerObject.addSubElement(light);
    }
    if(this.audioLoader != undefined) {
      playerObject.addAudioElement(this.audioLoader.getPosAudio('boost'),'boost');
      playerObject.addAudioElement(this.audioLoader.getPosAudio('nozzle'),'nozzle');
      playerObject.addAudioElement(this.audioLoader.getPosAudio('fireProjectileSound'),'fireProjectileSound');
    }
    return playerObject;
  }

  /**
   * Takes a position instance and optional an instance of the light classes 
   * and return an instance of the class ProjectileEntity
   * @param {ObjectPosition} objectPosition - instance of class position which determent the projectile position
   * @param {LightEntity} light -light that should follow the projectile
   * @returns {ProjectileEntity} returns a ProjectileEntity class instance
   */
  projectile(objectPosition, light = undefined) {
    //Set the Z Position of the Object depending on the orientation of the mother element
    if (objectPosition.faceDirection == 0) {
      objectPosition.position.z -= 5;
    } else if (objectPosition.faceDirection == 2) {
      objectPosition.position.z += 15;
    }
    //Get a THREEE.js Model with the 3D Model of player
    var projectileModel = addModel(this.modelLoader.getModel('projectile'), objectPosition);
    //Send the model to the ObjectFactory to get a Object instance.
    var projectileObject = ObjectFactory(projectileModel.object, projectileModel.hitbox, objectPosition, 1);
    //Check if a light is passed.
    if (light != undefined) {
      //If it is, add the light to the player object
      projectileObject.addSubElement(light);
    }
    return projectileObject;
  }

  /**
   * Takes a position instance and return an instance of the class Object
   * @param {ObjectPosition} objectPosition - instance of class position which determent the object position
   * @returns {Object} returns a Object class instance
   */
  asteroid(objectPosition) {
    //Get a THREEE.js Model with the 3D Model of player
    var asteroidModel = addModel(this.modelLoader.getModel('asteroid1'), objectPosition);
    //Send the model to the ObjectFactory to get a Object instance.
    var asteroidObject = ObjectFactory(asteroidModel.object, asteroidModel.hitbox, objectPosition, 0);
    return asteroidObject;
  }

  /**
   * Takes a position instance and return an instance of the class AiEntity
   * @param {ObjectPosition} objectPosition - instance of class position which determent the enemy position
   * @returns {AiEntity} returns a AiEntity class instance
   */
  enemy(objectPosition) {
    //Get a THREEE.js Model with the 3D Model of player
    var enemyModel = addModel(this.modelLoader.getModel('enemy'), objectPosition);
    //Set Face Direction
    objectPosition.faceDirection = 2;
    //Send the model to the ObjectFactory to get a AiEntity instance.
    var enemyObject = ObjectFactory(enemyModel.object, enemyModel.hitbox, objectPosition, 2);
    enemyObject.addAudioElement(this.audioLoader.getPosAudio('fireProjectileSound'),'fireProjectileSound');
    return enemyObject;
  }
}


/**
 * 
 * @param {String} modelLocation 
 * @param {Int} type 
 *  0 = Object
 *  1 = ProjectileEntity
 *  2 = AiEntity
 *  3 = PlayerEntity
 */

/**
 *  @param {GLTF Scene} vectorObject - instance of an with gltf loaded Model
 *  @param {Box3} hitbox - instance of Box3 which is used as hitbox 
 *  @param {ObjectPosition} objectPosition - instance of object position, determent the position of the object
 *  @param {Int} type - determent the class Type which will be returned
 *  0 = Object
 *  1 = ProjectileEntity
 *  2 = AiEntity
 *  3 = PlayerEntity
 *  @return {Object} - return instance of Class Object or inherited class
 */
function ObjectFactory(vectorObject, hitbox, objectPosition, type = 0) {
  let object;
  //Switch over the type variable
  switch (type) {
    case 1:   //Projectile
      object = new ProjectileEntity(vectorObject, hitbox, objectPosition);
      break;
    case 2:   //Enemy
      object = new AiEntity(vectorObject, hitbox, objectPosition);
      break;
    case 3:   //Player
      object = new PlayerEntity(vectorObject, hitbox, objectPosition);
      break;
    default:  //Object e.g Asteroid
      object = new Object(vectorObject, hitbox, objectPosition);
      break;
  }
  //If the object is initialized add the speed from the objectPosition instance to the created object
  if (object != undefined) {
    object.xSpeed = objectPosition.speed.x;
    object.zSpeed = objectPosition.speed.z;
  }
  return object;
}
