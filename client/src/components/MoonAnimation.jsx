import { useEffect } from 'react';
import '../assets/css/LoginSignup.css'
// import '../assets/threejs/main.js'
import * as THREE from 'three';
// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
// import { Vector3 } from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

function MoonAnimation() {

  useEffect(() => {
    const scene = new THREE.Scene();
    const sceneContainer = document.getElementById('scene-container');

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneContainer.clientWidth / sceneContainer.clientHeight,
      0.1,
      1000
    );

    let animationMixer = [];
    const clock = new THREE.Clock(); //Agregamos una constante clock para la variable deltaTime

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    sceneContainer.appendChild(renderer.domElement);

    let fbx;
    let fbxSpaceRocks;
    loadModels();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Color blanco, intensidad 0.5
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(5, 5, 1).normalize();
    scene.add(light);

    // Posicionar la cámara
    camera.position.set(0, 0, 3.5); // Cambiar la posición de la cámara
    camera.lookAt(new THREE.Vector3(0, -0.5, 0)); // Enfocar la cámara en la esfera

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

      if (fbxSpaceRocks)
        fbxSpaceRocks.rotation.y += 0.0002;

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

    async function loadModels() {
      const promises = [];
      promises.push(rocketFly());
      promises.push(spaceRocks());

      await Promise.all(promises);
    }

    async function rocketFly() {
      const loader = new FBXLoader();
      loader.setPath('src/assets/3dmodels/');

      fbx = await loader.loadAsync('mMoonRocket.fbx');
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      fbx.position.copy(new THREE.Vector3(0, -0.5, 0));

        const animLoader = new FBXLoader();
        animLoader.setPath('src/assets/3dmodels/');
        animLoader.load('mMoonRocket.fbx', (anim) => {
          const mixer = new THREE.AnimationMixer(fbx);
          animationMixer.push(mixer);

          if (anim.animations.length > 0) {
            // Configura y reproduce la animación aquí
            const idleAction = mixer.clipAction(anim.animations[0]);
            idleAction.play();
          } else {
            console.error("No se encontraron animaciones en el modelo FBX.");
          }

          animate();

        scene.add(fbx);
      }, undefined, (error) => {
        console.error("Error cargando el modelo FBX:", error);
      });
    }

    async function spaceRocks() {
      const loader = new FBXLoader();
      loader.setPath('src/assets/3dmodels/');
      fbxSpaceRocks = await loader.loadAsync('spacerocks.fbx');
      fbxSpaceRocks.scale.setScalar(0.06);
      fbxSpaceRocks.traverse((c) => {
        c.castShadow = true;
      });
      fbxSpaceRocks.position.copy(new THREE.Vector3(0, 0, 0));

      scene.add(fbxSpaceRocks);
    }

    // Esta función se ejecutará cada vez que se redimensione la ventana del navegador
    function onWindowResize() {
      // Obtén el nuevo ancho y alto de la ventana
      const newWidth = sceneContainer.clientWidth;
      const newHeight = sceneContainer.clientHeight;

      // Actualiza el tamaño del lienzo de renderizado
      renderer.setSize(newWidth, newHeight);

      // Actualiza la relación de aspecto de la cámara
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    }

    // Agrega un evento 'resize' para llamar a la función cuando cambie el tamaño de la ventana
    window.addEventListener('resize', onWindowResize);

    // Llama a la función una vez para establecer el tamaño inicial correctamente
    onWindowResize();
  }, []);
  return (
    <>
      <div id="scene-container"></div>
    </>
  )
}

export default MoonAnimation