export function MoonAnimationJS(){

// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
// import { OrbitControls } from "./OrbitControls.js";

// import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";

document.addEventListener('DOMContentLoaded', function () {
  // Tu código JavaScript aquí
  // Puedes colocar aquí el código de main.js o cualquier otro código que deba ejecutarse después de cargar el DOM.

  const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
/*const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);*/

let animationMixer = [];
const clock = new THREE.Clock(); //Agregamos una constante clock para la variable deltaTime

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth * 0.8, window.innerHeight); 
document.getElementById("scene-container").appendChild(renderer.domElement);


scene.background = new THREE.Color(0x5e38a5); // Color de inicio del gradiente
const gradientColor = new THREE.Color(0x07040e); // Color final del gradiente

const canvas = document.createElement('canvas');
canvas.width = 5;
canvas.height = 10;

const ctx = canvas.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, scene.background.getStyle());
gradient.addColorStop(1, gradientColor.getStyle());

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const gradientTexture = new THREE.CanvasTexture(canvas);
scene.background = gradientTexture;



// Crear una esfera
const geometry = new THREE.SphereGeometry(1, 50, 50);

// Cargar una textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../3dimg/moonTexture.jpg");
const textureNormal = textureLoader.load("../3dimg/moonNormalMap.jpg");
//const textureBump = textureLoader.load("./src/img/DisplacementMap.jpg");

const material = new THREE.MeshStandardMaterial({ map: texture, normalMap: textureNormal, normalScale: new THREE.Vector2(0.05, 0.05),});
const sphere = new THREE.Mesh(geometry, material);
//scene.add(sphere);

// // Grupo para la esfera
// const sphereGroup = new THREE.Group();
// scene.add(sphereGroup);
// sphereGroup.add(sphere); // Agregar la esfera al grupo


sphere.position.set(-0.8, 0, 0);

let fbx;
let fbxSpaceRocks;
rocketFly();
spaceRocks();

const rocketGroup = new THREE.Group(); // Grupo para el cohete
scene.add(rocketGroup);

const ambientLight = new THREE.AmbientLight(0x3b285c, 0.6); // Color blanco, intensidad 0.5
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xe3e1e8, 1.9);
light.position.set(5, 5, 1).normalize();
scene.add(light);


const light2 = new THREE.DirectionalLight(0xc8c0db, 1.4);
light2.position.set(1, 5, 1).normalize();
scene.add(light2);

// Posicionar la cámara
camera.position.set(0, 0, 3); // Cambiar la posición de la cámara
camera.lookAt(sphere.position); // Enfocar la cámara en la esfera

// Habilitar los controles del mouse para navegar
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true; // Permitir la rotación
controls.enablePan = false;
controls.enableZoom = false;


// Animación
const animate = () => {

  const deltaTime = clock.getDelta();
  controls.update(); // Actualizar los controles del mouse
  //sphere.rotation.x += 0.01;

  fbxSpaceRocks.rotation.y += 0.001;

  //  // Calcular la rotación en radianes para un ángulo de 45 grados
  // const angle = Math.PI / 4; // 45 grados en radianes
  // // Rotar el cohete alrededor de la esfera (luna)
  // if (rocketGroup) {
  //   rocketGroup.rotation.z += angle * 0.0035; // Ajustar la velocidad de rotación
  // }
  // sphere.rotation.y += 0.0035;
  for (let i = 0; i < animationMixer.length; i++) {
    animationMixer[i].update(deltaTime);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

function rocketFly() {
  const loader = new FBXLoader();
  loader.setPath("../3dmodels/");
  loader.load("mMoonRocket.fbx", (loadedfbx) => {
    fbx = loadedfbx;
    fbx.scale.setScalar(0.1);
    fbx.traverse((c) => {
      c.castShadow = true;
    });
    fbx.position.copy(new THREE.Vector3(-0.8, -0.8, 0));

    const animLoader = new FBXLoader();
    animLoader.setPath("../3dmodels/");
    animLoader.load("mMoonRocket.fbx", (anim) => {
      const mixer = new THREE.AnimationMixer(fbx);
      animationMixer.push(mixer);
      const idleAction = mixer.clipAction(anim.animations[0]);
      idleAction.play();

      animate();
    });

    scene.add(fbx);
  });
}

function spaceRocks() {
  const loader = new FBXLoader();
  loader.setPath("../3dmodels/");
  loader.load("spacerocks.fbx", (loadedfbx2) => {
    fbxSpaceRocks = loadedfbx2;
    fbxSpaceRocks.scale.setScalar(0.06);
    fbxSpaceRocks.traverse((c) => {
      c.castShadow = true;
    });
    fbxSpaceRocks.position.copy(new THREE.Vector3(-0.8, -0.1, 0));

    const animLoader = new FBXLoader();
    animLoader.setPath("../3dmodels/");
    animLoader.load("spacerocks.fbx", (anim) => {
      const mixer = new THREE.AnimationMixer(fbx);
      animationMixer.push(mixer);
      const idleAction = mixer.clipAction(anim.animations[0]);
      idleAction.play();

      animate();
    });

    scene.add(fbxSpaceRocks);
  });
}
});

}

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// /*const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);*/

// let animationMixer = [];
// const clock = new THREE.Clock(); //Agregamos una constante clock para la variable deltaTime

// const renderer = new THREE.WebGLRenderer();
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth * 0.8, window.innerHeight); 
// document.getElementById("scene-container").appendChild(renderer.domElement);


// scene.background = new THREE.Color(0x5e38a5); // Color de inicio del gradiente
// const gradientColor = new THREE.Color(0x07040e); // Color final del gradiente

// const canvas = document.createElement('canvas');
// canvas.width = 5;
// canvas.height = 10;

// const ctx = canvas.getContext('2d');
// const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
// gradient.addColorStop(0, scene.background.getStyle());
// gradient.addColorStop(1, gradientColor.getStyle());

// ctx.fillStyle = gradient;
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// const gradientTexture = new THREE.CanvasTexture(canvas);
// scene.background = gradientTexture;



// // Crear una esfera
// const geometry = new THREE.SphereGeometry(1, 50, 50);

// // Cargar una textura
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("../3dimg/moonTexture.jpg");
// const textureNormal = textureLoader.load("../3dimg/moonNormalMap.jpg");
// //const textureBump = textureLoader.load("./src/img/DisplacementMap.jpg");

// const material = new THREE.MeshStandardMaterial({ map: texture, normalMap: textureNormal, normalScale: new THREE.Vector2(0.05, 0.05),});
// const sphere = new THREE.Mesh(geometry, material);
// //scene.add(sphere);

// // // Grupo para la esfera
// // const sphereGroup = new THREE.Group();
// // scene.add(sphereGroup);
// // sphereGroup.add(sphere); // Agregar la esfera al grupo


// sphere.position.set(-0.8, 0, 0);

// let fbx;
// let fbxSpaceRocks;
// rocketFly();
// spaceRocks();

// const rocketGroup = new THREE.Group(); // Grupo para el cohete
// scene.add(rocketGroup);

// const ambientLight = new THREE.AmbientLight(0x3b285c, 0.6); // Color blanco, intensidad 0.5
// scene.add(ambientLight);

// const light = new THREE.DirectionalLight(0xe3e1e8, 1.9);
// light.position.set(5, 5, 1).normalize();
// scene.add(light);


// const light2 = new THREE.DirectionalLight(0xc8c0db, 1.4);
// light2.position.set(1, 5, 1).normalize();
// scene.add(light2);

// // Posicionar la cámara
// camera.position.set(0, 0, 3); // Cambiar la posición de la cámara
// camera.lookAt(sphere.position); // Enfocar la cámara en la esfera

// // Habilitar los controles del mouse para navegar
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableRotate = true; // Permitir la rotación
// controls.enablePan = false;
// controls.enableZoom = false;


// // Animación
// const animate = () => {

//   const deltaTime = clock.getDelta();
//   controls.update(); // Actualizar los controles del mouse
//   //sphere.rotation.x += 0.01;

//   fbxSpaceRocks.rotation.y += 0.001;

//   //  // Calcular la rotación en radianes para un ángulo de 45 grados
//   // const angle = Math.PI / 4; // 45 grados en radianes
//   // // Rotar el cohete alrededor de la esfera (luna)
//   // if (rocketGroup) {
//   //   rocketGroup.rotation.z += angle * 0.0035; // Ajustar la velocidad de rotación
//   // }
//   // sphere.rotation.y += 0.0035;
//   for (let i = 0; i < animationMixer.length; i++) {
//     animationMixer[i].update(deltaTime);
//   }
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// };

// animate();

// function rocketFly() {
//   const loader = new FBXLoader();
//   loader.setPath("../3dmodels/");
//   loader.load("mMoonRocket.fbx", (loadedfbx) => {
//     fbx = loadedfbx;
//     fbx.scale.setScalar(0.1);
//     fbx.traverse((c) => {
//       c.castShadow = true;
//     });
//     fbx.position.copy(new THREE.Vector3(-0.8, -0.8, 0));

//     const animLoader = new FBXLoader();
//     animLoader.setPath("../3dmodels/");
//     animLoader.load("mMoonRocket.fbx", (anim) => {
//       const mixer = new THREE.AnimationMixer(fbx);
//       animationMixer.push(mixer);
//       const idleAction = mixer.clipAction(anim.animations[0]);
//       idleAction.play();

//       animate();
//     });

//     scene.add(fbx);
//   });
// }

// function spaceRocks() {
//   const loader = new FBXLoader();
//   loader.setPath("../3dmodels/");
//   loader.load("spacerocks.fbx", (loadedfbx2) => {
//     fbxSpaceRocks = loadedfbx2;
//     fbxSpaceRocks.scale.setScalar(0.06);
//     fbxSpaceRocks.traverse((c) => {
//       c.castShadow = true;
//     });
//     fbxSpaceRocks.position.copy(new THREE.Vector3(-0.8, -0.1, 0));

//     const animLoader = new FBXLoader();
//     animLoader.setPath("../3dmodels/");
//     animLoader.load("spacerocks.fbx", (anim) => {
//       const mixer = new THREE.AnimationMixer(fbx);
//       animationMixer.push(mixer);
//       const idleAction = mixer.clipAction(anim.animations[0]);
//       idleAction.play();

//       animate();
//     });

//     scene.add(fbxSpaceRocks);
//   });
// }

