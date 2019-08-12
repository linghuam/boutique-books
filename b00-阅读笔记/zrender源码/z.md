# zrender

## 概览

```js
// 对外暴露一个对象
var zrender = {
    version: '4.0.7',
    init: function (dom, opts) {},
    dispose: function (zr) {},
    getInstance: function (id) {},
    registerPainter: function (name, Ctor) {}
    // ...... other interface：src/export.js
};
```

## 内部类

* ZRender

## 几个重要内部对象(类实例)

* Storage（M）
* Painter（V）
* Handler（C）
* Animation

## src/core

### arrayDiff.js

> If x and y are strings, where length(x) = n and length(y) = m, the Needleman-Wunsch algorithm finds an optimal alignment in O(nm) time, using O(nm) space. Hirschberg's algorithm is a clever modification of the Needleman-Wunsch Algorithm which still takes O (nm) time, but needs only O(min{n,m}) space and is much faster in practice.

### bbox.js

* 从顶点数组中计算出最小包围盒
* 从直线计算最小包围盒
* 从三阶贝塞尔曲线(p0, p1, p2, p3)中计算出最小包围盒（找极值点和始末点的包围盒）
* 从二阶贝塞尔曲线(p0, p1, p2)中计算出最小包围盒（找极值点和始末点的包围盒）
* 从圆弧中计算出最小包围盒

### BoundingRect.js

属性：

* x
* y
* width
* heigth

方法：

* 合并
* 变换
* 相交
* 包含
* 克隆
* 复制
* 序列化

### curve.js

计算二/三次方**贝塞尔值**

```js
function quadraticAt(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

function cubicAt(p0, p1, p2, p3, t) {
    return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3;
}
```

计算二/三次方贝塞尔**导数值**

```js
function quadraticDerivativeAt(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}

function cubicDerivativeAt(p0, p1, p2, p3, t) {
    return 3 * ((1 - t) * (1 - t) * (p1 - p0) + 2 * (1 - t) * t * (p2 - p1) + t * t * (p3 - p2));
}
```

计算二/三次方贝塞尔**方程根**

[盛金公式](https://blog.csdn.net/liutaojia/article/details/83005533)

计算二/三次贝塞尔方程**极限值**

```js
//令导数值为零，求出对应的 t 值
function quadraticExtremum(p0, p1, p2) {
    var divider = p0 + p2 - 2 * p1;
    if (divider === 0) {
        // p1 is center of p0 and p2
        return 0.5;
    }
    else {
        return (p0 - p1) / divider;
    }
}
```

**细分**二/三次贝塞尔曲线（过细分点切线与始末切线的交点）

```js
function quadraticSubdivide(p0, p1, p2, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p012 = (p12 - p01) * t + p01;

    // seg0
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;

    // seg1
    out[3] = p012;
    out[4] = p12;
    out[5] = p2;
}
```

**投射**点到二/三次贝塞尔曲线上，返回投射距离（一个或者多个，这里只返回其中距离最短的一个）。

[根据已知点找曲线上离它最近的点](https://pomax.github.io/bezierinfo/#projections)

### env.js

设备环境识别：[Zepto.js](https://github.com/madrobby/zepto/blob/master/src/detect.js)

### event.js

`DOM事件`和`对象事件`

#### clientToLocal

将鼠标事件坐标转换成canvas坐标。

e.offsetX/e.offsetY 相对于 `padding box`。

> According to the W3C Working Draft, offsetX and offsetY should be relative to the padding edge of the target element. The only browser using this convention is IE. Webkit uses the border edge,Opera uses the content edge, and FireFox does not support the properties.(see http://www.jacklmoore.com/notes/mouse-position/).

#### addEventListener/removeEventListener

```js
var isDomLevel2 = (typeof window !== 'undefined') && !!window.addEventListener;
export function addEventListener(el, name, handler) {
    if (isDomLevel2) {
        // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
        el.addEventListener(name, handler);
    }
    else {
        el.attachEvent('on' + name, handler);
    }
}

export function removeEventListener(el, name, handler) {
    if (isDomLevel2) {
        el.removeEventListener(name, handler);
    }
    else {
        el.detachEvent('on' + name, handler);
    }
}
```

#### stop event / event object

```js
var stop = isDomLevel2
    ? function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }
    : function (e) {
        e.returnValue = false;
        e.cancelBubble = true;
    };
var event = function(e) {
    return e || window.event;
}
```

### fourPointsTransform.js

The algoritm is learnt from：https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/

### GestureMgr.js

手势判断

### guid.js

```js
// zrender: 生成唯一id
var idStart = 0x0907;
export default function () {
    return idStart++;
}
```

### log.js

```js
var log = function () {
};

if (debugMode === 1) {
    log = function () {
        for (var k in arguments) {
            throw new Error(arguments[k]);
        }
    };
}
else if (debugMode > 1) {
    log = function () {
        for (var k in arguments) {
            console.log(arguments[k]);
        }
    };
}
```

### LRU.js

优化后的双向链表，时间复杂度o(1)。

```js
linkedListProto.insertEntry = function (entry) {
    if (!this.head) {
        this.head = this.tail = entry;
    }
    else {
        this.tail.next = entry;
        entry.prev = this.tail;
        entry.next = null;
        this.tail = entry;
    }
    this._len++;
};
linkedListProto.remove = function (entry) {
    var prev = entry.prev;
    var next = entry.next;
    if (prev) {
        prev.next = next;
    }
    else {
        // Is head
        this.head = next;
    }
    if (next) {
        next.prev = prev;
    }
    else {
        // Is tail
        this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
};

// O(1) remove operation.
// 空间换时间，将删除和查询操作优化到 O(1) 时间复杂度
var LRU = function (maxSize) {

    this._list = new LinkedList();

    this._map = {};

    this._maxSize = maxSize || 10;

    this._lastRemovedEntry = null;
};

var LRUProto = LRU.prototype;

/**
 * @param  {string} key
 * @param  {} value
 * @return {} Removed value
 */
LRUProto.put = function (key, value) {
    var list = this._list;
    var map = this._map;
    var removed = null;
    if (map[key] == null) {
        var len = list.len();
        // Reuse last removed entry
        var entry = this._lastRemovedEntry;
        // 超出长度，移除头部，尾部插入新节点
        if (len >= this._maxSize && len > 0) {
            // Remove the least recently used
            var leastUsedEntry = list.head;
            list.remove(leastUsedEntry);
            delete map[leastUsedEntry.key];

            removed = leastUsedEntry.value;
            this._lastRemovedEntry = leastUsedEntry;
        }

        if (entry) {
            entry.value = value;
        }
        else {
            entry = new Entry(value);
        }
        entry.key = key;
        list.insertEntry(entry);
        map[key] = entry;
    }

    return removed;
};

/**
 * @param  {string} key
 * @return {}
 */
LRUProto.get = function (key) {
    var entry = this._map[key];
    var list = this._list;
    if (entry != null) {
        // 最近访问的节点放到尾部
        // Put the latest used entry in the tail
        if (entry !== list.tail) {
            list.remove(entry);
            list.insertEntry(entry);
        }

        return entry.value;
    }
};
```

### matrix.js

矩阵操作:

* 矩阵相乘
* 平移变换
* 旋转变换
* 缩放变换
* 求逆矩阵

### PathProxy.js

Path 代理，可以在`buildPath`中用于替代`ctx`, 会保存每个path操作的命令到pathCommands属性中可以用于isInsidePath 判断以及获取boundingRect。

比原生Path的好处：1、数据可保存可恢复；2、支持bounding、isInside判断；3、可以封装一些自定义path；

 ```js
/*
保存 path 数据的思路：
1、用整数来表示绘制指令，cmd定义
2、绘制的时候用普通数组 push 指令和坐标
3、绘制完成（fill、stroke）时将普通数组转成 Float32Array 静态存储，减少堆内存占用
*/

/**
 * 转成静态的 Float32Array 减少堆内存占用
 * Convert dynamic array to static Float32Array
 */
function toStatic () {
    var data = this.data;
    if (data instanceof Array) {
        data.length = this._len;
        if (hasTypedArray) {
            this.data = new Float32Array(data);
        }
    }
}
```

### timsort.js

时间复杂度为 nlogn 的排序算法

* [node-timsort](https://github.com/mziccard/node-timsort)
* [timsort-sorting-algorithm](https://www.infopulse.com/blog/timsort-sorting-algorithm/)

### util.js

```js
function bind(func, context) {
    var nativeSlice = Array.prototype.slice;
    var args = nativeSlice.call(arguments, 2);
    return function() {
        return func.apply(context, args.concat(nativeSlice.call(arguments)));
    };
}

function curry(func) {
    var nativeSlice = Array.prototype.slice;
    var args = nativeSlice.call(arguments, 1);
    return function() {
        return func.apply(this, args.concat(nativeSlice.call(arguments)));
    }
}
```

### vector.js

向量操作

## src/animation

动画

## src/contain

路径是否包含点

## src/container

Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上

## src/dom

DOM事件处理

## src/graphic
src/graphic/Text.js

## src/mixin

