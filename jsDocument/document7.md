## 对象的深拷贝和浅拷贝
在理解对象的深拷贝和浅拷贝之前我们首先要知道JavaScript的数据类型，JavaScript包含两大数据类型，**基本数据类型**和**引用数据类型**。
### 基本数据类型
基本数据类型是值存储在栈中的一些简单的数据。比如:
```
    let a = '123';
    let b = 2;
```
在JavaScript中的基本数据类型有`String、Number、Boolean、Undefined、Null、Symbol`(ES6新增的)。基本数据类型都是按值访问的。比如把变量a赋值给变量b，修改变量a的值不会影响变量b的值，它们两个是互相独立的，互不影响。在存储栈中这个两个变量分别分配了空间。

```
    let a = '123';
    let b = a;
    a = 10;
    console.log(a) // 10
    console.log(b) // 123
```
### 引用数据类型
引用类型值是引用类型的实例，它是保存在堆内存中的一个对象，引用类型是一种数据结构，最常用的是`Object,Array,Function`类型，另外还有`Date,RegExp,Error`等，ES6同样也提供了`Set,Map2`种新的数据结构。
```
    let obj1 = {
        a: '1'
    }
    let obj2 = obj1;
    obj1.a = '2';

    console.log(obj1.a); // 2
    console.log(obj2.a) // 2
```
看看上面的代码，发现和基本数据类型的结果不太一样，我们把obj1赋值给了obj2，修改obj1的值，obj2的值也发生了改变。由于引用数据类型的值是存储的堆内存中，而在栈内存中存储了指向堆内存中的指针（地址），我们上面代码中的赋值操作只是赋值了指针（地址）。而指针指向的堆内存还是同一个。

![这是图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8c22117eb7340518293aab74cd70380~tplv-k3u1fbpfcp-zoom-1.image)
### 浅拷贝
浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。

JavaScript中常见的一些浅拷贝方法

#### Object.assign()

```
    let target = {}; // 目标对象
    let source = {
        a: 1
    } // 原对象

    Object.assign(target, source);
    console.log(target.a); // 1
    source.a = 2;
    console.log(source.a); // 2
    console.log(target.a); // 1
```
Object.assign()是一个浅拷贝，它值拷贝了对象的第一层属性。如果对象的属性仍然是一个对象，就无法实现拷贝了。

除了`Object.assign()`能实现对象的浅拷贝之外，扩展运算符`var cloneObj = { ...obj }; Array.prototype.slice()`、也都是浅拷贝。
### 手动实现一个浅拷贝
```
/**
 * 浅拷贝
 * @param {*} origin 
 */
function shalldowCopy(origin) {
    let obj = Array.isArray(origin) ? [] : {};
    if (origin && typeof origin === 'object') {
        for(let key in origin) {
            if (origin.hasOwnProperty(key)) {
                obj[key] = origin[key];
            }
        }
    }
    return obj;
}
```
测试一下
```
var sourceObj = { a:1, arr: [2,3] };
var targetObject = shallowCopy(sourceObj);
```
因为浅拷贝只会将对象的各个属性进行依次复制，并不会进行递归复制，而 JavaScript 存储对象都是存地址的，所以浅拷贝会导致 `sourceObj.arr` 和 `targetObject.arr` 指向同一块内存地址。所以导致的结果就是：
```
shallowObj.arr[1] = 5;
obj.arr[1]; // = 5
```

### 深拷贝
深拷贝就是指将一个对象完整的复制一份新的出来，在堆内存中开辟一份新的存储空间。如果对象的属性是对象，也依旧会拷贝。

JavaScript中常见的一些深拷贝方法
#### JSON.stringify()
`JSON.stringify()`是目前前端开发过程中最常用的深拷贝方式，原理是把一个对象序列化成为一个JSON字符串，将对象的内容转换成字符串的形式再保存在磁盘上，再用`JSON.parse()`反序列化将JSON字符串变成一个新的对象

```
    let target = {}; // 目标对象
    let source = {
        a: 1,
        b: {
            d: 3
        }
    } // 原对象
    let targetStr = JSON.stringify(source);
    let target = JSON.parse(targetStr);
    console.log(target); // {a: 1, b: {d: 3}}
    source.b.d = 10;
    console.log(source); // {a: 1, b: {d: 10}}
    console.log(target); // {a: 1, b: {d: 3}}
```
#### 手动实现一个深拷贝
```
/**
 *  深拷贝
 * @param {*} origin 
 */
function deepCopy(origin) {
    let obj = Array.isArray(origin) ? [] : {};
    if (origin && typeof origin === 'object') {
        for(let key in origin) {
            let item = origin[key];
            if (item && typeof item === 'object') {
                obj[key] = deepCopy(item); 
            } else {
                obj[key] = item;
            }
        }
    }
    return obj;
}
```
测试一下
```
var sourceObj = { a:1, arr: [2,3] };
var targetObject = deepCopy(sourceObj); 
shallowObj.arr[1] = 5;
obj.arr[1]; // = 3
``` 

