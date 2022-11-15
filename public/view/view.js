// AUTOR: Ralf Ehli

import * as THREE from '/build/three.module.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import { ObjectPosition } from '/model/helperClass.js';

const hideHitBox = true;

// ---- Initialisierung der Scene ----

var innerWidth = window.innerWidth*(3/5);
//var innerWidth = document.getElementById('animateScene').offsetWidth;
var innerHeight = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000);
camera.rotation.x = (-Math.PI / 2) + 0.7;
camera.position.y = 30;

//camera.position.y = Math.PI/2;
//camera.rotation.x = Math.PI/2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.getElementById('animateScene').appendChild(renderer.domElement);

var loader = new GLTFLoader();

scene.background = new THREE.Color(0x222222);

// Test Licht
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
const ambiantLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambiantLight);


/**
 * Render Function
 */
export function render() {
  renderer.render(scene, camera)
}

export function getCamera() {
  return camera;
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

  /*
  var knotBoxHelper  = new THREE.BoxHelper(obj);
  if(!hideHitBox){
    knotBoxHelper .material.color.set(0xff0000);
    //knotBoxHelper .material.visible = false;
    scene.add(knotBoxHelper);
     // just for testing 
  }
  */

  hitbox = new THREE.Box3();  
  hitbox.setFromObject(obj);
  console.log(hitbox)
  
  return { object: obj, hitbox: hitbox, objectPosition: objectPosition};
}

// ---- Collison Handler ----

export function checkCollision(obj1, obj2){
  var collision = false
  //console.log(obj1)
  //console.log(obj2)

  try{
      if(obj1.hitbox.intersectsBox(obj2.hitbox)){
          collision = true
          console.log('collision')
      }
  }
  catch(error){
      console.log(error)
  }


  return collision;
}


// ---- Get Location ----  // in progress

/*
    Get the location of obj2 in relation to obj1
    Z = up, -Z = down, X = right, -X = Left
    return values:
        0: error
        1: up
        2: up right
        3: right
        4: down right 
        5: down 
        6: down left
        7: left
        8: up left
*/
export function getObjectLocation(obj1, obj2){
  var pos = 0
  try{
      var xDif = obj1.model.position.x - obj2.model.position.x;
      var zDif = obj1.model.position.z - obj2.model.position.z;
      
      console.log(xDif);
      console.log(zDif);


  }
  catch(error){
      console.log(error)
  }
  return pos
}