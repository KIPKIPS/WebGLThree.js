//构造线段
var line=new THREE.Line3(new THREE.Vector3(0,0,0),new THREE.Vector3(5,5,5))//参数为线段的起点和终点坐标
var centerOfLine=new THREE.Vector3()
line.getCenter(centerOfLine)
console.log(centerOfLine)

//线段长度
var length=line.distance()
console.log(length)

//计算坐标之间的距离
var start=new THREE.Vector3(1,1,1)
var end=new THREE.Vector3(4,4,4)
var dis=start.distanceTo(end)
console.log(dis)

