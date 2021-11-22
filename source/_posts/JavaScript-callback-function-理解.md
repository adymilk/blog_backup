---
title: JavaScript callback function 理解
date: 2016-10-25 21:56:19
tags: 前端
categories: 代码笔记
---
最近做的一个项目中用到了callback函数，于是就研究了下总结下我对javascript callback的理解；首先从callback的字面翻译“回调”可以理解这是一个函数被调用的机制当我们遇到一个名词首先可能是百度谷歌搜索看官方是怎么解释的；
<!-- more -->
### 定义
回调函数是什么？
## 看维基的 Callback_(computer_programming) 条目:
> In computer programming, a callback is a reference to a piece of executable code that is passed as an argument to other code.

### jQuery文档How jQuery Works#Callback_and_Functio…条目：
> A callback is a function that is passed as an argument to another function and is executed after its parent function has completed. The special thing about a callback is that functions that appear after the "parent" can execute before the callback executes. Another important thing to know is how to properly pass the callback. This is where I have often forgotten the proper syntax.

### 百科：回调函数
> 回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用为调用它所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。

因此，回调本质上是一种设计模式，并且jQuery(包括其他框架)的设计原则遵循了这个模式。

在JavaScript中，回调函数具体的定义为：函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。

因此callback 不一定用于异步，一般同步(阻塞)的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。
### 例子
```
var func1=function(callback){
    //do something.
    (callback && typeof(callback) === "function") && callback();
}

func1(func2);
    var func2=function(){
}
```
异步回调的例子：
```
$(document).ready(callback);

$.ajax({
  url: "test.html",
  context: document.body
}).done(function() { 
  $(this).addClass("done");
}).fail(function() { alert("error");
}).always(function() { alert("complete"); 
});
/**
注意的是，ajax请求确实是异步的,不过这请求是由浏览器新开一个线程请求,当请求的状态变更时,如果先前已设置回调,这异步线程就产生状态变更事件放到 JavaScript引擎的处理队列中等待处理。见：http://www.phpv.net/html/1700.html
*/
```
