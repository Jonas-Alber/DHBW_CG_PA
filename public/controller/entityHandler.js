/*
* Author: Jonas Alber
*/
import {Object} from '/model/object.js';
import {Entity} from '/model/entity.js';
import {get3DModel} from '/view/view.js';
import { PlayerEntity, ProjectileEntity, AiEntity } from '/model/specialEntitys.js';
import { Object3D } from 'three';
export class EntityHandler {
  constructor(){
    this.objects  = [];
  }

  addObject(entity){
    if(entity instanceof Entity || entity instanceof Object){
      this.objects.push(entity);
    }
    return this.getObjectIndex(entity);
  }

  getObjectIndex(object){
    return this.objects.indexOf(object);
  }

  getObject(index){
    return this.objects[index];
  }

  moveObjects(){
    if(this.objects.length > 0){
      this.objects.forEach(function(element, i){
        try{
          if(element instanceof Entity|| element instanceof PlayerEntity){
            element.makeDecision();
          }
        }catch(exception){
          console.warn(exception);
        }
      });
    }
  }

  removeObject(index){
    this.objects.splice(index,1);
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
export function ObjectFactory(object, hitbox, type = 0){
  var object;
  switch(type){
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