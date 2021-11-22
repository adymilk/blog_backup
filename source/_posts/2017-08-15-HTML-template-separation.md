---
title: 网页模板分离的高效方法
date: 2017-08-15 15:08:50
tags:
- template
- 模板分离
categories: 代码笔记
---
> 网站模板的设计，一般的，我们做网站有一些通用的部分，比如 导航，底部，访问统计代码等等.
比如 `header.html`, `footer.html`, `content.html`.....其实我们可以写一个 `base.html` 来包含这些通用文件。ok,让我们一起学习如何实现的吧。

<!-- more -->
## 网页基础
**以前我们这样写网页**

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
我的地盘我做主！
</body>
</html>
```

**看完本片博客，你以后可以这样写**

```
<extend name="Temp/base"/>
<block name="content">
	我的地盘我做主！
</block>
```
> WOW, 好腻嗨啊......怎么做到的...

## 如何实现

### 新建文件夹和文件

新建一个文件夹 `Temp` 模板文件夹的意思。然后在这个 `Temp` 文件夹里面新建文件`head.html`、`footer.html`、`index.html`

最终目录结构是这样的


Temp
	├── base.html
	├── footer.html
	├── head.html
	└── index.html


### 接下来编辑 `head.html` 文件

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

```

### 继续编辑 `footer.html`文件

```html
<footer></footer>
</body>
</html>
```

### 编辑 `base.html`

```html
<include file="Temp/head" />

<block name="content">

</block>

<include file="Temp/footer" />
```

### 这时候 `index.html` 应该这样来写

```
<extend name="Temp/base"/>
<block name="content">
	我的地盘我做主！
</block>
```

### 浏览器运行 `index.html` 看看吧

## 为什么要实现模板分离？

这样我们就完成模板分离的处理。好处在于当一个网站的网页特别多的时候，相同的代码又不可避免。这时候用这个方法可以起到方便管理的作用。使你的代码高效、清晰、明了！









