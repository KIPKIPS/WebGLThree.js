## 安装three.js  
    1.npm `npm install three@0.106.2`  
    2.下载three.js文件拖入项目
### 透视相机
 ![blockchain](./pic/1-1摄像机.svg)  
### 案例的结构
 ![blockchain](./pic/1-1结构.png) 
 # 坐标
## threejs坐标系
- threejs中有世界坐标系,本地坐标系,屏幕坐标
- threejs是webgl的库,所以它坐标系其实就继承于webgl,即二者坐标系是一样的.
- webgl使用笛卡尔坐标系(三维坐标系) 右手坐标系
![blockchain](./pic/1-2坐标系.jpg)
### canvas
canvas的尺寸的问题 canvas的实际尺寸是canvas的width和height决定的
    - html中
    ```HTML
    <canvas width="800" height="600">
    ```
    - js中
    ```JS
    let canvas = document.createElement("canvas");
    canvas.width=800;
    canvas.height=600;
    ```
- 可以给canvas设置css控制宽高(屏幕上显示的宽高),即对一张图片设置css对图片进行拉伸或者挤压操作,不会改变图片的实际分辨率和大小.

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
    
