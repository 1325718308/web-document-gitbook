## Webpack是什么？
根据Webpack中文网给出的概念，webpack 是一个现代 JavaScript 应用程序的**静态模块打包器**(module bundler)，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

接下来我们看看Webpack都有哪些配置项
## entry(入口)
* **概念**

    entry(入口)是指Webpack从哪个模块开始枸建bundle，也就是说是bundle构建的起点。

* **配置**

    一般Webpack的配置内容都放在`webpack.config.js`文件下，下面的例子是一个简单的配置，一般情况入口文件可能会有多个，这里要注意一下多个`entry(入口)`的情况。
```
module.exports = {
    entry: './path/to/my/entry/file.js' // 入口文件的目录
}
```

## output(输出)
* **概念**

    output(输出)是指Webpack构建完成bundle之后，最终输出的目录。

* **配置**

    同样也是在`webpack.config.js`文件下。
```
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出的bundle文件的目录
        filename: 'my-first-webpack.bundle.js' // 输出的bundle文件名称
    }
}  
```
上面的代码简单是呈现了Webpack中`output(输出)`的配置，`output.filename`指定了最终生成的bundle的文件名称，`output.path`指定了终生成的bundle的目录。关于更多output配置可以[查看这里](https://www.webpackjs.com/configuration/output/)。

## loader
* **概念**

    loader主要是让Webpack能够处理一些非js的文件，比如`.css、.jpg、.txt...`，（因为Webpack只能识别JavaScript）

* **配置**

    同样也是在`webpack.config.js`文件下。 webpack 的配置中 `loader` 有两个主要的属性，分别是**test**和**use**。**test**一般是标识那些需要转换的文件，比如上面所说的`.css、.jpg、.txt...`；**use**一般是转换上面这些文件需要的`loader`；比如转换`.css`需要使用`css-loader`。下面我们看一个简单的配置：
```
module.exports = {
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
            { test: /\.css$/, use: 'css-loader' }
        ]
    }
}  
```
上面的配置中，对一个单独的 `module` 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`，这段配置的意思就是告诉Webpack编译器如果遇到`.txt`类型的文件，就使用`raw-loader`转换一下。关于更多loader配置可以[查看这里](https://www.webpackjs.com/concepts/loaders/)。

## plugins(插件)
* **概念**

    plugins(插件)webpack的支柱功能，目的在于解决loader无法实现的其他事情，比如打包优化和代码压缩。

* **配置**

    如果想使用一个`plugins(插件)`，只需要`require()`它，然后把它添加到`plugins`数组中。
```
var MpvuePlugin = require('webpack-mpvue-asset-plugin');
module.exports = {
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
            { test: /\.css$/, use: 'css-loader' }
        ]
    }
    plugins: [
        new MpvuePlugin()
    ]
}  
```
上面代码中列出了一个简单的插件，关于更多的Webpack插件可以在[查看这里](https://www.webpackjs.com/plugins/)。

除了上面几个Webpack配置项外，我们在开发中经常还会遇到`resolve`、`targets`这两个属性，那这两个属性具体有什么作用呢？下面我们一起来看看

## resolve(解析)
我对`resolve`理解用来配置路径的规则，使之变得简单明了。

我们不妨来看看`resolve`的一些属性

### resolve.alias
* **概念**

    创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。

* **配置demo**
```
resolve: {
    alias: {
      '@': resolve('src'),
      "tuike": resolve("src/tuike"),
      "styles": resolve("src/styles"),
      "utils": resolve("src/utils"),
      "components": resolve("src/components"),
      "adapter": resolve("src/adapter"),
    },
  },
```
有了上面的配置，我们在开发的过程中如果需要引入一个`components`下的文件，直接就可以写成：
```
import Home from '@/components/xxx';
```
### resolve.extensions
* **概念**

    自动解析确定的扩展。

* **配置demo**
```
resolve: {
    extensions: [".js", ".json"]
  }
```
使用了`extensions`使得开发者在引入模块时可以不带扩展:
```
import File from '../path/to/file'
```
关于更多的`resolve`属性的用法，可以[查看这里](https://www.webpackjs.com/configuration/resolve/#resolve-extensions)。

## targets(构建目标)
* **概念**

    javaScript 的应用场景越来越多，从浏览器到 Node.js，这些运行在不同环境的 JavaScript 代码存在一些差异。 target 配置项可以让 Webpack 构建出针对不同运行环境的代码。可以支持以下字符串值：

| target值 | 描述 |
|:-----:|:----:|
|web	 |针对浏览器 (默认)，所有代码都集中在一个文件里|
|node|针对 Node.js，使用 require 语句加载 Chunk 代码|
|async-node|针对 Node.js，异步加载 Chunk 代码|
|webworker|针对 WebWorker|
|electron-main|针对 [Electron](http://electron.atom.io/) 主线程|
|electron-renderer|针对 Electron 渲染线程|

    例如当你设置 target:'node' 时，源代码中导入 Node.js 原生模块的语句 require('fs') 将会被保留，fs 模块的内容不会打包进 Chunk 里。

上面的表格里列出了`target`一些string类型的值，`target`的值还可以是`function`。如果传入一个函数，此函数调用时会传入一个 `compiler` 作为参数。如果以上列表中没有一个预定义的目标(target)符合你的要求，请将其设置为一个函数。

例如，如果你不需要使用以上任何插件：
```
const options = {
  target: () => undefined
};
```
或者可以使用你想要指定的插件
```
const webpack = require("webpack");

const options = {
  target: (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin("web")
    );
  }
};
```

## Webpack 优化
经过前面的学习你已经能用 Webpack 解决常见的问题，但还有很多可以优化的点你可能还不知道。 优化可以分为优化开发体验和优化输出质量两部分。
### 开发体验优化
优化开发体验的目的是为了提升开发时的效率，其中又可以分为以下几点：
在项目庞大时构建耗时可能会变的很长，每次等待构建的耗时加起来也会是个大数目。
#### 1、优化 loader 配置

    由于 Loader 对文件的转换操作很耗时，需要让尽可能少的文件被 Loader 处理。为了尽可能少的文件被loader处理，可以通过`include`只命中那些需要处理的文件。以采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：
```
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src'),
      },
    ]
  },
};
```
    你可以适当的调整项目的目录结构，以方便在配置 Loader 时通过 include 去缩小命中范围。

#### 2、优化 resolve.modules 配置

    `resolve.modules` 用于配置 Webpack 去哪些目录下寻找第三方模块，默认值是`['node_modules']`，含义是先去当前目录下的 ./node_modules 目录下去找想找的模块，如果没找到就去上一级目录 ../node_modules 中找，再没有就去 ../../node_modules 中找，以此类推，这和 Node.js 的模块寻找机制很相似。

    当安装的第三方模块都放在项目根目录下的 ./node_modules 目录下时，没有必要按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：
```
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};
```
#### 3、优化 resolve.mainFields 配置

    我们知道`resolve.mainFields`用于配置第三方模块使用哪个入口文件。

    安装的第三方模块中都会有一个 `package.json` 文件用于描述这个模块的属性，其中有些字段用于描述入口文件在哪里，`resolve.mainFields` 用于配置采用哪个字段作为入口文件的描述。

    可以存在多个字段描述入口文件的原因是因为有些模块可以同时用在多个环境中，针对不同的运行环境需要使用不同的代码。 以 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) 为例，它是 [fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的一个实现，但可同时用于浏览器和 Node.js 环境。 它的 package.json 中就有2个入口文件描述字段:
```
{
  "browser": "fetch-npm-browserify.js",
  "main": "fetch-npm-node.js"
}
```
`isomorphic-fetch` 在不同的运行环境下使用不同的代码是因为 `fetch API` 的实现机制不一样，在浏览器中通过原生的 `fetch` 或者 `XMLHttpRequest` 实现，在 `Node.js` 中通过 `http` 模块实现。

    resolve.mainFields 的默认值和当前的 target 配置有关系，对应关系如下：

    a：当 target 为 web 或者 webworker 时，值是 ["browser", "module", "main"]

    b：当 target 为其它情况时，值是 ["module", "main"]

    以 target 等于 web 为例，Webpack 会先采用第三方模块中的 browser 字段去寻找模块的入口文件，如果不存在就采用 module 字段，以此类推。

    为了减少搜索步骤，在你明确第三方模块的入口文件描述字段时，你可以把它设置的尽量少。 由于大多数第三方模块都采用 main 字段去描述入口文件的位置，可以这样配置 Webpack：
```
module.exports = {
  resolve: {
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ['main'],
  },
};
```
    使用本方法优化时，你需要考虑到所有运行时依赖的第三方模块的入口文件描述字段，就算有一个模块搞错了都可能会造成构建出的代码无法正常运行。

#### 4、优化 resolve.alias 配置

    `resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径。
    
    在实战项目中经常会依赖一些庞大的第三方模块，以 `React` 库为例，安装到 `node_modules` 目录下的 `React` 库的目录结构如下：

    ```
    ├── dist
    │   ├── react.js
    │   └── react.min.js
    ├── lib
    │   ... 还有几十个文件被忽略
    │   ├── LinkedStateMixin.js
    │   ├── createClass.js
    │   └── React.js
    ├── package.json
    └── react.js
    ```
    可以看到发布出去的 React 库中包含两套代码：

    1）一套是采用 `CommonJS` 规范的模块化代码，这些文件都放在 `lib` 目录下，以 `package.json` 中指定的入口文件 `react.js `为模块的入口。

    2）一套是把 React 所有相关的代码打包好的完整代码放到一个单独的文件中，这些代码没有采用模块化可以直接执行。其中 `dist/react.js` 是用于开发环境，里面包含检查和警告的代码。`dist/react.min.js` 是用于线上环境，被最小化了。

    默认情况下 Webpack 会从入口文件 `./node_modules/react/react.js` 开始递归的解析和处理依赖的几十个文件，这会时一个耗时的操作。 通过配置 `resolve.alias` 可以让 `Webpack` 在处理 React 库时，直接使用单独完整的 `react.min.js` 文件，从而跳过耗时的递归解析操作。

    相关 Webpack 配置如下：
```
module.exports = {
  resolve: {
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
    // 减少耗时的递归解析操作
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'), // react15
      // 'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'), // react16
    }
  },
};
```
    ```
    除了 React 库外，大多数库发布到 Npm 仓库中时都会包含打包好的完整文件，对于这些库你也可以对它们配置 alias。
    ```
#### 5、优化 resolve.extensions 配置
    我们在导入文件的时候如果没有带后缀名，Webpack会自动带上后缀名取尝试查询后缀名是否存在，`resolve.extensions`中配置了这些后缀名，默认是：

    ```
    extensions: ['.js', '.json']
    ```
    我们在开发中如果遇到`require('./data')`这样的导入语句，`Webpack`会先去寻找`data.js`文件，如果没有找到，就会集训寻找`data.json`文件，如果依然没有找到就会报错。

    如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多，所以 `resolve.extensions` 的配置也会影响到构建的性能。 在配置 `resolve.extensions` 时你需要遵守以下几点，以做到尽可能的优化构建性能：

    1）后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表中。

    2）频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程。

    3）在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把 `require('./data')` 写成 `require('./data.json')`。

    相关 Webpack 配置如下：
```
module.exports = {
    resolve: {
    // 尽可能的减少后缀尝试的可能性
        extensions: ['js'],
    },
};
```
#### 6、优化 module.noParse 配置
    `module.noParse` 配置项可以让 `Webpack`忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。

    在上面的 优化 `resolve.alias` 配置 中讲到单独完整的 `react.min.js`文件就没有采用模块化，让我们来通过配置 `module.noParse` 忽略对 `react.min.js` 文件的递归解析处理， 相关 Webpack 配置如下：
```
const path = require('path');
module.exports = {
    module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
    },
};
```
以上就是所有和缩小文件搜索范围相关的构建性能优化了，在根据自己项目的需要去按照以上方法改造后，你的构建速度一定会有所提升。

#### 7、使用 HappyPack 插件

  `HappyPack`是`Webpack`中的一个插件，我们的项目在被`Webpack`构建的时候，会有很多的读写操作，一般情况下一个项目中会有很多文件，这样就会导致构建特别慢。在加上运行在 `Node.js` 之上的` Webpack` 是单线程模型的，也就是说 Webpack 需要处理的任务需要一件件挨着做，不能多个事情一起做。为了解决读写慢的问题，我们可以使用`HappyPack`发挥多核 CPU 电脑的威力。`HappyPack` 能把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

  下面我们看看如何使用`HappyPack`:

  首先需要安装依赖，在项目的根目录下通过`npm`安装即可

```
npm i -D happypack
``` 
以下是`HappyPack`的使用方式

```
const path = require('path');
const HappyPack = require('happypack');
module.exports = {
  // JS 执行入口文件
  entry: {
    main: './main.js',
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel'],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['happypack/loader?id=css'],
        }),
      },
    ]
  },
  plugins: [
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new HappyPack({
      id: 'css',
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ['css-loader'],
    }),
  ],
  devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
};
```
分析一下上面的代码：

  * 在`Loader` 配置中，所有文件的处理都交给了 `happypack/loader` 去处理，使用紧跟其后 的 `querystring ?id=babel` 去告诉 `happypack/loader` 去选择哪个 `HappyPack` 实例去处理文件。

  * 在 `Plugin` 配置中，新增了两个 `HappyPack` 实例分别用于告诉 `happypack/loader` 去如何处理 `.js` 和 `.css` 文件。选项中的 `id` 属性的值和上面 `querystring` 中的 `?id=babel` 相对应，选项中的 `loaders` 属性和 `Loader` 配置中一样

在实例化 `HappyPack` 插件的时候，除了可以传入 `id` 和 `loaders` 两个参数外，`HappyPack` 还支持如下参数：

  * **threads** 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。

  * **verbose** 是否允许 `HappyPack` 输出日志，默认是 true。

  * **threadPool** 代表共享进程池，即多个 `HappyPack` 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。具体用法可以[查看这里](https://github.com/amireh/happypack)。

**happypack原理**

  在整个 `Webpack` 构建流程中，最耗时的流程可能就是 `Loader` 对文件的转换操作了，因为要转换的文件数据巨多，而且这些转换操作都只能一个个挨着处理。 `HappyPack` 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少了总的构建时间。

  从前面的使用中可以看出所有需要通过 `Loader` 处理的文件都先交给了 `happypack/loader` 去处理，收集到了这些文件的处理权后 `HappyPack` 就好统一分配了。

  每通过 `new HappyPack()` 实例化一个 `HappyPack` 其实就是告诉 `HappyPack` 核心调度器如何通过一系列 Loader 去转换一类文件，并且可以指定如何给这类转换操作分配子进程。

  核心调度器的逻辑代码在主进程中，也就是运行着 `Webpack` 的进程中，核心调度器会把一个个任务分配给当前空闲的子进程，子进程处理完毕后把结果发送给核心调度器，它们之间的数据交换是通过进程间通信 API 实现的。

  核心调度器收到来自子进程处理完毕的结果后会通知 `Webpack` 该文件处理完毕。

#### 8、使用 ParallelUglifyPlugin 插件

我们在使用`Webpack`构建项目时，都会有代码压缩这个流程，最常见的 JavaScript 代码压缩工具是 [UglifyJS](https://github.com/mishoo/UglifyJS2)，并且 Webpack 也内置了它。

由于压缩 JavaScript 代码需要先把代码解析成用 Object 抽象表示的 AST 语法树，再去应用各种规则分析和处理 AST，导致这个过程计算量巨大，耗时非常多。

[ParallelUglifyPlugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)就做了这个事情。 当 Webpack 有多个 JavaScript 文件需要输出和压缩时，原本会使用 UglifyJS 去一个个挨着压缩再输出， 但是 ParallelUglifyPlugin 则会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，每个子进程其实还是通过 UglifyJS 去压缩代码，但是变成了并行执行。 所以 ParallelUglifyPlugin 能更快的完成对多个文件的压缩工作。

下面我们看看如何使用`ParallelUglifyPlugin`:

首先需要安装依赖，在项目的根目录下通过`npm`安装即可

```
npm i -D webpack-parallel-uglify-plugin
``` 

使用 ParallelUglifyPlugin 也非常简单，把原来 Webpack 配置文件中内置的 UglifyJsPlugin 去掉后，再替换成 ParallelUglifyPlugin，相关代码如下：
```
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      },
    }),
  ],
};
```
在通过 new ParallelUglifyPlugin() 实例化时，支持以下参数：

* **test：**使用正则去匹配哪些文件需要被 ParallelUglifyPlugin 压缩，默认是 `/.js$/`，也就是默认压缩所有的 `.js` 文件。

* **include：**使用正则去命中需要被 ParallelUglifyPlugin 压缩的文件。默认为 []。

* **exclude：**使用正则去命中不需要被 ParallelUglifyPlugin 压缩的文件。默认为 []。

* **cacheDir：** 用于配置缓存存放的目录路径。默认不会缓存，想开启缓存请设置一个目录路径。

* **workerCount：**开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1。

* **sourceMap：**是否输出 Source Map，这会导致压缩过程变慢。

* **uglifyJS：**用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。

* **uglifyES：**用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。

#### 9、开启热模块替换
模块热替换是指可以在不用刷新整个网页的情况下做到灵敏的实时预览。它的原理是当我们修改代码时，只重新编译发生改变的模块，再用新输出的模块替换掉浏览器中对应的老模块。模块热替换技术的优势有：

* 实时预览反应更快，等待时间更短。

* 不刷新浏览器能保留当前网页的运行状态。

热模块替换有两种方式：

第一种是在开发的网页中注入一个代理客户端用于连接 DevServer 和网页，DevServer 默认不会开启模块热替换模式，要开启该模式，只需在启动时带上参数 --hot，完整命令是 webpack-dev-server --hot。需要我们修改以下`package.json`文件
```
"scripts": {
    "dev:inline": "webpack-dev-server",
    "dev:disable_inline": "webpack-dev-server --inline false",
    "start": "webpack-dev-server --hot" // 添加这一行
  },
```
我们通过`npm run start`命令就可以开启热替换模块。 

第二种方式是通过插件开启，开启方式如下
```
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = {
  entry:{
    // 为每个入口都注入代理客户端
    main:['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server','./src/main.js'],
  },
  plugins: [
    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 // .hot-update.json 文件。
    new HotModuleReplacementPlugin(),
  ],
  devServer:{
    // 告诉 DevServer 要开启模块热替换模式
    hot: true,      
  }  
};
```

### 输出质量优化
前面几种方式仅仅是优化了一些开发体验，从构建速度、使用体验两个维度进行了优化，下面我们来看看如何优化最终生成的bundle的质量，如何给用户呈现一种体验更好的网页，例如减少首屏加载时间、提升性能流畅度等。我们从用户感到的时间（首屏加载时间）和流畅度来进行优化。
#### 1、区分环境



