import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";
import fragmnet from "../shaders/fragmennt.glsl";
import vertex from "../shaders/vertex.glsl";

// stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// canvas
const canvas = document.getElementsByClassName("webgl")[0];

// initiate a scene
const scene = new THREE.Scene();

// mesh
const geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragmnet,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// resize handler
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer and pixel ratio
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// fullscreen handler
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    return canvas.requestFullscreen();
  }
  return document.exitFullscreen();
});

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 3;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
// add size to renderer to avoid pixelated view
renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  // start stats monitoring
  stats.begin();
  // enable damping
  controls.update();
  // render scene
  renderer.render(scene, camera);
  // end of stats monitoring
  stats.end();
  // pass reference to itself to create an infinite loop of frames
  window.requestAnimationFrame(animate);
};

animate();
