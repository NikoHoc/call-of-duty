import * as THREE from "three";
import { createMap } from './map.js';
import { FreeCam } from './freeCam.js';

class Main {
  static init() {
    var canvasRef = document.getElementById("canvas");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(0, 0, 2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x777777);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    // Setup free camera
    this.freeCam = new FreeCam(this.camera, this.scene, this.renderer.domElement);

    // Pointer lock setup
    this.domElement = this.renderer.domElement;
    this.domElement.addEventListener('click', () => {
      this.domElement.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.domElement) {
        this.freeCam.enable();
      } else {
        this.freeCam.disable();
      }
    });

    // Plane
    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshPhongMaterial({ color: 0xa29979 })
    );

    plane.rotation.set(-Math.PI / 2, 0, 0);
    plane.position.set(0, -3, 0);
    plane.receiveShadow = true;
    plane.castShadow = true;
    this.scene.add(plane);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    this.scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.1);
    this.scene.add(hemisphereLight);

    // Directional lighting
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.castShadow = true;
    directionalLight.position.set(3, 10, 10);
    directionalLight.target.position.set(0, 0, 0);
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    // Load the map
    createMap(this.scene);
  }

  static render(dt) {
    this.renderer.render(this.scene, this.camera);
  }
}

var clock = new THREE.Clock();
Main.init();

function animate() {
  const delta = clock.getDelta();
  Main.freeCam.update(delta);

  Main.render(delta);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
