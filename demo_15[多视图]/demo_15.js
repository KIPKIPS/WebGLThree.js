var container1, container2, container3, container4;
var scene, renderer;
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
    status.update();
    requestAnimationFrame(animate);
}