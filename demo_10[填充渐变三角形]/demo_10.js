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
    camera.position.z = -600;
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
var geometry;
function initObject() {
    geometry=new THREE.Geometry();//自定义几何体
    var material=new THREE.MeshBasicMaterial({
            vertexColors:THREE.VertexColors,
            //color:0x00FF00,
        side: THREE.DoubleSide,//表示材质的两面都会渲染 FrontSide只渲染前面 BackSide只渲染后面
            wireframe: false,//该参数的含义为显示线框
    });
    var color1 = new THREE.Color(0xFF0000);
    var color2 = new THREE.Color(0x00FF00);
    var color3 = new THREE.Color(0x0000FF);

    //定义顶点
    var p1=new THREE.Vector3(0,0,0);
    var p2=new THREE.Vector3(0,200,0);
    var p3=new THREE.Vector3(200,0,0);

    //将顶点放置到自定义几何体空间中
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.vertices.push(p3);

    //新建面片
    var face=new THREE.Face3(0,1,2)
    //为面片顶点添加颜色
    face.vertexColors[0] = color1;
    face.vertexColors[1] = color2;
    face.vertexColors[2] = color3;

    geometry.faces.push(face)
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