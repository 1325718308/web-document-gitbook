### JavaScript中数组的一些操作
#### 一、数组扁平化（n纬数组转化成1维数组）
```
const arr = [1,2,3,[4,5,6,[7,8]]];
```
##### 使用flat()

```
/** 
 * 方法2 flat()
 * @param {*} arr 原始数组
 * @param {*} n 数组的维度
 */
function fn(arr, n) {
    return arr.flat(n - 1)
}
```
##### 使用正则
```
/**
 * 方法4 使用正则
 * @param {*} arr 
 */
function fn(arr) {
    return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
}
```
##### 使用递归
```
/**
 * 方法3 递归
 * @param {*} arr 原始数组
 */
function fn(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            fn(arr[i]);
        } else {
            res.push(arr[i]) 
        }
    }
    return res;
}
```
##### 使用reduce
```
/**
 * 方法4 使用reduce
 * @param {*} arr 
 */
function fn(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? fn(cur) : cur);
    }, [])
}
```
#### 二、数组去重
##### 使用set
```
/**
 * 使用Set
 * @param {*} arr 
 */
function arrDuplicateRemoval(arr) {
    return Array.from(new Set(arr));
}
```
##### 使用indexOf
```
/**
 * 使用indexOf
 * @param {*} arr 
 */
function arrDuplicateRemoval(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i ++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i]);
        }
    }
    return res;
}
```
##### 使用filter
```
/**
 * 使用filter
 * @param {*} arr 
 */
function arrDuplicateRemoval(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}
```
##### 使用includes
```
/**
 * 使用includes
 * @param {*} arr 
 */
function arrDuplicateRemoval(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i ++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
```
#### 三、类数组转换为数组
##### 使用Set
```
/**
 * 方法1
 * @param {*} set 原始数据 是一个Set类型的值
 */
function toArray(set) {
    Array.from(set);
}
```
##### 使用slice
```
// 方法2
Array.prototype.slice.call(document.querySelectorAll('div'));
```
##### 扩展运算符
```
// 方法3 扩展运算符
[...document.querySelectorAll('div')];
[...arguments];
```
##### 使用concat
```
Array.prototype.concat.apply([], document.querySelectorAll('div'));
```
#### 四、获取数组最大值
```
const arr = [2,4,8,1,19,1,7];
```
##### 使用Math.max() + apply()
```
const max = Math.max.apply(null, arr);
```
##### 使用Math.max() + call()
```
const max = Math.max.call(null, ...arr);
```
##### 使用sort()
```
const max = arr.sort((a, b) => {
    return a - b;
})[0]
```
