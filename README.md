## 安装three.js  
    1.npm `npm install three@0.106.2`  
    2.下载three.js文件拖入项目

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
    
