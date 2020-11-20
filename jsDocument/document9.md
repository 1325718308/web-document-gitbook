## JavaScript中原型与原型链
### 写在前面
学习过Java、c++的都应该知道，它们都是面向对象的。但是对于JavaScript来说，在ES6之前没有引入类的概念，所以创建实例是通过构造函数实现的。在学习原型和原型链之前我们先要明白构造函数。

### 一、构造函数
#### 1、什么是构造函数？
所谓构造函数，就是提供一个生成**对象的模版**，并描述对象的基本结构的**函数**。一个构造函数，可以生成多个对象，每个对象都有相同的结构。它的基本结构如下：

```
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.runing = function() {
        console.log("人走路");
    }
}
```
#### 2、构造函数的特点
* 函数名的首字母一般是大写，但是小写也是没问题的，这只不过是规范。
* 函数体内使用`this`关键字，代表所要生成的对象实例。
* 生成对象的时候，必须使用`new`命令来调用构造函数。

#### 3、构造函数如何生成对象
```
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.runing = function() {
        console.log("人走路");
    }
}
const person = new Person("洋仔", 27, '男');
console.log(person); // {name: "洋仔", age: 27, sex: "男", runing:f()}
```
上面的代码首先创建了一个构造函数`Person`，然后通过`new`命令调用了`Person`，并传入了"洋仔", 27, '男'三个参数。最终创建了一个`person`对象。在`Person`构造函数中，有一个`runing`方法，每次new的时候都会生成这个方法，而且每次都是一摸一样的，为了把这个方法单独放到一个地方，能让所有的实例都能访问到，这就需要原型。
### 二、原型
#### 1、prototype属性
我们知道在JavaScript中函数也是一个对象，是对象就有它的属性。（原型）prototype就是函数对象的一个属性。而且`prototype`是函数所独有的。有图有真相：

<img 
    src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f10e590f806a4d05b74ed9c9bcfc5967~tplv-k3u1fbpfcp-zoom-1.image" 
    width = "555"/>

从上面的截图中可以看出，我们创建的构造函数`Person`有一个`prototype`属性，这个属性是一个对象。这就是构造函数的原型（prototype）。并且原型（prototype）对象有一个`constructor`属性。`constructor`属性指向了`Person`构造函数。
#### 2、 \__ proto\__ 属性
1）在JavaScript中所有的对象都有 `__proto__`，并且都指向创建该对象的函数的`prototype`。

2）所有的函数都是由`Function`函数创建的，所以函数的`__proto__`指向`Function`的`prototype`。

```
function Person() {};
Person.__proto__ === Function.prototype; // true
```
3）`Function`也是函数，因此它也由`Function`创建的，也就是说它自己创建了自己！所有`Function`的   `__proto__`指向的就是`Function`的`prototype`。

```
Function.__proto__ === Function.prototype; // true
```

4）`Object`函数也是`Function`函数创建的，因此`Object`的`__proto__`也是指向`Function`的`prototype`。

```
Object.__proto__ === Function.prototype; // true
```

5）`prototype`也是一个对象，它是`Object`函数创建的，所以`prototype`的`__proto__`指向`Object`的`prototype`。

```
function Person() {};
Person.prototype.__proto__ === Object.prototype; // true
```

6）但是`Object.prototype`却是一个特例，它的`__proto__`指向的是`null`。
```
Object.prototype.__proto__ === null; // true
```

因此，根据上面的几条基本概念，从这段简单的代码我们可以画出这样一条关系链图：

```
function Person() {};
const person = new Person();
```

<img 
    src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cec05ecf13434433b1d98b097b3c6784~tplv-k3u1fbpfcp-zoom-1.image" 
    width = "1516"/>

### 三、原型链
通过一段代码进入原型链的学习

```
function Person(name) {
    this.name = name;
}
Function.prototype.runing = function() {
    console.log('人会走路');
}
const person = new Person("洋仔");
person.runing();
person.hasOwnProperty("name");
```
我们来分析一下上面这段代码：

```
首先我们定义了一个方法Person，然后在Function的prototype上添加了一个属性runing，这个属性是一个方法。

接下来我们通过上面的Person方法new出来一个person对象，因此person.__proto__指向了Person.prototype。

前面我们说过，Person.prototype也是一个对象，是通过Object函数生成，所以Person.prototype.__proto__指向了Object.prototype。
```
上面的代码中，person本身是没有runing属性，但是却能成功访问。这里就需要原型链了。

如果一个对象访问某一个属性的时，它自身没有这个属性，那它就会顺着它的`__proto__`向上查找，如果它的`__proto__`上依然没有这个属性，那就继续向上查找，直到找到为止。

runing属性在person对象中没有找到，就会继续找`person.__proto__`，也就是Person.prototype，很显然，这里找到了，就不会再向上查找了

hasOwnProperty属性显然person对象中没有找到，就会继续找`person.__proto__`，也就是Person.prototype，很显然，Person.prototype中依然找不到，于是继续向上在`Person.prototype.__proto__`中找。Person.prototype是一个普通对象，它是由Object方法创建的，因此`Person.prototype.__proto__`就是Object.prototype，很显然，Object.prototype里面已经定义了hasOwnProperty方法（属性），因此在这里也找到了。

上面这种查找形式就成为**原型链**。












