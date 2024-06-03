import * as THREE from "three";

export class FreeCam {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.moveSpeed = 5.0;
    this.lookSpeed = 0.002;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
    };

    this.mouse = {
      x: 0,
      y: 0,
    };

    this.pitch = new THREE.Euler(0, 0, 0, "YXZ");
    this.yaw = new THREE.Euler(0, 0, 0, "YXZ");

    this.isLocked = false;

    this.init();
  }

  init() {
    // Mouse move listener
    this.domElement.addEventListener("mousemove", this.onMouseMove.bind(this));

    // Keydown and keyup listeners
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));

    // Pointer lock change listeners
    document.addEventListener(
      "pointerlockchange",
      this.onPointerLockChange.bind(this)
    );
    document.addEventListener("click", this.requestPointerLock.bind(this));
  }

  onPointerLockChange() {
    this.isLocked = document.pointerLockElement === this.domElement;
  }

  requestPointerLock() {
    if (!this.isLocked) {
      this.domElement.requestPointerLock();
    }
  }

  onMouseMove(event) {
    if (!this.isLocked) return;

    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this.yaw.y -= movementX * this.lookSpeed;
    this.pitch.x -= movementY * this.lookSpeed;
    this.pitch.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch.x));
  }

  onKeyDown(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.keys.forward = true;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.keys.left = true;
        break;
      case "ArrowDown":
      case "KeyS":
        this.keys.backward = true;
        break;
      case "ArrowRight":
      case "KeyD":
        this.keys.right = true;
        break;
      case "Space":
        this.keys.up = true;
        break;
      case "ShiftLeft":
        this.keys.down = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.keys.forward = false;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.keys.left = false;
        break;
      case "ArrowDown":
      case "KeyS":
        this.keys.backward = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.keys.right = false;
        break;
      case "Space":
        this.keys.up = false;
        break;
      case "ShiftLeft":
        this.keys.down = false;
        break;
    }
  }

  update(delta) {
    this.velocity.set(0, 0, 0);

    if (this.keys.forward) this.velocity.z -= this.moveSpeed * delta;
    if (this.keys.backward) this.velocity.z += this.moveSpeed * delta;
    if (this.keys.left) this.velocity.x -= this.moveSpeed * delta;
    if (this.keys.right) this.velocity.x += this.moveSpeed * delta;
    if (this.keys.up) this.velocity.y += this.moveSpeed * delta;
    if (this.keys.down) this.velocity.y -= this.moveSpeed * delta;

    this.direction.copy(this.velocity).applyEuler(this.yaw);

    this.camera.position.add(this.direction);
    this.camera.rotation.set(this.pitch.x, this.yaw.y, 0);
  }
}
