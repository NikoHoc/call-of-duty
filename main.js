import * as THREE from "three";
import { createMap } from "./map.js";
import { FreeCam } from "./freeCam.js";
import { SceneCam1 } from "./sceneCam1.js";
import { SceneCam2 } from "./sceneCam2.js";
import { SceneCam3 } from "./sceneCam3.js";

/*
Camera: 1 = FreeCam (WASD, QE), 2 = sceneCam1, 3 = sceneCam2, 4 = sceneCam3  

========= TODO =========
NOTE: juga perhatiin rubrik https://docs.google.com/spreadsheets/d/1JRIOTHHMH6L2lxS_MeSreq2OwxJVVn6J3AD9jrN0tYI/edit?usp=sharing
 - ENVIROMENT:
  -> tambah asset di map supaya kyk map asli (mobil tengah, bushes, etc)

 - LIGHTING:
  -> street light
  -> sun/moon
  -> shadows

 - CHARACTER:
  -> masukin char
  -> script
  -> senjata

- CAMERA
  -> camera rotation muter" map??? (sesuai rubrik)
========= TODO =========
*/

class Main {
  static init() {
    var canvasRef = document.getElementById("canvas");

    this.scene = new THREE.Scene();

    this.camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera1.position.set(0, 50, 2);

    this.camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera2.position.set(100, 50, 350);

    this.camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera3.position.set(-100, 50, -350);

    this.camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera4.position.set(50, 20, 50);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x777777);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    // Setup free camera
    this.freeCam = new FreeCam(this.camera1, this.scene, this.renderer.domElement);

    // Setup static camera
    this.sceneCam1 = new SceneCam1(this.camera2, this.scene, this.renderer.domElement);
    this.sceneCam2 = new SceneCam2(this.camera3, this.scene, this.renderer.domElement);
    this.sceneCam3 = new SceneCam3(this.camera4, this.scene, this.renderer.domElement);

    this.domElement = this.renderer.domElement;
    this.domElement.addEventListener("click", () => {
      this.domElement.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
      if (document.pointerLockElement === this.domElement) {
        this.enableCurrentCamera();
      } else {
        this.disableAllCameras();
      }
    });

    document.addEventListener("keydown", this.onKeyDown.bind(this), false);

    // Plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshPhongMaterial({ color: 0xa29979 }));

    plane.rotation.set(-Math.PI / 2, 0, 0);
    plane.position.set(0, -3, 0);
    plane.receiveShadow = true;
    plane.castShadow = true;
    this.scene.add(plane);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff);
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

    // Set the current camera
    this.currentCamera = this.camera1;
    this.currentController = this.freeCam;
    this.enableCurrentCamera();
  }

  static enableCurrentCamera() {
    if (this.currentController) {
      this.currentController.enable();
    }
  }

  static disableAllCameras() {
    this.freeCam.disable();
    this.sceneCam1.disable();
  }

  static onKeyDown(event) {
    switch (event.code) {
      case "Digit1":
        this.switchToCamera(this.camera1, this.freeCam);
        break;
      case "Digit2":
        this.switchToCamera(this.camera2, this.sceneCam1);
        break;
      case "Digit3":
        this.switchToCamera(this.camera3, this.sceneCam2);
        break;
      case "Digit4":
        this.switchToCamera(this.camera4, this.sceneCam3);
        break;
    }
  }

  static switchToCamera(camera, controller) {
    this.disableAllCameras();
    this.currentCamera = camera;
    this.currentController = controller;
    this.enableCurrentCamera();
  }

  static render(dt) {
    this.renderer.render(this.scene, this.currentCamera);
  }
}

var clock = new THREE.Clock();
Main.init();

function animate() {
  const delta = clock.getDelta();
  Main.freeCam.update(delta);
  Main.sceneCam1.update(delta);
  Main.sceneCam2.update(delta);
  Main.sceneCam3.update(delta);

  Main.render(delta);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
