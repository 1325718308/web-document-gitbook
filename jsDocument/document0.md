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
