import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

scene.background = new THREE.Color(0x0d0d0d);

// Test Licht
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// Test Model Import
var loader = new GLTFLoader();
var player; //variable für unser 3D Objekt
var playerHitBox;

loader.load( '3Dmodels/spaceship.glb', function ( gltf ) {

    player = gltf.scene; //3D Objekt der Player Variable zuweisen 
    player.scale.set(0.5,0.5,0.5);
	scene.add( gltf.scene );

    
    //playerBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()); // Hit Box des Objekts
    //playerBox.setFromObject(player);
    //console.log(playerBox);

    // box helper
    playerHitBox = new THREE.BoxHelper( player );
    playerHitBox.material.color.set( 0xff0000 );
    scene.add( playerHitBox );

    //scene.add(playerBox);
  
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
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    playerHitBox.update();
    checkCollision();
    
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
