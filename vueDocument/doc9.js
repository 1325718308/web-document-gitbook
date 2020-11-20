// // let obj = {}
// // Object.defineProperty(obj, key, {
// //     writable: true,
// //     enumerable: true,
// //     configurable: true,
// //     get() {
// //         return '312321'
// //     },
// //     set(val) {

// //     }
// // })

// var target = {
//     a: 1,
//     b: 2
// }

// var proxy = new Proxy(target, {
//     get(target, prop) {
//         console.log(`This is property value ${target[prop]}`)
//         return target[prop];
//     },
//     set(target, prop, val) {
//         target[prop] = val;
//     }
// })

// // ECMAScript 委员会 14种对象操作方法

// var obj = {a: 1, b: 2}
// // 1.获取原型 [[getPrototypeOf]]
// var proto = Object.getPrototypeOf(obj);
// obj.__proto__;
// Object.prototype

// // 2.设置原型 [[setPrototypeOf]]
// Object.setPrototypeOf(obje, {a: 1, b: 2});
// obj.__proto__ = {a: 1, b: 2}

// // 3.获取对象的扩展性 [[isExtensible]]
// var extensible = Object.isExtensible(obj);
// console.log(extensible); // true
// Object.freeze(obj); // 冻结对象，不可删除，不可修改，不可写入，可枚举
// var extensible2 = Object.isExtensible(obj)
// console.log(extensible); // false

// Object.seal(obj) // 封闭对象 不可删除，可以修改，不可写入，可枚举
// obj.c = 3;
// obj.b = 3;
// delete obj.a; 

// // 4.获取自由属性 [[getOwnProperty]]
// Object.getOwnPropertyNames()

// // 5.禁止扩展对象 [[preventExtensions]]
// Object.preventExtensions(obj);
// obj.c = 3;
// delete obj.a; // 禁止增加属性
// console.log(obj) // 可删除属性

// // 6.拦截对象的操作
// Object.defineProperty();

// // 7.判断是否是自身属性[[hasOwnProperty]]
// obj.hasOwnProperty('a');

// // 8.[[GET]]
// console.log('a' in obj);
// console.log(obj.a);

// // 9.[[SET]]
// obj.a = 1;
// obj['b'] = 2;

// // 10.[[Delete]]
// delete obj.a;

// // 11.[[enumerable]]
// for(let key in obj) {
//     console.log(obj[key])
// }

// // 12.获取键集合
// Object.key(obj)

// let target = {a: 1, b: 2}
// let proxy = new Proxy(target, {
//     get:function(target, prop) {
//         return target[prop];
//     },
//     set: function(target, prop, val) {
//         target[prop] = val;
//     }
// })

// console.log(proxy.a); //
// proxy.b = 4;
// console.log(proxy.b); //

// defineProperty

function MyProxy(target, handler) {
    let _target = deepClone(target);
    Object.keys(_target).forEach(key => {
        Object.defineProperty(_target, key, {
            get() {
                return handler.get && handler.get(target, key);
            },
            set(newVal) {
                handler.set && handler.set(target, key, newVal)
            }
        })
    })

    // 深拷贝
    function deepClone(org, tar) {
        var tar = tar || {},
            toStr = Object.prototype.toString(),
            arrType = '[object, array]';
        for(var key in org) {
            if (org.hasOwnProperty(key)) {
                if (typeof org[key] === 'object' && org[key] !== null) {
                    tar[key] = toStr.call(org[key]) === arrType ? [] : {};
                    deepClone(org[key], tar[key])
                } else {
                    tar[key] = org[key]
                }
            } 
        }
        return tar;
    }
}
var target = {
    a: 1,
    b: 2
}
var proxy = new MyProxy(target, {
    get(target, prop) {
        console.log(`This is property value ${target[prop]}`)
        return target[prop];
    },
    set(target, prop, val) {
        target[prop] = val;
    }
})