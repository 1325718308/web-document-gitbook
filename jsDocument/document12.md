# 函数式编程
## 内容介绍
* 为什么要学习函数编程以及什么是函数式编程
* 函数式编程的特性(纯函数、柯里化、函数组合等)
* 函数式编程的应用场景

## 为什么要学习函数式编程
函数式编程是非常古老的一个概念，早于第一台计算机的诞生，[函数式编程的历史](https://zhuanlan.zhihu.com/p/24648375?refer=marisa)。那我们为什么现在还要学函数式编程?

* 函数式编程是随着 React 的流行受到越来越多的关注
* Vue 3也开始拥抱函数式编程
* 函数式编程可以抛弃 this
* 打包过程中可以更好的利用 tree shaking 过滤无用代码 
* 方便测试、方便并行处理 
* 有很多库可以帮助我们进行函数式开发:lodash、underscore、ramda

## 什么是函数式编程
函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程 编程、面向对象编程。
* 面向对象编程的思维方式:把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和
  多态来演示事物事件的联系
* 函数式编程的思维方式:把现实世界的事物和事物之间的联系抽象到程序世界(对运算过程进行抽 象)

    - 程序的本质:根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和 输出的函数
    - x -> f(联系、映射) -> y，y=f(x) 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如:y = sin(x)，x和y的关系
    - 相同的输入始终要得到相同的输出(纯函数) 函数式编程用来描述数据(函数)之间的映射

```
// 非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2 console.log(sum)
// 函数式
function add (n1, n2) {
  return n1 + n2
}
let sum = add(2, 3)
console.log(sum)
```
## 前置知识
* 函数是一等公民
* 高阶函数
* 闭包

## 函数是一等公民
[MDN First-class Function](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)
* 函数可以存储在变量中
* 函数作为参数
* 函数作为返回值

在 JavaScript 中**函数就是一个普通的对象** (可以通过 `new Function()` )，我们可以把函数存储到变量/ 数组中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过`new Function('alert(1)')` 来构造一个新的函数。
* 把函数赋值给变量

```
// 把函数赋值给变量
let fn = function () {
console.log('Hello First-class Function') }
fn()
// 一个示例
const BlogController = {
index (posts) { return Views.index(posts) },
show (post) { return Views.show(post) },
create (attrs) { return Db.create(attrs) },
update (post, attrs) { return Db.update(post, attrs) }, destroy (post) { return Db.destroy(post) }
}
// 优化
const BlogController = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destroy: Db.destroy
}
```
* 函数是一等公民是我们后面要学习的高阶函数、柯里化等的基础

## 高阶函数
### 什么是高阶函数（High-order function）
* 可以把函数作为参数传递给另一个函数
* 可以把函数作为另一个函数的返回结果

### 函数作为参数
```
// 函数作为参数-实现数组的foreach方法
function forEach(arr, fn) {
    for(let i = 0; i < arr.length; i++) {
        fn(arr[i]);
    }
}

let arr = [1, 2, 3, 4, 5];
forEach(arr, function(item) {
    console.log(item) // 1 2 3 4 5
})
```
```
// 函数作为参数-实现数组的filter方法
function filter(arr, fn) {
    let results = [];
    for(let i = 0; i < arr.length; i++) {
        if (fn(arr[i])){
            results.push(arr[i]) 
        }
    }
    return results;
}
let arr = [1, 2, 3, 4, 5];
let res = filter(arr, function(item){
    return item % 2 === 0;
})
console.log(res); // [2, 4];
```
### 函数作为返回结果
```
function makeFn() {
    let msg = "hello function";
    return function() {
        console.log(msg)
    }
}
makeFn()(); // hello function
```
```
/**
 * 模拟实现once函数（只执行一次）
 * @param {*} fn 
 */
function once(fn) {
    let done = false;
    return function() {
        if (!done) {
            done = true;
            return fn.apply(this, arguments);
        }
    }
}

let pay = once(function(money) {
    console.log(`支付：¥${money}`)
})
pay(5); // 支付：¥5
pay(8); // 不会执行了
pay(9); // 不会执行了
``` 
### 使用高阶函数的意义
* 抽象可以帮助我们屏蔽细节，只需要关注我们想要结果
* 高阶函数是用来抽象通用的问题

### 常用的高阶函数
#### 数组中的一些方法
* forEach
* map
* filter
* every
* some
* find/findIndex

#### 模拟实现上面的函数
* forEach

```
/**
 * 模拟实现forEach
 * @param {*} arr 
 * @param {*} fn 
 */
const forEach = (arr, fn) => {
    for (let index = 0; index < arr.length; index++) {
        fn(arr[index])
    }
}

let arr = [1, 2, 3, 4, 5];
forEach(arr, item => {
    console.log(item);
})
```
* filter

```
/**
 * 模拟实现 filter 过滤数组中
 * @param {*} arr 
 * @param {*} fn 
 */
const filter = (arr, fn) => {
    let results = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (fn(element)) {
            results.push(element); 
        }
    }
    return results;
}
let arr = [1,2,3,4,5,6];
const res = filter(arr, v => v % 2 === 0);
console.log(res); // [2, 4, 6]
```
* map

```
/**
 * 模拟实现 map 
 * @param {*} arr 
 * @param {*} fn 
 */
const map = (arr, fn) => {
    let results = [];
    for (let index = 0; index < arr.length; index++) {
        results.push(fn(arr[index]));
    }
    return results;
}

let arr = [1,2,3,4];
arr = map(arr, v => v * v);
console.log(arr); // [1, 4, 9, 16]
```
* every 数组中所有的都满足条件才为true

```
/**
 * 模拟实现 every 数组中所有的都满足条件才为true
 * @param {*} arr 
 * @param {*} fn 
 */
const every = (arr, fn) => {
    let result = true;
    for (let index = 0; index < arr.length; index++) {
       result = fn(arr[index])
       if (!result) {
           break;
       }
    }
    return result;
}
let arr1 = [9, 12, 13];
let arr2 = [11, 12, 13];
const res1 = every(arr1, v => v > 10);
const res2 = every(arr2, v => v > 10);
console.log(res1); // false
console.log(res2); // true
```
* some 数组中有一个满足条件的即为true

```
/**
 * 模拟some 数组中有一个满足条件的即为true
 * @param {*} arr 
 * @param {*} fn 
 */
const some = (arr, fn) => {
    let result = false;
    for (let index = 0; index < arr.length; index++) {
        result = fn(arr[index]);
        if (result) {
            break;
        }
    }
    return result;
}
let arr1 = [1, 2, 3, 5];
let arr2 = [1, 3, 5, 7];
const res1 = some(arr1, v => v % 2 === 0);
const res2 = some(arr2, v => v % 2 === 0);
console.log(res1); // true
console.log(res2); // false
```
* findIndex 返回满足条件的第一个元素的索引

```
/**
 * 模拟实现 findIndex 返回满足条件的第一个元素的索引
 * @param {*} arr 
 * @param {*} fn 
 */
const findIndex = (arr, fn) => {
    let result = -1;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (fn(element)) {
            result = index;
            break;
        }
    }
    return result;
}

const arr = [1, 3, 4, 7, 9];
const res = findIndex(arr, item => {
    return item > 3;
})
console.log(res); // 2
```
## 闭包
* 闭包 (Closure):函数和其周围的状态(词法环境)的引用捆绑在一起形成闭包。

    - 可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员

```
// 函数作为返回值
function makeFn() {
    let msg = "hello function";
    return function() {
        console.log(msg)
    }
}
makeFn()(); // hello function
```
```
/**
 * 模拟实现once函数（只执行一次）
 * @param {*} fn 
 */
function once(fn) {
    let done = false;
    return function() {
        if (!done) {
            done = true;
            return fn.apply(this, arguments);
        }
    }
}

let pay = once(function(money) {
    console.log(`支付：¥${money}`)
})
pay(5); // 支付：¥5
pay(8); // 不会执行了
pay(9); // 不会执行了
``` 
* 闭包的本质:函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员
* 闭包案例

```
// 生成计算数字的多少次幂的函数 
function makePower (power) {
    return function (x) { 
        return Math.pow(x, power)
    } 
}
let power2 = makePower(2); 
let power3 = makePower(3);
console.log(power2)
console.log(power3(4))
```
```
// 第一个数是基本工资，第二个数是绩效工资 
function makeSalary (x) {
    return function (y) {
      return x + y;
    } 
}
let salaryLevel1 = makeSalary(1500); 
let salaryLevel2 = makeSalary(2500);
console.log(salaryLevel1(2000)); 
console.log(salaryLevel1(3000));
```

## 纯函数
* **纯函数:相同的输入永远会得到相同的输出**，而且没有任何可观察的副作用
    - 纯函数就类似数学中的函数(用来描述输入和输出之间的关系)，y = f(x)
* [lodash](https://github.com/lodash/lodash) 是一个纯函数的功能库，提供了对数组、数 字、对象、字符串、函数等操作的一些方法 
* 数组的 slice 和 splice 分别是:纯函数和不纯的函数

    - slice 返回数组中的指定部分，不会改变原数组 
    - splice 对数组进行操作返回该数组，会改变原数组

```
let numbers = [1, 2, 3, 4, 5] 
// 纯函数
numbers.slice(0, 3)
// => [1, 2, 3] 
numbers.slice(0, 3)
// => [1, 2, 3]
numbers.slice(0, 3)
// => [1, 2, 3]
// 不纯的函数 
numbers.splice(0, 3) 
// => [1, 2, 3] 
numbers.splice(0, 3) 
// => [4, 5] 
numbers.splice(0, 3) 
// => []
```
* 函数式编程不会保留计算中间的结果，所以变量是不可变的(无状态的)
* 我们可以把一个函数的执行结果交给另一个函数去处理

## 纯函数的好处
* 可缓存
    - 因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来

```
const _ = require('lodash')
function getArea (r) {
  return Math.PI * r * r
}
let getAreaWithMemory = _.memoize(getArea) 
console.log(getAreaWithMemory(4))
```
* 自己模拟一个 memoize 函数

```
function memoize (f) {
  let cache = {}
  return function () {
        let arg_str = JSON.stringify(arguments)
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments) 
        return cache[arg_str]
    } 
}
```
* 可测试
    - 纯函数让测试更方便
* 并行处理
    - 在多线程环境下并行操作共享的内存数据很可能会出现意外情况 
    - 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数 (Web Worker)

## 副作用
* 纯函数:对于相同的输入永远会得到相同的输出，而且没有任何可观察的**副作用**

```
// 不纯的
let mini = 18
function checkAge (age) {
  return age >= mini
}
// 纯的(有硬编码，后续可以通过柯里化解决) 
function checkAge (age) {
    let mini = 18
    return age >= mini
}
```
副作用让一个函数变的不纯(如上例)，纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部 的状态就无法保证输出相同，就会带来副作用。

## 柯里化 (Haskell Brooks Curry)
* 使用柯里化解决上一个案例中硬编码的问题

```
function checkAge (age) { 
    let min = 18
    return age >= min
}
// 普通纯函数
function checkAge (min, age) {
  return age >= min
}
checkAge(18, 24)
checkAge(18, 20)
checkAge(20, 30)
// 柯里化
function checkAge (min) {
  return function (age) {
    return age >= min
} }
// ES6 写法
let checkAge = min => (age => age >= min)
let checkAge18 = checkAge(18) 
let checkAge20 = checkAge(20)
checkAge18(24)
checkAge18(20)
```
* 柯里化 (Currying): 
    - 当一个函数有多个参数的时候先传递一部分参数调用它(这部分参数以后永远不变)
    - 然后返回一个新的函数接收剩余的参数，返回结果

## lodash 中的柯里化函数
* _.curry(func)
    - 功能:创建一个函数，该函数接收一个或多个 func 的参数，如果 func 所需要的参数都被提 供则执行 func 并返回执行的结果。否则继续返回该函数并等待接收剩余的参数。 
    - 参数:需要柯里化的函数
    - 返回值:柯里化后的函数

```
const _ = require('lodash') // 要柯里化的函数
function getSum (a, b, c) {
  return a + b + c
}
// 柯里化后的函数
let curried = _.curry(getSum) // 测试
curried(1, 2, 3) 
curried(1)(2)(3)
curried(1, 2)(3)
```

* 案例

```
const _ = require('lodash')
const match = _.curry(function (reg, str) {
     return str.match(reg)
})
const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g) 
console.log(haveSpace('hello world'))
console.log(haveNumber('25$'))
const filter = _.curry(function (func, array) { 
    return array.filter(func)
})
console.log(filter(haveSpace, ['John Connor', 'John_Donne']))
const findSpace = filter(haveSpace) 
console.log(findSpace(['John Connor', 'John_Donne']))
```
* 模拟 _.curry() 的实现

```
function curry (func) {
    return function curriedFn (...args) {
        // 判断实参和形参的个数
        if (args.length < func.length) {
            return function () {
                return curriedFn(...args.concat(Array.from(arguments)))
            } 
        }
    // 实参和形参个数相同，调用 func，返回结果
    return func(...args)
  }
}
```

## 总结
* 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数 
* 这是一种对函数参数的'缓存'
* 让函数变的更灵活，让函数的粒度更小 
* 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能

## 函数组合
* 纯函数和柯里化很容易写出洋葱代码 h(g(f(x)))
    - 获取数组的最后一个元素再转换成大写字母， _.toUpper(_.first(_.reverse(array)))
* 函数组合可以让我们把细粒度的函数重新组合生成一个新的函数

### 管道
下面这张图表示程序中使用函数处理数据的过程，给 fn 函数输入参数 a，返回结果 b。可以想想 a 数据 通过一个管道得到了 b 数据。
<img src='https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25259c93822842a088538f68ea610c97~tplv-k3u1fbpfcp-watermark.image' width='600'>

当 fn 函数比较复杂的时候，我们可以把函数 fn 拆分成多个小函数，此时多了中间运算过程产生的 m 和 n。

下面这张图中可以想象成把 fn 这个管道拆分成了3个管道 f1, f2, f3，数据 a 通过管道 f3 得到结果 m，m 再通过管道 f2 得到结果 n，n 通过管道 f1 得到最终结果 b
<img src='https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b4808a6050d4b1dac4aa5a71c4b5112~tplv-k3u1fbpfcp-watermark.image' width='600'>
```
fn = compose(f1, f2, f3)
b = fn(a)
```

### 函数组合
* 函数组合 (compose):如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间 过程的函数合并成一个函数
    - 函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终
    结果
    - **函数组合默认是从右到左执行**

```
// 组合函数
function compose (f, g) {
  return function (x) {
    return f(g(x))
} }
function first (arr) {
  return arr[0]
}
function reverse (arr) {
  return arr.reverse()
}
// 从右到左运行
let last = compose(first, reverse) 
console.log(last([1, 2, 3, 4]))
```
* lodash 中的组合函数
* lodash 中组合函数 flow() 或者 flowRight()，他们都可以组合多个函数
  
* flow() 是从左到右运行
* **flowRight()** 是从右到左运行，使用的更多一些

```
const _ = require('lodash')
const toUpper = s => s.toUpperCase() 
const reverse = arr => arr.reverse() 
const first = arr => arr[0]
const f = _.flowRight(toUpper, first, reverse) 
console.log(f(['one', 'two', 'three']))
```
* 模拟实现 lodash 的 flowRight 方法

```
// 多函数组合
function compose (...fns) {
    return function (value) {
        return fns.reverse().reduce(function (acc, fn) {
            return fn(acc)
        }, value)
    } 
}
// ES6
const compose = (...fns) => value => fns.reverse().reduce((acc, fn) => fn(acc), value)
```
* 函数的组合要满足结合律 (associativity):
    - 我们既可以把 g 和 h 组合，还可以把 f 和 g 组合，结果都是一样的

```
// 结合律(associativity)
let f = compose(f, g, h)
let associative = compose(compose(f, g), h) == compose(f, compose(g, h)) 
// true
```
* 所以代码还可以像下面这样

```
const _ = require('lodash')
// const f = _.flowRight(_.toUpper, _.first, _.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse) const f = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))
console.log(f(['one', 'two', 'three']))
 // => THREE
```