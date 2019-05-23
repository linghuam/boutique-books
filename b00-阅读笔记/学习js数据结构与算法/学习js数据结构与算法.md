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

// 非递归写法（借助栈）
function traveseTree(root, callback) {
    var stack = [];
    var p = root;
    if (root == null)
        return;
    while(stack.length || p) {
        // 第一步：遍历左子树，根节点入栈（为了后面根据根节点找到右子树）
        while(p) {
            stack.push(p);
            p = p.left;
        }
        // 第二步：出栈（p指向栈顶元素，取p的右子树重复以上过程，直到栈为空且p为空）
        callback(p = stack.pop());
        p = p.right;
    }
}
```

#### 先序遍历（根左右）

```js
// 递归写法
function traveseTree(root, callback) {
    if (root != null) {
        callback(root);
        traveseTree(root.left);
        traveseTree(root.right);
    }
}

// 非递归写法（借助栈）
function traveseTree(root, callback) {
    var p = root,
        stack = [];
    if (root == null) return;
    while(stack.length || p) {
        // 第一步：先遍历左子树，边遍历边打印，并将根节点存入栈中，以后借助跟节点进入右子树开启新一轮遍历
        while(p) {
            callback(p);
            stack.push(p);
            p = p.left;
        }
        p = stack.pop();
        p = p.right;
    }
}
```

#### 后序遍历（左右根）

```js
// 递归写法
function traveseTree(root, callback) {
    if (root != null) {
        traveseTree(root.left);
        traveseTree(root.right);
        callback(root);
    }
}

// 非递归写法（借助栈）
// 后序遍历的难点在于：需要判断上次访问的节点是位于左子树，还是右子树。若是位于左子树，则需跳过根节点，先进入右子树，再回头访问根节点；若是位于右子树，则直接访问根节点。
function traveseTree(root, callback) {
    var pCur = root, pLast = null, stack = [];
    if (root == null) return;
    // 先把pCur移到左子树最下边
    while(pCur) {
        stack.push(pCur);
        pCur = pCur.left;
    }
    while(stack.length) {
        pCur = stack.pop();
        //一个根节点被访问的前提是：无右子树或右子树已被访问过
        if (pCur.right == null || pCur.right == pLast) {
            callback(pCur);
            pLast = pCur;
        }
        /*这里的else语句可换成带条件的else if:
        else if (pCur->lchild == pLastVisit)//若左子树刚被访问过，则需先进入右子树(根节点需再次入栈)
        因为：上面的条件没通过就一定是下面的条件满足。仔细想想！
        */
        else {
            // 根节点再次入栈
            stack.push(pCur);
            // 进入右子树，且可肯定右子树一定不为空
            pCur = pCur.right;
            while(pCur) {
                stack.push(pCur);
                pCur = pCur.left;
            }
        }
    }
}
```

#### 层次遍历（利用队列实现）

1. 根节点入队
2. 出队
3. 如果有左孩子，左孩子入队；如果有右孩子，右孩子入队。
4. 重复步骤2、3，直到队列为空。

```js
function traveseTree(root, callback) {
    var queue = [];
    if (root == null) return null;
    queue.push(root);
    while(queue.length) {
        var frontNode = queue.shift();
        callback(frontNode);
        if (frontNode.left) queue.push(frontNode.left);
        if (frontNode.right) queue.push(frontNode.right);
    }
}
```

### 树的查找

* 最小值：左子树最下边
* 最大值：右子树最下边
* 特定值：先序遍历

### 树的删除

```js
// 删除值为value的节点
function removeNode(node, value) {
    if (node == null) return null;
    if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
    } else if (value > node.value) {
        node.right = removeNode(node.right, value);
        return node;
    } else {
        //情况1：节点为叶节点（有零个子节点的节点）
        if(node.left == null && node.right == null) {
            node = null;
            return node;
        }
        //情况2：只有一个子节点的节点
        if (node.left == null) {
            node = node.right;
            return node;
        } else if(node.right == null) {
            node = node.left;
            return node;
        }
        //情况3：有两个子节点的节点
        // 先找到右边子树节点的最小值节点
        // 再用最小值节点的值更新当前节点的值
        // 最后删除右边子树最小值节点
        var findMinNode = function(node) {
            if (node) {
                while(node && node.left !== null) {
                    node = node.left;
                }
                return node;
            }
            return null;
        }
        var aux = findMinNode(node.right);
        node.value = aux.value;
        node.right = removeNode(node.right, aux.value);
        return node;
    }
}
```

### 其他扩展

* 红黑树
* AVL平衡二叉搜索树

## 图

### 图的表示

* 邻接矩阵：顶点用数组索引表示，`a[i][j] = 1`来表示边。缺点是浪费一些空间。
* 邻接表：每个顶点的相邻顶点列表组成。
* 关联矩阵：行表示顶点，列表示边，`a[i][j] = 1`表示边j的入射顶点为i。

```js
function Graph() {
    this.vertices = [];
    this.vertexMap = new Map();
    this.adjList = new Map();
    this.addVertex = function(v) {
        return this.vertexMap.has(v.id) ? null : (v.status = 0, this.vertexMap.set(v.id, v), this.vertices.push(v),this.adjList.set(v.id, new Set()), v);
    };
    this.addEdge = function(sourceId, targetId) {
        if (this.vertexMap.has(sourceId) && this.vertexMap.has(targetId)) {
            this.adjList.get(sourceId).add(this.vertexMap.get(targetId));
            this.adjList.get(targetId).add(this.vertexMap.get(sourceId));
        }
        return this;
    };
    this.getVertex = function(id) {
        return this.vertexMap.get(id);
    };
    this.getVertexAdj = function(id) {
        return this.adjList.get(id) || [];
    };
    this.toString = function() {
        this.adjList.forEach((value, key) => {
            console.log(key + ':' + Array.from(value).map(e => e.id).join(',') + '\n');
        });
    };
}
```

### 图的遍历

* 广度优先（BFS）：用**队列**实现。
* 深度优先（DFS）：用**栈**实现。

用 status 表示节点状态：

* 0 - 初始状态
* 1 - 被探索状态
* 2 - 被访问过状态

```js
// 广度优先（BFS）算法：用**队列**实现。
/*
1. 创建一个队列 Q
2. 将 v 标记为 1，并入队
3. 如果 Q 非空，重复以下步骤
  3.1 将 u 出队
  3.2 寻找 u 的相邻节点，并将未被访问的节点入栈，并标记为 1
  3.3 访问节点，标记为 2
*/
function BFS(root, callback) {
    var queue = [];
    if (root == null) return null;
    root.status = 1 && queue.push(root);
    while(queue.length) {
        var curVertex = queue.shift();
        // 将相邻节点入队
        var adjVertexs = graph.getVertexAdj(curVertex.id);
        adjVertexs.forEach(e => {
            // 忽略已经入队或已经被访问过的节点
            if (e.status === 0) {
                e.status = 1 && queue.push(e);
            }
        });
        // 节点被访问
        callback(curVertex);
        curVertex.status = 2;
    }
}
```

```js
// 深度优先（DFS）算法：用**栈**实现。
function DFS(callback) {}
```

## 排序和搜索算法

## 算法补充知识

## 时间复杂度速查表