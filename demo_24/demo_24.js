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

