/// <reference path="../js/three.js"/>
var container1, container2, container3, container4;
var scene, renderer;
var renderer1, renderer2, renderer3, renderer4;
var light;
function draw() {
    container1 = document.getElementById("container1");
    container2 = document.getElementById("container2");
    container3 = document.getElementById("container3");
    container4 = document.getElementById("container4");
    initRenderer();
    initScene();
    initCamera();
    initObject();
    animate();
}
function animate() {
    render();
    stats.update();
    requestAnimationFrame(animate);
}
function initRenderer() {
    renderer1 = new THREE.WebGLRenderer({ antialias: true });
    renderer1.setSize(500, 250);
    renderer2 = new THREE.WebGLRenderer({ antialias: true });
    renderer2.setSize(500, 250);
    renderer3 = new THREE.WebGLRenderer({ antialias: true });
    renderer3.setSize(500, 250);
    renderer4 = new THREE.WebGLRenderer({ antialias: true });
    renderer4.setSize(500, 250);

    container1.appendChild(renderer1.domElement);
    container2.appendChild(renderer2.domElement);
    container3.appendChild(renderer3.domElement);
    container4.appendChild(renderer4.domElement);
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "0px";

    container1.appendChild(stats.domElement);
}
function initScene() {
    scene = new THREE.Scene();
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1).normalize();
    scene.add(light);
}
function initCamera() {
    camera1 = new THREE.PerspectiveCamera(45, 500 / 250, 1, 10000);
    camera1.setViewOffset(500, 250, 0, 0, 500, 250);
    camera1.position.z = 1800;

    camera2 = new THREE.PerspectiveCamera(45, 500 / 250, 1, 10000);
    camera2.setViewOffset(500, 250, 0, 0, 500, 250);
    camera2.position.x = 1800;

    camera3 = new THREE.PerspectiveCamera(65, 500 / 250, 1, 10000);
    camera3.setViewOffset(500, 250, 0, 0, 500, 250);
    camera3.position.y = 3000;
    camera3.up.set(0, 0, 1);

    camera4 = new THREE.PerspectiveCamera(45, 500 / 250, 1, 10000);
    camera4.setViewOffset(500, 250, 0, 0, 500, 250);
    camera4.position.z = 800;
    camera4.position.x = 300;
}
function initObject() {
    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;

    var context = canvas.getContext("2d");
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0.1, "rgba(210,210,210,1)");
    gradient.addColorStop(1, "rgba(255,255,255,1)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    var shadowTexture = new THREE.Texture(canvas);
    shadowTexture.needsUpdate = true;

    var shadowMaterial = new THREE.MeshBasicMaterial({
        map: shadowTexture
    });
    var shadowGeo = new THREE.PlaneGeometry(300, 300, 1, 1);

    mesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    mesh.position.y = -250;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    mesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    mesh.position.x = -400;
    mesh.position.y = -250;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);    

    mesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    mesh.position.x = 400;
    mesh.position.y = -250;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    
    var faceIndices = ["a", "b", "c", "d"];
    var color, f1, f2, f3, p, n, vertexIndex, radius = 200,
        geometry1 = new THREE.IcosahedronGeometry(radius, 1),
        geometry2 = new THREE.IcosahedronGeometry(radius, 1),
        geometry3 = new THREE.IcosahedronGeometry(radius, 1);
    for (var i = 0; i < geometry1.faces.length; i++) {
        f1 = geometry1.faces[i];
        f2 = geometry2.faces[i];
        f3 = geometry3.faces[i];

        n = (f1 instanceof THREE.Face3) ? 3 : 4;
        for (var j = 0; j < n; j++) {
            vertexIndex = f1[faceIndices[j]];
            p = geometry1.vertices[vertexIndex];
            color = new THREE.Color(0xffffff);
            color.setHSL((p.y / radius + 1) / 2, 1, 1);
            f1.vertexColors[j] = color;

            color = new THREE.Color(0xffffff);
            color.setHSL(0, (p.y / radius + 1) / 2, 1, 1);
            f2.vertexColors[j] = color;

            color = new THREE.Color(0xffffff);
            color.setHSL(0.125 * vertexIndex / geometry1.vertices.length, 1, 1);
            f3.vertexColors[j] = color;
        }
    }
    var material = new THREE.MeshLambertMaterial({
        vertexColors: THREE.VertexColors,
        //color:0x00FF00,
        side: THREE.DoubleSide,//表示材质的两面都会渲染 FrontSide只渲染前面 BackSide只渲染后面
        wireframe: false,//该参数的含义为显示线框
    });
    group1=new THREE.Mesh(geometry1,material);
    group1.position.x=-400;
    group1.rotation.x=-1.87;
    scene.add(group1);

    group2 = new THREE.Mesh(geometry2, material);
    group2.position.x = 400;
    group2.rotation.x = 0;
    scene.add(group2);

    group3 = new THREE.Mesh(geometry3, material);
    group3.position.x = 0;
    group3.rotation.x = 0;
    scene.add(group3);
}
function render() {
    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(scene.position);
    camera4.lookAt(scene.position);

    renderer1.render(scene, camera1);
    renderer2.render(scene, camera2);
    renderer3.render(scene, camera4);
    renderer4.render(scene, camera4);
}