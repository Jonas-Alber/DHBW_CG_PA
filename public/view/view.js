import * as THREE from '/build/three.module.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import { ObjectFactory, EntityHandler, PlayerObjectFactory } from '/controller/entityHandler.js';

//class View{}

// ---- Initialisierung der Scene ----
//export function initScene(){ 
    var innerWidth = document.getElementById('animateScene').offsetWidth;
    var innerHeight = window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 5;
    camera.position.y = 2;

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
//}

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

export async function get3DModel(modelPath, sizeFactor){ // modelPath = '../3Dmodels/spaceship.glb'
    var obj;
    var hitbox;
    return await loader.load( modelPath, function(gltf){
            obj = gltf.scene; 
            scene.add( gltf.scene );
            obj.scale.set(sizeFactor,sizeFactor,sizeFactor);
    
            hitbox = new THREE.BoxHelper( obj );
            hitbox.material.color.set( 0xff0000 ); // just for testing 
            scene.add( hitbox );
            console.log({object: obj, hitbox: hitbox});
            return {object: obj, hitbox: hitbox};
        }, undefined, function ( error ) { // Error handling
            console.error( error );
    });

    //return {object: obj, hitbox: hitbox}
}

export function getCamera(){
    return camera;
}

export function add3DModel(entityHandler, modelPath, sizeFactor, type = 0, camera = undefined){ // modelPath = '../3Dmodels/spaceship.glb'
    var obj;
    var hitbox;
    loader.load( modelPath, function(gltf){
            obj = gltf.scene; 
            scene.add( gltf.scene );
            obj.scale.set(sizeFactor,sizeFactor,sizeFactor);
            obj.rotateY(Math.PI);
    
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

export function checkCollision(){

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