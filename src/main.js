import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//scene == container
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
//mimic human eye balls scene
//1. field of view (fov) 75 degrees
//2. aspect ratio
//3. view frustum

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
//make it a full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight);
//move camera back
camera.position.setZ(50);
// render = draw
renderer.render(scene, camera);

// 1. we need a geometry with {x, y, z} points that makeup a shape
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// //2. material to color the geometry, like the wrapping papar for an object
// const material = new THREE.MeshStandardMaterial({
//   color: 0x4f86f7,
// });
// // 3. mesh, combine geometry and material
// const torus = new THREE.Mesh(geometry, material);
// //add mesh to scene
// scene.add(torus);

//4. add a light source
//light everything equally
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(0, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//add a helper to see the light source
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
const controls = new OrbitControls(camera, renderer.domElement);

//generate stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 2,
  });
  const star = new THREE.Mesh(geometry, material);
  //randomly place stars
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

//avatar
const lexieTexture = new THREE.TextureLoader().load("lexie2.jpg", () => {
  lexieTexture.minFilter = THREE.LinearFilter;
  lexieTexture.magFilter = THREE.LinearFilter;
  animate();
});
const lexie = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: lexieTexture })
);
scene.add(lexie);

//sun
const sunTexture = new THREE.TextureLoader().load("sun.png");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    emissive: 0xff4500,
    emissiveIntensity: 1,
  })
);
scene.add(sun);

//Mercury
const mercuryTexture = new THREE.TextureLoader().load("mercury1.jpg");
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);
scene.add(mercury);
mercury.position.x = -15;

// Venus
const venusTexture = new THREE.TextureLoader().load("venus.png");
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({ map: venusTexture })
);
scene.add(venus);
venus.position.x = 20;
venus.position.z = -10;

//moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg", () => {
  moonTexture.minFilter = THREE.LinearFilter;
  moonTexture.magFilter = THREE.LinearFilter;
  animate();
});
const moonNormalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture,
  })
);
scene.add(moon);

//earth
const earthTexture = new THREE.TextureLoader().load("earth.png");
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);

earth.position.x = -25;
earth.position.z = 15;
moon.position.z = 30;
moon.position.x = -10;

lexie.position.z = -5;
lexie.position.x = 2;

// function moveCamera() {
//   //where the user is currently scroll too
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   lexie.rotation.y += 0.01;
//   lexie.rotation.z += 0.01;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;

//render the scene
//but we use a loop to keep rendering
function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
