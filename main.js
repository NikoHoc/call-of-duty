import * as THREE from "three";
import { loadFBXModel, loadOBJModel, setSkySphere } from "/enviroment.js";
import { FreeCam } from "./freeCam.js";
import { StaticCam } from "./staticCam.js";
import { RotatingCam } from "./rotatingCam.js";

/*
Camera: 1 = FreeCam (WASD, QE), 2 3 4 = staticCam (shift = zoom in), 5 = rotatingCam

========= TODO =========
NOTE: juga perhatiin rubrik https://docs.google.com/spreadsheets/d/1JRIOTHHMH6L2lxS_MeSreq2OwxJVVn6J3AD9jrN0tYI/edit?usp=sharing
 - ENVIROMENT:
  -> tambah asset di map supaya kyk map asli (mobil tengah, bushes, etc)
  -> collision

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

    //
    // Load enviroment
    //
    //load sky background
    setSkySphere(this.scene, "/resources/overcast_soil_puresky_2k.hdr");

    //PARAMETER: scene, fbx path, scale = {x: 0.1, y: 0.1, z: 0.1}, position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0}
    // load map
    loadFBXModel(this.scene, "/resources/nuketown/source/NukeTown.fbx");

    // load tesla car
    loadFBXModel(
      this.scene,
      "/resources/tesla-cybertruck/source/Cybertruck.fbx",
      { x: 0.06, y: 0.06, z: 0.06 },
      { x: 100, y: 0, z: -37 }
    );

    // load war car
    loadFBXModel(this.scene, "/resources/war_car.fbx", undefined, {
      x: -105,
      y: 0,
      z: -70,
    });

    // load barrier
    loadFBXModel(
      this.scene,
      "/resources/metal-barrier/source/Metal Barrier.fbx",
      undefined,
      { x: 150, y: 0, z: -15 },
      { x: 4.7, y: 0, z: 1.9 }
    );
    loadFBXModel(
      this.scene,
      "/resources/metal-barrier/source/Metal Barrier.fbx",
      undefined,
      { x: 140, y: 0, z: -60 },
      { x: 4.7, y: 0, z: 1.9 }
    );

    // load garage
    loadFBXModel(
      this.scene,
      "resources/mini house/Stable.fbx",
      { x: 0.2, y: 0.2, z: 0.2 },
      { x: -165, y: 0, z: 70 },
      { x: 0, y: 2.3, z: 0 }
    );

    // load trash can
    loadFBXModel(
      this.scene,
      "resources/trash-can/trash_can.fbx",
      { x: 0.086, y: 0.086, z: 0.086 },
      { x: -190, y: 0, z: 0 },
      { x: 0, y: 1.57, z: 0 }
    );

    // load school bus
    loadOBJModel(
      this.scene,
      "resources/Bus/1376 Bus.obj",
      "resources/Bus/1376 Bus.mtl",
      { x: 0.4, y: 0.4, z: 0.4 },
      { x: 40, y: 0, z: 20 },
      { x: 0, y: 2.2, z: 0 }
    );

    // load container
    loadFBXModel(
      this.scene,
      "resources/Cargo Train Container/CargoTrain_Container.fbx",
      { x: 0.1, y: 0.1, z: 0.1 },
      { x: -35, y: 0, z: 0 },
      { x: 0, y: 3.75, z: 0 }
    );

    // load bush
    // 2 yellow house side bush
    loadFBXModel(
      this.scene,
      "/resources/hedgee/source/Hedge.fbx",
      { x: 2, y: 2, z: 2 },
      { x: -50, y: 0, z: -200 },
      { x: 0, y: 2.2, z: 0 }
    );
    loadFBXModel(
      this.scene,
      "/resources/hedgee/source/Hedge.fbx",
      { x: 2, y: 2, z: 2 },
      { x: -48, y: 0, z: -190 },
      { x: 0, y: 2.2, z: 0 }
    );

    // yellow house front bush
    loadFBXModel(
      this.scene,
      "/resources/hedgee/source/Hedge.fbx",
      { x: 1.5, y: 1.5, z: 1.5 },
      { x: -20, y: 0, z: -133 },
      { x: 0, y: 2.2, z: 0 }
    );
    // green house front bush
    loadFBXModel(
      this.scene,
      "/resources/hedgee/source/Hedge.fbx",
      { x: 1.5, y: 1.5, z: 1.5 },
      { x: 32.5, y: 0, z: 110 }
    );
    //
    // Load enviroment
    //

    this.camera1 = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera1.position.set(0, 50, 2);

    this.camera2 = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera2.position.set(100, 50, 350);

    this.camera3 = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera3.position.set(-100, 50, -350);

    this.camera4 = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera4.position.set(50, 20, 50);

    this.camera5 = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera5.position.set(0, 200, 500); 

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x777777);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    // Setup free camera
    this.freeCam = new FreeCam(
      this.camera1,
      this.scene,
      this.renderer.domElement
    );

    // Setup static camera
    this.staticCam1 = new StaticCam(
      this.camera2,
      this.scene,
      this.renderer.domElement
    );
    this.staticCam2 = new StaticCam(
      this.camera3,
      this.scene,
      this.renderer.domElement
    );
    this.staticCam3 = new StaticCam(
      this.camera4,
      this.scene,
      this.renderer.domElement
    );

    // Setup rotating camera
    this.rotatingCam = new RotatingCam(
      this.camera5,
      this.scene,
      this.renderer.domElement
    );

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
    this.staticCam1.disable();
    this.staticCam2.disable();
    this.staticCam3.disable();
    this.rotatingCam.disable();
  }

  static onKeyDown(event) {
    switch (event.code) {
      case "Digit1":
        this.switchToCamera(this.camera1, this.freeCam);
        break;
      case "Digit2":
        this.switchToCamera(this.camera2, this.staticCam1);
        break;
      case "Digit3":
        this.switchToCamera(this.camera3, this.staticCam2);
        break;
      case "Digit4":
        this.switchToCamera(this.camera4, this.staticCam3);
        break;
      case "Digit5":
        this.switchToCamera(this.camera5, this.rotatingCam);
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
  Main.staticCam1.update(delta);
  Main.staticCam2.update(delta);
  Main.staticCam3.update(delta);
  Main.rotatingCam.update(delta);

  Main.render(delta);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
