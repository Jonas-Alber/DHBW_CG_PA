/**
 * @file Manage all instances of the class Object and its inherited classes
 * @Author Jonas Alber
 * @Version 1.0.0
 */

/**Start of import zone */
import { Object } from '/model/object.js';
import { Entity } from '/model/entity.js';
import { PlayerEntity, ProjectileEntity, AiEntity } from '/model/movingEntitys.js';
import { ObjectPosition } from '/model/helperClass.js';
import { ObjectSupplier } from '/controller/objectSupplier.js'
import { checkCollision, removeModel} from '/view/view.js';
/**End of import zone */

/**
 * @file Manage all instances of the class Object and its inherited classes
 */
export class EntityHandler {
  /**
   * Initializes the EntityHandler and the ObjectSupplier
   * @param {ModelLoader} modelLoader - instance of ModelLoader which contains all 3D models
   * @param {int} maxWorldSize - Z Coordinate size of the world
   */
  constructor(modelLoader, maxWorldSize = 400) {
    //Set required variables
    this.maxWorldSize = maxWorldSize;
    this.destroyedEnemies = 0;
    //Initialize the arrays for the Objects and the Entitys
    this.objects = [];
    this.entities = [];
    //Create an instance of the Object Supplier Class
    this.objectSupplier = new ObjectSupplier(modelLoader);
  }

  /**
   * Takes a instance of Class Object or ChildClasses and stores it into the internal buffers
   * @param {Object} entity Instance of Class Object or ChildClasses
   * @returns {int} index of the stored element inside the objects array
   */
  addObject(element) {
    //Check if the Element fits the requirements
    if (element instanceof Object || element instanceof Entity || element instanceof PlayerEntity) {
      //If it is an instance of Object or its inherited the element is stored into  the objects array
      this.objects.push(element);

      //If it is an instance of Object or its inherited the element is stored into  the objects array
      if (element instanceof Entity || element instanceof PlayerEntity) {
        //If it fits the requirements the instance is also added to the entities array
        this.entities.push(element);
      }
    }
    //Return the index of the element inside the objects array
    return this.getObjectIndex(element);
  }

  /**
   * Takes the Object instance and returns the related object index
   * @param {Object} object - instance of Class Object or its inherited
   * @returns {int} index of the element inside the objects array
   */
  getObjectIndex(object) {
    return this.objects.indexOf(object);
  }

  /**
   * Takes the Entity instance and returns the related entity index
   * @param {Entity} object - instance of Class Entity or its inherited
   * @returns {int} index of the element inside the entitys array
   */
  getEntityIndex(entity) {
    return this.entities.indexOf(entity);
  }

  /**
   * Takes an index and returns the related object from the objects array
   * @param {int} index - index of the desired element
   * @returns {Object} - returns the related object
   */
  getObject(index) {
    return this.objects[index];
  }

  /**
   * Call over all objects and check there status
   * Check if they have a collision ore been destroyed
   * If not, there makeDecision Function is called for the next movement
   */
  //TODO: ADD Collision Handling and refactor the function
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
            if (element instanceof ProjectileEntity) {
              if (this.objects[colStorage.object].constructor === element.parentType.constructor) {
              } else {
                if (this.objects[colStorage.object] instanceof AiEntity || this.objects[colStorage.object] instanceof PlayerEntity || this.objects[colStorage.object] instanceof ProjectileEntity) {
                  this.removeObject(this.getObjectIndex(element));
                  this.removeObject(colStorage.object);
                }
              }
            }
          }
          if (true) {
            if(element instanceof AiEntity){
              var playerIndex = this.getPlayerEntityIndex();
              var player = this.getObject(playerIndex);
              element.setPlayerPosition(
                player.model.position.x,
                player.model.position.y,
                player.model.position.z);
            }
            var decisions = element.makeDecision();
            if (decisions != undefined && decisions.doShoot) {
              let positionElement = new ObjectPosition();
              positionElement.position.x = element.model.position.x;
              positionElement.position.y = element.model.position.y;
              positionElement.position.z = element.model.position.z - 5;
              //positionElement.speed.x = element.xSpeed;
              positionElement.speed.z = element.zSpeed;
              positionElement.faceDirection = element.objectPosition.faceDirection;
              //positionElement.sizeFactor = 8;
              //var lightEntity = new LightEntity(getAmbientLight(0x15de12));
              var projectileObject = this.objectSupplier.projectile(positionElement)
              if (element instanceof AiEntity) {
                projectileObject.parentType = element;
              }
              else {
                projectileObject.parentType = element;
              }
              this.addObject(projectileObject);
            }
          }
          if (element instanceof ProjectileEntity && element.model.position.z < -this.maxWorldSize) {
            this.removeObject(this.getObjectIndex(element));
            console.log(this.maxWorldSize);
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

  /**
   * @param {index} index index of the object which should be removed
   */
  removeObject(index) {
    //Check if the object is an instance of the Entity class
    if (this.objects[index] instanceof Entity) {
      //Check if the object is an instance of the AiEntity class
      if (this.objects[index] instanceof AiEntity) {
        //If it is, count the destroyedEnemies counter up
        this.destroyedEnemies += 1;
      }
      //Remove the entity from the Entities Array
      this.entities.splice(this.entities.indexOf(this.objects[index]), 1);

      //Check if the entity have SubElements
      if (this.objects[index].haveSubElemet()) {
        //If it have SubElements,loop over them and remove them from the view
        for (var element in this.objects[index].subElements) {
          removeModel(this.objects[index].subElements[element].model);
        }
      }
    }
    //Remove the object from the view
    removeModel(this.objects[index].model);
    //Remove the object from the objects Array
    this.objects.splice(index, 1);
  }

  /**
   * @param {Object} entity - Object for which it is to be checked whether it is a player object.
   * @returns {Boolean} - returns if it is a player object or not
   */
  checkIsPlayerEntity(entity) {
    return entity instanceof PlayerEntity;
  }

  /**
   * @returns {int} - returns the index of the player object within the object array
   */
  getPlayerEntityIndex() {
    return this.objects.findIndex(this.checkIsPlayerEntity);
  }
}
