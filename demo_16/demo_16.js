//TODO:鼠标交互
/// <reference path="../js/three.js" />
//import * as THREE from '../js/three.module.js';
var container;
var scene, raycaster, camera, renderer;
var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100, theta = 0;
function draw() {
    container = document.createElement("div");
    document.body.appendChild(container);

    var info = document.createElement("div");
    info.style.position = "absolute";
    info.style.top = "10px";
    info.style.width = "100%";
    info.style.textAlign = "center";
    info.innerHTML = "demo16_鼠标交互拾取物体";
    container.appendChild(info);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    scene = new THREE.Scene();

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var geometry = new THREE.BoxGeometry(20, 20, 20);
    for (var i = 0; i < 2000; i++) {
        var obj = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
        obj.position.x = Math.random() * 800 - 400;
        obj.position.y = Math.random() * 800 - 400;
        obj.position.z = Math.random() * 800 - 400;

        obj.rotation.x = Math.random() * 2 * Math.PI;
        obj.rotation.y = Math.random() * 2 * Math.PI;
        obj.rotation.z = Math.random() * 2 * Math.PI;

        obj.scale.x = Math.random() + 0.5;
        obj.scale.y = Math.random() + 0.5;
        obj.scale.z = Math.random() + 0.5;
        scene.add(obj);
    }

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);

    document.addEventListener("mousemove", onDocumentMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
    event.preventDefault();
    //通过鼠标点击的位置计算出射线所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
function render() {
    theta += 0.1;
    // renderer.render(scene, camera);
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
    camera.lookAt(scene.position)

    camera.updateMatrixWorld();
    //根据在屏幕的二维位置以及相机的矩阵更新射线的位置
    //第一个参数为归一化的设备坐标(xyz在-1到1之间),第二个参数光线起源的位置
    //得到一个由相机指向鼠标的光线
    raycaster.setFromCamera(mouse, camera);
    //参数为检测相交物体的数组
    //返回一个数组,为相交的对象的数组
    //增加第二个参数，可以遍历子子孙孙对象
    var intersects = raycaster.intersectObjects(scene.children, true);
    //intersects是返回的一个数组，如果当前位置没有可选中的对象，那这个数组为空，否则为多个对象组成的数组，排列顺序为距离屏幕的距离从近到远的顺序排列
    //数组的每一个子对象内包含:
    // distance：距离屏幕的距离
    // face：与射线相交的模型的面
    // faceIndex：与射线相交的模型的面的下标
    // object：与射线相交的模型对象
    // point：射线与模型相交的点的位置坐标
    // uv：与射线相交的模型的面的uv映射位置
    // if (intersects.length > 0) {
    //     if (INTERSECTED != intersects[0].object) {
    //         if (INTERSECTED){
    //             INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    //         } 
    //         console.log(INTERSECTED)
    //         INTERSECTED = intersects[0].object;
    //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //         INTERSECTED.material.emissive.setHex(0xff0000);
    //     }
    // }
    // else {
    //     if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    //     INTERSECTED = null;
    // }
    for (let i = 0; i < intersects.length; i++) {
        intersects[0].object.material.emissive.setHex(0xff00ff);//设置反射光,所以颜色看起来高亮些
        //intersects[0].object.material.color.set(0xff00ff);//设置材质色彩,根据光照呈现不同的色泽
    }
    renderer.render(scene, camera)
}