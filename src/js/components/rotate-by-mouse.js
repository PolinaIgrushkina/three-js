import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'stats.js';
import * as dat from "lil-gui";

const RotateByMouse = () => {
  const canvas = document.querySelector('.rotate-by-mouse-canvas');

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
    camera.position.z = 3;

    // Контроллеры камеры с помощью специального обьекта управления камерой OrbitControls из библиотеки 
    const controls = new OrbitControls(camera, canvas);
    // Сглаживание движения
    controls.enableDamping = true;

    // Добавление камеры в сцену
    scene.add(camera);

    // Объект
    const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: parametrs.color,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Добавление обьекта в сцену
    scene.add(mesh);

    // Панель отслеживания FPS
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
  
    // lil-gui-контрол для управления обьектом
    const gui = new dat.GUI();

    // Инпут-контролы от gui 
    gui.add(mesh.scale, "x").min(0).max(5).step(0.1).name("Box scale X");
    gui.add(mesh, "visible");
    gui.add(material, "wireframe");
    gui.addColor(parametrs, "color").onChange(() => material.color.set(parametrs.color));

    // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  
    window.addEventListener("mousemove", (event) => {
      // Делаем систему координат удобной для управление от -0.5 до 0.5 с 0 в центре
      cursor.x = -(event.clientX / sizes.width - 0.5);
      cursor.y = event.clientY / sizes.height - 0.5;
    })

    
    const tick = () => {
      // Начало отсчета fps
      stats.begin();

      // Сглаженность вращение
      controls.update();
      
      // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
      renderer.render(scene, camera);

      // Конец отсчета fps
      stats.end();

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


export default RotateByMouse