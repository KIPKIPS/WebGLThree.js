/// <reference path="../js/three.js"/>
//import * as THREE from '../js/three.module.js';
function init() {
    initReneder();
    initCamera();
    initScene();
    initLight();

    initObject();
    initGrid();
    animate();
}
//渲染器
var renderer;
function initReneder() {
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
    camera.position.x = 200;
    camera.position.y = 300;
    camera.position.z = 1000;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 0;
    camera.lookAt(0, 0, 0);
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
var mesh;
var group;
function initObject() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    for (let i = 0; i < geometry.faces.length; i += 2) {
        var hex = Math.random() * 0xffffff;//随机颜色
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);
    }
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position = new THREE.Vector3(0, 0, 0);

    //不同于平时的绕几何体几何中心的旋转
    //在这一步多加一个组对象,旋转组对象即可,改变物体在组对象的相对位置
    group = new THREE.Group();
    group.add(mesh);
    mesh.translateX(-50);
    mesh.translateY(-50);
    mesh.translateZ(50);

    group.translateX(500);
    group.translateY(50);
    group.translateZ(50);

    scene.add(group);
}

//辅助线
function initGrid() {
    //参数代表网格的长宽和每一行分多少份
    var helper = new THREE.GridHelper(window.innerWidth, 20, 0xff00ff);
    //helper.setColors(0x000fff, 0x808080);
    scene.add(helper);
}

//帧循环
function animate() {
    group.rotateY(0.1);
    mesh.rotateX(0.1);
    //mesh.rotateY(Math.PI);
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}