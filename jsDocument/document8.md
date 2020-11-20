## 详解JavaScript的事件循环机制（Event Loop）
在搞懂JavaScript的事件循环机制之前，我们必须的了解JavaScript的运行机制。我们都知道JavaScript是单线程语言，但为什么是单线程呢？或者说设计成单线程的目的是什么？
### JavaScript为什么是单线程（设计成单线程的目的是什么）？
其实这和JavaScript语言最初的设计用途有关，我们都知道JavaScript是浏览器脚本语言，主要用途是与用户互动、操作DOM。这决定了它是单线程，否则会带来很复杂的同步问题。比如，假如JavaScript同时有两个线程，一个线程在DOM上添加内容，另一个在DOM上删除内容，那这时浏览器应该以哪个线程为准呢？
### 任务队列（消息队列）
因为JavaScript是单线程的，这就意味着着，所有任务需要排队，只有前一个任务执行完成之后才会执行后面的任务。如果前一个任务是耗时任务。后面的任务就会一直等下去，这就会特别影响性能。

所以基于此问题，JavaScript语言的设计者意识到，主线程中如果遇到耗时任务，可以先将其挂起，先运行后面的任务，直到主线程中的所有任务运行完之后，在运行挂起的耗时任务。

于是就有了**同步任务**和**异步任务**。**同步任务**是指在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；**异步任务**是指不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

    （1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

    （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

    （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

    （4）主线程不断重复上面的第三步。

### 事件循环（Event Loop）
上面说了主线程中的所有同步任务执行完之后，会从任务队列中读取事件。一般情况下任务队列中不止一个异步任务。如果说主线程读取了一条任务执行完之后就不在读取任务队列中的任务，那剩下的任务就得不到执行，这就有问题了。于是就有了**事件循环（Event Loop）**。

**事件循环（Event Loop）**是指主线程会循环的从任务队列中读取任务，直到任务队列中的所有任务都被执行了才停止。

为了更好的理解事件循环（Event Loop），我们借用阮一峰老师的一张图片更能直观的理解：

![这是图片](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

上图中，主线程在运行的时候，产生堆(heap)和栈(stack)，栈中的代码调用WebApis(操作DOM、ajax请求、定时器...)。当主线程运行到一些耗时任务(ajax请求、定时器...)时不会立即运行，而是将这些耗时任务存在一个任务队列中，也就是上图中的**callbac queue**。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

JavaScript中除了广义的**同步任务**和**异步任务**，对任务做了更细致的划分：**宏任务**和**微任务**。
### 宏任务（macro-task）
包括整体代码 script、setTimeout、setInterval等
### 微任务（micro-task）
Promise的then的回调函数、Node.js中的process.nextTick、async函数await下面的代码等.

JavaScript执行的时候

* **第一步：**js 解释器识别所有 js 代码，将同步的代码放到主线程执行；异步的代码放到Event Table（事件列表）执行。这也是第一次宏任务执行完毕！

* **第二步：**接下来执行所有的微任务。

之后一直循环第一步，第二步，也就是常说的Event Loop(事件循环)。接下来我们通过一段代码具体分析一下：
```
    console.log('1');
    setTimeout(function() {
        console.log('2');
        process.nextTick(function() {
            console.log('3');
        })
        new Promise(function(resolve) {
            console.log('4');
            resolve();
        }).then(function() {
            console.log('5')
        })
    })
    process.nextTick(function() {
        console.log('6');
    })
    new Promise(function(resolve) {
        console.log('7');
        resolve();
    }).then(function() {
        console.log('8')
    })
    setTimeout(function() {
        console.log('9');
        process.nextTick(function() {
            console.log('10');
        })
        new Promise(function(resolve) {
            console.log('11');
            resolve();
        }).then(function() {
            console.log('12')
        })
    })
```
上面的代码第一轮事件循环结果分析如下：

* 整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
* 遇到setTimeout，其回调函数被分发到宏任务队列中，我们暂且记为setTimeout1。
* 遇到process.nextTick()，其回调函数被分发到微任务队列中，我们记为process1。
* 遇到Promise，new Promise直接执行，输出7，then被分发到微任务队列中，我们记为then1。
* 又遇到了setTimeout，其回调函数被分发到宏任务队列中，我们记为setTimeout2。

下表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。

| 宏任务 | 微任务 |
|:-----:|:----:|
|setTimeout1 |process1|
|setTimeout2|then1|

对照上述的事件循环流程图 宏任务结束之后我们接下来就开始去查看微任务中是否有任务 如果有就执行所有的微任务 这里有两个微任务process1和then1

* 执行process1,输出6。
* 执行then1，输出8。

好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮事件循环从setTimeout1宏任务开始：

* 首先输出2。接下来遇到了process.nextTick()，同样将其分发到微任务队列中，记为process2。
* new Promise立即执行输出4，then也分发到微任务队列中，记为then2

| 宏任务 | 微任务 |
|:-----:|:----:|
|setTimeout1 |process2|
||then2|

第二轮事件循环宏任务执行结束，执行两个微任务process2和then2。

* 执行process2,输出3。
* 执行then2，输出5。

好了，第二轮事件循环正式结束，这二轮的结果是输出2，4，3，5。那么第三轮事件循环从setTimeout2宏任务开始：

* 首先输出9。接下来遇到了process.nextTick()，同样将其分发到微任务队列中，记为process3。
* new Promise立即执行输出11，then也分发到微任务队列中，记为then3

| 宏任务 | 微任务 |
|:-----:|:----:|
||process3|
||then3|

第三轮事件循环宏任务执行结束，执行两个微任务process3和then3。

* 执行process3,输出10。
* 执行then3，输出12。

第三轮事件循环结束，第三轮输出9，11，10，12。

整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。

总结：下一个宏任务执行前会去查看微任务队列中是否有任务 有就执行所有的微任务 微任务全部执行完 再去执行下一个宏任务。