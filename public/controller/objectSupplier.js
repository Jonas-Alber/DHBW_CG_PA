import { ObjectPosition } from '/model/helperClass.js';
import {addModel} from '/view/view.js';
import {ModelLoader} from '/view/modelLoader.js';
import { PlayerEntity, ProjectileEntity, AiEntity} from '/model/specialEntitys.js';

export class ObjectSupplier{
  constructor(modelLoader){
    this.modelLoader =  modelLoader;
  }

  player(objectPosition, camera=undefined) {
    var playerModel = addModel(this.modelLoader.getModel('player'), objectPosition);
    var playerObject = ObjectFactory(playerModel.object, playerModel.hitbox, objectPosition,3);
    if (camera != undefined) {
      playerObject.setCameraEntity(camera);
    }
    return playerObject;
  }

  projectile(objectPosition){
    var projectileModel = addModel(this.modelLoader.getModel('projectile'), objectPosition);
    var projectileObject = ObjectFactory(projectileModel.object, projectileModel.hitbox,objectPosition,1);
    return projectileObject;
  }

  asteroid(objectPosition){
    var asteroidModel = addModel(this.modelLoader.getModel('asteroid1'), objectPosition);
    var asteroidObject = ObjectFactory(asteroidModel.object, asteroidModel.hitbox, objectPosition,0);
    return asteroidObject;
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
 function ObjectFactory(vectorObject, hitbox, objectPosition, type = 0) {
  var object;
  switch (type) {
    case 1:
      object = new ProjectileEntity(vectorObject, hitbox);
      break;
    case 2:
      object = new AiEntity(vectorObject, hitbox);
      break;
    case 3:
      object = new PlayerEntity(vectorObject, hitbox);
      break;
    default:
      object = new Object(vectorObject, hitbox);
      break;
  }
  if(object != undefined) {
    object.xSpeed = objectPosition.speed.x;
    object.zSpeed = objectPosition.speed.z;
  }
  return object;
}
