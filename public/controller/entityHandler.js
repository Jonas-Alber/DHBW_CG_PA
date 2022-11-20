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
import { checkCollision, removeModel, getObjectLocation } from '/view/view.js';
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
  moveObjects() {
    //Check if the entitie and the objects array containing elements
    if (this.entities.length > 0 && this.objects.length > 0) {
      var objectIndex;
      //Loop over all Entities inside the entities array
      for (var entityIndex in this.entities) {
        var canMove = { up: true, down: true, left: true, right: true, forward: true, backward: true };;
        try {
          //Get the active entity
          var element = this.entities[entityIndex];
          objectIndex = this.objects.indexOf(element);
          //compare the entity with all objects and check if there is a collision
          for (var index in this.objects) {
            if (objectIndex != index && checkCollision(element, this.objects[index])) {
              //If the objects collide, check if they have to be destroyed
              if (this.__collisionHandler(element, index)) {
                //If they are destroyed, leave the loop
                break;
              }
              else {
                //If the objects are not destroyed check if the element is not a projectile
                if (!(element instanceof ProjectileEntity)) {
                  //Get the location of the collision and deactivate movement in that direction
                  var collisionPosition = getObjectLocation(element, this.objects[index]);
                  if (collisionPosition.x == 1) canMove.left = false;
                  if (collisionPosition.x == -1) canMove.right = false;
                  if (collisionPosition.y == 1) canMove.up = false;
                  if (collisionPosition.y == -1) canMove.down = false;
                  if (collisionPosition.z == 1) canMove.forward = false;
                  if (collisionPosition.z == -1) canMove.backward = false;
                }
              }
            }
          }
          //If element is an Ai pass the actual player position to them
          if (element instanceof AiEntity) {
            //get Player element
            var playerIndex = this.getPlayerEntityIndex();
            var player = this.getObject(playerIndex);
            //Give the Ai the  player position
            element.setPlayerPosition(
              player.model.position.x,
              player.model.position.y,
              player.model.position.z);
          }
          //Call the makeDecision function on the element
          var decisions = element.makeDecision(canMove);
          //Check if the element wants to shoot
          if (decisions != undefined && decisions.doShoot) {
            this.__spawnProjectile(element)
          }
          //When the element is a projectile, check if it leaves the world borders in z direction
          if (element instanceof ProjectileEntity) { this.__checkIfProjectileIsInWorld(element); }
        } catch (exception) {
          console.warn(exception);
        }
      }
    }
  }
  /**
   * Takes the entity which shoot the projectile and generates an projectile
   * @param {Entity} element entity which shoot the projectile 
   */
  __spawnProjectile(element) {
    let positionElement = new ObjectPosition();
    positionElement.minPosition = element.objectPosition.minPosition;
    positionElement.maxPosition = element.objectPosition.maxPosition;
    //Get the  positions from  the parent element
    positionElement.position.x = element.model.position.x;
    positionElement.position.y = element.model.position.y;
    positionElement.position.z = element.model.position.z - 5;
    positionElement.speed.z = element.zSpeed;
    positionElement.faceDirection = element.objectPosition.faceDirection;
    //Get an instance of class ProjectileEntity
    var projectileObject = this.objectSupplier.projectile(positionElement)

    //Add Parent Type
    if (element instanceof AiEntity) {
      projectileObject.parentType = element;
    }
    else {
      projectileObject.parentType = element;
    }
    //Add the  projectile into the entityHandler itself
    this.addObject(projectileObject);
  }

  /**
   * Compare both collided objects and decide wether they have to be destroyed
   * @param {Entity} element - entity which moves
   * @param {JSON} collisionIndex - object with which the object collides
   */
  __collisionHandler(element, collisionIndex) {
    try {
      //Check if the moving entity is a projectile
      if (element instanceof ProjectileEntity) {
        //If it is check if the parent of the projectile and the collided instance are from the same class
        if (this.objects[collisionIndex].constructor !== element.parentType.constructor) {
          //If it is not, check if the object is not an asteroid
          if (this.objects[collisionIndex] instanceof AiEntity || this.objects[collisionIndex] instanceof PlayerEntity || this.objects[collisionIndex] instanceof ProjectileEntity) {
            //If it is not, remove both objects
            this.removeObject(this.getObjectIndex(element));
            this.removeObject(collisionIndex);
            return true;
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    return false;
  }

  /**
   * Check if the element leaves the world borders in z direction and destroy it#
   * @param {ProjectileEntity} projectile - instance thats position should be checked
   * @return {boolean} true = destroyed, false = not destroyed
   */
  __checkIfProjectileIsInWorld(projectile) {
    //Check if the element leaves the world borders in z direction
    if (projectile.model.position.z < -this.maxWorldSize - 50 || projectile.model.position.z > 50) {
      //If it leaves the world borders, destroy it
      this.removeObject(this.getObjectIndex(projectile));
      return true;
    }
    return false;
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
