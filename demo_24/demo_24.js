//TODO:模拟柔性布料


//import * as THREE from '../js/three.module.js';
var container, stats;
var camera, scene, renderer;
var group;
var targetRotation = 0;
var targetRotationOnMoUseDown = 00
var windowHalfY = window.innerHeight / 2;
var circleShape,line,points;

function init() {
    //创建canvas画布
    container = document.createElement('div');
    document.body.appendChild(container);

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Simple procedurally generate 3D shapes<br/>Drag to spin';
    container.appendChild(info);

    //场景
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 500);
    scene.add(camera);

    //灯光
    var light = new THREE.PointLight(0xffffff, 0.8);
    camera.add(light);

    //组对象
    group = new THREE.Group();
    group.position.y = 50;
    scene.add(group);

    //贴图
    // var texture=THREE.ImageUtils.loadTexture("../images/joystick.png");
    // texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
    // texture.repeat.set(0.008,0.008);


    //创建一个自定义的形状
    //THREE.Line本质是一个mesh
    function addShape(shape, color, x, y,z, rx, ry, rz, s) {
        points = shape.createPointsGeometry(50);
        points.vertices.push(new THREE.Vector3(180, 0, 0))//把闭合点手动传入,使之成为闭合图形
        //参数列表 geometry 材质 模式 
        line = new THREE.Line(points, new THREE.LineBasicMaterial({
            color: color
        }))
        
        line.position.set(x, y, z - 25);
        line.rotation.set(rx, ry, rz);
        line.scale.set(s, s, s);
        group.add(line);
    }

    //circle
    var circleRadius = 180;
    circleShape = new THREE.Shape();
    circleShape.moveTo(circleRadius, 0);//移动点到这个坐标
    circleShape.quadraticCurveTo(0, circleRadius, -circleRadius, 0);//贝塞尔曲线(4个参数为起始点xy和终点xy坐标)
    //circleShape.vertices.push(new THREE.Vector3(180, 0,0))
    //参数列表 shape 颜色 图形位置,x,y,z 旋转 x,y,z 缩放
    addShape(circleShape, 0x00f000, 0, 0, 0, 0, 0, 0, 1);

    renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    container.appendChild(renderer.domElement);

    
}
animate();
function animate() {
    requestAnimationFrame(animate);
    if (renderer) {
        renderer.render(scene, camera);
    }
    else{
        console.log("render is undefined")
    }
    
}

