//import * as THREE from '../js/three.module.js';
var renderer, camera, scene, gui, stats, ambientLight, directionalLight, control, parent, body;
function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //渲染器渲染阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 100, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function initScene() {
    scene = new THREE.Scene();
}

function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {};

    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

function initLight() {
    ambientLight = new THREE.AmbientLight("#ffffff");
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight("#ffffff");
    directionalLight.position.set(40, 60, 10);

    directionalLight.shadow.camera.near = 1; //产生阴影的最近距离
    directionalLight.shadow.camera.far = 400; //产生阴影的最远距离
    directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
    directionalLight.shadow.camera.right = 50; //最右边
    directionalLight.shadow.camera.top = 50; //最上边
    directionalLight.shadow.camera.bottom = -50; //最下面

    //这两个值决定生成阴影密度 默认512
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.mapSize.width = 1024;

    //平行光开启阴影投射
    directionalLight.castShadow = true;

    scene.add(directionalLight);
}

function initModel() {
    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -.1;
    plane.receiveShadow = true; //可以接收阴影
    scene.add(plane);
    //创建OBJ加载器
    var objLoader = new THREE.OBJLoader();
    body = new THREE.Group();
    objLoader.setPath('../js/models/obj/');
    parent = new THREE.Group();
    objLoader.load('female02.obj', function (object) {
        //onload函数
        object.scale.set(0.3, 0.3, 0.3)
        //设置材质
        for (let i = 0; i < object.children.length; i++) {
            var child = object.children[i]
            var grid = new THREE.Points(child.geometry, new THREE.PointsMaterial({
                color: 0x023ac0,
                size: 0.5,
            }));
            body.add(grid)
        }
        parent.add(body);
        body.position.y = -83.5;
        parent.position.y = 83.5;
        scene.add(parent);
    });
}

//粒子动画
function createMesh(originalGeometry, scene, scale, x, y, z, color, dynamic) {
    //获取顶点位置
    var vertices = originalGeometry.vertices; //顶点数组
    var vLength = vertices.length; //顶点数组长度

    //几何体对象
    var geometry = new THREE.Geometry();
    //存放几何体顶点和相关属性的数组
    var vertices_tmp = [];//x,y,z,down,up
    for (var i = 0; i < vLength; i++) {
        var p = vertices[i];
        geometry.vertices[i] = p.clone();

        vertices_tmp[i] = [p.x, p.y, p.z, 0, 0];
    }
    //处理模型由上到下的坍塌动画,静态动态物体

    //初始化参数

    //管理对象
}

function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function initControl() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    control.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    //更新控制器
    render();
    // parent.rotation.x+=0.01;
    // parent.rotation.y += 0.01;
    // parent.rotation.z += 0.01;
    //更新性能插件
    stats.update();

    requestAnimationFrame(animate);
}

function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initStats();

    initControl();

    animate();
    window.onresize = onWindowResize;
}