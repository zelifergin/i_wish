import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// create a scene in which all other objects will exist
let scene = new THREE.Scene();

// load a video texture using the HTML <video> element in the index.html file
let video = document.getElementById("myVideo");
let myVideoTexture = new THREE.VideoTexture(video);

// create a texture loader:
let textureLoader = new THREE.TextureLoader();
let myTexture = textureLoader.load("./room.jpg");

// change the texture parameters if you like!
myTexture.wrapS = THREE.RepeatWrapping;
myTexture.wrapT = THREE.RepeatWrapping;
myTexture.repeat.set(-1, 1);
myVideoTexture.repeat.set(1, 1);

// create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 3; // place the camera in space
camera.position.x = 10; // place the camera in space

// the renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

//create a global audio source
const sound = new THREE.Audio( listener );

document.addEventListener(
  "click",
  () => {
//load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( './relaxing-garden.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
  console.log('okay');
});
})


// add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

// add some lights to the scene
// try commenting these out to see how each of them affect the image
let directionalLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1);
directionalLight.position.set(5, 2, 3);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);
directionalLight.castShadow = true;
//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default

//add the floor
let floorGeo = new THREE.BoxGeometry(6, 0.2, 10);
let floorMat = new THREE.MeshPhongMaterial({ map: myVideoTexture });
let floorMesh = new THREE.Mesh(floorGeo, floorMat);
floorMesh.position.set(0, -3, 0);
floorMesh.receiveShadow = true;
scene.add(floorMesh)

// add the backwall
let floorGeo2 = new THREE.BoxGeometry(0.2, 6, 5);
let floorMat2 = new THREE.MeshPhongMaterial( { map: myTexture } );
let floorMesh2 = new THREE.Mesh(floorGeo2, floorMat2);
floorMesh2.position.set(-3, 0, 2.5);
floorMesh2.receiveShadow = true;
scene.add(floorMesh2);

// add light
let ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.5);
scene.add(ambientLight);

function loadModel() {
  // first create a loader
  let loader = new GLTFLoader();

  // then load the file and add it to your scene
  loader.load("./olive_tree.glb", function (olive_tree) {
    scene.add(olive_tree.scene);
    olive_tree.scene.position.set(0,-2.8,3);
  })
  // then load the file and add it to your scene
  loader.load("./chair.glb", function (chair) {
    scene.add(chair.scene);
    chair.scene.position.set(0,-2.8,0.5);
    chair.scene.rotation.set(0,2,0);
  
  })
  // then load the file and add it to your scene
  loader.load("./window.glb", function (window) {
    scene.add(window.scene);
    window.scene.position.set(0, -2, 0);
    window.scene.scale.set(0.01,0.01,0.01);
    window.scene.rotation.set(0,0,0);
    window.castShadow = true; 
  });
}

function loop() {
  // add some movement
  

  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}
loop();
loadModel();