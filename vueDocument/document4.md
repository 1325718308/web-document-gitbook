
关于React性能优化的方式，做了以下几个总结

* 1、重写shouldComponentUpdate避免重复渲染
* 2、列表渲染使用key属性
* 3、bind函数的合理使用
* 4、避免没必要的props

### 重写shouldComponentUpdate避免重复渲染
```
    import Button form '../components/Button';

    class MyCount extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                count: 0
            }
        }

        render() {
            return (
                <div>
                    <Button 
                        theme={this.props.theme}
                        onClick={state => this.setState({count: state.count + 1})}
                        />
                    <div>
                    count: {this.state.count}
                    </div>
                </div>
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 当前的theme和props中的不一致才会重新渲染
        if (this.props.theme !== nextProps.theme) {
            return true;
        }
        // 当前count和state中的值不一致才会重新渲染
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }
```

上述代码中，shouldComponentUpdate只检查props.theme和state.count的变化，如果这些值没有变化，组件就不会重新渲染。

### 列表渲染使用key属性

react中的key属性，它是一个比较特殊的属性。它不是给开发者使用，而是给React自己使用。有了key属性，就可以与组件建立一种对应关系。简单来说，react是利用key来识别组件，它是一种身份标示，每个key 对应一个组件，相同的key react认为是同一个组件，这样后续相同的key对应组件都不会被创建。

```
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li>{number}</li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById('root')
    );
```
运行这段代码，我们会发现控制台出现一个warning `Each child in a list should have a unique 'key' prop`，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。

让我们来给每个列表元素分配一个 key 属性来解决上面的那个警告：

```
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
            {number}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById('root')
    );
```
接下来我们通过一段代码具体分析一下key属性到底是如何来减少性能开销的

```
    class NumberList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                numbers: [1,2,4,5,6]
            }
        }

        render() {
            const { numbers } = this.state;
            return(
                <div>
                    <ul>
                    {numbers.map(number => {
                        <li key={number.toString()}>{number}</li>
                    })}
                    </ul>
                    <button onClick={this.handlerClick}>添加</button>
                </div>
            ) 
        }

        handlerClick() {
            this.setState({
                numbers: [1, 2, 3, 4, 5, 6];
            })
        }
    }
```
上面的代码中如果不使用key，numbers数组发生变化后，react会对元素进行diff操作，这样的操作是非常低的；如果使用了key属性，react就不会进行diff，而是直接使用insertBefore操作移动组件位置。而这个操作移动dom节点的最高效的方法。

### bind函数的合理使用

绑定this，一般有三种方式

**1、constructor绑定**

只在组件初始化的时候执行一次
```
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    // 直接调用
    <button onClick={this.handleClick} />
```

**2、使用时bind**

每次render都要执行一次this绑定
```
    <button onClick={this.handleClick.bind(this)} />
```
**3、使用箭头函数**

每次render都要生成新的箭头函数
```
    <button onClick={() => {this.handleClick}} />
```

很明显第一种是最优的绑定this的方式。所以我们在平时的开发中尽量使用第一种方式绑定this。

### 避免没必要的props

props尽量只传需要的数据，避免多余的更新。