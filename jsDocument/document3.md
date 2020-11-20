## 一、首先要知道的作用域概念
### 1、 什么是作用域？
变量（变量作用于又称上下文）和函数生效（能被访问）的区域或集合。换句话说，作用域决定了代码区块中变量和其他资源的可见性。我们来看个例子：
```
    function myFunction() {
        let inVariable = "函数内部变量";
    }
    myFunction();//要先执行这个函数，否则根本不知道里面是啥
    console.log(inVariable); // Uncaught ReferenceError: inVariable is not defined
```
从上面的例子可以看出作用域的概念，我们创建了一个函数myFunction，在函数内部创建了一个变量inVariable，当我们在全局访问这个变量没，系统会直接报错。这就说明我们在全局是无法获取到（闭包除外）函数内部的变量。我们可以这样理解：**作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**
### 2、全局作用域和函数作用域
在代码中任何地方都能访问到的对象拥有全局作用域，一般来说以下几种情形拥有全局作用域
+ #### 最外层函数和在最外层函数外面定义的变量拥有全局作用域。
```
    let outVariable = "我是外部变量";
    function outFunction() {
        let inVariable = "我是内部变量";
        function inFunction() { // 我是内部函数
           console.log(inVariable); 
        }
        inFunction(); 
    }
    console.log(outVariable); // 我是外部变量
    outFunction(); // 我是内部变量
    console.log(inVariable); //inVariable is not defined
    inFunction(); //inFunction is not defined
```
+ #### 所有末定义直接赋值的变量自动声明为拥有全局作用域
```
    function outFunction() {
        variable = "未定义直接赋值的变量";
        var inVariable = "我是内部变量";
    }
    outFunction();//要先执行这个函数，否则根本不知道里面是啥
    console.log(variable); //未定义直接赋值的变量,这里会有个“变量提升”
    console.log(inVariable); //inVariable is not defined
```
上面的代码中在函数outFunction内部variable未定义就先赋值，这里会将variable变量提升到全局作用域。**变量提升**是发生在函数的预编译阶段，它的意思就是说即任何变量，如果未经声明就赋值，此变量就为全局对象所有。**变量提升**也叫**暗示全局变量**。
+ #### 所有 window 对象的属性拥有全局作用域
    一般情况下，window 对象的内置属性都拥有全局作用域，例如 window.name、window.location

+ #### 函数作用域
    声明在函数内部的变量或方法，它所处的作用域就是函数作用域。在函数外部是无法访问的（必报除外）。
    ```
        function doSomething(){
            var blogName="浪里行舟";
            function innerSay(){
                alert(blogName);
            }
                innerSay();
        }
        alert(blogName); //VM1210:8 Uncaught ReferenceError: blogName is not defined
        innerSay(); //VM1210:8 Uncaught ReferenceError: innerSay is not defined
    ```
    可见上述代码中在函数内部声明的变量或函数，在函数外部是无法访问的，这说明在函数内部定义的变量或者方法只是函数作用域。
### 2、什么是作用域链？
在讲作用域链之前我们首先要知道一个概念[[scope]]

+ #### [[scope]]
    我们要知道JavaScript中的每个函数都是一个对象，对象中有些属性我们能访问，有些属性是不可以访问的，这些属性仅JavaScript引擎存取。[[scope]]就是其中一个。
    。[[scope]]指的就是我们所说的作用域,其中存储了**运行期上下文**的集合。
+ #### 运行期上下文
    当函数执行时，会创建一个称为执行期上下文的内部对象。一个执行期上下文定义了一个函数执行时的环境，函数每次执行时对应的执行上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行上下文，当函数执行完毕，执行上下文被销毁。
+ #### 作用域链
    [[scope]]中所存储的执行期上下文对象的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。
## 二、作用域精讲
下面我们通过一段代码详细介绍一下作用域
```
    function a() {
        function b() {
            var b = 234;
        }
        var a = 123;
        b();
    }
    var gloab = 100;
    a();
    console.log(gloab);
    console.log(b);
    console.log(a)
```
我们都知道JavaScript代码在执行前都会有一个过程叫做**预编译**，前面我们提到过。接下来我们一步一步分析。

**第一步：** a 函数定义


![](https://user-gold-cdn.xitu.io/2020/2/21/170673bb2562a7a9?w=898&h=476&f=png&s=68648)

我们可以从上图中看到，a 函数在被定义时，a函数对象的属性[[scope]]作用域指向他的作用域链scope chain，此时它的作用域链的第一项指向了GO(Global Object)全局对象，我们看到全局对象上此时有5个属性，分别是this、window、document、a、glob。

**第二步：** a 函数执行

![](https://user-gold-cdn.xitu.io/2020/2/21/1706759f8f1956f7)
当a函数被执行时，此时a函数对象的作用域[[scope]]的作用域链scope chain的第一项指向了AO(Activation Object)活动对象，AO对象里有4个属性，分别是this、arguments、a、b。第二项指向了GO(Global Object)，GO对象里依然有5个属性，分别是this、window、document、a、golb。

**第三步：** b 函数定义

![](https://user-gold-cdn.xitu.io/2020/2/21/1706763d6abc1005?w=861&h=674&f=png&s=93411)
当b函数被定义时，此时b函数对象的作用域[[scope]]的作用域链scope chain的第一项指向了AO(Activation Object)活动对象，AO对象里有4个属性，分别是this、arguments、a、b。第二项指向了GO(Global Object)，GO对象里依然有5个属性，分别是this、window、document、a、golb。

**第四步：** b 函数执行

![](https://user-gold-cdn.xitu.io/2020/2/21/1706768664633b23?w=909&h=749&f=png&s=107490)
当b函数被执行时，此时b函数对象的作用域[[scope]]的作用域链scope chain的第一项指向了AO(Activation Object)活动对象，AO对象里有3个属性，分别是this、arguments、b。第一项指向了AO(Activation Object)活动对象，AO对象里有4个属性，分别是this、arguments、a、b。第二项指向了GO(Global Object)，GO对象里依然有5个属性，分别是this、window、document、a、golb。

以上就是上面代码执行完之后的结果。当我们访问其中的变量时，要从作用域链的底部向上查找。

首先查找变量glob，作用域链第一项上没有找到继续在第二项查找，依然没有，第三项在GO中查找到了，最终的值是100；

其次查找变量b，作用域链的第一项上查找，发现存在变量b，最终变量的b的值是234；

最后查找变量a，作用域链第一项上没有找到继续在第二项查找，发现存在变量a，最终变量a的值是123。

## 总结
至此JavaScript作用域、作用域链基本上就介绍完了，后续我会给大家介绍一下前面说到的**闭包**和**预编译**。如果大家还有其他不同的理解或者是建议，还请在下发留言。如果有理解的不正确的地方还请多多指教。
