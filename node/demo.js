// const ProgressBar = require('progress');
// const chalk = require('chalk');
// const bar = new ProgressBar(':bar', { total: 20 })
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//     console.log(chalk.yellow('加载完毕了'))
//   }
// }, 100)

// Node.js 从命令行中接收输入
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
  
//   readline.question(`你叫什么名字?`, name => {
//     console.log(`你好 ${name}!`)
//     readline.close()
// })

// const inquirer = require('inquirer')

// var questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "你叫什么名字?"
//   },
//   {
//     type: 'input',
//     name: 'address',
//     message: "City?"
//   },
//   {
//     type: 'input',
//     name: 'job',
//     message: "你的工作是什么?"
//   }
// ]

// inquirer.prompt(questions).then(answers => {
//   console.log(`你好 ${answers['name']}!`)
// })

// process.nextTick(() => console.log('nextTick1'));
// console.log('global1')
// setImmediate(() => {
//     console.log('setImmediate');
//     process.nextTick(() => console.log('nextTick3'));
// })
// Promise.resolve('promise1').then(res => console.log(res));
// setTimeout(() => console.log('setTimeout1'), 1000);
// process.nextTick(() => console.log('nextTick2'));
// Promise.resolve('promise2').then(res => console.log(res));
// setTimeout(() => console.log('setTimeout2'), 1000);
// console.log('global2')


