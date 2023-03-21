import './style.css';
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

let pointLight, textures, controls;

//Canvas
const canvas = document.querySelector(".webgl");
 
//Scene
const scene = new THREE.Scene();
 
//Size
const sizes = {
  width: innerWidth,
  height: innerHeight,
};
 
//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 2);
 
//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

/**
 * Particles↓↓
 */
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("./img/4.png");
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;
const positionArray = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);
const pointMaterial = new THREE.PointsMaterial({
  size: 0.1,
  transparent: true,
  alphaMap: particlesTexture,
  alphaTest: 0.001,
  depthWrite: false
});
const particles = new THREE.Points(particlesGeometry, pointMaterial);
/**
 * Particles↑↑
 */

/**
 * Cube ↓↓
 * */
textures = new THREE.TextureLoader().load("./img/earth.jpg");
const cube = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhysicalMaterial({
    map: textures
  }),
);
//DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
//PointLight
pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);
/**
 * Cube ↑↑
 * */

//Add Particles&Cube
scene.add(particles, cube);
 //OrbitControls
controls = new OrbitControls(camera, canvas);
//Animation
const animat = () => {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  
  window.requestAnimationFrame(animat);
  renderer.render(scene, camera);
};
 
animat();
 
//Resize brouser
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
 
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
 
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});
