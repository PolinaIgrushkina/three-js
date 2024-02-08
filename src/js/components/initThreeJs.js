import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const init = (className) => {
  // Размеры для сцены
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};
  
  // Сцена в DOM
  const canvas = document.querySelector(`.${className}`);

  if (canvas) {
    // Сцена
    const scene = new THREE.Scene();
  
    // Настройки угла и позиции камерыи (угол обзора и соотношение сторон)
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  
    // Добавление камеры на сцену
    scene.add(camera);

    // Контроллеры камеры с помощью специального обьекта управления камерой OrbitControls из библиотеки 
    const controls = new OrbitControls(camera, canvas);
    // Сглаживание движения
    controls.enableDamping = true;

    // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    return { sizes, scene, canvas, camera, renderer, controls };
  }
};

export default init;