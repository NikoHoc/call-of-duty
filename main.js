import * as THREE from "three";
import { loadFBXModel, loadOBJModel, setSkySphere } from "/enviroment.js";
import { FreeCam } from "./freeCam.js";
import { StaticCam } from "./staticCam.js";
import { RotatingCam } from "./rotatingCam.js";
import { CharacterControls } from "./player.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { addCollisionBox } from "./enviroment.js";

class Main {
  static characterControls;

  static init() {
    var canvasRef = document.getElementById("canvas");

    this.scene = new THREE.Scene();

    // Load environment
    setSkySphere(this.scene, "/resources/overcast_soil_puresky_2k.hdr");

    loadFBXModel(this.scene, "/resources/nuketown/source/NukeTown.fbx");
    loadFBXModel(this.scene, "/resources/tesla-cybertruck/source/Cybertruck.fbx", { x: 0.06, y: 0.06, z: 0.06 }, { x: 100, y: 0, z: -37 });
    loadFBXModel(this.scene, "/resources/war_car.fbx", undefined, { x: -105, y: 0, z: -70 });
    loadFBXModel(this.scene, "/resources/metal-barrier/source/Metal Barrier.fbx", undefined, { x: 150, y: 0, z: -15 }, { x: 4.7, y: 0, z: 1.9 });
    loadFBXModel(this.scene, "/resources/metal-barrier/source/Metal Barrier.fbx", undefined, { x: 140, y: 0, z: -60 }, { x: 4.7, y: 0, z: 1.9 });
    loadFBXModel(this.scene, "resources/mini house/Stable.fbx", { x: 0.2, y: 0.2, z: 0.2 }, { x: -165, y: 0, z: 70 }, { x: 0, y: 2.3, z: 0 });
    loadFBXModel(this.scene, "resources/trash-can/trash_can.fbx", { x: 0.086, y: 0.086, z: 0.086 }, { x: -190, y: 0, z: 0 }, { x: 0, y: 1.57, z: 0 });
    loadOBJModel(this.scene, "resources/Bus/1376 Bus.obj", "resources/Bus/1376 Bus.mtl", { x: 0.4, y: 0.4, z: 0.4 }, { x: 40, y: 0, z: 20 }, { x: 0, y: 2.2, z: 0 });
    loadFBXModel(this.scene, "resources/Cargo Train Container/CargoTrain_Container.fbx", { x: 0.1, y: 0.1, z: 0.1 }, { x: -35, y: 0, z: 0 }, { x: 0, y: 3.75, z: 0 });
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 2, y: 2, z: 2 }, { x: -50, y: 0, z: -200 }, { x: 0, y: 2.2, z: 0 });
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 2, y: 2, z: 2 }, { x: -48, y: 0, z: -190 }, { x: 0, y: 2.2, z: 0 });
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 1.5, y: 1.5, z: 1.5 }, { x: -20, y: 0, z: -133 }, { x: 0, y: 2.2, z: 0 });
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 1.5, y: 1.5, z: 1.5 }, { x: 32.5, y: 0, z: 110 });

    // // collision boxes
    addCollisionBox(this.scene, { x: 100, y: 0, z: -37 }, { width: 13, height: 25, depth: 35 }, 0xff0000, true); //cybertruck
    addCollisionBox(this.scene, { x: -105, y: 0, z: -70 }, { width: 15, height: 25, depth: 28 }, 0x00ff00, true); //war car
    addCollisionBox(this.scene, { x: -35, y: 0, z: 0 }, { width: 1, height: 50, depth: 76 }, 0x00ff00, true, { x: 0, y: 2.2, z: 0 }); //cargo
    addCollisionBox(this.scene, { x: 40, y: 0, z: 20 }, { width: 15, height: 40, depth: 50 }, 0x00ff00, true, { x: 0, y: 2.2, z: 0 }); //bus
    addCollisionBox(this.scene, { x: -190, y: 0, z: 0 }, { width: 15, height: 40, depth: 25 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //trashcan
    addCollisionBox(this.scene, { x: -10, y: 0, z: 190 }, { width: 90, height: 80, depth: 170 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //rumah ijo
    addCollisionBox(this.scene, { x: 50, y: 0, z: 177 }, { width: 90, height: 50, depth: 55 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //garasi rumah ijo


    this.camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera1.position.set(0, 50, 2);

    this.camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera2.position.set(100, 50, 350);

    this.camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera3.position.set(0, 10, 10);

    this.camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera4.position.set(100, 60, 30);

    this.camera5 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera5.position.set(0, 200, 500);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x777777);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.freeCam = new FreeCam(this.camera1, this.scene, this.renderer.domElement);
    this.staticCam1 = new StaticCam(this.camera2, this.scene, this.renderer.domElement);
    this.staticCam3 = new StaticCam(this.camera4, this.scene, this.renderer.domElement);
    this.rotatingCam = new RotatingCam(this.camera5, this.scene, this.renderer.domElement);

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

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load("resources/plane_texture/GroundGrassGreen002_COL_2K.jpg"); // Replace with the path to your texture image

    // Set up circular plane with texture
    var circle = new THREE.Mesh(
      new THREE.CircleGeometry(1000, 500), // 500 is the radius, 32 is the number of segments
      new THREE.MeshPhongMaterial({ map: texture })
    );
    circle.rotation.set(-Math.PI / 2, 0, 0);
    circle.position.set(0, -1, 0);
    circle.receiveShadow = true;
    circle.castShadow = true;
    this.scene.add(circle);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.1);
    this.scene.add(hemisphereLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.castShadow = true;
    directionalLight.position.set(3, 10, 10);
    directionalLight.target.position.set(0, 0, 0);
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    this.currentCamera = this.camera1;
    this.currentController = this.freeCam;
    this.enableCurrentCamera();

    new GLTFLoader().load("/resources/Soldier.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(8, 8, 8);
      // model.position.set(20, 0, 340);
      model.position.set(80, 0, 0);
      model.traverse((object) => {
        if (object.isMesh) object.castShadow = true;
      });
      this.scene.add(model);

      const mixer = new THREE.AnimationMixer(model);
      const animationsMap = new Map();
      gltf.animations
        .filter((a) => a.name !== "TPose")
        .forEach((a) => {
          animationsMap.set(a.name, mixer.clipAction(a));
        });

      Main.characterControls = new CharacterControls(
        model,
        mixer,
        animationsMap,
        this.camera3,
        "Idle",
        this.scene // Pass the scene to CharacterControls
      );
    });
  }

  static enableCurrentCamera() {
    if (this.currentController) {
      this.currentController.enable();
    }
  }

  static disableAllCameras() {
    this.freeCam.disable();
    this.staticCam1.disable();
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
        if (Main.characterControls) {
          this.switchToCamera(this.camera3, Main.characterControls);
        }
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

    if (Main.characterControls && (camera === this.camera6 || camera === this.camera3)) {
      Main.characterControls.setCamera(camera);
    }
  }

  static render(dt) {
    this.renderer.render(this.scene, this.currentCamera);
  }
}

var clock = new THREE.Clock();
Main.init();

function animate() {
  const delta = clock.getDelta();

  // if (Main.characterControls) {
  //   Main.characterControls.update(delta); // Ensure character controls are always updated
  // }

  if (Main.currentController && Main.currentController.update) {
    Main.currentController.update(delta);
  }

  Main.render(delta);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
