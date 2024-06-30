import * as THREE from "three";


export class CharacterControls {
  constructor(model, mixer, animationsMap, camera, currentAction) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.camera = camera;
    this.currentAction = currentAction;
    this.keysPressed = {};
    this.isMoving = false;
    this.BackCameraOffset = new THREE.Vector3(0, 15, 30); // CameraOffset behind the player
    this.FrontCameraOffset = new THREE.Vector3(0, 15, -30); // CameraOffset in front of the player
    this.cameraOffset = this.BackCameraOffset.clone(); // Default to behind player
    this.enabled = true;

    this.animationsMap.forEach((value, key) => {
      if (key === this.currentAction) {
        value.play();
      }
    });

    document.addEventListener("keydown", (event) => {
      this.keysPressed[event.code] = true;
      if (event.code === "KeyF") {
        this.toggleCameraView();
      }
    });

    document.addEventListener("keyup", (event) => {
      this.keysPressed[event.code] = false;
    });

    document.addEventListener("mousemove", (event) => {
      this.handleMouseMove(event);
    });
  }

  switchAnimation(newAction) {
    if (this.currentAction === newAction) return;
    this.animationsMap.get(this.currentAction).fadeOut(0.2);
    this.animationsMap.get(newAction).reset().fadeIn(0.2).play();
    this.currentAction = newAction;
  }

  handleMouseMove(event) {
    const rotationSpeed = 0.005;
    this.model.rotation.y -= event.movementX * rotationSpeed;
  }

  update(delta) {
    if (!this.enabled) return;

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, -1).applyQuaternion(this.model.quaternion);
    const sideVector = new THREE.Vector3(1, 0, 0).applyQuaternion(this.model.quaternion);

    this.isMoving = false;
    const isRunning = this.keysPressed["ShiftLeft"] || this.keysPressed["ShiftRight"];

    if (this.keysPressed["KeyW"]) {
      direction.add(frontVector);
      this.isMoving = true;
    }
    if (this.keysPressed["KeyS"]) {
      direction.sub(frontVector);
      this.isMoving = true;
    }
    if (this.keysPressed["KeyA"]) {
      direction.sub(sideVector);
      this.isMoving = true;
    }
    if (this.keysPressed["KeyD"]) {
      direction.add(sideVector);
      this.isMoving = true;
    }

    if (this.isMoving) {
      if (isRunning) {
        this.switchAnimation("Run");
        direction.normalize().multiplyScalar(30 * delta);
      } else {
        this.switchAnimation("Walk");
        direction.normalize().multiplyScalar(20 * delta);
      }
    } else {
      this.switchAnimation("Idle");
    }

    this.model.position.add(direction);
    this.mixer.update(delta);

    this.updateCamera();
  }

  updateCamera() {
    const offset = this.cameraOffset.clone().applyQuaternion(this.model.quaternion);
    this.camera.position.copy(this.model.position).add(offset);
    this.camera.lookAt(this.model.position);
  }

  toggleCameraView() {
    if (this.cameraOffset.equals(this.BackCameraOffset)) {
      this.cameraOffset.copy(this.FrontCameraOffset); // Switch to FrontCameraOffset
    } else {
      this.cameraOffset.copy(this.BackCameraOffset); // Switch to BackCameraOffset
    }
    this.updateCamera(); // Update the camera immediately after changing the offset
  }
}