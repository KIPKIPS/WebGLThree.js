var renderer, camera, scene, gui, stats, ambientLight, directionalLight, control;

function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //渲染器渲染阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 100, 200);
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
    var manager=new THREE.LoadingManager();
    var texture=new THREE.Texture();
    var texture2 = new THREE.Texture();
    var loader=new THREE.ImageLoader(manager);
    loader.load("../js/models/obj/01_-_Default1noCulling.JPG",function(image){
        texture.image=image;
        texture.needsUpdate=true;
    });
    loader.load("../js/models/obj/02_-_Default1noCulling.JPG", function (image) {
        texture2.image = image;
        texture2.needsUpdate = true;
    });
    var i=0;
    //创建OBJ加载器
    var objLoader = new THREE.OBJLoader(manager);
    objLoader.load('../js/models/obj/female02.obj',
        //onload函数
        function (object) {
            //添加阴影
            //traverse函数会遍历自身向下的所有子节点
            object.traverse(function (item) {
                if (item instanceof THREE.Mesh) {
                    if (i%2==0) {
                        item.material.map=texture;
                    }
                    else{
                        item.material.map = texture2;
                    }
                    i++;
                    item.castShadow = true;
                    item.receiveShadow = true;
                }
            });
            //缩放
            object.scale.set(.3, .3, .3);
            scene.add(object);
        })

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