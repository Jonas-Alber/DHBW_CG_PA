/*
* Author: Jonas Alber
*/
import {Object} from '/model/object.js';
import {Entity} from '/model/entity.js'
export class EntityHandler {
  constructor(){
    this.entitys = [];
    this.objects  = [];
  }

  addEntity(entity){
    if(entity instanceof Entity){
      this.entitys.push(entity);
    }
  }

  addObject(object){
    if(object instanceof Object){
      this.objects.push(object);
    }
  }

  getObject(index){
    return this.objects[index];
  }

  moveObjects(){
    this.entitys.forEach(function(value, i){
      this.__handleMoveObject(value, i);
    });
  }

  __handleMoveObject(element, index){
    if(element instanceof Entity){
      element.makeDecision();
    }
    else{
      this.removeEntity(index);
    }
  }


  removeEntity(index){
    this.entitys.splice(index,1);
    this.removeObject(index);
  }

  removeObject(index){
    this.objects.splice(index,1);
  }
}
