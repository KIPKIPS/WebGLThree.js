//性能监控
var stats;

//初始化,主要是设置渲染器,屏幕宽高
var renderer;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xAAAAAA, 1.0);

    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.bottom = "0px";
    document.getElementById("canvas-frame").appendChild(stats.domElement);
}
//初始化相机
var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);//透视投影相机
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 600;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(0, 0, 0);
}
//场景的加载
var scene;
function initScene() {
    scene = new THREE.Scene();
}
//灯光
var light;
function initLight() {
    light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(100, 100, 200);
    scene.add(light);
    light = new THREE.PointLight(0xFFFFFF);
    light.position.set(0, 0, 300);
    scene.add(light);
}
var obj;
function initObject() {
    var geometry=new THREE.BoxGeometry(100,100,100);
    var material=new THREE.MeshBasicMaterial({
            vertexColors:THREE.VertexColors,
            color:0x00FF00,
            wireframe: true,//该参数的含义为显示线框
        });
    obj=new THREE.Mesh(geometry,material);
    scene.add(obj);
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    animation();
}
function animation() {
    stats.begin();
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    obj.rotation.y-=0.01;
    stats.end();
    
}

//窗口尺寸自适应
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);//重设渲染器宽高比
    camera.aspect = window.innerWidth / window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}