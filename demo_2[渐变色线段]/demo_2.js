//渐变色线段案例
//three.js中点的表示
// THREE.Vector3 = function (x, y, z) {
//     this.x = x || 0;
//     this.y = y || 0;
//     this.z = z || 0;
// };
// //创建点的方法
// //1
// var point1 = new THREE.Vecotr3(4, 8, 9);
// //2
// var point1 = new THREE.Vector3();
// point1.set(4, 8, 9);

//在场景中生成一条渐变色线段

//渲染器
var renderer;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: false,//设置为false可以提高渲染性能
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}
//相机
var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    camera.lookAt(0,0,0);
}
//创建场景
var scene;
function initScene() {
    scene = new THREE.Scene();
}

//灯光
var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}

//物体对象
var cube;
function initObject() {
    var geometry = new THREE.Geometry();//声明一个几何体,几何体的vertices变量可以用来存储点

    //定义一种线条的材质,使用THREE.LineBasicMaterial类型来定义,接受一个集合作为参数
    //集合的参数属性列表
    //Color:线条的颜色,用16进制来表示,默认的颜色是白色
    //Linewidth:线条的宽度,默认时候1个单位宽度
    //Linecap:线条两端的外观,默认是圆角端点,当线条较粗的时候才看得出效果,如果线条很细,那么你几乎看不出效果了
    //Linejoin:两个线条的连接点处的外观,默认是“round”,表示圆角
    //VertexColors:定义线条材质是否使用顶点颜色,这是一个boolean值意思是,线条各部分的颜色会根据顶点的颜色来进行插值
    //Fog:定义材质的颜色是否受全局雾效的影响
    var material = new THREE.LineBasicMaterial({ vertexColors: true });

    //线条两个端点的颜色
    var color1 = new THREE.Color(0/255,0,0,1),color2 = new THREE.Color(0xFF0000);

    // 线的材质可以由2点的颜色决定
    //设置坐标
    //module1
    // var p1 = new THREE.Vector3(0,0, 0);
    // var p2 = new THREE.Vector3(0,0,200);
    // geometry.vertices.push(p1);     
    // geometry.vertices.push(p2);
    // geometry.colors.push(color1, color2);//设置颜色
    // var line = new THREE.Line(geometry, material,THREE.LineBasicMaterial);

    //module_2
    var p1 = new THREE.Vector3(0,0, 0);
    var p2 = new THREE.Vector3(200,0,0);
    var p3 = new THREE.Vector3(100,0,100*Math.sqrt(3));
    geometry.vertices.push(p1);     
    geometry.vertices.push(p2);
    geometry.vertices.push(p3);
    geometry.vertices.push(p1);
    geometry.colors.push(
        new THREE.Color(0xFF0000),
        new THREE.Color(0x00FF00),
        new THREE.Color(0x0000FF),
        new THREE.Color(0xFF0000)
        );//设置颜色
    //至少需要四个点才能构成三角形
    var line = new THREE.Line(geometry, material,THREE.LineBasicMaterial);

    scene.add(line);
}

function CreateLine() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    renderer.clear();
    renderer.render(scene, camera);
}

//窗口尺寸自适应
window.onresize=function(){
    renderer.setSize(window.innerWidth,window.innerHeight);//重设渲染器宽高比
    camera.aspect=window.innerWidth/window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}
