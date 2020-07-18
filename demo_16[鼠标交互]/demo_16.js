    /// <reference path="../js/three.js" />
var container;
var scene, raycaster, camera, renderer;
var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;

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

        obj.scale.x=Math.random()+0.5;
        obj.scale.y=Math.random()+0.5;
        obj.scale.z=Math.random()+0.5;
        scene.add(obj);
    }

    raycaster=new THREE.Raycaster();

    renderer=new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.sortObjects=false;
    container.appendChild(renderer.domElement);

    document.addEventListener("mousemove",onDocumentMouseMove,false);
    window.addEventListener("resize",onWindowResize,false);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}
function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
}
function onDocumentMouseMove(event){
    event.preventDefault();
    mouse.x=(event.clientX/window.innerWidth)*2-1;
    mouse.y=-(event.clientY/window.innerHeight)*2+1;
}

function render() {
    theta+=0.1;
    // renderer.render(scene, camera);
    camera.position.x=radius*Math.sin(THREE.Math.degToRad(theta));
    camera.position.y=radius*Math.sin(THREE.Math.degToRad(theta));
    camera.position.z=radius*Math.cos(THREE.Math.degToRad(theta));
    camera.lookAt(scene.position)

    camera.updateMatrixWorld();

    raycaster.setFromCamera(mouse,camera);
    var intersects=raycaster.intersectObjects(scene.children);
    if (intersects.length>0) {
        if (INTERSECTED!=intersects[0].object) {
            if (INTERSECTED)INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED=intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
        }
    }
    else{
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED=null;
    }
    renderer.render(scene,camera)
}