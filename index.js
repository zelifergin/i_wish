import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// create a scene in which all other objects will exist
let scene = new THREE.Scene();



// create a texture loader:
let textureLoader = new THREE.TextureLoader();
let myTexture = textureLoader.load("./black.jpg");
let myTexture2 = textureLoader.load("./window.jpg");

// change the texture parameters if you like!
myTexture.wrapS = THREE.RepeatWrapping;
myTexture.wrapT = THREE.RepeatWrapping;
myTexture.repeat.set(1, 1);

// create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 3; // place the camera in space
camera.position.x = 10; // place the camera in space

// the renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

// create a sphere and add it to the scene
let geometry = new THREE.BoxGeometry(2, 3);
let material = new THREE.MeshPhongMaterial({ map: myTexture });
let my3DObject = new THREE.Mesh(geometry, material);
scene.add(my3DObject);

// add some lights to the scene
// try commenting these out to see how each of them affect the image
let directionalLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1);
directionalLight.position.set(10, 2, 3);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

//add the floor
let floorGeo = new THREE.BoxGeometry(6, 0.2, 10);
let floorMat = new THREE.MeshPhongMaterial({ map: myTexture });
let floorMesh = new THREE.Mesh(floorGeo, floorMat);
floorMesh.position.set(0, -3, 0);
floorMesh.receiveShadow = true;
scene.add(floorMesh)

// add the backwall
let floorGeo2 = new THREE.BoxGeometry(0.2, 6, 10);
let floorMat2 = new THREE.MeshPhongMaterial( { map: myTexture2 } );
let floorMesh2 = new THREE.Mesh(floorGeo2, floorMat2);
floorMesh2.position.set(-3, 0, 0);
floorMesh2.receiveShadow = true;
scene.add(floorMesh2);

let ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.1);
scene.add(ambientLight);

function loop() {
  // add some movement
  my3DObject.rotateY(0.01);

  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}
loop();