//TODO:粒子系统_人物模型粒子化
//import * as THREE from '../js/three.module.js';
var renderer, camera, scene, gui, stats, ambientLight, directionalLight, control, parent;
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
    camera.position.set(0, 100, 2000);
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
    //console.log(planeGeometry)
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2;
    plane.receiveShadow = true; //可以接收阴影
    //创建OBJ加载器
    var objLoader = new THREE.OBJLoader();
    objLoader.setPath('../js/models/obj/');
    parent = new THREE.Group();
    objLoader.load('female02.obj', function (object) {
        //onload函数
        object.scale.set(0.3, 0.3, 0.3);
        colorRandom = [];
        for (let i = 0; i < 5; i++) {
            colorRandom.push(0xffffff * Math.random())
        }

        //设置材质
        for (let i = 0; i < object.children.length; i++) {
            var child = object.children[i]
            //顶点数组
            child.geometry.vertices = []
            for (let j = 0; j < child.geometry.attributes.position.count; j++) {
                var pos = child.geometry.attributes.position;
                child.geometry.vertices[j] = new THREE.Vector3(pos.getX(j), pos.getY(j), pos.getZ(j))
            }
            createMesh(child.geometry, scene, 2, 0, 0, 0, colorRandom, true)
            //body.add(grid)
        }
        parent.add(plane)
        parent.position.y = 0;
        scene.add(parent);
    });
}
var clonesMeshes = []
var meshes = []
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
    //模型的位置
    var clones = [
        [400, 0, 400],
        [-400, 0, -400],
        [-400, 0, 400],
        [400, 0, -400],
        [0, 0, 0],
    ]
    //处理模型由上到下的坍塌动画,静态动态物体
    if (dynamic) {
        for (let i = 0; i < clones.length; i++) {
            c = color[i];
            mesh = new THREE.Points(geometry, new THREE.PointsMaterial({
                color: c, size: 5,
            }));
            mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
            mesh.position.x = x + clones[i][0];
            mesh.position.y = y + clones[i][1];
            mesh.position.z = z + clones[i][2];
            parent.add(mesh);
            //管理对象
            clonesMeshes.push({ mesh: mesh, speed: 0.5 + Math.random() });
        }
    }
    else {
        mesh = new THREE.Points(geometry, new THREE.PointsMaterial({
            color: color, size: 1,
        }));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        parent.add(mesh);
    }
    //初始化参数
    meshes.push({
        mesh: mesh,
        vertices: geometry.vertices,
        vertices_tmp: vertices_tmp,
        vLength: vLength,
        down: 0,
        up: 0,
        speed: 80,
        delay: Math.floor(200 + 200 * Math.random()),
        started: false,
        start: 100, //各部分开始崩塌的时间
        dynamic: dynamic,
        direction: 0,
    });
}

function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function initControl() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
}
var clock = new THREE.Clock()
var index = 0
function render() {
    //计算每一帧的时间
    var delta = clock.getDelta();
    var delta = delta < 2 ? delta : 2;
    parent.rotation.y += -0.5 * delta;
    //根据动态还是静态来计算模型顶点位置
    for (index = 0; index < meshes.length; index++) {
        data = meshes[index];
        mesh = data.mesh;
        vertices = data.vertices;
        vertices_tmp = data.vertices_tmp;
        vLength = data.vLength;
        if (data.dynamic == false) {
            continue;
        }
        //最开始,没有移动,设置向下移动
        if (data.start > 0) {
            data.start -= 1;
        }
        else {
            //开始动画
            if (!data.started) {
                data.direction = -1;
                data.started = true;
            }
        }
        //移动每一个顶点
        for (var i = 0; i < vLength; i++) {
            var p = vertices[i];
            var vt = vertices_tmp[i];
            if (data.direction < 0) {
                if (p.y > 0) {
                    //在每一个时间片段-0.5 ~ +0.5,左右移动 
                    //1.5扩散范围,100左右类似爆破效果
                    p.x += 1.5 * (0.5 - Math.random()) * data.speed * delta;
                    //向下的概率大于向上的概率,总体趋势向下
                    p.y += 3 * (0.15 - Math.random()) * data.speed * delta;
                    p.z += 1.5 * (0.5 - Math.random()) * data.speed * delta;
                }
                else {
                    if (!vt[3]) { //0代表向下
                        vt[3] = 1;
                        data.down += 1;
                    }
                }
            }
            if (data.direction > 0) {
                var d = Math.abs(p.x - vt[0]) + Math.abs(p.y - vt[1]) + Math.abs(p.z - vt[2]);
                if (d > 1) {
                    p.x += -(p.x - vt[0]) / d * data.speed * delta * (0.75 - Math.random());
                    p.y += -(p.y - vt[1]) / d * data.speed * delta * (1 + Math.random());
                    p.z += -(p.z - vt[2]) / d * data.speed * delta * (0.75 - Math.random());
                }
                else {
                    if (!vt[4]) {
                        vt[4] = 1;
                        data.up += 1;
                    }
                }
            }
        }
        //初始化数据
        if (data.down === vLength) {
            if (data.delay === 0) {
                data.direction = 1;
                data.speed = 80;
                data.down = 0;
                data.delay = 300;
                for (let i = 0; i < vLength; i++) {
                    vertices_tmp[i][3] = 0;
                }
            }
            else {
                data.delay -= 1;
            }
        }
        if (data.up === vLength) {
            if (data.delay === 0) {
                data.direction = -1;
                data.speed = 80;
                data.up = 0;
                data.delay = 300;
                for (let i = 0; i < vLength; i++) {
                    vertices_tmp[i][4] = 0;
                }
            }
            else {
                data.delay -= 1;
            }
        }
        //这个参数设置为true,GPU才会去刷新顶点的位置
        mesh.geometry.verticesNeedUpdate = true;
    }
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
    //更新性能插件
    stats.update();

    requestAnimationFrame(animate);
}
//初始化函数
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