## 什么是BFC？
**BFC(Block Formatting context)** 块级格式化上下文，官方给的解释是**BFC**决定了元素如何对其内容进行定位，以及和其他元素的关系和相互作用，当涉及到可是换布局的时候**BFC**提供了一个环境，HTML元素会在这个环境中按照一定的规则进行布局。但其实我们只需要记住**BFC**的目的是形成一个完全独立的空间。让空间中的子元素不会影响到外面的元素。

## 如何触发BFC?

我们可以通过设置一些css属性来触发**BFC**，一般设置以下几个属性的值可以触发**BFC**
* float属性值不设置none
* position属性值不设置relative和static
* overflow属性值设置为auto、scroll、hidden
* display属性值设置为table-cell或inline-block

## BFC可以解决什么问题？
### 第一种、解决浮动元素使得父元素高度塌陷的问题
假设页面中有一个父元素和多个子元素，这几个子元素都设置为浮动时，就会产生父元素高度塌陷的问题，这是因为浮动的子元素脱离了文档流，父元素检测不到子元素的存在而无法被子元素撑开，这中情况我们就可以使用**BFC**来解决了

下面的代码中子元素使用了浮动造成了父元素高度塌陷
```
.parent {
    width: 300px;
    padding: 10px;
    background-color: cyan;
    overflow: hidden;
}
.child {
    float: left;
    width: 80px;
    height: 50px;
    margin: 10px 0 0 10px;
    background-color: pink;
}
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1aec9e608ae44338c45a5c582ee727b~tplv-k3u1fbpfcp-watermark.image">

想要解决这个问题，我们可以通过以下css属性来解决
```
.parent {
    ...;
    overflow: hidden;
}

.parent {
    ...;
    display: inline-block
}

.parent {
    ...;
    display: table-cell;
}

.parent {
    ...;
    position: fixed;
}

.parent {
    ...;
    position: absolute;
}
```
通过设置这些属性就可以解决父元素高度塌陷的问题，这些属性都可以触发BFC

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb113575f6fd448c899633d87f5926d3~tplv-k3u1fbpfcp-watermark.image">

但是我们在开发中可能因为布局的规则无法使用这些属性，而解决高度塌陷常用还有以下几个方法
* 让父元素也浮动起来，父元素和子元素一起脱离文档流
    - 优点：代码量少
    - 缺点：会影响到后面的元素排列
* 给父元素添加一个固定高度
    - 优点：没有学习成本
    - 缺点：难以维护，不灵活
* 在浮动的子元素后面增加一个空元素，设置`clear: both`来清除浮动
    - 优点：简单易懂 容易掌握
    - 缺点：会增加无意义的标签
* 为浮动的最后一个子元素设置伪元素 `after{clear: both}`
    - 优点：结构和语义完全正确
    - 缺点：复用不当会导致代码量增加

至于我们需要选用那种方法还得根据实际需求决定。

### 第二种、解决自适应布局的问题
### 第三种、解决外边剧重合的问题

## 这些问题还有其他解决方案吗？
以上问题可以使用flex布局来解决