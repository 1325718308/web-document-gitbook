// /******* 函数作为返回值 ********/
// /**
//  * 模拟实现 once 只会执行一次
//  * @param {*} fn 
//  */
// const once = fn => {
//     let done = false;
//     return function() {
//         if (!done) {
//             done = true;
//             return fn.apply(arguments);
//         }
//     }
// }
// let pay = once(function(money) {
//     console.log(`支付：¥${money}`)
// })
// pay(5); // 支付：¥5
// pay(8); // 不会执行了
// pay(9); // 不会执行了

// /******* 函数作为参数 ********/
// /**
//  * 模拟实现forEach
//  * @param {*} arr 
//  * @param {*} fn 
//  */
// const forEach = (arr, fn) => {
//     for (let index = 0; index < arr.length; index++) {
//         fn(arr[index])
//     }
// }

// let arr = [1, 2, 3, 4, 5];
// forEach(arr, item => {
//     console.log(item);
// })

// /**
//  * 模拟实现 filter 过滤数组中
//  * @param {*} arr 
//  * @param {*} fn 
//  */
// const filter = (arr, fn) => {
//     let results = [];
//     for (let index = 0; index < arr.length; index++) {
//         const element = arr[index];
//         if (fn(element)) {
//             results.push(element); 
//         }
//     }
//     return results;
// }
// let arr = [1,2,3,4,5,6];
// const res = filter(arr, v => v % 2 === 0);
// console.log(res); // [2, 4, 6]
// /**
//  * 模拟实现 map 
//  * @param {*} arr 
//  * @param {*} fn 
//  */
// const map = (arr, fn) => {
//     let results = [];
//     for (let index = 0; index < arr.length; index++) {
//         results.push(fn(arr[index]));
//     }
//     return results;
// }

// let arr = [1,2,3,4];
// arr = map(arr, v => v * v);
// console.log(arr); // [1, 4, 9, 16]

// /**
//  * 模拟实现 every 数组中所有的都满足条件才为true
//  * @param {*} arr 
//  * @param {*} fn 
//  */
// const every = (arr, fn) => {
//     let result = true;
//     for (let index = 0; index < arr.length; index++) {
//        result = fn(arr[index])
//        if (!result) {
//            break;
//        }
//     }
//     return result;
// }
// let arr1 = [9, 12, 13];
// let arr2 = [11, 12, 13];
// const res1 = every(arr1, v => v > 10);
// const res2 = every(arr2, v => v > 10);
// console.log(res1); // false
// console.log(res2); // true

// /**
//  * 模拟some 数组中有一个满足条件的即为true
//  * @param {*} arr 
//  * @param {*} fn 
//  */
// const some = (arr, fn) => {
//     let result = false;
//     for (let index = 0; index < arr.length; index++) {
//         result = fn(arr[index]);
//         if (result) {
//             break;
//         }
//     }
//     return result;
// }
// let arr1 = [1, 2, 3, 5];
// let arr2 = [1, 3, 5, 7];
// const res1 = some(arr1, v => v % 2 === 0);
// const res2 = some(arr2, v => v % 2 === 0);
// console.log(res1); // true
// console.log(res2); // false

// /**
//  * 模拟实现 findIndex 返回满足条件的第一个元素的索引
//  * @param {*} arr 
//  * @param {*} fn 
//  */
// const findIndex = (arr, fn) => {
//     let result = -1;
//     for (let index = 0; index < arr.length; index++) {
//         const element = arr[index];
//         if (fn(element)) {
//             result = index;
//             break;
//         }
//     }
//     return result;
// }

// const arr = [1, 3, 4, 7, 9];
// const res = findIndex(arr, item => {
//     return item > 3;
// })
// console.log(res); // 2

// /**
//  * 模拟实现lodash中的memoize方法，实现结果缓存
//  * @param {*} fn 
//  */
// function memoize(fn) {
//     let cache = {};
//     return function() {
//         let key = JSON.stringify(arguments);
//         cache[key] = cache[key] || fn.apply(fn, arguments);
//         return cache[key];
//     }
// }
// function getArea (r) {
//     console.log(r)
//     return Math.PI * r * r
// }
// const getAreaWithMemory = memoize(getArea)
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));

// function curry(func) {
//     return function curriedFn(...args) {
//         // 判断实参和形参的个数
//         if (args.length < fun.length) {
//             return function() {
//                 return curriedFn(...args.concat(Array.from(arguments)))
//             }
//         }
//         // 实参和形参个数相同，调用 func，返回结果
//         return func(...args);
//     }
// }


// const _ = require('lodash');

// const reverse = arr => arr.reverse();
// const first = arr => arr[0];
// const toUpper = s => s.toUpperCase();

// const f = _.flowRight(toUpper ,first ,reverse)
// console.log(f(['one', 'two', 'three']))
// function compose(...fns) {
//     return function (value) {
//         return fns.reverse().reduce(function (acc, fn) {
//             return fn(acc)
//         }, value)
//     }
// }
// 箭头函数
// const compose = (...fns) => value => fns.reverse().reduce((acc, fn) => fn(acc), value)
// const toUpper = s => s.toUpperCase() 
// const reverse = arr => arr.reverse() 
// const first = arr => arr[0]
// const f = compose(toUpper, first, reverse)
// console.log(f(['one', 'two', 'three']))

// function curry(func) {
//     return function curriedFn(...args) {
//         if (args.length < func.length) {
//             return function() {
//                 return curriedFn(...args.concat(Array.from(arguments)));
//             }
//         }
//         return func(...args);
//     }
// }

// const curryMatch = curry(function(reg, str) {
//     return str.match(reg) ? true : false;
// })
// const hasSpace = curryMatch(/\s+/g);
// const hasNumber = curryMatch(/\d+/g);
// console.log(hasNumber('123b'))
// console.log(hasSpace('hdhdhh22'))

// function sum(a, b, c) {
//     return a + b + c
// }
// const currySum = curry(sum)
// console.log(currySum(1)(2)(3))
// console.log(currySum(1, 2))
// console.log(currySum(1, 2)(3))
// console.log(currySum(1, 2, 3))


// const curry = fun => {
//     return function curriedFn (...args){
//         if (args.length < fun.length) {
//             return curriedFn(...args.concat(Array.from(arguments)));
//         }
//         return func(...args);
//     }
// }

// Function.prototype.myBind = function(context, ...args) {
//     return (...rest) => this.call(context, ...args, ...rest);
// }
// Function.prototype.myApply = function(context, args) {
//     context._fn = this;
//     let res = context._fn(...args);
//     delete context._fn;
//     return res;
// }

// Function.prototype.myCall = function(context, ...args) {
//     context._fn = this;
//     let res = context._fn(...args);
//     delete context._fn;
//     return res;
// }
// let obj = {
//     a: 1,
//     b: 2
// }
// function fun(x, y) {
//     console.log(this);
// }

// fun.myCall(obj, 1, 2);

// async function func() {
// }
// const res = func();
// console.log(res)
// res.then(res => {
//     console.log(res)
// })
// async function async1() {
//     console.log('A');
//     await async2();
//     console.log('B');
// }
// async function async2() {
//     console.log('C');
// }
// console.log('D');
// setTimeout(() => {
//     console.log('F');
// }, 0)
// async1();
// new Promise(resolve => {
//     console.log('G');
//     resolve();
// }).then(() => console.log('G'));
// console.log('I');


function commonFunc() {
    console.log('commonFunc start...');
    return 'commonFunc end';
}
async function fn1() {
    console.log('fn1 start...');
    return 'fn1 end';
}
async function fn2() {
    console.log('fn2 start...');
    let res1 = await commonFunc();
    console.log(res1);
    let res2 = await fn1();
    console.log(res2);
}
fn2();
let promise = new Promise(resolve => {
    console.log('promise start...');
    resolve('this is a promise');
});
promise.then(value => console.log(value));

