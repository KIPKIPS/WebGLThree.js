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
    renderer.setClearColor(0xAAAAAA, 1.0);

    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.bottom = "0px";
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
//场景的加载
var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(100, 100, 200);
    scene.add(light);
    light = new THREE.PointLight(0xFFFFFF);
    light.position.set(0, 0, 300);
    scene.add(light);
}

var texture=null;
function initObject() {
    //纹理贴图映射到一个矩形平面上
    var geometry = new THREE.PlaneGeometry(400, 400);//矩形平面
    //TextureLoader创建一个纹理加载器对象,可以加载图片作为几何体纹理
    var textureLoader = new THREE.TextureLoader();
    //执行load方法,加载纹理贴图成功后,返回一个纹理对象Texture
    textureLoader.load(
        '../../static/三角函数.png',
        function (t) {
            texture = t;
            texture.wrapT =texture.wrapS=THREE.RepeatWrapping//设置默认纹理回环(简单重复)1000
            //纹理回环的类型
            //texture.wrapT = texture.wrapS = THREE.ClampToEdgeWrapping;//边缘拉伸1001
            //texture.wrapT = texture.wrapS = THREE.MirroredRepeatWrapping//镜像重复1002

            var material = new THREE.MeshBasicMaterial({
                //color: 0x0000ff,
                //设置颜色纹理贴图:Texture对象作为材质map属性的属性值
                map: texture,//设置颜色贴图属性值
            });
            var mesh = new THREE.Mesh(geometry, material);//网格模型对象Mesh
            scene.add(mesh);//网格模型添加到场景中
        });
}
var param;
function CreateGUI() {
    var paramObj = function () {
        this.repeat = 1;//纹理重复
        this.wrap = 1;//纹理回环
    }
    param = new paramObj();
    var gui = new dat.GUI;
    gui.add(param, "repeat", 0, 10).name("纹理重复");
    gui.add(param, "wrap", 1000, 1002).name("纹理回环").step(1);
}
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    CreateGUI();
    animation();
}
function animation() {
    stats.begin();
    Change();
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    stats.end();
    
}
function Change(){
    if (texture!=null) {
        texture.repeat.x=texture.repeat.y=param.repeat;
        texture.wrapS=texture.wrapT=param.wrap
        texture.offset.x+=0.01
        texture.offset.y += 0.01
        texture.needsUpdate=true//需要更新纹理,纹理缓存在显存中,若不更新,新的纹理不会更新显存中的数据
    }
}

//窗口尺寸自适应
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);//重设渲染器宽高比
    camera.aspect = window.innerWidth / window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}