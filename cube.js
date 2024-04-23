import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

var canvas = document.getElementById("cube")
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( canvas.width, canvas.height );
renderer.setClearColor(0xffffff, 0);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60, canvas.width / canvas.height, 1, 10000 );
camera.position.y = 2;
camera.position.z = 4.5;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.update();

const geometry = new THREE.BoxGeometry( 2, 2, 2 );

const material = [
  new THREE.MeshBasicMaterial( {map: load_texture( face_right )} ), // droite
  new THREE.MeshBasicMaterial( {map: load_texture( face_left )} ), // gauche
  new THREE.MeshBasicMaterial( {map: load_texture( face_up )} ), // haut
  new THREE.MeshBasicMaterial( {map: load_texture( face_down )} ), // bas
  new THREE.MeshBasicMaterial( {map: load_texture( face_front )} ), // avant
  new THREE.MeshBasicMaterial( {map: load_texture( face_back )} ), // arriere
];
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

function load_texture( url ) {
  const texture = new THREE.TextureLoader().load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

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
