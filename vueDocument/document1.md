## 一、Vuex 是什么？
在理解Vuex的使用和原理之前首先要知道Vuex是什么？按照官方的说法，Vuex是专门为Vuejs应用程序设计的一款**状态管理模式**，类似于React中的Redux。它采用集中式存储管理应用的所有组件的状态。
### 1、 Vuex的构成
下面图片很清晰的展示出了Vuex的组成结构

![](https://user-gold-cdn.xitu.io/2020/2/20/170609dd44d651e6?w=1086&h=1004&f=png&s=87298)
+ #### state
state 是 Vuex 的数据中心，也就是说state是用来存储数据的。
+ #### Getters
getters 和 组件的 computed 类似，方便直接生成一些可以直接用的数据。当组装的数据要在多个页面使用时，就可以使用 getters 来做。
+ #### Mutations
mutations提交更改数据，使用store.commit方法更改state存储的状态。
+ #### Actions
Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
### 2、Vuex的使用方式
+ #### 安装Vuex
    ***方式一***： npm 方式
    ```
        npm install vuex --save
    ```
    ***方式二***： yarn 方式
    ```
        yarn add vuex
    ```
+ #### 在应用中引入Vuex
```
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)   
```
+ #### 在 Vue 组件中获得 Vuex 状态(State)
    ***方式一***： this.$store.state获取

    通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
    ```
        const Counter = {
            template: `<div>{{ count }}</div>`,
            computed: {
                count () {
                    return this.$store.state.count
                }
            }
        }
    ```
    ***方式二***： mapState 辅助函数获取（推荐）
    
    当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
    ```
        import { mapState } from "vuex";
        export default {
        // ...
        computed: mapState({
            // 箭头函数可使代码更简练
            count: state => state.count,

            // 传字符串参数 'count' 等同于 `state => state.count`
            countAlias: 'count',

            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
                return state.count + this.localCount
            }
        })
    }
    ```
    当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    
    ```
        computed: mapState([
            // 映射 this.count 为 store.state.count
            'count'
        ])
    ```
+ #### Getter的获取方式
    有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
    ```
        computed: {
            doneTodosCount () {
                return this.$store.state.todos.filter(todo => todo.done).length
            } 
        }
    ```
    如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。\
    Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    
    ***方式一：*** 通过属性访问
    ```
        store.getters.doneTodos
    ```
    ***方式二：*** 通过方法访问
    
    你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
     ```
        getters: {
          // ...
          getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
          }
        }
    ```
    ```
        store.getters.getTodoById(2)
    ```
    注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
    
    ***方式三：*** mapGetters 辅助函数获取（推荐）
    ```
        import { mapGetters } from 'vuex'

        export default {
          // ...
          computed: {
          // 使用对象展开运算符将 getter 混入 computed 对象中
            ...mapGetters([
              'doneTodosCount',
              'anotherGetter',
              // ...
            ])
          }
        }
    ```
    如果你想将一个 getter 属性另取一个名字，使用对象形式：
    ```
        mapGetters({
          // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
          doneCount: 'doneTodosCount'
        })
    ```
 + #### Mutation使用方式
     上面我们说了更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。

    ***使用常量替代 Mutation 事件类型***
    ```
        // mutation-types.js
        export const SOME_MUTATION = 'SOME_MUTATION'
    ```
    ```
        // store.js
        import Vuex from 'vuex'
        import { SOME_MUTATION } from './mutation-types'
        
        const store = new Vuex.Store({
          state: { ... },
          mutations: {
            // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
            [SOME_MUTATION] (state) {
              // mutate state
            }
          }
        })
    ```
    当然使用常量代替Mutation事件类型也不是必须的，如果你不喜欢，你完全可以不这样做。
    
    ***在组件中提交 Mutation***
    
    你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。    
    
    ```
        import { mapMutations } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapMutations([
              'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
        
              // `mapMutations` 也支持载荷：
              'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
            ]),
            ...mapMutations({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
            })
          }
        }
    ```
+ #### Action使用方式
    ***Action的注册***

    Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。
    ```
        const store = new Vuex.Store({
          state: {
            count: 0
          },
          mutations: {
            increment (state) {
              state.count++
            }
          },
          actions: {
            increment (context) {
              context.commit('increment')
            }
          }
        })
    ```
    ***分发 Action***
    ```
        // 以载荷形式分发
        store.dispatch('incrementAsync', {
          amount: 10
        })
        
        // 以对象形式分发
        store.dispatch({
          type: 'incrementAsync',
          amount: 10
        })
    ```
    ***在组件中分发 Action***
    
    你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
    
    ```
        import { mapActions } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapActions([
              'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
        
              // `mapActions` 也支持载荷：
              'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
            ]),
            ...mapActions({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
            })
          }
        }
    ```
    ### 小结
    至此Vuex的使用及原理就介绍到这里，如果还有不同理解的小伙伴们还请下发留言。如果有写的不好的地方还请多多指教。我会继续更新有关前端的技术文章的。
