import Vue from 'vue';
let vm = new Vue({
    el: '#app',
    template: `<div id="app" style="color: red">
    hello: {{title}}
    <span class="text" style="color: green">{{age}}</span>
</div>`,
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
vm.students.push({
    id: 3,
    name: '小白'
})


