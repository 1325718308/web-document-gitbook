### 什么是flex布局？
flex是flexible box的缩写，意思是“弹性”，用来为盒模型提供最大的灵活性。

任何一个容器都可以使用flex布局
```
    .box {
        display: flex;
    }
```
行内元素（内联元素）使用flex布局
```
    span {
        display: inline-box;
    }
```
注意：父元素如果设置了flex布局，子元素的`float、clear、vertical-align`将失效。
### 基本概念
采用`flex` 布局的元素，称为 `flex` 容器（`flex container`），简称"容器"。它的所有子元素自动成为容器成员，称为 `flex` 项目（`flex item`），简称"项目"。

![这是图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b64107786ec497e8f5671dc28d372bb~tplv-k3u1fbpfcp-zoom-1.image)
上图中可以看出flex容器中存在两条轴，水平方向的主轴（main-axis）和垂直方向的交叉轴（cross-axis）。主轴开始的位置叫做main start，结束的位置叫做main-end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
### flex容器的相关属性
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

#### flex-direction属性
`flex-direction`设置主轴的方向
```
    .box {
        flex-direction: row | row-reverse | column | column-reverse
    }
```
| 属性值 | 描述 |
|:-----:|:----:|
| row |（默认值）主轴为水平方向，起点在左端|
| row-reverse |主轴为水平方向，起点在右端|
| column |主轴为垂直方向，起点在顶部|
| column-reverse |主轴为垂直方向，起点在底部|
#### flex-wrap属性
`flex-wrap`设置换行方式
```
    .box {
        flex-wrap: nowrap | wrap | wrap-reverse
    }
```

| 属性值 | 描述 |
|:-----:|:----:|
| nowrap |（默认值）不换行|
| wrap |换行，第一行在上方|
| wrap-reverse |换行，第一行在下方|

* nowrap
![这是图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af0680cb16c34734b833c1931968ae24~tplv-k3u1fbpfcp-zoom-1.image)
* wrap
![这是图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88c8ea1395994cc59553bb1f2d13c770~tplv-k3u1fbpfcp-zoom-1.image))
* wrap-reverse
![这是图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/041671f3a6fd4e3fbc5d88d4eec5282c~tplv-k3u1fbpfcp-zoom-1.image)

#### flex-flow属性
`flex-flow`是`flex-direction`和`flex-wrap`的简写。默认值是row nowrap。
```
    .box {
        flex-flow: row nowrap
    }
```
注意：`flex-flow`的取值根绝`flex-direction`和`flex-wrap`取值拼接。
#### justify-content属性
justify-content定义了项目在主轴上的对齐方式。
```
    .box {
        justify-content: flex-start | flex-end | center | space-between | space-around
    }
```
| 属性值 | 描述 |
|:-----:|:----:|
| flex-start |（默认值）左对齐|
| flex-end |右对齐|
| center |居中|
| space-between |两端对齐，项目之间的间隔都相等|
| space-around |每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍|

* flex-start
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32f6e08e70cd4d2595e14192cd4f0b52~tplv-k3u1fbpfcp-zoom-1.image)
* flex-end
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/928fc3272a7b4421a177ed55f9736b9d~tplv-k3u1fbpfcp-zoom-1.image)
* center
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a35ba1700834173aa0744caf43d5060~tplv-k3u1fbpfcp-zoom-1.image)
* space-between
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2879ad354c64ea8b1f06ce4a66caee8~tplv-k3u1fbpfcp-zoom-1.image)
* space-around
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bddf4507229417a9749f25e86bf92f8~tplv-k3u1fbpfcp-zoom-1.image)

#### align-items属性
align-items属性定义项目在交叉轴上如何对齐。
```
    .box {
        align-items: flex-start | flex-end | center | baseline | stretch;
    }
```
| 属性值 | 描述 |
|:-----:|:----:|
| flex-start |交叉轴的起点对齐|
| flex-end |交叉轴的终点对齐|
| center |交叉轴的中点对齐|
| stretch |（默认值）如果项目未设置高度或设为auto，将占满整个容器的高度|
| baseline |项目的第一行文字的基线对齐|

* flex-start
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6046076d98d4799b753565eeab82e67~tplv-k3u1fbpfcp-zoom-1.image)
* flex-end
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/123e1040bce54cfd8bc1c0c978ebedb2~tplv-k3u1fbpfcp-zoom-1.image)
* center
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd9dd8315da84c68894e52812819659f~tplv-k3u1fbpfcp-zoom-1.image)
* baseline
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2567ff8a1934ea3abd6821299202b5c~tplv-k3u1fbpfcp-zoom-1.image)
* stretch
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/418769f2e6cc4cfd82533e1533d050b7~tplv-k3u1fbpfcp-zoom-1.image)

#### align-content属性
`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```
    .box {
        align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    }
```
| 属性值 | 描述 |图解|
|:-----:|:----:|:----:|
| flex-start |交叉轴的起点对齐|![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/439fcc1c64284063bfeabcebb753198a~tplv-k3u1fbpfcp-zoom-1.image)|
| flex-end |交叉轴的终点对齐|![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02b9fff9568042c3abf39ba9a5fff503~tplv-k3u1fbpfcp-zoom-1.image)|
| center |交叉轴的中点对齐|![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a56ff7079814d9096098853d9b180a5~tplv-k3u1fbpfcp-zoom-1.image)|
| space-between |与交叉轴两端对齐，轴线之间的间隔平均分布|![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/678e25fd0a454db3a2088f971d7443ba~tplv-k3u1fbpfcp-zoom-1.image)|
| space-around |每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍|![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bff70237da934460bd9964913a9b72a6~tplv-k3u1fbpfcp-zoom-1.image)|
| stretch |默认值）：轴线占满整个交叉轴|![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b7b3a2cc06e414282e7d51dfa573245~tplv-k3u1fbpfcp-zoom-1.image)|

### 项目（flex item）相关属性
* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self

#### order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

```
    .item {
        order: <Number>;
    }
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/244021a8fac64c56a6f5bf1105bcbd38~tplv-k3u1fbpfcp-zoom-1.image)

#### flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
```
    .item {
        flex-grow: <Number>;
    }
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f989abac81fd4c0f828c7c62ac634500~tplv-k3u1fbpfcp-zoom-1.image)

如果值都是1，等分剩余空间。如果有一个值为2，其余值都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```
    .item {
        flex-shrink: <number>;
    }
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29312d75be3b43b9a23c67fa63166d77~tplv-k3u1fbpfcp-zoom-1.image)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

#### flex-basis属性
`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

```
    .item {
        flex-basis: <length> | auto;
    }
```
#### flex属性
`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为0 1 auto。后两个属性可选。
```
    .item {
        flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    }
```
#### align-self属性
`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```
    .item {
        align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
```
该属性可能取6个值，除了`auto`，其他都与`align-items`属性完全一致。
