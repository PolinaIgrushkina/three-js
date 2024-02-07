import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry }  from 'three/addons/geometries/TextGeometry.js';

const Text = () => {
  const canvas = document.querySelector('.text-geometry-canvas');

  if (canvas) {
    // Создаем сцену
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
    };

    // Настройки угла и позиции камерыи (угол обзора и соотношение сторон)
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;

    // Контроллеры камеры с помощью специального обьекта управления камерой OrbitControls из библиотеки 
    const controls = new OrbitControls(camera, canvas);
    // Сглаживание движения
    controls.enableDamping = true;

    // Загружаем шрифт
    const loader = new FontLoader();
    let font;

    loader.load(
      'fonts/Roboto_Regular.json',
      (loadedFont) => {
        font = loadedFont;
        createText();
      },
    );

    // Создаем геометрию (фигуру) текста
    const createText = () => {
      const textGeometry = new TextGeometry('Mettevo', {
        font: font,
        size: 0.5,
        height: 0.2,
      });

      // Создание материала
      const material = new THREE.MeshBasicMaterial({ color: '#7c35b6', });

      // Создание обьекта текста
      const textMesh = new THREE.Mesh(textGeometry, material);

      // Центрирование текста
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      textMesh.position.x = -textWidth / 2;

      // Добавление фигуры текста на сцену
      scene.add(textMesh);

      // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);

      window.addEventListener("mousemove", (event) => {
        // Делаем систему координат удобной для управление от -0.5 до 0.5 с 0 в центре
        cursor.x = -(event.clientX / sizes.width - 0.5);
        cursor.y = event.clientY / sizes.height - 0.5;
      });

      const tick = () => {
        // Сглаженность вращение
        controls.update();
        
        // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
        renderer.render(scene, camera);

        // Вызов самой себя
        window.requestAnimationFrame(tick);
      };

      tick();

      // Делаем сцену ресайзебл
      window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

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
    };
  }
};

export default Text;
