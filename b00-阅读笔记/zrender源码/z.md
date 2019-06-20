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

### src/core/arrayDiff.js

> If x and y are strings, where length(x) = n and length(y) = m, the Needleman-Wunsch algorithm finds an optimal alignment in O(nm) time, using O(nm) space. Hirschberg's algorithm is a clever modification of the Needleman-Wunsch Algorithm which still takes O (nm) time, but needs only O(min{n,m}) space and is much faster in practice.
