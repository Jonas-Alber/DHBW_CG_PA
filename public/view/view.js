/**
 * @file View Handler
 * @Author Ralf Ehli
 * @Version 1.0.0
 */

/**Start of import zone */
import * as THREE from '/build/three.module.js'
import { ObjectPosition } from '/model/helperClass.js';
/**End of import zone */

const USE_AUDIO = true;

// ---- Initialisierung der Scene ----

var innerWidth = window.innerWidth*(3/5);
//var innerWidth = document.getElementById('animateScene').offsetWidth;
var innerHeight = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000);
camera.rotation.x = (-Math.PI / 2) + 0.7;

const listener = new THREE.AudioListener();
camera.add(listener);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.getElementById('animateScene').appendChild(renderer.domElement);

scene.background = new THREE.Color(0x222222);

// Test Licht
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
const ambiantLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambiantLight);

export function loadGameBackground(glft,worldSize){
  var position = new ObjectPosition();
  position.position.z = worldSize/2;	
  position.sizeFactor = 10;
  addModel(glft,position);
}

/**
 * Render Function
 * Reders the scene, must be called every frame
 */
export function render() {
  renderer.render(scene, camera)
}

/**
 * Adds a new AbientLight to the scene and returns it
 * @param {*} lightColor - color of the light
 * @returns {object} light
 */
export function getAmbientLight(lightColor){
  const light = new THREE.DirectionalLight( lightColor,0.5); // soft white light
  light.rotation.y = (Math.PI);
  scene.add(light);
  return light;
}

/**
 * Getter for the Camera
 * @returns {object} camera
 */
export function getCamera() {
  return camera;
}

/**
 * Getter for the Listener
 * @returns {listener} listener
 */
 export function getListener() {
  return listener;
}

/**
 * 
 * @param {Data from GLTF Importer} gltf 
 * @param {Instance of Class ObjectPosition} objectPosition 
 * @returns {object, hitbox} List
 */
export function addModel(gltf, objectPosition) {
  var obj;
  var hitbox;

  if (!(objectPosition instanceof ObjectPosition)) {
    throw "Model has no ObjectPosition Class Instance";
  }
  obj = gltf.scene.clone();
  scene.add(obj);
  obj.scale.set(objectPosition.sizeFactor, objectPosition.sizeFactor, objectPosition.sizeFactor);
  obj.rotateY(Math.PI);
  obj.position.x = objectPosition.position.x;
  obj.position.y = objectPosition.position.y;
  obj.position.z = objectPosition.position.z;
  obj.rotation.x = objectPosition.rotation.x;
  obj.rotation.y = objectPosition.rotation.y;
  obj.rotation.z = objectPosition.rotation.z;

  hitbox = new THREE.Box3();  
  hitbox.setFromObject(obj);
  
  return { object: obj, hitbox: hitbox, objectPosition: objectPosition};
}

/**
 * Recives a model and deletes it from the scene 
 * @param {object} model - Model to be removed
 */
export function removeModel(model){
  scene.remove(model);
}

// ---- Collison Handler ----

/**
 * Recives two objects and tests if they intersect
 * @param {object} obj1 - First object 
 * @param {object} obj2 - Second object
 * @returns {boolean} collision - True if objects intersect
 */
export function checkCollision(obj1, obj2){
  var collision = false
      if(obj1.hitbox.intersectsBox(obj2.hitbox)){
          collision = true
          //console.log('collision')
      }
  return collision;
}


// ---- Get Location ----  

/** 
 *  Get the location of obj2 in relation to obj1
 *  Z = up, -Z = down, X = right, -X = Left
 *  @param {object} obj1 - Base object 
 *  @param {object} obj2 - Second object
 *  @param {array} pos - Possion number 
 *  @returns {List} positions in x y and z
*/
export function getObjectLocation(obj1, obj2){
  var pos = []
  try{
      var xDif = obj1.model.position.x - obj2.model.position.x;
      var yDif = obj1.model.position.y - obj2.model.position.y;
      var zDif = obj1.model.position.z - obj2.model.position.z;

      var xOffset = Math.abs((obj1.hitbox.min.x - obj1.hitbox.max.x)/2)
      var yOffset = Math.abs((obj1.hitbox.min.y - obj1.hitbox.max.y)/2)
      var zOffset = Math.abs((obj1.hitbox.min.z - obj1.hitbox.max.z)/2)
      
      if(Math.abs(xDif) < xOffset) 
          pos.x = 0
      else if(xDif > 0)
          pos.x = 1
      else if(xDif < 0)
          pos.x = -1

      if(Math.abs(yDif) < yOffset) 
          pos.y = 0
      else if(yDif > 0)
          pos.y = 1
      else if(yDif < 0)
          pos.y = -1

      if(Math.abs(zDif) < zOffset) 
          pos.z = 0
      else if(zDif > 0)
          pos.z = 1
      else if(zDif < 0)
          pos.z = -1
      
  }
  catch(error){
      console.log(error)
  }
  //console.log(pos)
  return pos
}
