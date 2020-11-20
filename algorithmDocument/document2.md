### 洗牌算法
- ### 实现思想
    1、定义一个数组，以数组的最后一个元素为基准点。

    2、在数组开始位置到基准点之间随机取一个位置，将所取位置上的元素和基准点上的元素互换。

    3、基准点左移一位。

    4、重复2，3步骤，直到基准点为数组的开始位置。
- ### 应用场景
##### 需要随机的场景：比如音乐播放器随机播放列表
- ### 代码实现
#### 1、常规写法
```
    function shuffle(arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          const temp = arr[i];
          arr[i] = arr[randomIndex];
          arr[randomIndex] = temp;
        }
        return arr;
      }
```

 #### 2、ES6写法
```
    function shuffle(arr) {
        let i = arr.length, random;
        while (0 !== i) {
          random = (Math.random() * i--) >>> 0; // 无符号右移位运算符向下取整
          [arr[i], arr[random]] = [arr[random], arr[i]]; // ES6的解构赋值实现变量互换
        }
        return arr;
      }
```

    


