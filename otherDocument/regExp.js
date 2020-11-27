// let reg = /\w?/g;
// let str = 'abce123';
// console.log(str.match(reg)) //['','','','','123','']
// 不回头
// 贪婪模式

// 字符串从左到右，依次匹配多，再匹配少，如果一旦匹配上就不再回头匹配
// 贪婪匹配原则：能匹配上多个，绝不匹配少个

// let reg = /^abc|abc$/g;
// let str = 'abc3131nallasdabc';
// console.log(str.match(reg));

// let reg = /^abc\d+abc$/g
// let str = 'abc1231313abc';
// console.log(str.match(reg));

// let reg = /a+/g
// let str = 'caaaaaaandy';
// console.log(str.match(reg));

// let reg = /^1[\d]{10}/
// let str = '13812334567';

// console.log(reg.test(str))

// 正向预查：要匹配一个字符串，这个字符串后面要制定特定字符的方式
// var str = '1231231231';
// var reg = /1(?=2)/g;

// // 贪婪模式和非贪婪模式（正则默认是贪婪模式）
// var str = 'abcd{{efg}}adcd{{xyz}}'
// var reg = /{{.*}}/g // ["{{efg}}adcd{{xyz}}"] // 贪婪模式
// var reg = /{{.*?}}/g // ["{{efg}}" "{{xyz}}"] // 非贪婪模式：? 


// replace：没有全局匹配的能力，只能匹配一次
// var str = 'JSplusplus';
// var reg = /plus/g; // replace通过正则匹配 "g" 才能全局匹配
// var str1 = str.replace('plus', '+');
// var str2 = str.replace(reg, '+');
// console.log(str1) // JS+plus
// console.log(str2) // JS++

// var str = 'aabbccdd';
// var reg = /(\w)\1(\w)\2/g
// console.log(str.match(reg));

// var str = 'js-plus-plus';
// var reg = /-(\w)/g;
// var str1 = str.replace(reg, function($, $1){
//     console.log($, $1)
//     return $1.toUpperCase();
// })
// console.log(str1)

// jsPlusPlus -> js_plus_plus
// var str = 'jsPlusPlus';
// var reg = /([A-Z])/g;
// var str1 = str.replace(reg, ($, $1) => {
//     return '_' + $1.toUpperCase();
// })
// console.log(str1); // 'js_plus_plus'

// xxyyzz -> XxYyZz
// var str = 'xxyyzz';
// var reg = /(\w)\1(\w)\2(\w)\3/g

// var str1 = str.replace(reg, ($, $1, $2, $3) => {
//     return $1.toUpperCase() + $1 + $2.toUpperCase() + $2 + $3.toUpperCase() + $3
// })

// console.log(str1)

// aabbcc -> a$b$c$; 不能使用function
// var str = 'aabbcc';
// var reg = /(\w)\1(\w)\2(\w)\3/g;
// var str1 = str.replace(reg, '$1$$$2$$$3$$');
// console.log(str1);

// var str = 'aa**+bb+**cc'; // 语法中存在的字符必须使用转义字符\
// var reg = /\*|\+/g
// console.log(str.match(reg))

// 使用正则去重
// var str = 'aaaabbbbbcccccccc';
// var reg = /(\w)\1*/g;
// var str1 = str.replace(reg, '$1')

// 卡号/手机号
// var str = '1234661662226123';  // 100,000,000,000
// var reg = /(?=(\B)(\d{4})+$)/g
// var str1 = str.replace(reg, ' ')
// console.log(str.match(reg))
// console.log(str1)

// 双大括号替换值{{}}
var str = 'My name is {{name}}. I\'m {{age}} years old.';
var reg = /{{(.*?)}}/g;
var str1 = str.replace(reg, function(node, key) {
    console.log(node, key)
    return {
        name: '张三',
        age: 22
    }[key]
})

console.log(str1)










