JavaScript ES5

webpack

程序的设计思想

## template -> 编译 ... -> 形成真实的DOM

1、获取到template
2、 template ->AST树 （抽象语法树）
    AST 源代码的抽象语法结构的状态描述
3、AST->render函数 -> _c  _v  _s
4、render 函数->虚拟节点
5、设置PATCH ->打补丁到真实DOM上去