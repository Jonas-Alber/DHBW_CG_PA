//import * as THREE from 'three'
import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls.js'
import Stats from '/jsm/libs/stats.module.js'
import { GUI } from '/jsm/libs/lil-gui.module.min.js'

export function animateBlock(){
  
var innerWidth = document.getElementById('animateScene').offsetWidth;
var innerHeight = window.innerHeight;
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
document.getElementById("animateScene").appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener(
    'resize',
    () => {
        camera.aspect = innerWidth / innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(innerWidth, innerHeight)
        render()
    },
    false
)

const stats = Stats()
document.getElementById("animateScene").appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.scale, 'x', -5, 5)
cubeFolder.add(cube.scale, 'y', -5, 5)
cubeFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()


}
