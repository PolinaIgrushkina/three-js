const resizeScreen = (sizes, camera, renderer, scene) => {
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
}

export default resizeScreen