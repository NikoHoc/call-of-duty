import * as THREE from "three";
import { createMap } from './map.js';
import { FreeCam } from './freeCam.js';

// Setup canvas renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x777777);

// Setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

// Setup free camera
const freeCam = new FreeCam(camera, renderer.domElement);

// Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshPhongMaterial({ color: 0xa29979 })
);
scene.add(plane);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.position.set(0, -3, 0);

// Lights
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.1);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(3, 10, 10);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

// Load the map
createMap(scene);

// Loop Animate
const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  freeCam.update(delta);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
