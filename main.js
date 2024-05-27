import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

//setup canvas renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x777777);

//setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.minDistance = 5
controls.maxDistance = 15
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2 - 0.05
controls.update();

//Plane
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshPhongMaterial({ color: 0xa29979 })
);
scene.add(plane)
plane.rotation.set(-Math.PI/2, 0, 0)
plane.position.set(0, -3, 0)


//Ambient Light
//agar ambient light bisa, ubah di bagian material -> .MeshBasicMaterial menjadi -> .MeshPhongMaterial
var ambientLight = new THREE.AmbientLight(0XFFFFFF)
scene.add(ambientLight)

//Hemisphere Light
//sky color, ground color, intensitas
var hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.1);
scene.add(hemisphereLight);


//Directional Light
var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(3, 10, 10);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

new MTLLoader()
  .setPath("../resources/Dust 2/")
  .load("Dust2.mtl", function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath("../resources/Dust 2/")
      .load("Dust2.obj", function (object) {
        scene.add(object);
        object.scale.set(0.1, 0.1, 0.1);
        object.position.set(4, -2.5, 0);

        object.rotation.x =  -(Math.PI / 2);
      });
  });


//Loop Animate
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
