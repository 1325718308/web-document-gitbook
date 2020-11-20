#### 函数防抖
**函数防抖**是指在目标方法会等待一段时间后执行，如果在这段时间内又触发了目标方法，则会重新计算等待时间。
##### 使用场景
* 搜索框搜索输入。只需用户最后一次输入完，再发送请求。
* 手机号、邮箱验证输入检测。
* 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染

##### 代码实现
```
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
```
#### 函数截流
**函数截流**是指目标方法在某一时间段内只会触发一次。
##### 使用场景
* 滚动加载，加载更多或滚到底部监听。
* 谷歌搜索框，搜索联想功能。
* 高频点击提交，表单重复提交。

##### 代码实现

```
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
```