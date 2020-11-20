// const person = {
//     name: '张三',
//     age: 22
// }

// const proxyPerson = new Proxy(person, {
//     set(target, property, value) {
//         console.log(target, property, value);
//         target[property] = value;
//         return true;
//     },
//     get(target, property) {
//         return property in target ? target[property] : undefined;
//     }
// })
// proxyPerson.sex = 'Male';
// proxyPerson.job = 'coder'
// console.log(person.sex);
// console.log(person.job);
// Object.setPrototypeOf(person, {
//     say() {
//         console.log('say hello');
//     },
//     run() {
//         console.log('person runing');
//     }
// })
// console.log(Object.getPrototypeOf(person));
// console.log(person.say());
// console.log(person.run());


// const obj = {
//     a: 123,
//     [Symbol('22')]: 'symbol'
// }
// console.log(Object.getOwnPropertyNames(obj))
// console.log(Object.getOwnPropertySymbols(obj));

// const obj = {
//     stores: [1,2,3,4,5],
//     [Symbol.iterator]: function * () {
//         let index = 0
//         for (const item of this.stores) {
//             yield {
//                 value: item,
//                 done: ++index >= this.stores.length
//             } 
//         }
        
//     }
// }
// for (const item of obj) {
//     console.log(item)
// }

// const arr = [1,2,3,4,5];
// const pro = {
//     a: 123
// }
// const proxyArr = new Proxy(arr, {
//     getPrototypeOf() {
//         return {a:1};
//     },
//     setPrototypeOf(target, prototype) {
//         target.prototype = prototype;
//         return true;
//     }
// })
// console.log(Object.setPrototypeOf(arr, pro));
// console.log(proxyArr.prototype)

const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('你好世界\n')
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})