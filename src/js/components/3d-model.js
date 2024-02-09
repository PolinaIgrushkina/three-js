import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model3D = () => {
 const canvas = document.querySelector('.model-3d-canvas');

  if (canvas) {
    // Сцена
    const scene = new THREE.Scene();
    
    // Камера
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Ставим курсор в центре координат
    const cursor = {
      x: 0,
      y: 0,
    }

    const parametrs = {
      color: "red",
    }
    
    // Настройки угла и позиции камерыи (угол обзора и соотношение сторон)
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(0, 2, 5);

    // Контроллеры камеры с помощью специального обьекта управления камерой OrbitControls из библиотеки 
    const controls = new OrbitControls(camera, canvas);
    // Сглаживание движения
    controls.enableDamping = true;

    // Добавление камеры в сцену
    scene.add(camera);

    // Плоскость
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#444",
        metalness: 0,
        roughness: 0.5,
      }
      ))
    
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    // Добавляем свет полусферический и направленный
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight);

    // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  
    const loader = new GLTFLoader();
    loader.load("../../../static/models/Avocado/Avocado.gltf",
      (gltf) => {
        gltf.scene.scale.set(50, 50, 50);
        scene.add(gltf.scene);
      }
    );

    const tick = () => {
      // Сглаженность вращение
      controls.update();
      
      // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
      renderer.render(scene, camera);

      // Вызов самой себя
      window.requestAnimationFrame(tick);
    }

    tick();

    // Делаем сцену ресайзебл
    window.addEventListener("resize", () => {
      // Обновляем размеры сцены
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Обновляем соотношение сторон камеры
      camera.aspect = sizes.width / sizes.height;
      // Обновление матрицу проекции
      camera.updateProjectionMatrix();

      // Обновляем renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Вызов ререндера
      renderer.render(scene, camera);
    });

    // Переключение полноекранного режима
    window.addEventListener('dblclick', () => {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
}

export default Model3D