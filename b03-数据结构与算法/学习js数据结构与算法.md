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

