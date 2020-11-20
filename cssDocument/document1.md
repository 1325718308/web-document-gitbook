### 1、绝对定位，利用负边距
html 部分
```
	<div className="box1">
         <span className="content1"></span>
    </div>
```
css 部分
```
  .box1{
      display: table-cell;
      vertical-align: middle;
      text-align: center;  
      height: 100px; 
      width: 100%;
      background-color: pink;
      position: relative;     
   }
   .content1 {
      background-color: burlywood;
      width: 200px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -25px;
      margin-left: -100px;
      overflow: auto;
   }
```
### 2、绝对定位，margin:auto
html 部分
```
  <div className="box2">
       <span className="content2"></span>
  </div>
```
css 部分
```
  .box2{
      display: table-cell;
      vertical-align: middle;
      text-align: center;  
      height: 100px; 
      width: 100%;
      background-color: pink;
      position: relative;
      margin-top: 10px;     
   }
  .content2 {
      background-color: burlywood;
      width: 200px;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      overflow: auto;
   }
```
### 3、flex布局
html 部分
```
  <div className="box3">
       <span className="content3"></span>
  </div>
```
css 部分
```
  .box3{
      display: flex;
      height: 100px; 
      width: 100%;
      align-items: center;
      justify-content: center; 
      background-color: pink; 
      margin-top: 10px;
   }
  .content3 {
      background-color: burlywood;
      width: 200px;
      height: 50px;
      overflow: auto;
      line-height: 50px;
      text-align: center;
   }
```
### 4、line-height = 元素高度
html 部分
```
  <div className="box4">
       垂直剧中 line-height
  </div>
```
css 部分
```
  .box4{
      height: 100px; 
      width: 100%;
      background-color: pink; 
      margin-top: 10px;
      line-height: 100px;
      text-align: center;
   }
```
### 5、transform
html 部分
```
	<div className="box5">
         <span className="content5"></span>
    </div>
```
css 部分
```
  .box5{
      height: 100px; 
      width: 100%;
      background-color: pink; 
      margin-top: 10px;
      position: relative;
   }
   .content5 {
       position: absolute;
       background-color: burlywood;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       -webkit-transform: translate(-50%, -50%);
   }
```
### 6、table布局
html 部分
```
	<div className="box6">
         <span className="content6">垂直剧中 Table</span>
         <span className="content6">垂直剧中 Table</span>
    </div>
```
css 部分
```
  .box6{
      height: 100px; 
      width: 100%;
      background-color: pink; 
      margin-top: 10px;
      display: table;
   }
   .content6 {
       text-align: center;
       vertical-align: middle;
       display: table-cell;
       background-color: burlywood;
   }
```