/*
* Author: Jonas Alber
*/
import { Object } from '/model/object.js';
import { Entity } from '/model/entity.js';
import { PlayerEntity, ProjectileEntity, AiEntity} from '/model/specialEntitys.js';
import { Object3D } from 'three';
import { ObjectPosition } from '/model/helperClass.js';
import {ObjectSupplier} from '/controller/objectSupplier.js'
import { checkCollision } from '../view/view.js';
export class EntityHandler {
  constructor(modelLoader) {
    this.objects = [];
    this.entities = [];
    this.objectSupplier = new ObjectSupplier(modelLoader);
  }

  addObject(entity) {
    if (entity instanceof Object || entity instanceof Entity ||  entity instanceof PlayerEntity) {
      this.objects.push(entity);
    }
    else {
      //console.log("Given Element is not a Object");
      //console.log(entity);
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
      let doShoot;
      var hasCollision = false;
      for(var entityIndex in this.entities){
        try {
          var element = this.entities[entityIndex];
          objectIndex = this.objects.indexOf(element);
          for (var index in this.objects) {
            if(objectIndex!=index){
              //if (checkCollision(element, this.objects[index])) {
              if (false){
                hasCollision = true;
                break;
              }
            } 
            
          }
          var decisions = element.makeDecision();
          if(decisions !=undefined && decisions.doShoot){
            let positionElement =  new ObjectPosition();
            positionElement.x = element.model.position.x;
            positionElement.z = element.model.position.z;
            positionElement.xSpeed = element.speed.x;
            positionElement.zSpeed = element.speed.z;
            this.addObject(this.objectSupplier.projectile(positionElement));
          }
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
