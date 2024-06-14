import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js"; // Import FBXLoader

export function createMap(scene) {
  const loader = new FBXLoader();
  loader.load(
    "resources/nuketown/source/NukeTown.fbx", // Path to your FBX file
    (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Scale down the map
      object.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed

      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("An error happened", error);
    }
  );
}
