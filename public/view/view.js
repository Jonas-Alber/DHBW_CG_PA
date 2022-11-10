// AUTOR: Ralf Ehli

import * as THREE from '/build/three.module.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import { ObjectFactory, EntityHandler, PlayerObjectFactory } from '/controller/entityHandler.js';
import { ObjectPosition } from '/model/helperClass.js';



// ---- Initialisierung der Scene ----

var innerWidth = document.getElementById('animateScene').offsetWidth;
var innerHeight = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000);
camera.rotation.x = (-Math.PI/2) + 0.7;
camera.position.y = 30;

//camera.position.y = Math.PI/2;
//camera.rotation.x = Math.PI/2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.getElementById('animateScene').appendChild(renderer.domElement);

var loader = new GLTFLoader();

scene.background = new THREE.Color(0x222222);

    // Test Licht
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    const ambiantLight = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambiantLight );


/**
 * Render Function
 */
export function render() {
    renderer.render(scene, camera)
}

// ---- 3D Model Handler ----

export function getAmbientLight(x,y,z,color,intensity){

}

export function getDirectionalLight(x,y,z,color,intensity){

}

export function getCamera(){
    return camera;
}

export function add3DModel(entityHandler, modelPath, objectPosition ,type = 0, camera = undefined){ // modelPath = '../3Dmodels/spaceship.glb'
    var obj;
    var hitbox;
    if(!(objectPosition instanceof  ObjectPosition)){
      throw "Model has no ObjectPosition Class Instance";
    }
    loader.load( modelPath, function(gltf){
            obj = gltf.scene; 
            scene.add( gltf.scene );
            obj.scale.set(objectPosition.sizeFactor,objectPosition.sizeFactor,objectPosition.sizeFactor);
            obj.rotateY(Math.PI);
            obj.position.x = objectPosition.x;
            obj.position.y = objectPosition.y;
            obj.position.z = objectPosition.z;
    
            hitbox = new THREE.BoxHelper( obj );
            hitbox.material.color.set( 0xff0000 ); // just for testing 
            scene.add( hitbox );
            if(camera != undefined) {
                var object = PlayerObjectFactory(obj, hitbox, camera);
            }
            else{
                var object = ObjectFactory(obj, hitbox, type);
            }
            entityHandler.addObject(object);
        }, undefined, function ( error ) { // Error handling
            console.error( error );
    });
}

export function moveX(x,obj){
    obj.position.x += x;
}

export function moveY(y,obj){
    obj.position.y += y;
}

export function moveZ(z,obj){ 
    obj.position.z += z;
}

export function rotateZ(z,obj){
    obj.rotateZ(z, obj);
}

// ---- Collison Handler ----

export function checkCollision(hitbox1, hitbox2){
    if(hitbox1.intersectsBox(hitbox2)){
        return true;
    }   
    return false;
}

// ---- Input Handler ----

var lastKeyPressed = 'none';

document.onkeydown = function (e){
    if (e.key === 'ArrowLeft' || e.key === 'a') //left
        lastKeyPressed = 'left';
    if (e.key === 'ArrowUp' || e.key === 'w') //up
        lastKeyPressed = 'up';
    if (e.key === 'ArrowRight' || e.key === 'd') //right
        lastKeyPressed = 'right';
    if (e.key === 'ArrowDown' || e.key === 's') //down
        lastKeyPressed = 'down';
    if (e.key === 'Space') //Space
        lastKeyPressed = 'space';
}

export function getLastKeyPressed(){
    key = lastKeyPressed
    lastKeyPressed = 'none'
    return key
}
export class ModelFactory{
  constructor(entityHandler,modelPath){
    this.entityHandler =  entityHandler;
    this.modelPath =  modelPath;
    this.xPos = 0;
    this.zPos = 0;
    this.scaleFactor = 1;
  }
  set xPos(xPos){
    this.xPos = xPos;
  }
  set zPos(zPos){
    this.zPos = zPos;
  }
  set scaleFactor(scaleFactor){
      this.scaleFactor = scaleFactor;
  }

  get modelData(){

  }
}
