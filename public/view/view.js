import { init } from 'express/lib/application';
import View from 'express/lib/view';
import * as THREE from '/build/three.module.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

//class View{}
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


export function render() {
    renderer.render(scene, camera)
}

export function addAmbientLight(x,y,z,color,intensity){

}

export function DirectionalLight(x,y,z,color,intensity){

}

export function checkCollision(){

}

export function get3DModel(modelPath, sizeFactor){ // modelPath = '3Dmodels/spaceship.glb'
 
    loader.load( modelPath, function ( gltf ) {

        obj = gltf.scene; 
        scene.add( gltf.scene );
        obj.scale.set(sizeFactor,sizeFactor,sizeFactor);

        hitbox = new THREE.BoxHelper( player );
        hitbox.material.color.set( 0xff0000 ); // just for testing 
        scene.add( hitbox ); 
    
    }, undefined, function ( error ) { // Error handling
        console.error( 'Model konnte nicht geladen werden' );
    } );

    return [obj, hitbox]

}