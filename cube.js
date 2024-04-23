import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

var canvas = document.getElementById("cube")
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( canvas.width, canvas.height );
renderer.setClearColor(0xffffff, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, canvas.width / canvas.height, 1, 10000 );
const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );

const material = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( face_right )} ), // droite
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( face_left )} ), // gauche
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( face_up )} ), // haut
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( face_down )} ), // bas
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( face_front )} ), // avant
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( face_back )} ), // arriere
];
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.y = 2;
camera.position.z = 4.5;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.update();

function animate() {
	requestAnimationFrame( animate );

	controls.update();
  
	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	canvas.appendChild( warning );
}