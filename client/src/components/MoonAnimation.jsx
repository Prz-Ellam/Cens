import { useEffect, useRef } from 'react';
import '../assets/css/LoginSignup.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

function MoonAnimation() {
  const sceneContainer = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneContainer.current.clientWidth / sceneContainer.current.clientHeight,
      0.1,
      1000
    );

    let animationMixer = [];
    const clock = new THREE.Clock(); //Agregamos una constante clock para la variable deltaTime

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    sceneContainer.current.innerHTML = '';
    sceneContainer.current.appendChild(renderer.domElement);

    let fbx;
    let fbxSpaceRocks;
    loadBoth();

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

      if (fbxSpaceRocks) fbxSpaceRocks.rotation.y += 0.0002;

      for (let i = 0; i < animationMixer.length; i++) {
        animationMixer[i].update(deltaTime);
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    async function loadBoth() {
      const promises = [];
      promises.push(rocketFly());
      promises.push(spaceRocks());
      await Promise.all(promises);
    }

    async function rocketFly() {
      const loader = new FBXLoader();
      loader.setPath('src/assets/3dmodels/');

      const loadedfbx = await loader.loadAsync('mMoonRocket.fbx');
      fbx = loadedfbx;
      fbx.scale.setScalar(0.1);

      fbx.traverse((c) => {
        c.castShadow = true;
      });
      fbx.position.copy(new THREE.Vector3(0, -0.5, 0));

      const mixer = new THREE.AnimationMixer(fbx);
      animationMixer.push(mixer);

      if (fbx.animations.length > 0) {
        const idleAction = mixer.clipAction(fbx.animations[0]);
        idleAction.play();
      } else {
        console.error('No se encontraron animaciones en el modelo FBX.');
      }

      animate();

      scene.add(fbx);
    }

    async function spaceRocks() {
      const loader = new FBXLoader();
      loader.setPath('src/assets/3dmodels/');

      const loadedfbx2 = await loader.loadAsync('spacerocks.fbx');

      fbxSpaceRocks = loadedfbx2;
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
      const newWidth = sceneContainer.current.clientWidth;
      const newHeight = sceneContainer.current.clientHeight;

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

    return () => {
      console.log('eliminado');
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);
  return <div ref={sceneContainer}></div>;
}

export default MoonAnimation;
