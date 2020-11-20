## React Hooks详解

### 类组件
在学习Hooks之前我们县看看传统的类组件是如何实现一个button组件的

```
    import React from 'react';

    class Button extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                btnText: '点击我'
            }
            this.handleClick = this.handleClick.bind(this);
        }

        render() {
            const { btnText = '按钮' } = this.state;
            return(
                <button
                    onClick={this.handleClick}>
                    {btnText}
                </button>
            )
        }

        handleClick() {
            this.setState({btnText:'你点击了我'})
        }
    }
    export default Button;
```
这个组件仅仅实现了一个可点击的button，可以看到代码已经很复杂了。基于此问题。在介绍Hooks之需要知道什么是函数组件。
### 函数组件
React 早就支持函数组件，下面就是一个例子
```
    function TopTips(props) {
        const { tips } = props;
        return(
            <div>{tips}</div>
        )
    }
```
但是这种组件有很大的局限，须是纯函数，不能包含状态，也不支持生命周期方法，因此无法取代类。为了解决函数组件能使用状态，于是React团队推出了Hooks.
### Hooks概述
Hook 这个单词的意思是"钩子"。

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。主要包括以下几个内容：

* **状态（useState）**
* **副作用（useEffect）**
* **上下文（useContext）**
* **Redux（useReducer）**
* **记忆（useMemo）**

#### useState()：状态钩子
`useState()`用于为函数组件引入状态（state）。

前面的类组件，用户点击按钮，按钮文字改变，我们使用Hooks的`useState()`来实现如下
```
    import React, { useState } from 'react';

    export default function HooksButton (props) {
        const [btnText, setBtnText] = useState('点击我');
        function handleClick() {
            setBtnText('你点击了我')
        }
        return(
            <button
                onClick={handleClick}>
                {btnText}
            </button>
        )
    }
```
上面的代码中，HooksButton是一个函数组件，使用了`useState()`钩子引入状态。

`useState()`这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是`btnText`），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是`set`前缀加上状态的变量名（上例是`setBtnText`）。

#### useEffect：副作用钩子
`useEffect`用来引入具有副作的操作，最常见的是向服务请求数据。相当于类组件中的`componentDidMount`钩子函数。`useEffect`用法如下：

```
    useEffect(() => {
        // 异步请求
    }, [ dependencies ])
```
`useEffect()`接受两个参数，第一个是一个函数，主要是用来做一些异步操作；第二个是一个数组，用于给书effect依赖项；只要这个参数发生变化，`useEffect()`就会执行。第二个参数可以省略，这时每次组件渲染时，就会执行`useEffect()`。

下面们看一个例子：

```
    import React, { useState, useEffect } from 'react';
    import Loading from './Loading';

    export default function OrderDetail(orderId){

        const [loading, setLoading] = useState(true);
        const [orderDetail, setOrderDetail] = useState({});

        useEffect(() => {
            setLoading(true);
            fetch(`https://xxx/${orderId}`)
            .then(res => res.json())
            .then(data => {
                setOrderDetail(data);
                setLoading(false);
            })
        }, [orderId])

        if (loading) {
            return (
                <Loading  text="加载中..."/>
            )
        }
        if (orderDetail?.orderDetail.title) {
            return (
                <div>
                    <div>{orderDetail.title}</div>
                    ....
                </div>
            )
        }
    } 
```
上面的代码中上面代码中，每当组件参数`orderId`发生变化，`useEffect()`就会执行。组件第一次渲染时，`useEffect()`也会执行。
#### useContext 共享状态钩子
如果需要在组件之间共享状态，可以使用`useContext()`。

现在有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。

```
    <div className="App">
        <Navbar/>
        <Messages/>
    </div>
```

第一步就是使用 React Context API，在组件外部建立一个 Context。

```
    const AppContext = React.createContext({});
```

组件封装代码如下：

```
    export default function HooksContext(props) {
        const AppContext = React.createContext({});
        return (
            <AppContext.Provider value={{username: 'useContext'}}>
                <div className="container">
                    <Navbar/>
                    <Messages/>
                </div>
            </AppContext.Provider>
        )
    }
```

上面代码中，`AppContext.Provider`提供了一个 `Context` 对象，这个对象可以被子组件共享。

Navbar 代码如下：
```
    const Navbar = () => {
    const { username } = useContext(AppContext);
    return (
        <div className="navbar">
            <p>{username}</p>
        </div>
    );
    }
```
上面代码中，`useContext()`钩子函数用来引入 `Context` 对象，从中获取username属性。

Messages 代码如下：
```
    const Messages = () => {
        const { username } = useContext(AppContext)
        return(
            <div className="messages">
                <p>{username}</p>
            </div>
        )
    }
```
#### useReducer
`useReducer`是React提供的一个高级Hook，类似于redux。它不像useEffect、useState、useRef等必须hook一样，没有它我们也可以正常完成需求的开发，但useReducer可以使我们的代码具有更好的可读性、可维护性、可预测性。

```
    const [count, dispath] =  useReducer((state,action) => {
        // 处理逻辑
    }, 0);
```
从上面的代码中可以看出，`useReducer`接受两个参数。第一个参数是一个`reducer` 函数，`reducer` 接受两个参数一个是 `state`另一个是 `action`。第二个参数是要更新的状态`count`的初始值。然后返回一个状态 `count` 和 `dispath，count` 是返回状态中的值，而 `dispatch` 是一个可以发布事件来更新 `state` 的。

通过一段代码看看`useReducer`是如何使用的
```
    import React, { useReducer } from 'react';

    export default function HooksReducer(props){
        const [count, dispath] = useReducer((state, action) => {
            switch(action) {
                case 'add':
                    return state + 1;
                case 'sub': 
                    return state - 1;
                default:
                    return state;
            }
        }, 0)
        
        return (
            <div>
                <h1>{count}</h1>
                <button
                    onClick={()=> dispath('add')}
                    >+</button>
                <button
                    onClick={()=> dispath('sub')}
                    >-</button>
            </div>
        )
    }
```
上面的代码使用`useReducer`实现了一个简单的加减组件。
#### useMemo
根据React中文网给出的概念是：

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 `memoized` 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
也就是说传入`useMemo`中的函数只有在依赖项改变之后才会执行。下面我们来看个例子：
```
    function MemoExample() {
        const [height, setHeight] = useState(0);
        const [width, setWidth] = useState(0);
        const [area, setArea] = useState(0);
        function getSquareArea() {
            return area;
        }
        return(
            <div>
                <input 
                    value={height} onChange={event => setHeight(event.target.value)}/>
                <input 
                    value={width} onChange={event => setWidth(event. target.value)}/>
                <span>{getSquareArea()}</span>
                <button 
                    onClick={() => setArea(height * width)}>计算面积</button>
            </div>
        )
    }
```
上面这个组件，我们想在输入完长和宽之后点击`计算面积`按钮的时候在调用`getSquareArea()`方法，但是无论`height`或`width`变化的时候都会重新渲染组件，所以都会调用`getSquareArea()`方法。这种情况我们就可以使用`useMemo`
```
    function MemoExample() {
        const [height, setHeight] = useState(0);
        const [width, setWidth] = useState(0);
        const [area, setArea] = useState(0);
        const getSquareArea = useMemo(() => {
            return area;
        }, area);       
        return(
            <div>
                <input 
                    value={height} onChange={event => setHeight(event.target.value)}/>
                <input 
                    value={width} onChange={event => setWidth(event. target.value)}/>
                <span>{getSquareArea()}</span>
                <button 
                    onClick={() => setArea(height * width)}>计算面积</button>
            </div>
        )
    }
```
使用`useMemo`后，并将`area`作为依赖值传递进去，此时仅当`area`变化时才会重新执行`getSquareArea()`。






