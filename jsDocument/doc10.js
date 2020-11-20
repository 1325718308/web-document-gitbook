
/**-------------数组扁平化------------------*/

const arr = [1,2,3,[4,5,6,[7,8]]];

/** 方法1 reduce  */
const fn = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? fn(cur) : cur);
    }, [])
}

/** 
 * 方法2 flat()
 * @param {*} arr 原始数组
 * @param {*} n 数组的维度
 */
function fn(arr, n) {
    return arr.flat(n - 1)
}

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

/**
 * 方法4 使用正则
 * @param {*} arr 
 */
function fn(arr) {
    return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
}

/**-------------数组去重------------------*/

/**
 * 使用Set
 * @param {*} arr 
 */
function arrDuplicateRemoval(arr) {
    return Array.from(new Set(arr));
}
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
/**
 * 使用filter
 * @param {*} arr 
 */
function arrDuplicateRemoval(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}
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
/**-------------类数组转换为数组------------------*/

/**
 * 方法1
 * @param {*} set 原始数据 是一个Set类型的值
 */
function toArray(set) {
    Array.from(set);
}
// 方法2
Array.prototype.slice.call(document.querySelectorAll('div'));

// 方法3 扩展运算符
[...document.querySelectorAll('div')];
[...arguments];

// 方法4 使用concat
Array.prototype.concat.apply([], document.querySelectorAll('div'));


/**-------------函数防抖/函数截流------------------*/

/**
 * 函数防抖：
 * 执行目标方法时，会等待一段时间。当又执行相同方法时，
 * 若前一个定时任务未执行完，则 clear 掉定时任务，重新定时
 * @param {*} fun 
 * @param {*} await 
 */
function _debounce(fun, await) {
    let timer;
    return () => {
        clearInterval(timer);
        timer = setTimeout(fun, await);
    }
}

/**
 * 函数截流：
 * 目标函数fun在await时间内只会执行一次
 * @param {*} cun 
 * @param {*} await 
 */
function _throttle(fun, await) {
    let timer;
    return () => {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fun();
            timer = null;
        },await);
    }
}

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
/**
 * 手动实现call方法
 * @param {*} obj 
 * @param  {...any} args 
 */
Function.prototype.myCall = function(obj, ...args) {
    obj._fn = this;
    let val = obj._fn(...args);
    delete obj._fn;
    return val;
}

/**
 *  手动实现apply
 * @param {*} obj 
 * @param {*} arr 
 */
Function.prototype.myApply = function(obj, arr) {
    let args = [];
    let val;
    for(let i = 0; i < arr.length; i++) {
        args.push('arr['+ i +']');
    }
    obj._fn = this;
    val = eval('obj._fn('+ args +')');
    delete obj._fn;
    return val;
}