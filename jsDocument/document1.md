### 写在前面
在实现这三个方法之前，我们首先要清楚这三个方法的具体作用以及相同点和不同点。

| 方法|相同点|不同点|
|:-----| ----:|:----:|
|call| 改变this指向 |call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。当第一个参数为null、undefined的时候，默认指向window |
|apply| 改变this指向 | apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个参数数组。当第一个参数为null、undefined的时候，默认指向window。 |
|bind| 改变this指向 | 和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。区别在于bind方法返回值是函数以及bind接收的参数列表的使用。 |

了解了它们各自的作用之后，接下来我们来看看具体的实现方式
### 手动实现call方法
代码实现

```
	/**
     *  手动实现call方法
     * @param {*} obj 需要改变的对象
     * @param  {...any} arg 参数
     */
    Function.prototype.mycall = function(obj, ...arg) {
        obj._fn = this;
        let val = obj._fn(...arg); 
        delete obj._fn;
        return val;
    }
```
测试一下
```
	const callTest = {
    	name: 'callTest'
    }
    const callObject = {
        name: 'callObject',
        fn: function() {
           console.log(this.name, ...arguments);
        }
    }
    callObject.fn.call(callTest, 1,2,3); // 执行结果：callTest 1,2,3
	callObject.fn.mycall(callTest, 1,2,3); // 执行结果：callTest 1,2,3
```
执行结果和预期一致，证明这个手动实现的call方法OK了。那我们分析一下这段代码

1、首先这个方法毋庸置疑肯定是添加在**Function对象的原型**上的。

2、传入两个参数，第一个是要将this改变的**目标对象**，第二个是真正的要执行的方法的参数，也就是上面的例子中的**callObject.fn**的参数。

3、**obj._fn = this;** 我们给目标对象添加了一个_fn_属性，并将mycall**调用者**赋值给_fn，注意这里的**调用者**，其实就是callObject.fn函数。

4、**let val = obj._fn(...arg);** 这里是callObject.fn真正执行的地方，可以看出此时是通过obj去调用了callObject的fn方法，所以当前方法的this就指向了obj对象。

5、**return val；** 最后将执行结果返回。

注意：delete obj._fn;这里需要值最终执行完callObject的fn方法之后删除，以免造成脏数据。

### 手动实现apply方法
代码实现
```
  /**
   *  手动实现apply方法
   * @param {*} obj 
   * @param {*} arr 
  */
  Function.prototype.myApply = function(obj, arr = []) {
    let args = [];
    for(let i = 0; i < arr.length; i ++) {
        args.push('arr[' + i + ']');
    }
    obj._fn = this;
    const val = eval('obj._fn('+ args + ')');
    delete obj._fn;
    return val;
  }
```
测试一下
```
	const applyTest = {
    	name: 'applyTest'
	}
	const applyObject = {
        name: 'applyObject',
        fn: function(sex, age) {
            console.log(`name：${this.name} 性别：${sex} 年龄${age}`);
        }
    }
    let params = ['男', '10']
    applyObject.fn.apply(applyTest, params)// name：applyTest 性别：男 年龄：10
    applyObject.fn.myApply(applyTest, params);// name：applyTest 性别：男 年龄：10
```
执行结果和预期一致，证明这个手动实现的apply方法OK了。那我们分析一下这段代码

1、同样实现apply方法也是需要添加在**Function对象的原型**上。

2、let args = [];用来保存**最终要执行的方法的参数**，因为我们知道apply方法的第二个参数是个数组，所以这里需要用一个arr[]来保存。

3、let val; 这个变量没什么可说的，用来保存**最终的执行结果**。

4、for 循环处理参数列表。

5、**obj._fn = this;** 我们给目标对象添加了一个_fn属性，并将myApply**调用者**赋值给_fn，注意这里的**调用者**，其实就是applyObject.fn函数。

6、val = eval('obj._fn('+ args + ')'); 这里是applyObject.fn真正执行的地方，可以看出此时是通过obj去调用了applyObject的fn方法，所以当前方法的this就指向了obj对象。

7、return val； 最后将执行结果返回。

注意：delete obj._fn;这里需要值最终执行完applyObject的fn方法之后删除，以免造成脏数据。

### 手动实现bind方法
代码实现
```
  /**
  * 手动实现bind方法
  * @param {*} obj 
  * @param {*} arg1 
  */
  Function.prototype.myBind = function(obj, ...arg1) {
    return (...arg2) => {
        obj._fn = this;
        const val = obj._fn(...arg2, ...arg1);
        delete obj._fn;
        return val;
    }
  }
```
测试一下

```
  const bindTest = {
    name: 'bindTest'
  }
  const bindObject = {
      name: 'bindObject',
      fn: function() {
          console.log(`name：${this.name}`, ...arguments) 
      }
  }
  const bindFun = bindObject.fn.bind(applyTest, '男', '10');
  const myBindFun = bindObject.fn.myBind(applyTest, '男', '10');
  bindFun('汉族'); // name：applyTest 男,10,汉族
  myBindFun('汉族');// name：applyTest 男,10,汉族
```
执行结果和预期一致，证明这个手动实现的bind方法OK了。那我们分析一下这段代码。

1、同样实现bind方法也是需要添加在**Function对象的原型**上。

2、我们可以看出bind方法最终是返回了一个方法，符合bind方法的作用。

3、let args = arg1.concat(arg2);这里是为了拼接参数。

4、obj._fn = this;我们给目标对象添加了一个_fn属性，并将myBind**调用者**赋值给_fn，注意这里的**调用者**，其实就是bindObject.fn函数。

5、 val = obj._fn_(...args);这里是bindObject.fn真正执行的地方，可以看出此时是通过obj去调用了bindObject的fn方法，所以当前方法的this就指向了obj对象。

6、最终返回了一个函数，这一符合我们的预期，bind方法改变this指针，且返回一个函数。

注意：delete obj._fn;这里需要值最终执行完applyObject的fn方法之后删除，以免造成脏数据。

### 总结
至此我们也就手动实现了call、apply、bind方法。如果有不同的实现方法，可以下发留言，感谢支持！！！

