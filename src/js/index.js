import Model3D from "./components/3d-model";
import GroupAnimation from "./components/group-animation";
import RotateByMouse from "./components/rotate-by-mouse";
import Text from "./components/text";

document.addEventListener("DOMContentLoaded", function () {
  GroupAnimation();
  RotateByMouse();
  Text();
  Model3D();
});

