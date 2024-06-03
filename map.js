import * as THREE from "three";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

// export function createMap(scene) {
//   new MTLLoader()
//     .setPath("../resources/Dust 2/")
//     .load("Dust2.mtl", function (materials) {
//       materials.preload();
//       new OBJLoader()
//         .setMaterials(materials)
//         .setPath("../resources/Dust 2/")
//         .load("Dust2.obj", function (object) {
//           scene.add(object);
//           object.position.set(4, -2.5, 0);
//           object.rotation.x = -(Math.PI / 2);
//         });
//     });
// }

export function createMap(scene) {
  new MTLLoader()
    .setPath("../resources/new_dust2/")
    .load("/source/de_dust2.mtl", function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath("../resources/new_dust2/")
        .load("/source/de_dust2.obj", function (object) {
          scene.add(object);
          object.position.set(4, -2.5, 0);
          object.rotation.x = -(Math.PI / 2);
        });
    });
}
