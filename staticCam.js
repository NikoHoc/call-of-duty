import * as THREE from "three";

export class StaticCam {
  constructor(camera, scene, domElement) {
    this.camera = camera;
    this.scene = scene;
    this.domElement = domElement;
    this.lookSpeed = 0.002;

    this.enabled = false;

    this.rotation = new THREE.Euler(0, 0, 0, "YXZ");
    this.quaternion = new THREE.Quaternion();

    this.initEventListeners();
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  initEventListeners() {
    this.domElement.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  }

  onMouseMove(event) {
    if (!this.enabled) return;

    const deltaX = -event.movementX * this.lookSpeed;
    const deltaY = -event.movementY * this.lookSpeed;

    // Apply the rotations using quaternions
    this.quaternion.setFromEuler(this.rotation);
    const quaternionX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), deltaX);
    const quaternionY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), deltaY);

    this.quaternion.multiplyQuaternions(quaternionX, this.quaternion);
    this.quaternion.multiplyQuaternions(this.quaternion, quaternionY);

    this.rotation.setFromQuaternion(this.quaternion);

    this.camera.quaternion.copy(this.quaternion);
  }

  update(delta) {
    if (!this.enabled) return;
  }
}
