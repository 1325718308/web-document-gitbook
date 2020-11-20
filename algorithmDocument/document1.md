### 1、如何判断一个树是否是平衡二叉树
**解体思路**

自顶向下，先定个函数求当前节点的树高多少，那么平衡因子就是左右子树高度差。本质还是利用的树的递归遍历。

**代码实现**
```
    function isBalacne(root) {
        if (!root) {
            return true;
        }
        // 递归去判断左右子树是否都是平衡树
        return Math.abs(getHeight(root.left), getHeight(root.right)) <= 1 && isBalacne(root.left) && isBalacne(root.right);
    }
    function getHeight(node) {
        if (!node) {
            return 0;
        }
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }
```
### 2、设计一个算法来计算二叉树的最大深度
**解体思路**

- 找出终止条件：当节点为空时
- 找出返回值：节点为空时说明高度为0，所以返回0；节点不为空时则分别求左右子树的高度的最大值，同时加1表示当前节点的高度，返回该数值
- 某层的执行过程：在返回值部分基本已经描述清楚
- 时间复杂度O(n)

**代码实现**
```
    function maxDepth(root) {
        if (!root) {
            return 0;
        }
        // 递归去计算左子树的深度
        const left = maxDepth(root.left);
        // 递归去计算右子树的深度
        const right = maxDepth(root.right);
        // 这里加1是因为要加上当前节点
        return Math.max(left, right) + 1;
    }
```

### 3、设计一个算发返判断两个二叉树是不是相同
**解体思路**

- 终止条件与返回值：当两棵树的当前节点都为 null 时返回 true
    当其中一个为 null 另一个不为 null 时返回 false
    当两个都不为空但是值不相等时，返回 false
- 执行过程：当满足终止条件时进行返回，不满足时分别判断左子树和右子树    是否相同，其中要注意代码中的短路效应
- 时间复杂度：O(n)
```
    function isSameTree(tree1, tree2) {
        // 两棵树的节点都为空
        if (!tree1 && !tree2) {
            return true;
        }
        // 只有一棵树的节点为空
        if (!tree1 || !tree2) {
            return false;
        }
        // 两棵树的节点的值不一样
        if (tree1.val != tree2.val) {
            return false;
        }
        // 递归判断两棵树的所有节点
        return isSameTree(tree1.left, tree2.left) && isSameTree(tree1.right, tree2.right);
    }
```

### 4、给定一个二叉树，检查它是不是镜像对称的
**解题思路**
- 它们的根节点具有相同的值
- 每个树的右子树，和另一个树的左子树镜像对称
- 时间复杂度：O(n)

**代码实现1** 
```
    /**
    * 递归实现
    **/
    function isSymmetric(root) {
        // 根节点为空返回true，镜像对称
        if (!root) {
            return true;
        }
        const check = (left, right) => {
            // 如果左右子树都为空，返回true，镜像对称
            if (!left && !right) {
                return true;
            }
            // 如果左右子树都存在，递归的去判断左右子树
            if (left && right) {
                return left.val == right.val && check(left.left, right.right) && check(left.right, right.left);
            }
            return false;
        }
        return check(root.left, root.right);
    }
```