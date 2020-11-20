## 1、为什么要使用redux?
我们都知道在React中，数据在组件中是单项绑定的。父组件向子组件传递数据可以通过props，但是兄弟组件之间传递数据就比较麻烦。redux 就可以解决这一问题。
## 2、redux 的设计理念
redux 是将整个应用的state存储在一个公共的store文件当中，组件可以通过分发（dispatch）一个动作或者是行为（action）给这个公用的store，而不是直接去通知其他组件，组件内部通过订阅store中的状态state来刷新自己的视图。这里我个人对的理解是，在我们的组件内部有个类似于监听器的东西，一旦监听到store中的值发生了改变就会刷新我们的页面。


![](https://user-gold-cdn.xitu.io/2020/2/19/1705bedf08dff682?w=800&h=417&f=webp&s=14492)
## 3、redux 三大原则
+ **唯一数据源**

整个应用的数据存储在一个统一的状态树中，也就是我们前面所说的公共的store 文件。在组件都会从这个store中获取数据。

+ **保持只读状态**

state是只读的，唯一改变state的方法就是触发action，action是一个用于描述以发生时间的普通对象。

+ **数据改变只能通过纯函数来执行**

使用纯函数来执行修改，为了描述action如何改变state的，你需要编写reducers。 
## 4、redux原理详细解析

### 4.1 Store
通过上面的内容，我想大家应该对redux的用途或者说它是用来干什么的，能帮助开发者解决什么问题大概了有了一些了解，我们说了redux是为了解决react中数据单向流动的问题，说到数据我们上面页提到了，redux中的数据是存储在一个状态树store中，所以说：

+ **store**就是保存数据的地方，你可以把它看成一个数据，而且整个应用能有一个store。
+ redux提供了**createStore**这个函数，用来生成store。
```
    import {createStore} from 'redux'
    const store=createStore(fn);
```

### 4.2 State
state就是store中存储的数据，store里面可以拥有多个state，Redux规定一个state对应一个View,只要state相同，view就是一样的，反过来也是一样的，可以通过store.getState( )获取。
```
    import {createStore} from 'redux'
    const store=createStore(fn);
    const state=store.getState()
```
### 4.3 Action
state的改变会导致View的变化，上面我们说过redux中不能直接通过this.setState()修改state，为了使state发生改变，在redux中提供了一个对象Action,我们可以理解为一个行为或者是动作，也就是说这个action可以改变state，而且也是改变state的唯一方法。
```
    const action={
      type:'ADD_TODO', //action名称，必须存在
      payload:'redux'
    }
```
### 4.4 store.dispatch( )
store.dispatch( )是view发出Action的唯一办法，这里解释一下，在view中，用户触发一个行为或者简单理解点击某一个按钮，这时候如果需要修改state值，就需要触发action，而store.dispatch接收一个Action作为参数，将它发送给store通知store来改变state。
```
    const action = {
        type:'ADD_TODO',
        payload:'redux'
    };
    store.dispatch(action);
```
### 4.5 Reducer
Store收到Action以后，必须给出一个新的state，这样view才会发生变化。这种state的计算过程就叫做Reducer。
Reducer是一个纯函数，他接收Action和当前state作为参数，返回一个新的state。
```
    const reducer =(state,action)=>{
      switch(action.type){
        case ADD_TODO:
            return newstate;
        default return state
      }
    }
```

至此redux的原理就介绍完了，如果还有不同理解的小伙伴们还请下发留言。如果有写的不好的地方还请多多指教。我会继续更新有关前端的技术文章的。