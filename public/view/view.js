// AUTOR: Ralf Ehli

import * as THREE from '/build/three.module.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import { ObjectPosition } from '/model/helperClass.js';

const hideHitBox = true;

// ---- Initialisierung der Scene ----

var innerWidth = document.getElementById('animateScene').offsetWidth;
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

  hitbox = new THREE.BoxHelper(obj);
  hitbox.material.color.set(0xff0000);
  if(hideHitBox){
    hitbox.material.visible = false;
     // just for testing 
  }
  scene.add(hitbox);
  return { object: obj, hitbox: hitbox, objectPosition: objectPosition};
}

// ---- Collison Handler ----

export function checkCollision(hitbox1, hitbox2) {
  if (hitbox1.intersectsBox(hitbox2)) {
    return true;
  }
  return false;
}
