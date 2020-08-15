var scene=new THREE.Scene();//场景

var camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,20);
//透视相机,参数含义(可视角度,宽高比,近切面,远切面)
//fov 可视角度 field of view

var render=new THREE.WebGLRenderer();//渲染器

render.setSize(window.innerWidth,window.innerHeight);//为渲染器设置尺寸
//render.domElement本质上是一个HTML的canvas组件
document.body.appendChild(render.domElement);//在body上添加子组件,即渲染器渲染的canvas
render.render(scene,camera);//使用创建的相机和场景进行渲染

//生成物体
var geometry=new THREE.BoxGeometry(5,5,5);//创建立方体,长宽高,物体的结构
var material = new THREE.MeshNormalMaterial({wireframe:false})//设置材质
var mesh=new THREE.Mesh(geometry,material);//渲染出来的可以控制的物体对象

scene.add(mesh);//将物体放入场景
camera.position.z=10;
//render.render(scene,camera);//使用创建的相机和场景进行渲染
render.setClearColor(0xffffff)//为渲染器设置颜色
function animate(){
    mesh.rotation.x+=0.01
    mesh.rotation.y+=0.01
    requestAnimationFrame(animate);//循环调用animate函数
    render.render(scene,camera);//使用创建的相机和场景进行渲染
}
animate();

//窗口尺寸自适应
window.onresize=function(){
    render.setSize(window.innerWidth,window.innerHeight);//重设渲染器宽高比
    camera.aspect=window.innerWidth/window.innerHeight;//重设相机宽高比
    camera.updateProjectionMatrix();// 重新计算投影矩阵
}