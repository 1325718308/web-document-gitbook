
**贪心算法（又称贪婪算法）**是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解 。

贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择。也就是说，不从整体最优上加以考虑，做出的只是在某种意义上的局部最优解。
### 题目1（换酒问题）
#### 题目描述
小区便利店正在促销，用`numExchange`个空酒瓶可以兑换一瓶新酒。你购入了`numBottles`瓶酒。
如果喝掉了酒瓶中的酒，那么酒瓶就会变成空的。请你计算最多能喝到多少瓶酒？
#### 代码实现
* **递归的方式**
    - 判断如果没有满酒瓶且空酒瓶不足以兑换一瓶酒，终止条件
    - 根据当前传入的空酒瓶计算能兑换的满酒瓶
    - 在根据当前传入的满酒瓶就算得到空酒瓶的数量
    - 递归调用直到终止条件成立

```
/**
 * @param {*} numBottles 满酒瓶的数量
 * @param {*} numExchange 兑换一瓶酒需要的空酒瓶数量
 */
const numWaterBottles = function(numBottles, numExchange) {
    let res = 0;
    /**
     * @param {*} numBottles 当前的满酒瓶
     * @param {*} limit 当前的空酒瓶
     */
    const nums = function(numBottles, limit) {
        // 如果当前没有满酒瓶且剩余空酒瓶不足以兑换一瓶酒
        if (numBottles === 0 && limit < numExchange) {
            return;
        }
        // 把当前的满酒瓶和res值相加
        res += numBottles;
        // 根绝当前传入的空酒瓶兑换得到新的满酒瓶的数量
        let currentBottles = Math.floor(limit / numExchange);
        // 根据当前传入的满酒瓶计算得到空酒瓶
        let limits = numBottles + (limit % numExchange); 
        nums(currentBottles, limits);
    }
    nums(numBottles, 0)
    return res;
}
console.log(numWaterBottles(10, 3)); // 13
```
* **while循环的方式**
    - 定义变量`count`用来保存要返回的结果，初始值为首次传入的满酒瓶的数量
    - 根据当前计算得到的空酒瓶的数量`numBottles`和兑换基准`numExchange`作比较，如果`numBottles`的值大于`numExchange`，则继续向下面执行。
    - 把根绝当前兑换得到的满酒瓶数量和`count`相加在赋值给`count`
    - 在把当前兑换得到满酒瓶的数量和兑换剩余的空酒瓶相加赋值给`numBottles`
    - 在去循环执行while语句，直到满足终止条件`numBottles > numExchange`

```
/**
 * @param {*} numBottles 满酒瓶的数量
 * @param {*} numExchange 兑换一瓶酒需要的空酒瓶数量
 */
const numWaterBottles = function(numBottles, numExchange) {
    // 存储最终的值，初始化等于传入的满酒瓶的数量
    let count = numBottles;
    // 如果当前的空酒瓶足以兑换一瓶酒则继续兑换
    while(numBottles > numExchange) {
        // 把当前兑换的满酒瓶和已经兑换过的满酒瓶相加
        count += Math.floor(numBottles / numExchange);
        // 当前的空酒瓶数量等于兑换得到的满酒瓶加上兑换过后剩余的空酒瓶
        numBottles = Math.floor(numBottles / numExchange) + (numBottles % numExchange);
    }
    return count;
}
console.log(numWaterBottles(10, 3)); // 13
```
### 题目2（判断子序列）
#### 题目描述
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是

* **利用循环**
    - 通过遍历s，然后在拿到的第i个字符是否存在于t当中，如果不存在直接返回false，程序结束；
    - 如果存在，根据当前获取到的下标截取t的剩余字符串，通过截取的剩余字符串在循环执行上面的操 作，直到s中所有的字符都通过匹配。

```
const isSubsequence = function(s, t){
    for(let i = 0; i < s.length; i++) {
        let tIndex = t.indexOf(s[i]);
        if (tIndex > -1) {
            t = t.substr(tIndex + 1);
        } else {
            return false;
        }
    }
    return true;
}
const t = 'adadbadbasmdbasd'
const s1 = '123';
const s1 = 'admsd';
console.log(isSubsequence(s1, t)) // false
console.log(isSubsequence(s2, t)) // true
```
### 题目3（分发饼干）
#### 题目描述
假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 `j`，都有一个尺寸 `s[j]` 。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i` ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

#### 代码实现
* **索引+循环**
    - 首先将传入的两个数组`g`和`s`做升序处理
    - 定义一个最终要返回的结果值 `result` 和 孩子胃口数组的索引 `gIndex`
    - 循环遍历饼干数组`g`
    - 判断当前孩子胃口数组`g`的索引`gIndex`是否小于`g`的长度，如果小于它的长度，则比对`g[gIndex] <= s[i] `
    - 上面的条件成立之后 `result++, gIndex++`;

```
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    // 先把两个数组做升序处理
    s = s.sort((a, b) => a - b); 
    g = g.sort((a, b) => return a- b);
    let result = 0; // 最终结果
    let gIndex = 0; // 孩子胃口数组的索引
    for(let i = 0; i < s.length; i++) {
        // 要保证当前数组g还有没对比到的的元素，还有则开始对比两者大小
        if (gIndex < g.length && g[gIndex] <= s[i]) {
            result ++; // 满足条件结果加1
            gIndex ++; // 孩子胃口数组的索引向右移动
        }
    }
    return result;
};
const g = [1,2,3]
const s = [1,1]
console.log(findContentChildren(g, s)); // 1
```

* **shift()+循环**
    - 首先将传入的两个数组`g`和`s`做升序处理
    - 定义一个最终要返回的结果值 `result`
    - 循环遍历饼干数组`g`
    - 比对数组`s[i]`和`g[0]`的大小
    - 上面的条件成立之后 `result++`，并删除数组`g`的第`0`项，接下来循环上面的操作。直到`g`中的所有元素都通过比对跳出循环，返回结果

```
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    // 先把两个数组升序
    s = s.sort((a, b) => a - b);
    g = g.sort((a, b) => a - b);
    // 最终结果
    let result = 0; 
    for (let i = 0; i < s.length; i++) {
        if (s[i] >= g[0]) {
            g.shift();
            result ++;
        } 
        if (g.length === 0) {
            break;
        } 
    }
    return result;
}
const g = [1,1,1]
const s = [1,0,1]
console.log(findContentChildren(g, s)); // 2
```
### 题目4（柠檬水找零）
#### 题目描述
在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

注意，一开始你手头没有任何零钱。

如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

#### 代码实现
* **实现思路**
    - 定义两个变量`fiveNums, tenNums`，分别存储5的数量和10的数量
    - 循环遍历数组`bills`，判断顾客付的钱是5或10或20
    - 如果是5，`fiveNums++`；
    - 如果是10，在判断`fiveNums`是否大于0，如果大于0，`fiveNums--`，`tenNums++`；否则返回`false`
    - 如果是10，在判断`fiveNums`和`tenNums`是否大于0，如果大于0，`fiveNums--`， `tenNums--`；如果不成立继续判断 `fiveNums`是否大于3，如果大于3，`fiveNums-=3`；否则返回`false`

```
var lemonadeChange = function(bills) {
    let fiveNums = 0, tenNums = 0;
    for(let i = 0; i < bill.length; i++) {
        const item = bill[i];
        if (item === 5) {
            fiveNums++;
        } else if (item === 10) {
            if (fiveNums > 0) {
                fiveNums --;
                tenNums ++;
            } else {
                return false
            }
        } else {
            if (fiveNums > 0 && tenNums > 0) {
                fiveNums --;
                tenNums --
            } else if (fiveNums > 3) {
                fiveNums -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
}
console.log(lemonadeChange([5,5,5,10,20])); // true
console.log(lemonadeChange([5,10,20])); // false
```
### 题目5（背包问题）
#### 题目描述
有一个背包，背包容量是M=150。有7个物品，物品可以分割成任意大小。要求尽可能让装入背包中的物品总价值最大，但不能超过总容量。
#### 解题思路
* **解题思路**
    - 根据贪心的策略，每次挑选价值最大的物品装入背包，得到的结果是否最优？
    - 每次挑选所占重量最小的物品装入是否能得到最优解？
    - 每次选取单位重量价值最大的物品，成为解本题的策略?



