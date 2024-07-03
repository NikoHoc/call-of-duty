import * as THREE from "three";
import { loadFBXModel, loadOBJModel, setSkySphere } from "/enviroment.js";
import { FreeCam } from "./freeCam.js";
import { StaticCam } from "./staticCam.js";
import { RotatingCam } from "./rotatingCam.js";
import { CharacterControls } from "./player.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { addCollisionBox } from "./enviroment.js";

class Main {
  static characterControls;

  static init() {
    var canvasRef = document.getElementById("canvas");

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({antialias: true,canvas: canvasRef,});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x777777);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    //
    // LOAD ENVIROMENT
    //
    setSkySphere(this.scene, "/resources/resting_place_2k.hdr"); // 
    loadFBXModel(this.scene, "/resources/nuketown/source/NukeTown.fbx"); // Map
    loadFBXModel(this.scene, "/resources/tesla-cybertruck/source/Cybertruck.fbx", { x: 0.06, y: 0.06, z: 0.06 }, { x: 100, y: 0, z: -37 }); // cybertruck
    loadFBXModel(this.scene, "/resources/war_car.fbx", undefined, { x: -110, y: 0, z: -65 }); // war car
    loadFBXModel(this.scene, "resources/Cargo Train Container/CargoTrain_Container.fbx", { x: 0.1, y: 0.1, z: 0.1 }, { x: -40, y: 0, z: -25 }, { x: 0, y: 0, z: 0 }); // cargo
    loadOBJModel(this.scene, "resources/Bus/1376 Bus.obj", "resources/Bus/1376 Bus.mtl", { x: 0.4, y: 0.4, z: 0.4 }, { x: 55, y: 0, z: 20 }, { x: 0, y: 0, z: 0 }); // bus
    loadFBXModel(this.scene, "resources/trash-can/trash_can.fbx", { x: 0.086, y: 0.086, z: 0.086 }, { x: -190, y: 0, z: 0 }, { x: 0, y: 1.57, z: 0 }); // trashcan
    loadFBXModel(this.scene, "/resources/metal-barrier/source/Metal Barrier.fbx", undefined, { x: 145, y: 0, z: -15 }, { x: 4.7, y: 0, z: 1.65 }); //  metal barrier
    loadFBXModel(this.scene, "/resources/metal-barrier/source/Metal Barrier.fbx", undefined, { x: 135, y: 0, z: -60 }, { x: 4.7, y: 0, z: 1.65 }); //  metal barrier
    loadFBXModel(this.scene, "resources/mini house/Stable.fbx", { x: 0.2, y: 0.2, z: 0.2 }, { x: -165, y: 0, z: 70 }, { x: 0, y: 2.3, z: 0 }); // mini house
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 2, y: 2, z: 2 }, { x: -50, y: 0, z: -200 }, { x: 0, y: 2.2, z: 0 }); // bush
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 2, y: 2, z: 2 }, { x: -48, y: 0, z: -190 }, { x: 0, y: 2.2, z: 0 }); // bush
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 1.5, y: 1.5, z: 1.5 }, { x: -20, y: 0, z: -133 }, { x: 0, y: 2.2, z: 0 }); // bush
    loadFBXModel(this.scene, "/resources/hedgee/source/Hedge.fbx", { x: 1.5, y: 1.5, z: 1.5 }, { x: 32.5, y: 0, z: 110 }); // bush
    //
    // LOAD ENVIROMENT
    //

    //
    // COLLISION BOXES
    //
    // Rumah Hijau Collision
    addCollisionBox(this.scene, { x: -10, y: 0, z: 177 }, { width: 90, height: 80, depth: 130 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //rumah ijo
    addCollisionBox(this.scene, { x: 50, y: 0, z: 177 }, { width: 90, height: 50, depth: 55 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //garasi rumah ijo
    addCollisionBox(this.scene, { x: 24, y: 0, z: 105}, { width: 1, height: 40, depth: 15 }, 0xff0000, true, { x: 0, y: 0, z: 0 }); // pintu dpn rumah ijo
    addCollisionBox(this.scene, { x: 28.5, y: 0, z: 109}, { width: 9, height: 20, depth: 16 }, 0xff0000, true, { x: 0, y: 0, z: 0 }); //bush rumah ijo
    addCollisionBox(this.scene, { x: 33, y: 0, z: 261}, { width: 2.5, height: 40, depth: 2.5 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //tangga blkng rumah ijo
    addCollisionBox(this.scene, { x: -36, y: 0, z: 280.5}, { width: 2.5, height: 40, depth: 2.5 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //tangga blkng rumah ijo
    // Rumah Hijau Collision

    // Pagar Collision
    addCollisionBox(this.scene, { x: -157, y: 0, z: 290 }, { width: 1, height: 20, depth: 250 }, 0x00ff00, true, { x: 0, y: 0.5, z: 0 });
    addCollisionBox(this.scene, { x: 220, y: 0, z: 250 }, { width: 1, height: 20, depth: 370 }, 0x00ff00, true, { x: 0, y: 0.5, z: 0 });
    addCollisionBox(this.scene, { x: -38, y: 0, z: 412 }, { width: 1, height: 20, depth: 120 }, 0x00ff00, true, { x: 0, y: 5, z: 0 });
    addCollisionBox(this.scene, { x: 80, y: 0, z: 430 }, { width: 1, height: 20, depth: 120 }, 0x00ff00, true, { x: 0, y: 5, z: 0 }); 
    addCollisionBox(this.scene, { x: 119, y: 0, z: 282 }, { width: 1, height: 20, depth: 43 }, 0x00ff00, true, { x: 0, y: 4, z: 0 }); 
    addCollisionBox(this.scene, { x: 135, y: 0, z: 62 }, { width: 1, height: 20, depth: 85 }, 0x00ff00, true, { x: 0, y: 4, z: 0 }); 
    
    addCollisionBox(this.scene, { x: -203, y: 0, z: 0 }, { width: 1, height: 15, depth: 160 }, 0x00ff00, true, { x: 0, y: 0.04, z: 0 });
    // Pagar Collision

    //lampu Collision
    addCollisionBox(this.scene, { x: 30, y: 0, z: 79}, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: -75, y: 0, z: 2.6 }, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: -48.45, y: 0, z: -55.58 }, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: 88.7, y: 0, z: 27.2}, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: 143.3, y: 0, z: 7.5}, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: 51.5, y: 0, z: -80.3}, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: 104.5, y: 0, z: -98.7}, { width: 1, height: 40, depth: 1 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    //lampu Collision

    // barrier collision
    addCollisionBox(this.scene, { x: 148, y: 0, z: -15 }, { width: 1, height: 20, depth: 50 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: 137, y: 0, z: -75 }, { width: 1, height: 20, depth: 50 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    addCollisionBox(this.scene, { x: 142, y: 0, z: -65 }, { width: 1, height: 20, depth: 50 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); 
    // barrier collision

    //addCollisionBox(this.scene, { x: -40, y: 0, z: 82}, { width: 5, height: 40, depth: 2 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); // papan nuketown

    addCollisionBox(this.scene, { x: 100, y: 0, z: -37 }, { width: 13, height: 25, depth: 40 }, 0xff0000, true); //cybertruck
    addCollisionBox(this.scene, { x: -110, y: 0, z: -65 }, { width: 12, height: 25, depth: 28 }, 0x00ff00, true); //war car
    addCollisionBox(this.scene, { x: -40, y: 0, z: -25 }, { width: 89, height: 40, depth: 18 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //cargo
    addCollisionBox(this.scene, { x: 55, y: 0, z: 20 }, { width: 15, height: 40, depth: 63 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //bus
    addCollisionBox(this.scene, { x: -190, y: 0, z: 0 }, { width: 15, height: 40, depth: 25 }, 0x00ff00, true, { x: 0, y: 0, z: 0 }); //trashcan
    //
    // COLLISION BOXES
    //

    //  
    // CAMERA SETUP
    //
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


    this.freeCam = new FreeCam(this.camera1, this.scene, this.renderer.domElement);
    this.staticCam1 = new StaticCam(this.camera2, this.scene, this.renderer.domElement);
    this.staticCam3 = new StaticCam(this.camera4, this.scene, this.renderer.domElement);
    this.rotatingCam = new RotatingCam(this.camera5, this.scene, this.renderer.domElement);
    //  
    // CAMERA SETUP
    //


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

    //
    // PLANE SETUP
    //
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
    //
    // PLANE SETUP
    //

    //
    // LIGHTIHNG SETUP
    //
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight( 0xb1e1ff, 0xb97a20, 0.2 );
		hemiLight.color.setHSL( 0.2, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.1, 1, 0.75 );
		hemiLight.position.set( 0, 50, 0 );
		this.scene.add( hemiLight );

		// const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
		// this.scene.add( hemiLightHelper );

    var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.color.setHSL( 0.1, 1, 0.95 );
    directionalLight.position.set(100, 100, -80);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 8000
    directionalLight.shadow.mapSize.height = 5000
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = 1000
    directionalLight.shadow.camera.left = 300
    directionalLight.shadow.camera.right = -300
    directionalLight.shadow.camera.top = 300
    directionalLight.shadow.camera.bottom = -300
    const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    this.scene.add( helper );
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    //Lighting lampu jalan
    // this.createStreetLight(this.scene, { x: 30, y: 24, z: 79 });
    // this.createStreetLight(this.scene, { x: -75, y: 24, z: 2.6 });
    // this.createStreetLight(this.scene, { x: -48.45, y: 24, z: -55.58 });
    // this.createStreetLight(this.scene, { x: 88.7, y: 24, z: 27.2 });
    // this.createStreetLight(this.scene, { x: 143.3, y: 24, z: 7.5 });
    // this.createStreetLight(this.scene, { x: 51.5, y: 24, z: -80.3 });
    // this.createStreetLight(this.scene, { x: 104.5, y: 24, z: -98.7 });

    // this.createStreetLight(this.scene, { x: -40, y: 28, z: 85 }, { radius: 3, widthSegments: 24, heightSegments: 12 }); // sign nuketown
    // this.createStreetLight(this.scene, { x: -67.7, y: 28, z: 71 }, { radius: 3, widthSegments: 24, heightSegments: 12 }); // sign nuketown
   
    const geometry = new THREE.BoxGeometry( 1, 12, 15 );  
    const material = new THREE.MeshPhysicalMaterial({  
      roughness: 0.1,  
      transmission: 1, // Add transparency
      thickness: 0.5, // Add refraction!
    });
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 10, 0)
    this.scene.add(mesh);

    //
    // LIGHTIHNG SETUP
    //

    //
    // CHARACTER SETUP
    //
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
    //
    // CHARACTER SETUP
    //
  }

  static createStreetLight(scene, position, sphereSize = { radius: 1, widthSegments: 16, heightSegments: 8 }) {
    const { radius, widthSegments, heightSegments } = sphereSize;
  
    const bulbGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const bulbLight = new THREE.PointLight(0xffffff, 2, 100, 2);
    const bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000,
    });
    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMat);
  
    bulbLight.add(bulbMesh);
    bulbLight.position.set(position.x, position.y, position.z);
    bulbLight.castShadow = true;
  
    // Adjust the light intensity and power if needed
    bulbLight.intensity = 10;
    bulbLight.power = 400;
  
    scene.add(bulbLight);
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
    // const time = Date.now() * 0.0005;
    // this.bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;

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