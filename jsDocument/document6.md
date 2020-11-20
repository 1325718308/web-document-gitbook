# 详解JavaScript函数珂理化

### 首先看看函数珂理化到底是什么？
根据维基百科上说的 **柯里化**，英语：**Currying**(果然是满满的英译中的既视感)，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

看完上面的解释是不是有点迷茫，官方的解释的确有点官方，不是很容易理解。老规矩，我们还是通过一段代码进入**珂理化**的讲解。

```
    // 普通的两数相加的函数
    function add(a, b) {
        return a + b;
    }

    // 珂理化后
    function curryingAdd(a) {
        return function(b) {
            return a + b;
        }
    }

    const res1 = add(10, 20);
    const res2 = curryingAdd(10)(20);
    console.log(res1); // 30
    console.log(res2); // 30
```
从上面的代码可以看出，`add`函数珂理化后，两个参数变成了一个参数，最终返回了一个新的方法。这就是珂理化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

知道了函数珂理化到底是什么东西，下面我们一起来看看这个东西到底有什么好处？
#### 1、参数复用
```
    // 普通的正则验证字符串
    reg.test(str);
    // 封装成普通函数后
    function check(reg, str) {
        return reg.test(str);
    }

    check(/\d+/g, 'test')       //false
    check(/[a-z]+/g, 'test')    //true

    // 珂理化之后
    function curryingCheck(reg) {
        return function(str) {
            return reg.test(str);
        }
    }

    var hasNumber = curryingCheck(/\d+/g)
    var hasLetter = curryingCheck(/[a-z]+/g)

    hasNumber('test1')      // true
    hasNumber('testtest')   // false
    hasLetter('21212')      // false
```
上面的例子是一个简单的正则校验，正常来说直接调用`check`函数就可以了，但是如果我有很多地方都要校验是否有数字，其实就是需要将第一个参数`reg`进行复用，这样别的地方就能够直接调用`hasNumber，hasLetter`等函数，让参数能够复用，调用起来也更方便。：转载至 flowsands。

#### 2、延迟计算
```
    function currying(fun) {
        const args = [];
        return function result(...arguments) {
            if (arguments.length === 0) {
                return fun(...args);
            }
            args.push(...arguments);
            return result;
        }
    }

    const add = (...args) => args.reduce((a, b) => a + b);
    const sum = currying(add);
    
    sum(1,2)(3);
    sum(4);
    sum(); // 10
```
这边首先是初步封装,通过闭包把初步参数给保存下来，然后通过获取剩下的`arguments`进行拼接，最后执行需要`currying`的函数。

#### 3、动态创建函数
例如兼容现代浏览器和IE浏览器的添加事件方法，我们通常会这样写：

```
    const addEvent = function(element, event, handle) {
        if (window.addEventListener) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            } else {
                if (element && event && handler) {
                    element.attachEvent('on' + event, handler);
                }
            }
        }
    }
```
这种方法显然有个问题，就是每次添加事件处理都要执行一遍`if {...} else if {...}`。其实用下面的方法只需判断一次即可：

```
    const addEvent = (function() {
        if (window.addEventListener) {
            return (element, event, handle) => {
                element.addEventListener(event, handler, false);
            }
        } else {
            return (element, event, handle) => {
                element.attachEvent('on' + event, handler);
            }
        }
        
    })();
```
这个例子，第一次`if {...} else if {...}`判断之后，完成了部分计算，动态创建新的函数来处理后面传入的参数，以后就不必重新进行计算了。这是一个典型的柯里化的应用。