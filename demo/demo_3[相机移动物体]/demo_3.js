//性能监控
var stats;

var renderer;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.right = "0px";
    document.getElementById("canvas-frame").appendChild(stats.domElement);
}

var camera;
function initCamera() {
    //camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);//透视投影相机
    camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 10, 1000);//正交投影相机
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 600;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(0, 0, 0);
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.AmbientLight(0xFF0000);
    light.position.set(100, 100, 200);
    scene.add(light);
    light = new THREE.PointLight(0x00FF00);
    light.position.set(0, 0, 300);
    scene.add(light);
}

var cube;
var mesh = new THREE.Mesh();
function initObject() {
    var geometry = new THREE.CylinderGeometry(100, 150, 400);
    var material = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
    mesh.geometry = geometry;
    mesh.material = material;
    mesh.position = new THREE.Vector3(0, 0, 0);
    scene.add(mesh);
}
function initTween(){
    new TWEEN.Tween(mesh.position).to({x:500},500).repeat(Infinity).start();
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initTween();
    animation();

}
function animation() {
    stats.begin();

    //mesh.position.x -= 1;
    //console.log(mesh.rotation)
    // mesh.rotation.x -= 0.05
    // mesh.rotation.y -= 0.05
    // mesh.rotation.z -= 0.05
    renderer.render(scene, camera);
    TWEEN.update()
    stats.end();

    requestAnimationFrame(animation);
}

//窗口尺寸自适应
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);//重设渲染器宽高比
    camera.aspect = window.innerWidth / window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}