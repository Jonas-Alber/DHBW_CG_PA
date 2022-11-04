import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls.js'
//import Stats from './jsm/libs/stats.module.js
//import { GUI } from './jsm/libs/lil-gui.module.min.js'

import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

export function animateBlock(){
  var innerWidth = document.getElementById('animateScene').offsetWidth;
var innerHeight = window.innerHeight;
// Scene Initialiesieren 
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100)
camera.position.z = 5
camera.position.y = 2
//camera.rotateX(Math.PI)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
document.getElementById('animateScene').appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
scene.background = new THREE.Color(0x222222);

// Test Licht
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
const ambiantLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambiantLight );

// Test Model Import
var loader = new GLTFLoader();
var player; //variable für unser 3D Objekt
var playerHitBox;

loader.load( '3Dmodels/spaceship.glb', function ( gltf ) {

    player = gltf.scene; //3D Objekt der Player Variable zuweisen 
    player.scale.set(0.5,0.5,0.5);
	scene.add( gltf.scene );

    // box helper Hitbox
    playerHitBox = new THREE.BoxHelper( player );
    playerHitBox.material.color.set( 0xff0000 );
    scene.add( playerHitBox ); // Hitbox zu Testzwcken anzeigen
  
}, undefined, function ( error ) { // Error handling

	console.error( error );

} );

// Test Box
const testCube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshPhongMaterial({ color: 0x0000ff })
);
testCube.position.set(3,0,2);
scene.add(testCube)

let testBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
testBox.setFromObject(testCube);

// Test Keybord Constrolls
document.onkeydown = function (e){
    if (e.keyCode ===37) //left
        player.position.x -=1;
    if (e.keyCode ===38) //up
        player.position.z -=1;
    if (e.keyCode ===39) //right
        player.position.x +=1;
    if (e.keyCode ===40) //down
        player.position.z +=1;
}

// Test Collison

function checkCollision(){

}


function animate() {
    requestAnimationFrame(animate)
    playerHitBox.update(); // akktualiesiert die position der Hittbox
    checkCollision();
    
    controls.update(); // Orbit Controlls (final nicht benötigt)
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()

}
