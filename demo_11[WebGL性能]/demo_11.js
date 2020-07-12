//性能监控
var stats;
//场景的加载
var scene;
function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500)
    scene.add(new THREE.AmbientLight(0x444444))
}
//初始化,主要是设置渲染器,屏幕宽高
var renderer;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setSize(width, height);
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.gammaInput=true;
    renderer.gammaOutput=true;

    document.getElementById('canvas-frame').appendChild(renderer.domElement);
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
    camera = new THREE.PerspectiveCamera(27, width / height, 1, 3500);//透视投影相机
    // camera.position.x = 0;
    // camera.position.y = 0;
    camera.position.z = 2750;
    // camera.up.x = 0;
    // camera.up.y = 1;
    // camera.up.z = 0;
    // camera.lookAt(0, 0, 0);
}
//灯光
var light1;
var light2;
function initLight() {
    light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    light2 = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);
}
var mesh;
function initObject() {
    var triangles = 1000000;
    var geometry = new THREE.BufferGeometry();
    //顶点数组,三角形个数x每个三角形三个顶点x每个顶点三个分量(xyz)
    var positions = new Float32Array(triangles * 3 * 3);
    //顶点法线数组
    var normals = new Float32Array(triangles * 3 * 3);
    //顶点颜色数组
    var colors = new Float32Array(triangles * 3 * 3);
    var color = new THREE.Color();
    var n = 800, n2 = n / 2;//三角形的限定位置
    var d = 10, d2 = d / 2;//三角形的大小
    var pointA = new THREE.Vector3();
    var pointB = new THREE.Vector3();
    var pointC = new THREE.Vector3();

    var cb = new THREE.Vector3();//向量
    var ab = new THREE.Vector3();

    var material;
    //每次创建三角形三个点的数据,即九个数值
    for (var i = 0; i < positions.length; i += 9) {
        //随机数区间 -400到400之间
        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;
        //随机数区间 -6到6之间
        var ax = x + Math.random() * d - d2;
        var ay = y + Math.random() * d - d2;
        var az = z + Math.random() * d - d2;
        var bx = x + Math.random() * d - d2;
        var by = y + Math.random() * d - d2;
        var bz = z + Math.random() * d - d2;
        var cx = x + Math.random() * d - d2;
        var cy = y + Math.random() * d - d2;
        var cz = z + Math.random() * d - d2;
        //A
        positions[i] = ax;
        positions[i + 1] = ay;
        positions[i + 2] = az;
        //B
        positions[i + 3] = bx;
        positions[i + 4] = by;
        positions[i + 5] = bz;
        //C
        positions[i + 6] = cx;
        positions[i + 7] = cy;
        positions[i + 8] = cz;
        //为ABC三个点设置数据
        pointA.set(ax, ay, az);
        pointB.set(bx, by, bz);
        pointC.set(cx, cy, cz);
        //计算法向量
        //先得到三角形两条边的向量
        cb.subVectors(pointC, pointB);
        ab.subVectors(pointA, pointB);
        cb.cross(ab).normalize();;//叉乘计算法向量,归一化
        //法向量数组赋值
        //A点的法向量
        normals[i] = cb.x;
        normals[i + 1] = cb.y;
        normals[i + 2] = cb.z;
        //B点的法向量
        normals[i + 3] = cb.x;
        normals[i + 4] = cb.y;
        normals[i + 5] = cb.z;
        //C点的法向量
        normals[i + 6] = cb.x;
        normals[i + 7] = cb.y;
        normals[i + 8] = cb.z;
        //color
        //x为随机产生的数值-400到400,n为800,x/n为-0.5到0.5,再加上0.5即为0到1 RGB分量
        var vx = (x / n) + 0.5;
        var vy = (y / n) + 0.5;
        var vz = (z / n) + 0.5;
        color.setRGB(vx, vy, vz);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        colors[i + 3] = color.r;
        colors[i + 4] = color.g;
        colors[i + 5] = color.b;
        colors[i + 6] = color.r;
        colors[i + 7] = color.g;
        colors[i + 8] = color.b;
    }
    //为几何体添加属性
    //addAttriibute方法的第一个参数为属性的类型,第二个参数为自定义的属性值
    geometry.addAttribute("position",new THREE.BufferAttribute(positions,3));
    geometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));

    //计算包围盒
    //geometry.computeBoundingSphere();
    material=new THREE.MeshPhongMaterial({
        color:0xaaaaaa,
        specular:0xffffff,
        shininess:100,
        side:THREE.DoubleSide,
        vertexColors: THREE.VertexColors,
    });
    mesh=new THREE.Mesh(geometry,material);
    scene.add(mesh);

}

function threeStart() {
    
    initScene();
    initThree();
    initCamera();
    initLight();
    initObject();
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    var time = Date.now() * 0.001;
    mesh.rotation.y = time * 0.5
    renderer.render(scene, camera);
    stats.update();

}

//窗口尺寸自适应
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);//重设渲染器宽高比
    camera.aspect = window.innerWidth / window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}