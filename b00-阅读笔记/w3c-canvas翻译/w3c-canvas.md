# HTML Canvas 2D Context

[英文原版地址](https://www.w3.org/TR/2dcontext/#pixel-manipulation)

## 摘要

该规范定义了 HTML canvas 元素的 2D 上下文。2D 上下文提供对象，方法和属性，以在画布绘图表面上绘制和操纵图形。

## 本文件的状态

略...

## 目录

1. [符合标准](#符合标准)
2. [canvas状态](#canvas状态)
3. [线样式](#线样式)
4. [文本样式](#文本样式)
5. [建立路径](#建立路径)
6. [变换](#变换)
7. [2D渲染上下文的图像源](#2D渲染上下文的图像源)
8. [填充和描边样式](#填充和描边样式)
9. [在画布上绘制矩形](#在画布上绘制矩形)
10. [在画布上绘制文字](#在画布上绘制文字)
11. [在画布上绘制路径](#在画布上绘制路径)
12. [在画布上绘制图像](#在画布上绘制图像)
13. [热区](#热区)
14. [像素操作](#像素操作)
15. [合成](#合成)
16. [阴影](#阴影)
17. [绘制模型](#绘制模型)
18. [最佳实践](#最佳实践)
19. [例子](#例子)


## 符合标准
该规范是 HTML 规范。 HTML5 核心规范中描述的所有一致性要求，一致性类，定义，依赖项，术语和印刷约定均适用于此规范。

接口是根据[Web IDL](https://www.w3.org/TR/WebIDL-1/)定义的。

该规范定义了 2d 上下文类型，其 2D API 使用[CanvasRenderingContext2D](https://www.w3.org/TR/2dcontext/#canvasrenderingcontext2d)接口实现。

当 [canvas](https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element) 元素的 [getContext()](https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-getcontext) 方法返回 contextId 2d 的新对象时，用户代理必须返回一个新的 CanvasRenderingContext2D 对象。任何其他参数都将被忽略。

2D 上下文采用笛卡尔坐标系，其原点（0,0）位于左上角，坐标空间的 x 值在向右时增加，而 y 值在向下时增加。

IDL定义：

```
typedef (HTMLImageElement or
         HTMLVideoElement or
         HTMLCanvasElement) CanvasImageSource;

interface CanvasRenderingContext2D {

  // back-reference to the canvas
  readonly attribute HTMLCanvasElement canvas;

  // state
  void save(); // push state on state stack
  void restore(); // pop state stack and restore state

  // transformations (default: transform is the identity matrix)
  void scale(unrestricted double x, unrestricted double y);
  void rotate(unrestricted double angle);
  void translate(unrestricted double x, unrestricted double y);
  void transform(unrestricted double a, unrestricted double b, unrestricted double c, unrestricted double d, unrestricted double e, unrestricted double f);
  void setTransform(unrestricted double a, unrestricted double b, unrestricted double c, unrestricted double d, unrestricted double e, unrestricted double f);

  // compositing
           attribute unrestricted double globalAlpha; // (default: 1.0)
           attribute DOMString globalCompositeOperation; // (default: "source-over")

  // colors and styles (see also the CanvasDrawingStyles interface)
           attribute (DOMString or CanvasGradient or CanvasPattern) strokeStyle; // (default: "black")
           attribute (DOMString or CanvasGradient or CanvasPattern) fillStyle; // (default: "black")
  CanvasGradient createLinearGradient(double x0, double y0, double x1, double y1);
  CanvasGradient createRadialGradient(double x0, double y0, double r0, double x1, double y1, double r1);
  CanvasPattern createPattern(CanvasImageSource image, [TreatNullAs=EmptyString] DOMString repetition);

  // shadows
           attribute unrestricted double shadowOffsetX; // (default: 0)
           attribute unrestricted double shadowOffsetY; // (default: 0)
           attribute unrestricted double shadowBlur; // (default: 0)
           attribute DOMString shadowColor; // (default: "transparent black")

  // rects
  void clearRect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);
  void fillRect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);
  void strokeRect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);

  // path API (see also CanvasPathMethods)
  void beginPath();
  void fill();
  void stroke();
  void drawFocusIfNeeded(Element element);
  void clip();
  boolean isPointInPath(unrestricted double x, unrestricted double y);

  // text (see also the CanvasDrawingStyles interface)
  void fillText(DOMString text, unrestricted double x, unrestricted double y, optional unrestricted double maxWidth);
  void strokeText(DOMString text, unrestricted double x, unrestricted double y, optional unrestricted double maxWidth);
  TextMetrics measureText(DOMString text);

  // drawing images
  void drawImage(CanvasImageSource image, unrestricted double dx, unrestricted double dy);
  void drawImage(CanvasImageSource image, unrestricted double dx, unrestricted double dy, unrestricted double dw, unrestricted double dh);
  void drawImage(CanvasImageSource image, unrestricted double sx, unrestricted double sy, unrestricted double sw, unrestricted double sh, unrestricted double dx, unrestricted double dy, unrestricted double dw, unrestricted double dh);

  // hit regions
  void addHitRegion(HitRegionOptions options);
  void removeHitRegion(DOMString id);
  void clearHitRegions();

  // pixel manipulation
  ImageData createImageData(unrestricted double sw, unrestricted double sh);
  ImageData createImageData(ImageData imagedata);
  ImageData getImageData(double sx, double sy, double sw, double sh);
  void putImageData(ImageData imagedata, double dx, double dy);
  void putImageData(ImageData imagedata, double dx, double dy, double dirtyX, double dirtyY, double dirtyWidth, double dirtyHeight);
};
CanvasRenderingContext2D implements CanvasDrawingStyles;
CanvasRenderingContext2D implements CanvasPathMethods;

[NoInterfaceObject]
interface CanvasDrawingStyles {
  // line caps/joins
           attribute unrestricted double lineWidth; // (default: 1)
           attribute DOMString lineCap; // "butt", "round", "square" (default: "butt")
           attribute DOMString lineJoin; // "round", "bevel", "miter" (default: "miter")
           attribute unrestricted double miterLimit; // (default: 10)

  // dashed lines
  void setLineDash(sequence<unrestricted double> segments); // (default: empty)
  sequence<unrestricted double> getLineDash();
           attribute unrestricted double lineDashOffset;


  // text
           attribute DOMString font; // (default: "10px sans-serif")
           attribute DOMString textAlign; // "start", "end", "left", "right", "center" (default: "start")
           attribute DOMString textBaseline; // "top", "hanging", "middle", "alphabetic", "ideographic", "bottom" (default: "alphabetic")
};

[NoInterfaceObject]
interface CanvasPathMethods {
  // shared path API methods
  void closePath();
  void moveTo(unrestricted double x, unrestricted double y);
  void lineTo(unrestricted double x, unrestricted double y);
  void quadraticCurveTo(unrestricted double cpx, unrestricted double cpy, unrestricted double x, unrestricted double y);
  void bezierCurveTo(unrestricted double cp1x, unrestricted double cp1y, unrestricted double cp2x, unrestricted double cp2y, unrestricted double x, unrestricted double y);
  void arcTo(unrestricted double x1, unrestricted double y1, unrestricted double x2, unrestricted double y2, unrestricted double radius); 
  void rect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);
  void arc(unrestricted double x, unrestricted double y, unrestricted double radius, unrestricted double startAngle, unrestricted double endAngle, optional boolean counterclockwise = false); 

  };

interface CanvasGradient {
  // opaque object
  void addColorStop(double offset, DOMString color);
};

interface CanvasPattern {
  // opaque object
};

interface TextMetrics {
  readonly attribute double width;
};

dictionary HitRegionOptions {
  // dictionary to allow expansion on Hit Regions in Canvas Context 2D Level 2
  DOMString id = "";
  // for control-backed regions:
  Element? control = null;
};

interface ImageData {
  readonly attribute unsigned long width;
  readonly attribute unsigned long height;
  readonly attribute Uint8ClampedArray data;
};
```

`context.canvas` 属性必须返回在当前上下文上绘制的 canvas 元素。

除非另有说明，否则对于 2D 上下文接口，任何带有数值参数（其值为无穷大或 NaN 值）的方法调用都必须被忽略。

每当在此 API 中将 CSS 值 [currentColor](https://www.zhangxinxu.com/wordpress/2014/10/currentcolor-css3-powerful-css-keyword/) 用作颜色时，currentColor 是该元素的 color 计算值，如果在特定情况下 color 属性的计算值未定义，currentColor 关键字是完全不透明的黑色。

如果是 CanvasGradient 上的 addColorStop() 方法，用于确定 currentColor 关键字的计算值的“'color'属性的计算值”始终是完全不透明的黑色（因为没有相关的元素）。

> NOTE: 这是因为 CanvasGradient 对象与画布无关,由一个画布创建的 CanvasGradient 对象可以被另一个画布使用，因此，在指定颜色时无法知道哪个是“相关元素”。

> NOTE: 与字体相关的属性也存在类似的问题。这些规则将在下面的相关部分中详细介绍。

## canvas状态

每个上下文维护一堆绘图状态。绘图状态（Drawing states）包括：

* 当前的[变换矩阵](https://www.w3.org/TR/2dcontext/#transformations)。
* 当前的[裁剪区域](https://www.w3.org/TR/2dcontext/#clipping-region)。
* 以下属性的当前值：`strokeStyle`，`fillStyle`，`globalAlpha`，`lineWidth`，`lineCap`，`lineJoin`，`miterLimit`，`shadowOffsetX`，`shadowOffsetY`，`shadowBlur`，`shadowColor`，`globalCompositeOperation`，`font`，`textAlign`，`textBaseline`。

> NOTE: 当前路径和当前位图不属于绘图状态。当前路径是持久路径，只能使用 beginPath() 方法进行重置。当前位图是画布的属性，而不是上下文。

> NOTE: 
context.save() 将当前状态压入堆栈。
context.restore() 在栈顶弹出状态，将上下文恢复到该状态。

`save()`方法必须将当前图形状态的副本推入图形状态堆栈。
`restore()`方法必须在绘图状态堆栈中弹出顶部条目，并重置其描述的绘图状态。如果没有保存状态，则该方法将不执行任何操作。

## 线样式

> NOTE

> context.[lineWith](#lineWith)[ = value ]
返回当前线宽。
lineWidth 属性以坐标空间单位给出线的宽度。获取时，它必须返回当前值。零，负，无限和NaN值将被忽略。
默认值是`1.0`。

> context.[lineCap](#lineCap)[ = value ]
返回当前的线帽样式。
可能的值为 “butt”，“round” 和 “square”。其他值将被忽略。
默认值是`butt`。

> context.[lineJoin](#lineJoin)[ = value ]
返回当前的线连接样式。
可能的线连接样式为 “bevel”，“round” 和 “miter”。其他值将被忽略。
默认值是`miter`。

> context.[miterLimit](#miterLimit)[ = value ]
返回当前的斜接极限比率。
可以设置，以更改斜接极限比。零，负，无限和NaN值必须忽略。
当`lineJoin`属性的值为 “miter” 时，描边将使用斜接限制比率来决定如何渲染连接。可以使用`miterLimit`属性显式设置斜接极限比率。
默认值是`10.0`。

> context.[setLineDash](#setLineDash)(segments)
设置当前线的虚线图案（在描边时使用）。
该参数是距离的数组，距离要交替显示。

> segments = context.[getLineDash](#getLineDash)()
返回当前线交替类型的副本。
返回的数组将始终具有偶数个条目（即模式已规范化）。

> context.[lineDashOffset](#lineDashOffset)[ = value ]
返回相位偏移（以与 line dash pattern 相同的单位）。
可以设置，以更改相位偏移。不是有限值的值将被忽略。
默认值是`0.0`。

实现 [CanvasDrawingStyles](https://www.w3.org/TR/2dcontext/#canvasdrawingstyles) 接口的对象具有控制对象如何处理线的属性和方法。

**lineCap:**
![](./assets/lineCap.jpg)

**lineJoin:**
![](./assets/lineJoin.jpg)

每个 CanvasDrawingStyles 对象都有一个 **dash list** 列表，该 **dash list** 可以为空或由偶数个非负数组成。**dash list** 初始值为空数组。

调用`setLineDash()`方法时，它必须运行以下步骤：
1. 令`a`为作为提供的参数数组的副本。
2. 如果数组中包含 Infinity、NaN、负数，则终止此步骤（不会抛出异常；用户代理可能会在开发人员控制台上显示一条消息，因为这将有助于调试）。
3. 如果`a`中元素的数量为奇数，则令`a`为`a`的两个副本的串联。
4. 设置 **dash list** 为`a`。

代码描述：
```js
var dataList;
function setLineDash(a) {
  var isErrorValue = a.some(value => value === Infinity || value !== value || value < 0);
  if (isErrorValue) {
    console.warn('数据不合法！');
    return;
  }
  if (a.length % 2 !== 0) {
    a = a.concat(a);
  }
  dataList = a;
}
```

当调用`getLineDash()`方法时，它必须以相同的顺序返回一个新创建的 **dash list** 数组。

有时更改虚线图案的“phase（相位）”很有用。例如实现“行军蚁”的效果。可以使用`lineDashOffset`属性设置相位。

当用户代理要跟踪实现`CanvasDrawingStyles`接口的路径时，它必须运行以下算法。该算法返回新路径。
1. 令`path`为要跟踪的路径的副本。
2. 干掉路径中所有`长度为零`的线段。
3. 从路径中删除任何不包含线的子路径（即只有一个点的子路径）。
4. 

## 文本样式

## 建立路径

## 变换

## 2D渲染上下文的图像源

## 填充和描边样式

## 在画布上绘制矩形

## 在画布上绘制文字
## 在画布上绘制路径
## 在画布上绘制图像
## 热区
## 像素操作
## 合成
## 阴影
## 绘制模型
## 最佳实践
## 例子

## 参考

[canvasapi](https://www.canvasapi.cn/)