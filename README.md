### 一.安装three.js  
    1.npm `npm install three@0.106.2`  
    2.下载three.js文件拖入项目
### 二.基本组件
##### 1.场景 var scene = new THREE.Scene()
##### 2.相机
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

    //正交投影相机
    var camera = new THREE.OrthographicCamera(
        -window.innerWidth /2, 
        window.innerWidth / 2, 
        window.innerHeight / 2, 
        -window.innerHeight /2, 10, 1000
    );
    //正交相机,参数含义(左边界,右边界,上边界,下边界,近切面,远切面)
```    
##### 3.渲染器 主要作用是将场景显示到屏幕上 构造方法 var rende r= new THREE.WebGLRenderer();
##### 4.几何体(网格模型) 几何体是包围必要三维数据的数据结构
    属性包含顶点数组 this.vertices,颜色信息 this.color,片面数据 this.faces
    (1)线段
```js
    //声明和赋值
	//1.线段
    var geometry=new THREE.Geometry();
    //geometry.vertices=[],是一个数组,值为顶点数据
    geometry.vertices.push(
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(-5,5,0),
    )
    var color1 = new THREE.Color(154/255,1,1,1),color2 = new THREE.Color(0xFF0000);//声明颜色信息
    geometry.colors.push(color1, color2);//为顶点设置颜色
    //使用定义好的顶点坐标,材质信息来构造几何体
    var line = new THREE.Line(geometry, material, THREE.LineSegments);
    scene.add(line);//将模型添加到场景中
 ```
    (2)引擎提供的几何体
```js
    //声明和赋值
	//圆柱体 参数列表,上平面半径,下平面半径,高度,圆被划分的次数,越大越接近圆
    var geometry = new THREE.CylinderGeometry(100, 150, 400);
    var material = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
    var mesh=new THREE.Mesh(geometry,material)
    mesh.position=new THREE.Vector3(0,0,0);
 ```
### 三.矩阵
```js
    TODO:平移矩阵 表示一个顶点坐标沿着X Y Z轴分别平移Tx Ty Tz
    | 1  0  0  Tx |
    | 0  1  0  Ty |
    | 0  0  1  Tz |
    | 0  0  0  1  |
    一个点的坐标是(x,y,z),假设沿着X Y Z轴分别平移Tx Ty Tz 平移后的坐标是(x+Tx,y+Ty,z+Tz) 
    矩阵和表示顶点坐标的向量进行乘法运算
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
### 四.Tween.js动画库
    1.安装方法:
        (1)vscode终端控制台运行npm i @tweenjs/tween.js@^18
        (2)html引入node_modules/@tweenjs/tween.js/dist/tween.umd.js
    详细案例见demo_3.js
    2.使用new TWEEN.Tween(objs.rotation).to({y:360,z:360},10000).repeat(Infinity).start();来定义一个动画
	objs为需要操作的属性,to(属性状态的最终值),10000为动画所需时间,Infinity为一直播放,可填入正正数表示动画
	执行次数
    3.在动画更新函数中调用TWEEN.update()
### 五.DAT.GUI工具
    1.vscode终端控制台运行 npm install --save dat.gui
	2.HTML界面引入脚本dat.gui/build/dat.gui.min.js
	3.使用方法
```js
    var param;//使用param来控制相机的视角大小
    function CreateGUI(){
        var paramObj=function(){
            this.fov=45;
        }
        param=new paramObj();
        var gui=new dat.GUI;
        gui.add(param,"fov",0,180).name("视角大小");
    }
//在初始化的时候调用CreateGUI();函数来创建一个GUI
//在动画函数中调用ChangeFov();函数来改变相机的视角
//ChangeFov函数,将param的值赋给camera的fov(视角)参数,然后更新相机的矩阵
function ChangeFov(){
    camera.fov=param.fov;
    camera.updateProjectionMatrix(); 
}
 ```
 ### 六.性能检测工具staus.js的使用
    1.在vscode终端控制台使用npm install stats.js安装插件
    2.引入node_modules/stats.js/build/stats.min.js文件
    3.初始化
```js
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.right = "0px";
    document.getElementById("canvas-frame").appendChild(stats.domElement);
 ```
    4.检测性能,在检测代码的前后加上stats.begin();和stats.end();两个方法 //详细使用见demo_3.js
### 七.光源
    1.起初神创造天地
    地是空虚混沌,渊面黑暗,神的灵运行在水面上
    神说,要有光,于是就有了光,不好意思跑题了......
    2.THREE.js提供的集中光源:
    THREE.AmbientLight(环境光)
    THREE.AreaLight(区域光)
    THREE..DirectionalLight(方向光)
    THREE.SpotLight(聚光灯) 
    THREE.PointLight(点光源) new THREE.PointLight(0xFFFF00,1,100,0.5);
    点光源参数列表含义,光照颜色,光照强度,点光源的最大距离,到最大距离的衰减值
    3.例:light = new THREE.AmbientLight(0xFFFF00,1);参数列表:光照颜色,光照强度
### 八.JQuery.js
    1.引入方法,<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    2.在HTML界面引入
### 九.spectrum-colorpicker颜色选择器插件
    1.安装方法:需要先引入jquery.js,步骤见第八步
        (1)vscode终端控制台运行npm install spectrum-colorpicker,之后运行npm install -g grunt-cli
        (2)html添加<script src="spectrum.js"></script>
           <link rel="stylesheet" type="text/css" herf="spectrum.css"></link>
    详细案例见demo_6.html
        (3)代码:
```js 
    $("#color-input-diy").spectrum({
		color: "red",//初始化颜色
		showInput: true,//显示输入
        //allowEmpty:true,//允许为空,显示清楚颜色按钮
		clickoutFiresChange: false,//单击选择器外部,如果颜色有改变则应用
		containerClassName: "full-spectrum",
		showInitial: true,//显示初始颜色,提供现在选择的颜色和初始颜色对比
		showPalette: true,//显示选择器面板，即左侧有按钮的面板
		showSelectionPalette: true,//记住选择过的颜色
		showAlpha: true,//显示透明度选择
		maxPaletteSize: 7,//记住选择过的颜色的最大数量
		cancelText: "取消",//取消按钮,按钮文字
		chooseText: "确定",//选择按钮,按钮文字
		noColorSelectedText: "无颜色选择",//清除,按钮文字
		preferredFormat: "hex",//输入框颜色格式,(hex十六进制,hex3十六进制可以的话只显示3位,hsl,rgb三原色,name英文名显示)
		localStorageKey: "spectrum.demo",//把选择过的颜色存在浏览器上
		
		//选择器右边面板移动时触发
		move: function (color) {
			updateBorders(color);
		},
		//选择器面板显示时触发
		show: function () {
		},
		//选择器面板显示之前触发,返回false时不显示
		beforeShow: function () {
		},
		//关闭面板或点击选择按钮,颜色变化时触发
		change:function(){	
		},
		//选择器面板隐藏时触发
		hide: function (color) {
			updateBorders(color);
		},
		//调色选择器面板显示的颜色
		palette: [
		      ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)","rgb(183, 183, 183)",
		      "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"],
		      ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
		      "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
		      ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
		      "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)"],
		      ["rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
		      "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)"],
		      ["rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
		      "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)"],
		      ["rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
		      "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)"],
		      ["rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
		      "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)"],
		      ["rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
		      "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
		     ]
		
	});
     function updateBorders(color) {
                //hexColor表示上次调色板显示的颜色
		var hexColor = "transparent";
		//如果当前设置颜色，则将颜色设置为当前颜色，否则，如果没有点击确定，则将颜色恢复为上次选择的颜色
                if(color) {
		    hexColor = color.toHexString();
		}
                //如果没有下面这行代码，点击选择器面板时，即使不点击保存，也会造成input框中的值改变
		$("#docs-content").css("border-color", hexColor);
    }
 ```
### 十.纹理
    1.纹理的基本属性:image(图片),wrapS(回环方式),offset(偏移)
    2.Three.js中的纹理对象,使用THREE.Texture(image,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy)
    参数列表:image:图片类型,使用ImageUtils来加载
             mapping:定义图片映射到模型上的方式
             wrapS:表示x轴的纹理回环方式,即纹理宽度小于需要的贴图宽度时,平面剩下的地方应当如何进行贴图
             wrapT表示y轴的纹理回环方式
    3.纹理的加载方式,使用THREE.TextureLoader()来加载
    4.cross-origin交叉域问题,浏览器无法读写本地文件,所以本地的图片在浏览器上不能直接访问到
    5.加载的图片尺寸应为2的次方数
### 十一.自定义几何体
    步骤:(例:创建一个三角形)
        1.需要先的行医一个空的几何体对象
```js
    var obj;
    var geometry=new THREE.Geometry();//自定义几何体
    var material=new THREE.MeshBasicMaterial({
            vertexColors:THREE.VertexColors,
            //color:0x00FF00,
            wireframe: false,//该参数的含义为显示线框
    });
 ```
        2.定义顶点
```js
    var p1=new THREE.Vector3(0,0,0);
    var p2=new THREE.Vector3(0,200,0);
    var p3=new THREE.Vector3(200,0,0);
```
        3.将顶点放置到几何体空间中
```js
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.vertices.push(p3);
```
        4.为几何体新建面片,并为面片添加颜色
```js
    var color1 = new THREE.Color(0xFF0000);
    var color2 = new THREE.Color(0x00FF00);
    var color3 = new THREE.Color(0x0000FF);
    var face=new THREE.Face3(0,1,2);//新建面片
    //为面片顶点添加颜色
    face.vertexColors[0] = color1;
    face.vertexColors[1] = color2;
    face.vertexColors[2] = color3;

    geometry.faces.push(face)//将面片赋予几何体
```
### 十二.3D模型的加载
    
            
    

