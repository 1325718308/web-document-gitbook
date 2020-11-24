import Vue from 'vue';
// options API 
let vm = new Vue({
    el: '#app',
    data() {
        return {
            title: '学生列表',
            classNum: 1,
            total: 2,
            teacher: ['张三', '里斯'],
            info: {
                a: {
                    b: 1
                }
            },
            students: [
                {
                    id: 1,
                    name: "小红"
                },
                {
                    id: 2,
                    name: "小明"
                }
            ]
        }
    }
})
console.log(vm.info.a.b)
// vm.title = '学生列表111'
