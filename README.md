### 安装three.js  
    1.npm `npm install three@0.106.2`  
    2.下载three.js文件拖入项目
### 基本组件
    1.场景 var scene = new THREE.Scene()
    2.相机
      (1)正交相机和透视相机(近大远小)
      (2)相机的属性
        <1>fov(field of view),可视角
        <2>近切面,远切面,相机视锥体的远近限制范围
        <3>aspect,宽高比,相机切面的宽高比例 w/h
    示例:
        
```js
//定义一个相机
var scene=new THREE.Scene();//场景

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,20);//透视投影相机
//透视相机,参数含义(可视角度,宽高比,近切面,远切面)
//fov 可视角度 field of view

var camera = new THREE.OrthographicCamera(-window.innerWidth /2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight /2, 10, 1000);//正交投影相机
//正交相机,参数含义(左边界,右边界,上边界,下边界,近切面,远切面)
```

        
    3.渲染器 主要作用是将场景显示到屏幕上 构造方法 var rende r= new THREE.WebGLRenderer();
    4.几何体(网格模型) 几何体是包围必要三维数据的数据结构,属性包含顶点数组 this.vertices,颜色信息 this.color,片面数据 this.faces
```js
    //声明和赋值
    var geometry=new THREE.Geometry();
    //geometry.vertices=[],是一个数组,值为顶点数据
    geometry.vertices.push(
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(-5,5,0),
    )
    var color1 = new THREE.Color(154/255,1,1,1),color2 = new THREE.Color(0xFF0000);//声明颜色信息
    geometry.colors.push(color1, color2);//为顶点设置颜色
    var line = new THREE.Line(geometry, material, THREE.LineSegments);//使用定义好的顶点坐标,材质信息来构造几何体
    scene.add(line);//将模型添加到场景中
 ```
    
### 矩阵

```js
    TODO:平移矩阵 表示一个顶点坐标沿着X Y Z轴分别平移Tx Ty Tz
    | 1  0  0  Tx |
    | 0  1  0  Ty |
    | 0  0  1  Tz |
    | 0  0  0  1  |
    一个点的坐标是(x,y,z),假设沿着X Y Z轴分别平移Tx Ty Tz 平移后的坐标是(x+Tx,y+Ty,z+Tz) 矩阵和表示顶点坐标的向量进行乘法运算
    | 1  0  0  Tx |   | x |   | x+Tx |
    | 0  1  0  Ty | x | y | = | y+Ty |
    | 0  0  1  Tz |   | z |   | z+Tz |
    | 0  0  0  1  |   | 1 |   |  1   |

    TODO:缩放矩阵
    一个几何体的所有顶点坐标沿着X Y Z轴分别缩放矩阵Sx Sy Sz倍
    顶点坐标缩放变换
    | Sx 0  0  0 |   | x |   | x*Sx |
    | 0  Sy 0  0 | x | y | = | y*Sy |
    | 0  0  Sz 0 |   | z |   | z*Sz |
    | 0  0  0  1 |   | 1 |   |  1   |

    TODO:旋转矩阵 
    X轴 绕X轴旋转α度对应的旋转矩阵Rx
    | 1  0     0     0 |   | x |   |       x       |
    | 0  cosα  -sinα 0 | x | y | = | cosα*y-sinα*z |
    | 0  sinα  cosα  0 |   | z |   | sinα*y+cosα*z |
    | 0  0     0     1 |   | 1 |   |        1      |

    Y轴 绕Y轴旋转α度对应的旋转矩阵Ry
    | cosα  0  -sinα 0 |   | x |   |  cosα*x+sinα*z |
    | 0     1  0     0 | x | y | = |        y       |
    | sinα  0  cosα  0 |   | z |   | -sinα*x+cosα*z |
    | 0     0  0     1 |   | 1 |   |        1       |

    Z轴 绕Z轴旋转α度对应的旋转矩阵Rz
    | cosα  -sinα 0  0 |   | x |   |  cosα*x-sinα*y |
    | sinα  cosα  0  0 | x | y |   |  sinα*x+cosα*y |
    | 0     0     1  0 |   | z |   |        z       |
    | 0     0     0  1 |   | 1 |   |        1       |

    js封装的矩阵的一些方法
    绕x轴旋转.makeRotationX(theta)
    绕y轴旋转.makeRotationY(theta)
    绕z轴旋转.makeRotationZ(theta)
    缩放.makeScale(Sx,Sy,Sz)
    平移.makeTranslation(Tx,Ty,Tz)
    剪切.makeShear
```
