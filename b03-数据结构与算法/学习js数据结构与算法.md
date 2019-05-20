# 学习js数据结构与算法

## 栈

### 十进制转二进制

除2取余，直到整数为0，反向输出余数。

```js
function divideBy2(num) {
    var stack = [],
        result = '';
    while(num > 0) {
        stack.push(Math.floor(num % 2));
        num = Math.floor(num / 2);
    }
    while(stack.length) {
        result += stack.pop().toString();
    }
    return result;
}
```

### 十进制转任意进制

```js
function baseConverter(decNumber, base) {
    var stack = [],
        digits = '0123456789ABCDEF',
        result = '';
    while(decNumber > 0) {
        stack.push(Math.floor(decNumber % base));
        decNumber = Math.floor(decNumber / base);
    }
    while(stack.length) {
        result += digits[stack.pop()];
    }
    return result;
}
```

## 队列

循环队列

## 链表

* 单链表
* 双向链表
* 循环链表

## 集合

* 并集
* 交集
* 差集
* 子集

## 字典和散列表（HashMap）

### 散列表

#### 选择散列函数

一个表现良好的散列函数是由几个方面构成的：插入和检索元素的时间（即性能），当然也包括较低的冲突可能性。

也有一些为数字键值准备的散列函数，你可以在![http://goo.gl/VtdN2x](http://goo.gl/VtdN2x)找到一
系列的实现。

#### 处理散列值冲突

处理冲突有几种方法：分离链接、线性探查和双散列法。

* **分离链接法** 包括为散列表的每一个位置创建一个链表并将元素存储在里面。

* **线性探查** 当想向表中某个位置加入一个新元素的时候，如果索引
为index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，就尝试
index+2的位置，以此类推。

```text
在一些编程语言中，我们需要定义数组的大小。如果使用线性探查的话，需
要注意的一个问题是数组的可用位置可能会被用完。在JavaScript中，我们不需
要担心这个问题，因为我们不需要定义数组的大小，它可以根据需要自动改变大
小——这是JavaScript内置的一个功能。
```

* **双散列法** 即在同义词产生地址冲突时计算另一个散列函数地址，直到冲突不再发生，这种方法不易产生“聚集”，但增加了计算时间。

## 树

### 基本术语

**结点：** 包含一个数据元素及若干指向子树的指针。

**结点的度(Degree)：** 结点拥有的子树数。

**叶子(Leaf)（终端）结点：** 度为零的结点。

**分支（非终端）结点：** 度大于零的结点。

**树的度：** 树内各结点度的最大值。

**孩子(Child)：** 结点的子树的根称为该结点的孩子。

**双亲(Parent)：** 该结点称为孩子的双亲。

**兄弟(Sibling)：** 同一双亲的孩子之间互称为兄弟。

**祖先：** 从根到该结点所经分支上的所有结点。

**子孙：** 以某结点为根的子树中的任一结点都称为该点的子孙。

**层次：** 从根开始定义，根为第一层，根的孩子为第二层，以此类推。

**堂兄弟：** 双亲在同一层的结点互为堂兄弟。

**深度(Depth)：** 树中结点的最大层次称为树的深度或高度。

**有序树 & 无序树：** 如果将树中结点的各子树看成从左至右是有序的，则称该树为有序树，否则为无序树。

**森林(Forest)：** m(m>=0)棵互不相交的树的集合。

**二叉树(BinaryTree)：** 每个结点至多只有两棵子树且左右有序。

**二叉搜索树(BST)：** 左边存储比父节点小，右边存储比父节点大的二叉树。

### 树的创建（BST）

``` js
function BST() {
    function Node(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
    this.root = null;
    this.addNode = function(value) {
        var node = new Node(value);
        if (this.root == null) {
            this.root = node;
        } else {
            var currentNode = this.root;
            var isContinue = true;
            while(isContinue) {
                if (value < currentNode.value) {
                    if (currentNode.left) {
                        currentNode = currentNode.left;
                    } else {
                        currentNode.left = node;
                        isContinue = false;
                    }
                } else if (value > currentNode.value) {
                    if (currentNode.right) {
                        currentNode = currentNode.right;
                    } else {
                        currentNode.right = node;
                        isContinue = false;
                    }
                }
            }
        }
    }
}

// 递归写法
function insertNode(root, newNode) {
    if (root === null) {
        root = newNode;
    } else {
        if (newNode.value < root.value) {
            if (root.left === null) {
                root.left = newNode;
            } else {
                insertNode(root.left, newNode);
            }
        } else {
            if (root.right === null) {
                root.right = newNode;
            } else {
                insertNode(root.right, newNode);
            }
        }
    }
}
```

### 树的遍历

#### 中序遍历（左根右）

```js
// 递归写法
function traveseTree(node, callback) {
    if (node !== null) {
        traveseTree(node.left, callback);
        callback(node);
        traveseTree(node.right, callback);
    }
}

// 非递归写法
function traveseTree(root, callback) {
    var stack = [];
    var currentNode = root;
    while(currentNode) {
        while(currentNode.left) {
            stack.push(currentNode.left);
            currentNode = currentNode.left;
        }
        callback(stack.pop());
        callback(stack.pop());
    }
}
```

#### 先序遍历（根左右）
#### 后序遍历（左右根）

### 树的查找

### 树的删除