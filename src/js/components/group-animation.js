import * as THREE from 'three';

const GroupAnimation = () => {
  const canvas = document.querySelector('.group-animation-canvas');

  if (canvas) {
    // Сцена
    const scene = new THREE.Scene();
      
    // Камера
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Настройки угла и позиции камеры
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;

    // Добавление камеры в сцену
    scene.add(camera);

    // Объект - куб
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Создание группы
    const group = new THREE.Group();

    // Создание пустого массива в которых будут добвлятся сгенерированные обьекты - кубы
    const meshes = [];

    // Случайные цвета
    const colors = ["#0000FF", "#FFFF00"];

    //Генерация 9 одинаковых обьектов-кубов со случайными цветами
    for (let x = -1.2; x <= 1.2; x = x + 1.2) {
      for (let y = -1.2; y <= 1.2; y = y + 1.2) {

        // Генерация случайного цвета для куба
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          wireframe: true,
        });

        // Создание куба на каждом цикле с разным цветом из 2х доступных
        const mesh = new THREE.Mesh(geometry, material);

        // Уменьшение куба
        mesh.scale.set(0.5, 0.5, 0.5);

        // Позиционирование куба
        mesh.position.set(x, y, 0);

        // Добавление куба в массив кубов
        meshes.push(mesh);
      }
    }

    // Добавление кубов в группу
    group.add(...meshes);

    // Добавление группы в сцену
    scene.add(group);

    // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    // Специальныц обьект класса Clock (свойство для времени анимации)
    const clock = new THREE.Clock();

    const MAX_SCALE = 1;
    const MIN_SCALE = 0.5;
    let grow = false;

    // Фунция анимации
    const animate = () => {
      const delta = clock.getDelta();

      // Четные и нечетные кубы вращаются в разные стороны
      meshes.forEach((item, index) => {
        const mult = index % 2 === 0 ? 1 : -1;
        item.rotation.x += mult * delta;
        item.rotation.y += mult * delta * 0.4;
      });

      // Время вращения кубов
      const epalpsed = clock.getElapsedTime();

      // Позиционируется камера
      camera.position.x = Math.sin(epalpsed);
      camera.position.y = Math.cos(epalpsed);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Уменьшение/цвелиение группы
      const mult = grow ? 1 : -1;
      group.scale.x += mult * delta * 0.2;
      group.scale.y += mult * delta * 0.2;
      group.scale.z += mult * delta * 0.2;

      // Когда группа доходит до максимального приблежения, она начинает отдаляться и наоборот
      if (grow && group.scale.x >= MAX_SCALE) {
        grow = false;
      } else if (group.scale.x <= MIN_SCALE) {
        grow = true;
      }

      // Вызов рендера (отрисовщик рендерит сцену от лица камеры)
      renderer.render(scene, camera);

      // Вызов самой себя
      window.requestAnimationFrame(animate);
    };

    // Запуск анимации
    animate();
  }
}

export default GroupAnimation