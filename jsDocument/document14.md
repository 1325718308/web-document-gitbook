# ES6新增特性
## var与let、const
* 1、var声明的变量会挂载在window上，而let和const声明的变量不会
```
var a = 100;
console.log(a,window.a);    // 100 100
let b = 10;
console.log(b,window.b);    // 10 undefined
const c = 1;
console.log(c,window.c);    // 1 undefined
```
* 2、var声明变量存在变量提升，let和const不存在变量提升
```
console.log(a); // undefined  ===>  a已声明还没赋值，默认得到undefined值
var a = 100;
```
```
console.log(b); // 报错：b is not defined  ===> 找不到b这个变量
let b = 10;
```
```
console.log(c); // 报错：c is not defined  ===> 找不到c这个变量
const c = 10;
```
* 3、let和const声明形成块作用域
```
if(1){
    var a = 100;
    let b = 10;
}
console.log(a); // 100
console.log(b)  // 报错：b is not defined  ===> 找不到b这个变量
```
```
if(1){
    var a = 100;
    const c = 1;
}
console.log(a); // 100
console.log(c)  // 报错：c is not defined  ===> 找不到c这个变量
```
* 4、同一作用域下let和const不能声明同名变量，而var可以
```
var a = 100;
console.log(a); // 100
var a = 10;
console.log(a); // 10
```
```
let a = 100;
let a = 10;
//  控制台报错：Identifier 'a' has already been declared  ===> 标识符a已经被声明了。
```
* 5、暂存死区
```
var a = 100;
if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
    // 而这时，还未到声明时候，所以控制台Error:a is not defined
    let a = 1;
}
```
* 6、const
    - 1、一旦声明必须赋值,不能使用null占位。
    - 2、声明后不能再修改
    - 3、如果声明的是复合类型数据，可以修改其属性

```
const a = 100; 
const list = [];
list[0] = 10;
console.log(list);　　// [10]
const obj = {a:100};
obj.name = 'apple';
obj.a = 10000;
console.log(obj);　　// {a:10000,name:'apple'}
```

## 箭头函数
### 1、箭头函数的写法
* 箭头函数是通过 `=>`标识去声明的，下面的代码就是一个简单的箭头函数的声明
```
const fun = () => {
    console.log("箭头函数")
}
```
* 箭头函数函数体中如果只有一条语句的时后可以更简单的写
```
const fun = () => console.log("箭头函数")
```
* 箭头函数传递参数
```
const fun (x) => console.log(x);
```
* 如果只传一个参数，还可以省略括号
```
const fun = x => console.log(x);
```
* 箭头函数返回值的情况
```
const fun = () => {
    return "返回内容";
}
```
* 如果只有一条返回语句，可以省略`return`关键字
```
const fun = () => "返回内容"
```
以上是箭头函数在声明和使用上的一些写法，下面我们看看箭头函数的其他一些特点
### 2、箭头函数的其他特点
* 箭头函数不绑定**this**，也就是说箭头函数没有自己的**this**
```
var adder = {
  base : 1,
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },
  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};
console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2
```
由于箭头函数不绑定`this`，所以箭头函数在执行`call`或`apply`方法时，传入的第一个参数会被忽略。
* 箭头函数不绑定**arguments**，也就是说箭头函数没有自己的**arguments**
```
var arguments = [1, 2, 3];
var arr = () => arguments[0];
arr(); // 1
function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n,即传给foo函数的第一个参数
  return f();
}
foo(1); // 2
foo(2); // 4
foo(3); // 6
foo(3,2);//6 
```
箭头函数不绑定Arguments 对象。因此，在上面的代码中中，arguments只是引用了封闭作用域内的arguments。

关于更多箭头函数的特性[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)上面有详细的介绍。
## Promise
`Promise` 是ES2015新增的一个用来解决异步问题的一个对象。由于`Promise`对象的`then`方法是可以链式调用的，所以在解决异步回调地狱的问题上大有好处。关于`Promise`的详细介绍我这里不做讲解，大家可以看看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)上有详细的介绍。如果想要手动实现Promise或者想要理解`Promise`的底层原理，可以看[这片文章](https://juejin.im/post/6884536159846793224)。
## Set / Map
#### Set 特性
`Set`对象是值的集合，你可以按照插入的顺序迭代它的元素。 `Set`中的元素只会出现一次，即`Set`中的元素是**唯一**的。基于这个特性，我们可以使用`Set`对数组去重。这页是`Set`用到的最多的一个特性。
```
let arr = [1,1,2,3,4,5];
const s = new Set(arr);
arr = Arr.from(s);
console.log(arr); // [1,2,3,4,5]
```    
#### Set 实例属性
**1、Set.prototype.size**

    返回 Set 对象中的值的个数

```
const s = new Set();
s.add(1);
s.add(2);
console.log(s.size); // 2
```

#### Set 实例方法
**1、Set.prototype.add(value)**

    向Set对象中添加值

**2、Set.prototype.clear()**

    移除Set对象内的所有元素。

**3、Set.prototype.delete(value)**

    移除Set的中与这个值相等的元素。

**4、Set.prototype.entries()**

    方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。

```
var s = new Set();
s.add("foobar");
s.add(1);
s.add("baz");
var sIter = s.entries();
console.log(sIter.next().value); // ["foobar", "foobar"]
console.log(sIter.next().value); // [1, 1]
console.log(sIter.next().value); // ["baz", "baz"]
```

**5、Set.prototype.has(value)**

    返回一个布尔值，表示该值在Set中存在与否。

```
const s = new Set();
s.has(a); // false
```

**6、Set.prototype.keys()**

    返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。

```
const set1 = new Set();
set1.add(42);
set1.add('forty two');
const iterator1 = set1.keys();
console.log(iterator1.next().value); // 42
console.log(iterator1.next().value); // forty two
```

**7、Set.prototype.values()**

    和Set.prototype.keys()一样，返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。

```
const set1 = new Set();
set1.add(42);
set1.add('forty two');
const iterator1 = set1.values();
console.log(iterator1.next().value); // 42
console.log(iterator1.next().value); // forty two
```

**8、Set.prototype[@@iterator]()**

    返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。

```
const set1 = new Set();
set1.add(42);
set1.add('forty two');
const iterator1 = set1.[Symbol.iterator]();
console.log(iterator1.next().value); // 42
console.log(iterator1.next().value); // forty two
```

上面介绍了`Set`对象的特性和使用方式，下面我们看看`Map`，其实`Map`和`Set`的区别就是`Set`对象的值都是唯一的，而`Map`不是唯一的，`Map`还有一个特性就是`Map`是键值对存储数据的，而且`Map`的`key`可以是任何数据类型。包括我们下面要介绍的Symbol类型。除了这集特特性之外，其他的属性方法都和`Set`基本一样。关于`Map`的详细介绍可以[看这里MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)。

## 数组展开
通过`...arr`可以将数组中的元素展开
```
const arr = [1,2,3,4];
console.log(...arr); // 1,2,3,4
```
## 数组解构
```
const arr = ['red', 'blue', 'green'];
const [first, second, third] = arr;
console.log(first); // red
console.log(second); // blue
console.log(third); // green
```
上面的代码中通过`[first, second, third] = arr`将数组中的三个元素分别赋值给了`first、 second、third`三个值。假如我们需要解构上面数组中的第二个元素，那我们可以通过下面的方式
```
const arr = ['red', 'blue', 'green'];
const [, second] = arr;
console.log(second); // blue
```
我们需要解构数组中的第n个元素，就可以在第n个位置定义要接收元素的变量即可，在前面我们可以用n-1个“,"分割。
## 参数默认值
在ES2015之前，我们想要为一个函数的参数设置默认值可以通过下面的方式
```
function foo(enable) {
    enable = enable  === undefined ? true : false;
    console.log(enable);
}
foo();
```
ES2015之后我们可以通过下面的方式为函数的参数设置默认值
```
function foo(enable = true) {
    console.log(enable);
}
```
需要注意到是，如果有多个参数的话，需要将设置默认值的形参放在最后。

## 剩余参数
我们在参数传递的时候，可以传递任意多个参数，对于未知个数的参数，以前我们可以用`arguments`表示。在ES2015之后，我们可以通过剩余操作符`...args`，此时`args`就会以数组的形式接收从当前位置开始的所有参数。因为接收的是剩余参数，这种`...args`只能放在形参的最后以为，而且只能使用一次。
```
function foo(first, ...args) {
    console.log(args); // [2,3,4,5]
}
foo(1,2,3,4,5);
```
## 对象字面量
* 对象的属性的值简写

```
// ES2015之前的写法
const bar = '345';
const obj = {
    foo: '123',
    bar: bar,
    method: function() {
        console.log('method')
    }
}
```

```
// ES2015之后
const bar = '345';
const obj = {
    foo: '123',
    bar,
    method() {
        console.log('method');
    }
}
```
## Object.assgin
将多个源对象中的属性复制到一个目标对象中。如果源对象和目标对象中有相同的属性，那源对象中的属性就会覆盖目标对象的属性。这里所说的源对象和目标对象都是普通对象
```
const source1 = {
    a: '123',
    b: '123',
}
const source2 = {
    a: '789',
    b: '789',
}
const target = {
    a: '456',
    c: '456',
}
const result = Object.assgin(target, source1, source2);
consoe.log(result === target); // true
```
通过`Object.assgin`可以实现对象的深拷贝，我们看看下面的代码
```
const source = {
    a: 123,
    b: 123
}
const result = Object.assgin({}, source);
source.a = 456;
console.log(source.a); // 456
console.log(result.a); // 123
```
## Proxy 代理对象
在ES2015之前，我们如果想要监听对一个对象的读写操作，我们需要使用`Object.defineProperty`为对象添加属性，这样就可以捕获对象的读写过程，`Object.defineProperty`应用非常广泛，在Vue3.0之前，使用了`Object.defineProperty`来实现数据响应。

在ES2015中出现了一个`Proxy`，专门用来为对象设置代理器的。通过`Proxy`就可以轻松监视到对象的读写过程。相比于`Object.defineProperty`，`Proxy`更为强大。下面我们具体来看看如何使用  `Proxy`

`Proxy`的第一个参数我们的目标对象，也就是我们要代理的对象；第二个参数也是一个对象，我们把它称之为代理的处理对象。这个对象中可以通过`get`方法监听属性的访问，可以通过`set`方法监听属性的设置。
```
const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {
    get(target, property) {
        console.log(target, property); // {name: 'zce', age: 20} name
        return property in target ? target[property] : undifined
    },
    set(target, property, value) {
        console.log(target, property, value); // {name: 'zce', age: 20} gender Male
        target[property] = value;
        return true;
    }
})
console.log(personProxy.name); // zce
console.log(personProxy.sex); // undifined
personProxy.gender = 'Male'; 
```
以上就是`Proxy`的一些使用了，在Vue3.0就是通过`Proxy`实现的数据响应。

## Reflect对象
`Reflect`是ES2015提供的一个全新的内置对象，按照`java、c#`这种语言的说法`Reflect`属于一个静态类，也就是说它不能通过`new Reflect()`的方式构建实例对象。只能够调用这个静态类当中的静态方法，比如`Reflect.get()`。

`Reflect`内部封装了一系列对对象的底层操作，总共提供了14个静态方法，其中有一个已经废弃，目前还剩下13个。仔细看这13个方法，你会发现和`Proxy`处理对象的方法一样。其实`Reflect`的成员方法就是`Proxy`处理对象的默认实现。

```
const obj = {
    foo: 123,
    bar: 456
}
const objProxy = new Proxy(obj, {
    get(target, property) {
        return Reflect.get(target, property);
    }
})
console.log(objProxy.foo);
```
Reflect对象有什么意义？

* 提供了一套用于操作对象的Api

在这之前，我们对于对象的操作会用到很多方法，显得五花八门，但是通过`Reflect`提供的方法，会使得对象的操作变得更为统一，看看下面的代码：
```
const obj = {
    name: 'zce',
    age: 20
}
// 不使用Reflect
console.log(name in obj);
console.log(delete obj['age']);
console.log(Object.keys(obj));
// 使用Reflect
console.log(Reflect.has(obj, 'name'));
console.log(Reflect.deleteProperty(obj, 'age'));
console.log(Object.ownKeys(obj));
```
## class类
在ES2015之前，都是通过定义函数以及函数的原型对象去实现的类型，例如下面
```
function Person(name) {
    this.name = name;
}
Person.prototype.say = function() {
    console.log(`hi my name is ${this.name}`);
}
```
ES2015之后我们可以使用一个叫`class`的关键字来声明一个类型，下面我们通过`class`来复现一下上面的类型
```
class Person {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`hi my name is ${this.name}`);
    }
}
const person = new Person('tom');
person.say(); // hi my name is tom
```
在我们`class`当中有两种方法，分别是**实例方法**和**静态方法**，下面我们看看**静态方法**的具体用法

```
class Person {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`hi my name is ${this.name}`);
    }
    static create(name) {
        return new Person(name);
    }
}
const tom = Person.create('tom');
tom.say();
```
这里需要注意一点，因为我们的静态方法是挂在到类型上面的，所以说在静态方法内部，`this`不会执向某一个实例对象，而是当前的类型。

### class 类的继承
在ES2015之前，我们通过原型实现继承；ES2015之后由于`class`的出现，我们可以使用`extends`关键字实现继承
```
class Person {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`hi my name is ${this.name}`);
    }
}
class Student extends Person {
    constructor(name, number) {
        super(name);
        this.number = number;
    }
    hello() {
        super.say();
        console.log(`my school number is ${this.number}`);
    }
}
const student = new Student('jack', 1000);
student.hello(); 
```
## Symbol类型
在ES2015之前，对象的属性名都是字符串，而字符串是有可能会重复的，如果重复就会产生冲突。ES2015为了解决这一问题，提供了一种全新的原始数据类型`Symbol`，作用就是表示一个独一无二的值。下面我们一起尝试一下：
```
const s = Symbol()
console.log(s); // Symbol()
console.log(typeof s); // symbol
console.log(Symbol() === Symbol()); false
```
ES2015之后对象的属性名可以用`Symbol`类型
```
const obj = {
    [Symbol()]: 123
}
```
`Symbol`除了避免对象属性名重复产生的问题，我们还可以借助这一类型的特点来模拟实现对象的私有成员。
```
const name = Symbol();
const obj = {
    [name]:'zce',
    say() {
        console.log(this[name]);
    }
}
person[Symbol()]; // 因为 Symbol 是独一无二的，所以这里是无法获取到的。
```
`Symbol`这种类型的值目前最主要的作用就是为对象添加独一无二的属性名。

`Symbol`在使用上还有一些值得注意的地方：
* 唯一性

每次通过`Symbol()`创建的值都是唯一的，不管我们传入的描述内容是不是相同的，得到结果都是全新的一个值。如果我们需要在全局复用一个相同的`Symbol`值，我们可以通过全局变量的方式或者是`Symbol`类型提供的一个静态方法去实现。
```
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');
console.log(s1 === s2); // true
```
`for()`方法内部维护了一个全局注册表，为我们的字符串和`Symbol`值提供了一个一一对应的关系，需要注意的是`for()`内部维护的是字符串和`Symbol`的对应关系，也就是说如果我们传入的不是字符串，`for()`内部会自动转化成字符串，这样就会我们穿布尔值的true和字符串的true的值一样。

在`Symbol`类型当中还提供了很多内置的`Symbol`常量，用来作为内部方法的标识，这些标识符可以让自定义对象去实现一些js当中内置的接口。

```
const obj = {
    [Symbol.toStringTag]: 'XObject'
}
console.log(obj.toString()); // [Object, XObject]
```
通过`Symbol()`作为属性名，我们通过传统的`for...in` 循环是获取不到的，而且通过`Object.keys()`也是获取不到的。

当然我们可以使用`Object.getOwnPropertySymbols(obj)`来获取`Symbol类型的属性名`。这个方法的作用类似于`Object.keys()`方法。