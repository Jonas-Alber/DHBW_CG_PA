/*
* Author: Jonas Alber
*/
import { Object } from '/model/object.js';
import { Entity } from '/model/entity.js';
import { PlayerEntity, ProjectileEntity, AiEntity} from '/model/specialEntitys.js';
import { Object3D } from 'three';
export class EntityHandler {
  constructor() {
    this.objects = [];
    this.entities = [];
  }

  addObject(entity) {
    if (entity instanceof Object || entity instanceof Entity ||  entity instanceof PlayerEntity) {
      this.objects.push(entity);
    }
    else {
      console.log("Given Element is not a Object");
      console.log(entity);
    }

    if (entity instanceof Entity||  entity instanceof PlayerEntity) {
      this.entities.push(entity);
    }
    return this.getObjectIndex(entity);
  }

  getObjectIndex(object) {
    return this.objects.indexOf(object);
  }

  getObject(index) {
    return this.objects[index];
  }

  moveObjects() {
    if (this.entities.length > 0 &&  this.objects.length > 0) {
      var objectIndex;
      var hasCollision = false;
      for(var entityIndex in this.entities){
        try {
          var element = this.entities[entityIndex];
          objectIndex = this.objects.indexOf(element);
          for (var index in this.objects) {
            if(objectIndex!=index){
              //if (checkCollision(element.hitbox, this.objects[index].hitbox)) {
              if (false){
                hasCollision = true;
                break;
              }
            } 
            
          }
          element.makeDecision();
        } catch (exception) {
          console.warn(exception);
        }
      }
      this.entities.forEach(function (element, i) {
        
      });
    }
  }

  removeObject(index) {
    if (this.object[index] instanceof Entity) {
      this.entities.splice(this.entities.indexOf(this.object[index]), 1);
    }
    this.objects.splice(index, 1);
  }

  checkIsPlayerEntity(entity) {
    return entity instanceof PlayerEntity;
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
export function ObjectFactory(object, hitbox, type = 0) {
  var object;
  switch (type) {
    case 1:
      object = new ProjectileEntity(object, hitbox);
      break;
    case 2:
      object = new AiEntity(object, hitbox);
      break;
    case 3:
      object = new PlayerEntity(object, hitbox);
      break;
    default:
      object = new Object(object, hitbox);
      break;
  }
  return object;
}
export function PlayerObjectFactory(object, hitbox, cameraEntity) {
  return new PlayerEntity(object, hitbox, 1, cameraEntity);
}
