// 贪心算法

// 小区便利店正在促销，用 numExchange 个空酒瓶可以兑换一瓶新酒。你购入了 numBottles 瓶酒。
// 如果喝掉了酒瓶中的酒，那么酒瓶就会变成空的。
// 请你计算 最多 能喝到多少瓶酒。

/**
 * 换酒问题
 * @param {*} numBottles 满酒瓶的数量
 * @param {*} numExchange 兑换一瓶酒需要的空酒瓶数量
 */
// const numWaterBottles = function(numBottles, numExchange) {
//     let count = numBottles;
//     while(numBottles >= numExchange) {
//         count += Math.floor(numBottles / numExchange);
//         numBottles = Math.floor(numBottles / numExchange) + (numBottles % numExchange);
//     }
//     return count;
// }

// // console.log(numWaterBottles(10, 8))

// /**
//  * @param {*} numBottles
//  * @param {*} numExchange
//  */
// const numWaterBottles = function(numBottles, numExchange) {
//     let res = 0;
//     /**
//      * @param {*} numBottles 当前的满酒瓶
//      * @param {*} limit 当前的空酒瓶
//      */
//     const nums = function(numBottles, limit) {
//         // 如果当前没有满酒瓶且剩余空酒瓶不足以兑换一瓶酒
//         if (numBottles === 0 && limit < numExchange) {
//             return;
//         }
//         // 把当前的满酒瓶和res值相加
//         res += numBottles;
//         // 根绝当前传入的空酒瓶兑换得到新的满酒瓶的数量
//         let currentBottles = Math.floor(limit / numExchange);
//         // 根据当前传入的满酒瓶计算得到空酒瓶
//         let limits = numBottles + (limit % numExchange); 
//         nums(currentBottles, limits);
//     }
//     nums(numBottles, 0)
//     return res;
// }


// 判断子序列

/**
 * 判断s是否是t的子序列，利用栈的思维
 * @param {*} s 
 * @param {*} t 
 */
// const isSubsequence = function(s, t){
//     if (s.length > t.length) {
//         // 如果s比t长，那么s肯定不是t的子序列，直接返回false
//         return false;
//     }
//     if (s === t) {
//         // 相等肯定是子序列
//         return true;
//     }
//     // 将s转成数组
//     var s = s.split('');
//     // 循环遍历t，
//     for (let i = 0; i < t.length; i++) {
//         // 根据数组s的第一项和t的所有元素比较，如果有相等的，就删除s的第一项元素，
//         // 这样循环执行，直到s中的所有元素都删除了
//         if(t[i] === s[0]) {
//             s.shift();
//         }
//         if (s.length === 0) {
//             return true;
//         }
//     }
//     return false;
// }
// const isSubsequence = function(s, t){
//     if (s.length > t.length) {
//         // 如果s比t长，那么s肯定不是t的子序列，直接返回false
//         return false;
//     }
//     if (s === t) {
//         // 相等肯定是子序列
//         return true;
//     }
//     // 将s转成数组
//     var s = s.split('');
//     // 循环遍历t，
//     for (let i = 0; i < t.length; i++) {
//         // 根据数组s的第一项和t的所有元素比较，如果有相等的，就删除s的第一项元素，
//         // 这样循环执行，直到s中的所有元素都删除了
//         if(t[i] === s[0]) {
//             s.shift();
//         }
//         if (s.length === 0) {
//             return true;
//         }
//     }
//     return false;
// }
// 通过遍历s，然后在拿到的第i个字符是否存在于t当中，如果不存在直接返回false，程序结束；
// 如果存在，根据当前获取到的下标截取t的剩余字符串，通过截取的剩余字符串在循环执行上面的操作，直到s中所有的字符
// 都通过匹配。
// const isSubsequence = function(s, t){
//     for(let i = 0; i < s.length; i++) {
//         let tIndex = t.indexOf(s[i]);
//         if (tIndex > -1) {
//             t = t.substr(tIndex + 1);
//         } else {
//             return false;
//         }
//     }
//     return true;
// }
// const t = 'adadbadbasmdbasd'
// const s = '123';
// console.log(isSubsequence(s, t))




// const isSubsequence = function(s, t){
//     for(let i = 0; i < s.length; i++) {
//         let tIndex = t.indexOf(s[i]);
//         if (tIndex > -1) {
//             t = t.substr(tIndex + 1);
//         } else {
//             return false;
//         }
//     }
//     return true;
// }


// /**
//  * @param {number[]} g
//  * @param {number[]} s
//  * @return {number}
//  */
// var findContentChildren = function(g, s) {
//     // 先把两个数组做升序处理
//     s = s.sort((a, b) => {return a - b}); 
//     g = g.sort((a, b) => {return a- b});
//     let result = 0; // 最终结果
//     let gIndex = 0; // 孩子胃口数组的索引
//     for(let i = 0; i < s.length; i++) {
//         // 要保证当前数组g还有没对比到的的元素，还有则开始对比两者大小
//         if (gIndex < g.length && g[gIndex] <= s[i]) {
//             result ++; // 满足条件结果加1
//             gIndex ++; // 孩子胃口数组的索引向右移动
//         }
//     }
//     return result;
// };

// /**
//  * @param {number[]} g
//  * @param {number[]} s
//  * @return {number}
//  */
// var findContentChildren = function(g, s) {
//     // 先把两个数组升序
//     s = s.sort((a, b) => a - b);
//     g = g.sort((a, b) => a - b);
//     // 最终结果
//     let result = 0; 
//     for (let i = 0; i < s.length; i++) {
//         if (s[i] >= g[0]) {
//             g.shift();
//             result ++;
//         } 
//         if (g.length === 0) {
//             break;
//         } 
//     }
//     return result;
// }
// const g = [1,1,1]
// const s = [1,0,1]
// console.log(findContentChildren(g, s)); // 2

// /**
//  * @param {number[]} bills
//  * @return {boolean}
//  */
// var lemonadeChange = function(bills) {
//     let fiveNums = 0, tenNums = 0;
//     for (let i = 0; i < bills.length; i++) {
//         let item = bills[i];
//         if (item === 5) {
//             fiveNums++;
//         } else if (item === 10) {
//             if (fiveNums === 0) {
//                 return false;
//             }
//             tenNums++;
//             fiveNums--;
//         } else {
//             if (fiveNums > 0 && tenNums > 0) {
//                 fiveNums--;
//                 tenNums--
//             }else if (fiveNums > 3) {
//                 fiveNums -=3;
//             } else {
//                 return false
//             }
//         }
//     }
//     return true;
// };
// console.log(lemonadeChange([5,5,5,10,20]))

// console.log(12 << 3)
// let num = -5;
// console.log(num.toString(2))

// function threeSum(sums) {
//     let res = [];
//     if (!sums || sums.length < 3) return [];
//     sums.sort((a, b) => a - b);
//     for (let i = 0; i < sums.length - 2; i++) {
//         if (i > 0 && sums[i] === sums[i - 1]) continue;
//         let left = i + 1,
//             right = sums.length - 1;
//         while(left < right) {
//             let sum = sums[i] + sums[left] + sums[right];
//             if (sum === 0) {
//                 res.push([sums[i], sums[left], sums[right]]);
//                 left++;
//                 while(sums[left - 1] === sums[left]) left++;
//             } else if(sum < 0){
//                 left++;
//             } else {
//                 right--;
//             }
//         }
//     }
//     return res;
// }
// threeSum([-1,0,1,2,-1,-4]);
function hasCycle(head) {
    if (!head || !head.next) return false;
    let slow = head;
    let fast = head.next;
    while (fast && fast.next) {
        fast = fast.next;
        slow = slow.next.next;
        if (fast === slow) return true;
    }
    return false;
}
function ListNode(val, next) {
    this.val = val || 0;
    this.next = next || null
}
function swapPairs(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;
    while(head && head.next) {
        let next = head.next;
        head.next = next.next;
        next.next = head;
        pre.next = next;
        pre = head;
        head = head.next;
    }
}