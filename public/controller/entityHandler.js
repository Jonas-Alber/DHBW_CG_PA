/*
* Author: Jonas Alber
*/
import { Object } from '/model/object.js';
import { Entity } from '/model/entity.js';
import { PlayerEntity, ProjectileEntity, AiEntity } from '/model/specialEntitys.js';
import { Object3D } from 'three';
import { ObjectPosition } from '/model/helperClass.js';
import { ObjectSupplier } from '/controller/objectSupplier.js'
import { checkCollision, removeModel, getAmbientLight } from '/view/view.js';
import { LightEntity} from '/model/lightEntity.js';
export class EntityHandler {
  constructor(modelLoader, maxWorldSize=400) {
    this.objects = [];
    this.entities = [];
    this.objectSupplier = new ObjectSupplier(modelLoader);
    this.maxWorldSize = maxWorldSize;
    this.destroyedEnemies = 0;
  }

  addObject(entity) {
    if (entity instanceof Object || entity instanceof Entity || entity instanceof PlayerEntity) {
      this.objects.push(entity);
    }
    else {
      //console.log("Given Element is not a Object");
      //console.log(entity);
    }

    if (entity instanceof Entity || entity instanceof PlayerEntity) {
      this.entities.push(entity);
    }
    return this.getObjectIndex(entity);
  }

  getObjectIndex(object) {
    return this.objects.indexOf(object);
  }

  getEntityIndex(entity) {
    return this.entities.indexOf(entity);
  }

  getObject(index) {
    return this.objects[index];
  }

  moveObjects() {
    if (this.entities.length > 0 && this.objects.length > 0) {
      var objectIndex;
      let doShoot;
      var colStorage = { hasCol: false, object: undefined };
      for (var entityIndex in this.entities) {
        try {
          var element = this.entities[entityIndex];
          objectIndex = this.objects.indexOf(element);
          for (var index in this.objects) {
            if (objectIndex != index) {
              if (checkCollision(element, this.objects[index])) {
                //if (false){
                colStorage = { hasCol: true, object: index };
                break;
              }
            }

          }
          if (colStorage.hasCol) {
            if (element instanceof ProjectileEntity || this.objects[colStorage.object] instanceof ProjectileEntity) {
              this.removeObject(this.getObjectIndex(element));
              this.removeObject(colStorage.object);
            }
          }
          if (true) {
            var decisions = element.makeDecision();
            if (decisions != undefined && decisions.doShoot) {
              let positionElement = new ObjectPosition();
              positionElement.position.x = element.model.position.x;
              positionElement.position.z = element.model.position.z - 5;
              //positionElement.speed.x = element.xSpeed;
              positionElement.speed.z = element.zSpeed;
              positionElement.faceDirection = element.objectPosition.faceDirection;
              //positionElement.sizeFactor = 8;
              //var lightEntity = new LightEntity(getAmbientLight(0x15de12));
              this.addObject(this.objectSupplier.projectile(positionElement));
            }
          }
          if(element instanceof ProjectileEntity && element.model.position.z < -this.maxWorldSize){
            this.removeObject(this.getObjectIndex(element));
            console.log("Destroyed projectile which fly away")
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
    if (this.objects[index] instanceof Entity) {
      if(this.objects[index] instanceof AiEntity){
        this.destroyedEnemies+=1;
      }
      this.entities.splice(this.entities.indexOf(this.objects[index]), 1);
      if(this.objects[index].haveSubElemet()){
        for(var element in this.objects[index].subElements){
          removeModel(this.objects[index].subElements[element].model);
        }
      }
    }
    removeModel(this.objects[index].model);
    this.objects.splice(index, 1);
  }

  checkIsPlayerEntity(entity) {
    return entity instanceof PlayerEntity;
  }

  getPlayerEntityIndex(){
    return this.objects.findIndex(this.checkIsPlayerEntity);
  }
}
