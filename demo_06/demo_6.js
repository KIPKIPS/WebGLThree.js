//TODO:光源
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
    stats.domElement.style.bottom = "0px";
    stats.domElement.style.height = "50px";
    document.getElementById("canvas-frame").appendChild(stats.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);//透视投影相机
    //camera = new THREE.OrthographicCamera(-window.innerWidth /2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight /2, 10, 10000);//正交投影相机
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
var paramLight;
function initLight() {
    var paramObj=function(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.decay=0;
        this.intensity=1;
    }
    paramLight=new paramObj();
    var gui=new dat.GUI;
    gui.add(paramLight,"x",-10000,10000).name("环境光X");
    gui.add(paramLight,"y",-10000,10000).name("环境光Y");
    gui.add(paramLight,"z",-10000,10000).name("环境光Z");
    gui.add(paramLight,"decay",0,1).name("衰减系数");
    gui.add(paramLight,"intensity",0,1).name("光照强度");

    //light = new THREE.AmbientLight(0xFFFF00);
    //light = new THREE.DirectionalLight(0xFFFFFF,1);
    //light = new THREE.AreaLight(0xFFFF00);
    //light = new THREE.SpotLight(0xFFFF00);
    light = new THREE.PointLight(0xFFFFFF,paramLight.intensity,10000,paramLight.decay);
    //light.position.set(0, 0, 0);
    //scene.add(light);
    //light = new THREE.PointLight(0x00FF00);
    light.position.set(paramLight.x, paramLight.y, paramLight.z);
    scene.add(light);
}
var mesh;
function initObject() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF});
    mesh=new THREE.Mesh(geometry,material)
    mesh.position=new THREE.Vector3(0,0,0);
    scene.add(mesh);
}
function initTween(){
    //new TWEEN.Tween(mesh.position).to({x:500},4000).repeat(3).start();
    new TWEEN.Tween(mesh.rotation).to({y:360,z:360,x:360},1000000).repeat(Infinity).start();
}
var param;
function CreateGUI(){
    var paramObj=function(){
        this.fov=45;
    }
    param=new paramObj();
    var gui=new dat.GUI;
    gui.add(param,"fov",0,180).name("视角大小");
}
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initTween();
    CreateGUI();
    animation();
}
function animation() {
    stats.begin();
    light.position.set(paramLight.x, paramLight.y, paramLight.z);
    light.decay=paramLight.decay;
    light.intensity=paramLight.intensity;
    ChangeFov();
    //mesh.position.x -= 1;
    //console.log(mesh.rotation)
    TWEEN.update()
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animation);
}

//窗口尺寸自适应
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);//重设渲染器宽高比
    camera.aspect = window.innerWidth / window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}
function ChangeFov(){
    camera.fov=param.fov;
    camera.updateProjectionMatrix();
}
function SetLightColor(color){
    console.log(color.toHex());
    light.color.setHex("0x"+color.toHex());
}