# 手动实现promise
## 第一步、核心类逻辑实现
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        exector(this.resolve, this.reject);
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 判断状态
        if (this.status === FULFILLED) {
            // 如果成功则调用successCallback
            successCallback(this.value);
        } else if (this.status === REJECTED) {
            // 如果失败则调用failCallback
            failCallback(this.reason);
        }
    }
}
```

## 第二步、在Promise中加入异步逻辑

```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        exector(this.resolve, this.reject);
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallback = undefined;
    // 存储失败的回调
    failCallback = undefined;
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        this.successCallback && this.successCallback(this.value);
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        this.failCallback && this.failCallback(this.reason);
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 判断状态
        if (this.status === FULFILLED) {
            // 如果成功则调用successCallback
            successCallback(this.value);
        } else if (this.status === REJECTED) {
            // 如果失败则调用failCallback
            failCallback(this.reason);
        } else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallback = successCallback;
            this.failCallback = failCallback;
        }
    }
}
```
## 第三步、实现then方法多次调用添加多个处理函数

一个promise对象的then方法可以被多次调用
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        exector(this.resolve, this.reject);
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()(this.value);
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()(this.reason);
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 判断状态
        if (this.status === FULFILLED) {
            // 如果成功则调用successCallback
            successCallback(this.value);
        } else if (this.status === REJECTED) {
            // 如果失败则调用failCallback
            failCallback(this.reason);
        } else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallbacks.push(successCallback);
            this.failCallback.push(failCallback);
        }
    }
}
```
## 第四步、实现then方法的链式调用
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        exector(this.resolve, this.reject);
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()(this.value);
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()(this.reason);
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 如果成功则调用successCallback
                let x = successCallback(this.value);
                resolvePromise(x, resolve, reject);
            } else if (this.status === REJECTED) {
                // 如果失败则调用failCallback
                let x = failCallback(this.reason);
                resolvePromise(x, resolve, reject);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(successCallback);
                this.failCallbacks.push(failCallback);
            }
        })  
        return promise2;
    }
}

resolvePromise = (x, resolve, reject) => {
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第五步、then方法链式调用识别Promise对象自返回

在`then`方法的回调函数中可以返回一个`promise`对象，但是有一种情况比较特殊，如果在`then`方法的回调函数中返回了当前`then`方法返回的`promise`对象，这时候就造成了promise对象的循环调用。这是不允许的。接下来看看如何解决这一问题
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        exector(this.resolve, this.reject);
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()(this.value);
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()(this.reason);
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    // 如果成功则调用successCallback
                    let x = successCallback(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                }, 0);
            } else if (this.status === REJECTED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    // 如果失败则调用failCallback
                    let x = failCallback(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(successCallback);
                this.failCallbacks.push(failCallback);
            }
        })  
        return promise2;
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第六步、捕获错误及then链式调用其他状态代码补充
使用try catch 捕获错误
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        // 使用try catch 捕获异常
        try {
            exector(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()();
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()();
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    try {
                        // 如果成功则调用successCallback
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 如果失败则调用failCallback
                        let x = failCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果成功则调用successCallback
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果失败则调用failCallback
                            let x = failCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
            }
        })  
        return promise2;
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第七步、将then方法的参数变成可选参数
在调用`promise`的`then`方法的时候，可以不传递任何参数，例如下面的代码
```
let promise = new Promise((resolve, reject) => {
    resolve(100);
})
promise.then()
        .then()
        .then(value => console.log(value)); // 100
```
上面的情况`promise`状态会依次向下传递，直到传递给有回调的`then`方法

```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        // 使用try catch 捕获异常
        try {
            exector(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()();
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()();
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 如果successCallback存在就调用它，不存在就补一个方法
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {throw reason};
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    try {
                        // 如果成功则调用successCallback
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 如果失败则调用failCallback
                        let x = failCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果成功则调用successCallback
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果失败则调用failCallback
                            let x = failCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
            }
        })  
        return promise2;
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第八步、Promise.all方法的实现
### Promise.all的特点

* `Promise.all`是一个静态方法，定义的时候可以使用关键字`static`
* `Promise.all`接收一个数组作为参数，这个数组里有普通值也可能有`promise`对象
* `Promise.all`要求所有的promise对象的回调都成功才成功，有一个失败则失败
* `Promise.all`允许我们按照异步代码调用的顺序得到异步代码执行的结果

### Promise.all的实现
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        // 使用try catch 捕获异常
        try {
            exector(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()();
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()();
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 如果successCallback存在就调用它，不存在就补一个方法
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {throw reason};
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    try {
                        // 如果成功则调用successCallback
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 如果失败则调用failCallback
                        let x = failCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果成功则调用successCallback
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果失败则调用failCallback
                            let x = failCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
            }
        })  
        return promise2;
    }
    /**
     * 解决异步并发问题
     * 允许我们按照异步代码调用的顺序得到异步代码执行的结果
     * 返回一个promise对象
     * 参数是一个数组/普通值或promise对象
     * @param {*} array 
     */
    static all = (array) => {
        let results = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                index++;
                results[key] = value;
                // 如果相等说明所有的异步操作都执行完了
                if (index === array.length) {
                    resolve(results);
                }
                results[key] = value;
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象，判断是否成功，如果成功调用addData，失败直接reject
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    // 普通值
                    addData(i, current);
                }
            }
        })
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第九步、Promise.resolve方法的实现
* 返回一个promise对象
* 如果给定的值不是promise对象，将给定的值转换成promise对象

```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        // 使用try catch 捕获异常
        try {
            exector(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()();
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()();
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 如果successCallback存在就调用它，不存在就补一个方法
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {throw reason};
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    try {
                        // 如果成功则调用successCallback
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 如果失败则调用failCallback
                        let x = failCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果成功则调用successCallback
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果失败则调用failCallback
                            let x = failCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
            }
        })  
        return promise2;
    }
    /**
     * 解决异步并发问题
     * 允许我们按照异步代码调用的顺序得到异步代码执行的结果
     * 返回一个promise对象
     * 参数是一个数组/普通值或promise对象
     * @param {*} array 
     */
    static all = (array) => {
        let results = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                index++;
                results[key] = value;
                // 如果相等说明所有的异步操作都执行完了
                if (index === array.length) {
                    resolve(results);
                }
                results[key] = value;
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象，判断是否成功，如果成功调用addData，失败直接reject
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    // 普通值
                    addData(i, current);
                }
            }
        })
    }
    /**
     *  返回值是一个promise
     *  如果给定的值不是promise对象，将给定的值转换成promise对象
     * @param {*} value 
     */
    static resolve = (value) => {
        if (value instanceof MyPromise) {
            // promise 对象直接返回
            return value;
        } else {
            // 普通值包裹成promise对象之后在返回
            return new MyPromise((resolve, reject) => {
                resolve(value);
            })
        }
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第十步、Promise.resolve方法的实现
### 特点
* 无论当前的`promise`对象最终的状态是成功的还是失败，`finally`中的回调函数都会被执行
* 在`finally`后面可以链式调用当前then方法来拿到当前`promise`对象最终的返回结果

```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        // 使用try catch 捕获异常
        try {
            exector(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()();
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()();
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 如果successCallback存在就调用它，不存在就补一个方法
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {throw reason};
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    try {
                        // 如果成功则调用successCallback
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 如果失败则调用failCallback
                        let x = failCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果成功则调用successCallback
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果失败则调用failCallback
                            let x = failCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
            }
        })  
        return promise2;
    }
    /**
     * 解决异步并发问题
     * 允许我们按照异步代码调用的顺序得到异步代码执行的结果
     * 返回一个promise对象
     * 参数是一个数组/普通值或promise对象
     * @param {*} array 
     */
    static all = (array) => {
        let results = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                index++;
                results[key] = value;
                // 如果相等说明所有的异步操作都执行完了
                if (index === array.length) {
                    resolve(results);
                }
                results[key] = value;
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象，判断是否成功，如果成功调用addData，失败直接reject
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    // 普通值
                    addData(i, current);
                }
            }
        })
    }
    /**
     *  返回值是一个promise
     *  如果给定的值不是promise对象，将给定的值转换成promise对象
     * @param {*} value 
     */
    static resolve = (value) => {
        if (value instanceof MyPromise) {
            // promise 对象直接返回
            return value;
        } else {
            // 普通值包裹成promise对象之后在返回
            return new MyPromise((resolve, reject) => {
                resolve(value);
            })
        }
    }
    /**
     * 无论当前的`promise`对象最终的状态是成功的还是失败，`finally`中的回调函数都会被执行
     * 在`finally`后面可以链式调用当前then方法来拿到当前`promise`对象最终的返回结果
     * @param {*} callback 
     */
    finally = (callback) => {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value);
        }, reason => {
            return MyPromise.resolve(callback()).then(() => {throw reason});
        })
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
## 第十一步、catch 方法的实现
用来处理当前promise异常情况
```
const PENDING = 'pending'; // 等待的状态
const FULFILLED = 'fulfilled'; // 成功的状态
const REJECTED = 'rejected'; // 失败的状态
class MyPromise {
    /**
     * exector 执行期函数，执行new MyPromise()的时候会立即执行
     * @param {*} exector 
     */
    constructor(exector) {
        // 使用try catch 捕获异常
        try {
            exector(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }
    // promise 的状态，默认等待中
    status = PENDING;
    // 成功的值
    value = undefined;
    // 失败的原因
    reason = undefined;
    // 存储成功的回调
    successCallbacks = [];
    // 存储失败的回调
    failCallbacks = [];
    
    /**
     * 成功的回调
     * @param {*} value 
     */
    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 存储成功后的值
        this.value = value;
        // 判断成功回调石佛存在，如果存在，调用
        if (this.successCallbacks.length) this.successCallbacks.shift()();
    }
    /**
     * 失败的回调
     * @param {*} reason 
     */
    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 存储失败后的原因
        this.reason = reason;
        // 判断失败回调石佛存在，如果存在，调用
        while(this.failCallbacks.length) this.failCallbacks.shift()();
    }

    /**
     * 
     * @param {*} successCallback 
     * @param {*} failCallback 
     */
    then = (successCallback, failCallback) => {
        // 如果successCallback存在就调用它，不存在就补一个方法
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {throw reason};
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 这里使用setTimeout是为了等待promise2生成
                setTimeout(() => {
                    try {
                        // 如果成功则调用successCallback
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 如果失败则调用failCallback
                        let x = failCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }   
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果成功则调用successCallback
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
                this.failCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 如果失败则调用failCallback
                            let x = failCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }   
                    }, 0);
                });
            }
        })  
        return promise2;
    }
    /**
     * 解决异步并发问题
     * 允许我们按照异步代码调用的顺序得到异步代码执行的结果
     * 返回一个promise对象
     * 参数是一个数组/普通值或promise对象
     * @param {*} array 
     */
    static all = (array) => {
        let results = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                index++;
                results[key] = value;
                // 如果相等说明所有的异步操作都执行完了
                if (index === array.length) {
                    resolve(results);
                }
                results[key] = value;
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象，判断是否成功，如果成功调用addData，失败直接reject
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    // 普通值
                    addData(i, current);
                }
            }
        })
    }
    /**
     *  返回值是一个promise
     *  如果给定的值不是promise对象，将给定的值转换成promise对象
     * @param {*} value 
     */
    static resolve = (value) => {
        if (value instanceof MyPromise) {
            // promise 对象直接返回
            return value;
        } else {
            // 普通值包裹成promise对象之后在返回
            return new MyPromise((resolve, reject) => {
                resolve(value);
            })
        }
    }
    /**
     * 无论当前的`promise`对象最终的状态是成功的还是失败，`finally`中的回调函数都会被执行
     * 在`finally`后面可以链式调用当前then方法来拿到当前`promise`对象最终的返回结果
     * @param {*} callback 
     */
    finally = (callback) => {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value);
        }, reason => {
            return MyPromise.resolve(callback()).then(() => {throw reason});
        })
    }
    /**
     * 用来处理当前promise异常情况
     * @param {*} failCallback 
     */
    catch = (failCallback) => {
        // 不用传递成功回调
        return this.then(undefined, failCallback);
    }
}

resolvePromise = (promise2, x, resolve, reject) => {
    // 判断当前promise2是否和x相等，如果相等就reject错误,解决循环调用
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    };
    // 判断x的值是普通值还是promise对象
    // 如果是普通值，直接调用resolve
    // 如果是promise对象，查看promise对象返回的结果，
    // 再根据promise对象返回的结果决定  是调用resolve还是调用reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
```
