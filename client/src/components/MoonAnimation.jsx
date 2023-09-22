import { useEffect } from 'react';
import '../assets/css/LoginSignup.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default function MoonAnimation() {

  useEffect(() => {
    const scene = new THREE.Scene();
    const sceneContainer = document.getElementById('scene-container');

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneContainer.clientWidth / sceneContainer.clientHeight,
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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById("scene-container").appendChild(renderer.domElement);

    let fbx;
    let fbxSpaceRocks;
    rocketFly();
    spaceRocks();

    const ambientLight = new THREE.AmbientLight(0x3b285c, 0.6); // Color blanco, intensidad 0.5
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xe3e1e8, 1.9);
    light.position.set(5, 5, 1).normalize();
    scene.add(light);


    const light2 = new THREE.DirectionalLight(0xc8c0db, 1.4);
    light2.position.set(1, 5, 1).normalize();
    scene.add(light2);

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

    function rocketFly() {
      const loader = new FBXLoader();
      loader.setPath("src/assets/3dmodels/");
      loader.load("mMoonRocket.fbx", (loadedfbx) => {
        fbx = loadedfbx;
        fbx.scale.setScalar(0.1);
        fbx.traverse((c) => {
          c.castShadow = true;
        });
        fbx.position.copy(new THREE.Vector3(0, -0.5, 0));


        const animLoader = new FBXLoader();
        animLoader.setPath("src/assets/3dmodels/");
        animLoader.load("mMoonRocket.fbx", (anim) => {
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
        });

        scene.add(fbx);
      }, undefined, (error) => {
        console.error("Error cargando el modelo FBX:", error);
      });
    }

    function spaceRocks() {
      const loader = new FBXLoader();
      loader.setPath("src/assets/3dmodels/");
      loader.load("spacerocks.fbx", (loadedfbx2) => {
        fbxSpaceRocks = loadedfbx2;
        fbxSpaceRocks.scale.setScalar(0.06);
        fbxSpaceRocks.traverse((c) => {
          c.castShadow = true;
        });
        fbxSpaceRocks.position.copy(new THREE.Vector3(0, 0, 0));

        // const animLoader = new FBXLoader();
        // animLoader.setPath("src/assets/3dmodels/");
        // animLoader.load("spacerocks.fbx", (anim) => {
        //   const mixer = new THREE.AnimationMixer(fbxSpaceRocks);
        //   animationMixer.push(mixer);

        //   if (anim.animations.length > 0) {
        //     // Configura y reproduce la animación aquí
        //     const idleAction = mixer.clipAction(anim.animations[0]);
        //     idleAction.play();
        //   } else {
        //     console.error("No se encontraron animaciones en el modelo FBX.");
        //   }
        //   animate();
        // });

        scene.add(fbxSpaceRocks);
      }, undefined, (error) => {
        console.error("Error cargando el modelo FBX:", error);
      });
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

    // // Agrega un contenedor div para limitar el ancho al 66% y centrar el contenido
    // const contentContainer = document.createElement('div');
    // contentContainer.style.width = '66%'; // Establece el ancho al 66%
    // contentContainer.style.margin = '0'; // Centra horizontalmente
    // contentContainer.style.display = 'flex'; // Usa flexbox para centrar verticalmente
    // contentContainer.style.justifyContent = 'center'; // Centra verticalmente
    // contentContainer.style.alignItems = 'center'; // Centra verticalmente
    // contentContainer.appendChild(renderer.domElement);

    // document.getElementById("scene-container").appendChild(contentContainer);

  }, []);
  return (
    <>
        <div id="scene-container"></div>
    </>
  )
}
