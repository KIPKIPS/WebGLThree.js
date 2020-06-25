var p1 = new THREE.Vector3(10, 8, 12);
var p2 = new THREE.Vector3(20, 30, -10);

//向量的clone方法会直接克隆一份原来的对象,这样就不会修改原向量的值
var L = p1.clone().sub(p2)
console.log(L)
console.log(L.length(), L, p1)

//方法二copy方法
//相对于重新创建一个v3类型的对象,将p1的值copy到p3中,太阳不会改变p1的值
var p3 = new THREE.Vector3()
p3.copy(p1)
console.log(p1, p3)

//向量的叉乘(几何意义:得到两向量决定的平面的法向量)
var p4 = new THREE.Vector3(1, 2, 3)
var p5 = new THREE.Vector3(5, 5, 5)
//console.log(p4.cross(p5),p4)//会改变p4的值
p4.clone().cross(p5)//不会改变p4
var p6 = new THREE.Vector3()
p6.crossVectors(p4, p5);//不会改变p4的值,将p4和p5叉乘的值赋予p6

//TODO:表面积的计算
var obj = new THREE.SphereGeometry(100, 100, 100);//参数代表球体细分数
SurfaceArea(obj);
function SurfaceArea(o) {
    var area = 0;
    //遍历模型的三角形片面(obj.geometry.faces)数量
    for (var i = 0; i < o.faces.length; i++) {
        //取三角形片元的三个顶点索引
        var a = o.faces[i].a;
        var b = o.faces[i].b;
        var c = o.faces[i].c;
        //获取顶点坐标
        var p1 = o.vertices[a];
        var p2 = o.vertices[b];
        var p3 = o.vertices[c];
        area += AreaOfTriangle(p1, p2, p3);
    }
    console.log(area);
}

//三角形的面积计算公式 S=(a x b)/2 其中a为三角形的边向量a->b,b为a->c向量,二者叉乘的向量求模长除以2即为三角形面积
function AreaOfTriangle(p1, p2, p3) {
    var v1 = new THREE.Vector3()
    var v2 = new THREE.Vector3()
    //得到三角形两条边的向量
    v1 = p1.clone().sub(p2);
    v2 = p1.clone().sub(p3);
    //两向量进行叉乘运算
    var v3 = new THREE.Vector3();
    v3.crossVectors(v1, v2);

    //面积计算
    var s = v3.length() / 2;
    return s;
}
//TODO:矩阵
var mat4_1=new THREE.Matrix4();
mat4_1.set(
    1,0,0,0,
    0,2,0,0,
    0,0,3,0,
    0,0,0,4,
)
var mat4_2=new THREE.Matrix4();
mat4_2.set(
    4,0,0,0,
    0,3,0,0,
    0,0,2,0,
    0,0,0,1,
)
//mat4_1.multiply(mat4_2) //mat4_1 x mat4_2矩阵相乘,结果保存在mat4_1中
//mat4_1.premultiply(mat4_2) //mat4_2 x mat4_1,结果保存在mat4_1中
var mat4_3=new THREE.Matrix4();
mat4_3.multiplyMatrices(mat4_1,mat4_2) //mat4_1 x mat4_2矩阵相乘,结果保存在mat4_3中
console.log(mat4_3)

var mat4_4=new THREE.Matrix4();
mat4_4.getInverse(mat4_1)//求mat4_1的逆矩阵,结果保存在mat4_4中
console.log(mat4_4)

//矩阵行列式
var det=mat4_4.determinant()//矩阵求行列式
console.log(det)