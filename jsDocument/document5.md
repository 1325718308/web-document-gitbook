### js手动实现new方法

* 1、新生成了一个对象
* 2、新对象隐式原型链接到函数原型
* 3、调用函数绑定this
* 4、返回新对象

```
    function myNew(FN, ...args) {
        var obj = {};
        obj.__proto__ = FN.prototype;
        const result = FN.apply(obj, args);
        return typeof result === 'object' ? result : obj;
    } 
```
测试一下
```
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    const person = myNew(Person, '张三', 20);
    console.log(person.name); // 占三
    console.log(person.age); // 20
    console.log(person instanceof Person);  // true
```