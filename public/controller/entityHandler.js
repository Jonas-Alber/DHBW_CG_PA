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
    this.object.forEach(function(value, i){
      try{
        this.__handleMoveObject(value, i);
      }catch(exception){

      }
    });
  }

  __handleMoveObject(element, index){
    if(element instanceof Entity){
      element.makeDecision();
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
export function ObjectFactory(modelLocation, modelSize = 1, type = 0){
  console.log(modelLocation);
  var object3DModel = get3DModel(modelLocation, modelSize);
  var object;
  switch(type){
    case 1:
      object = new ProjectileEntity(object3DModel.object, object3DModel.hitbox);
      break;
    case 2:
      object = new AiEntity(object3DModel.object, object3DModel.hitbox);
      break;
    case 3:
      object = new PlayerEntity(object3DModel.object, object3DModel.hitbox);
      break;
    default:
      object = new Object(object3DModel.object, object3DModel.hitbox);
      break;
  }
  return object;
}