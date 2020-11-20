### Vue生命周期源码解析
每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，给予用户机会在一些特定的场景下添加他们自己的代码。
<img src="https://ustbhuangyi.github.io/vue-analysis/assets/lifecycle.png">

我们在实际的开发中，会频繁的和组件的生命周期打交道，接下来我们就从源码的角度分析一下这些生命周期钩子函数是如何被执行的。

解读过Vue源码的同学应该都知道，源码中最终执行这些钩子函数都是调用`callHook`，它的定义是在`src/core/instance/lifecycle`中

```
export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```
从上面的代码可以看出，在`callHook`函数中，接收了两个参数`vm`和`hook`，根据传入的`hook`字符串获取`vm.$options`中的回调函数，然后遍历执行，执行的时候把 vm 作为函数执行的上下文（this）。

这里需要注意一下，其实在`new Vue(options)`的时候又一个合并options的操作，就是把所有的生命周期钩子函数都合并到了`options`里了，所以我们在上面的`callHooks`中通过`vm.$options`能够获取到这些生命周期函数。

接下来我们具体来看看每个生命周期函数的调用机制

#### beforeCreate 和 create
`beforeCreate`和`create`都是在初始化Vue（new Vue）实例的时候执行的，也就是在`_init`方法中执行的，`_init`方法定义在`src/core/instance/init.js`中
```
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
  // ...
}
```
上面的代码摘自Vue源码中，有一些删减，只是列出来一些主要的代码。从上面的代码中可以看出`beforeCreate`和`create`是在`initState`前后执行的，`initState`的作用是初始化`data、props、methods、wacth、computed`...，所以如果我们在`beforeCreate`中是无法获取到`props、data`中的属性。也不能调用`methods`中定义函数。

在这俩个钩子函数执行的时候，并没有渲染 DOM，所以我们也不能够访问 DOM，一般来说，如果组件在加载的时候需要和后端有交互，放在这俩个钩子函数执行都可以，如果是需要访问 `props`、`data` 等数据的话，就需要使用 created 钩子函数。
#### beforeMount 和 mounted
`beforeMount` 钩子函数发生在 `mount`，也就是 DOM 挂载之前，它的调用时机是在 `mountComponent` 函数中，定义在 `src/core/instance/lifecycle.js` 中：
```
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  // ...
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```
在执行 `vm._render()` 函数渲染 (虚拟DOM)VNode 之前，执行了 `beforeMount` 钩子函数，在执行完 `vm._update()` 把 `VNode patch` 到真实 DOM 后，执行 `mounted` 钩子。注意，这里对 `mounted` 钩子函数执行有一个判断逻辑，`vm.$vnode` 如果为 `null`，则表明这不是一次组件的初始化过程，而是我们通过外部 `new Vue` 初始化过程。那么对于组件，它的 `mounted` 时机在哪儿呢？