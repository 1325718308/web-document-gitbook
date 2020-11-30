# 面试汇总
## 字节跳动

### hooks 和 class Component 的区别
1、在写法上不同，hooks是用在函数组件上；而class Component是通过ES6 类的写法，通过定义一个类继承自React.Component。
2、在hooks中无法使用自定义的state对象，如果要使用state只能通过hooks的useState钩子去实现；但是在class Component 中直接可以通过this.state = {}这样的方式定一个state对象。
3、在hooks中不会存在this指向的问题；但是在class Component会频繁的用到this。这也是class Component相比于hooks的一个缺点。

### Vue 和 React 的区别
1、在实现方式上 --> React和Vue采用了截然不同的方法，Vue（2.X）中使用了options(选项) API；而React使用了（除了Hooks）是通过ES6中类的方式定义了一个组件。

注意：可能会问到options(选项) API
我们都知道Vue在初始化的时候是通过new Vue(options)的方式，这里会将options传入到Vue的构造函数中，这里的options包括component、props、data、methods、mounted等等，然后在Vue的构造函数中会初始化这些选项，比如data中我们定义的一些属性的初始化（这里主要是数据劫持）。

这里可能会被问到Vue 3.0的知识

2、在视图方面 --> 我们知道在Vue中使用了template（模版）这种形式，在实现方式上我们必须要遵循它的强规范，比如条件判断我们必须使用v-if、循环渲染必须使用 v-for、时间绑定必须使用@+事件名等等；而在React中不存在这些强规范，基本上都是按照原生的html 和 js 的写法（类名除外：className）。

3、数据响应方面 --> 我们知道在Vue中使用了数据双向绑定，也就是说数据改变可以驱动视图渲染，视图渲染可以驱动数据改变，比如我们在input组件中通过v-modal绑定data中的数据。在数据框中输入内容就可以直接修改data中的数据，不需要监听它的输入框的事件；但是React就不一样了，由于React是单向数据绑定，只能通过修改数据驱动视图，就拿input组件来说，我们必须要通过事件监听才能获取到输入的内容。

4、在使用上 --> 如果我们的项目结果比较复杂，数据交互比较繁琐，这时候我们应该考虑使用React；如果数据逻辑比较简单，可以考虑使用Vue;
