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
* 从三阶贝塞尔曲线(p0, p1, p2, p3)中计算出最小包围盒
* 从二阶贝塞尔曲线(p0, p1, p2)中计算出最小包围盒
* 从圆弧中计算出最小包围盒

### BoundingRect.js

### curve.js

计算二/三次方贝塞尔值

```js
function quadraticAt(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

function cubicAt(p0, p1, p2, p3, t) {
    return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3;
}
```

计算二/三次方贝塞尔导数值

```js
function quadraticDerivativeAt(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}

function cubicDerivativeAt(p0, p1, p2, p3, t) {
    return 3 * ((1 - t) * (1 - t) * (p1 - p0) + 2 * (1 - t) * t * (p2 - p1) + t * t * (p3 - p2));
}
```

计算二/三次方贝塞尔方程根

[盛金公式](https://blog.csdn.net/liutaojia/article/details/83005533)

计算二/三次贝塞尔方程极限值

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

细分二/三次贝塞尔曲线（过细分点切线与始末切线的交点）

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

投射点到二/三次贝塞尔曲线上，返回投射距离（一个或者多个，这里只返回其中距离最短的一个）。

[根据已知点找曲线上离它最近的点](https://pomax.github.io/bezierinfo/#projections)
