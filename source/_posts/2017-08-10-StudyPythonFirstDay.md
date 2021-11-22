---
title: 学习Python系列第一天
date: 2017-08-10 13:03:03
tags:
- python
- 爬虫
categories: 代码笔记
---

> Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。被称作写爬虫最好的语言之一！从今天开始让我们一起来学习吧。每天一个小例子，开心学 Python .

<!-- more -->
### 开发环境

> 这里我假设你已经安装好了 Python 开发环境，如果你不知道如何安装Python 开发环境。可以点击[这里](http://www.runoob.com/python/python-install.html)


### 入门第一课：Hello Python

```python

#!/usr/bin/python

print "Hello, Python!";
```
### 运行结果

> Hello Python

### 批量下载网站图片示例

#### 1.1 获取整个页面数据
```python
#coding=utf-8
import urllib

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html

html = getHtml("http://tieba.baidu.com/p/2738151262")

print html
```

#### 代码解释
> Urllib 模块提供了读取web页面数据的接口，我们可以像读取本地文件一样读取www和ftp上的数据。首先，我们定义了一个getHtml()函数:urllib.urlopen()方法用于打开一个URL地址。read()方法用于读取URL上的数据，向getHtml()函数传递一个网址，并把整个页面下载下来。执行程序就会把整个网页打印输出。

#### 1.2 筛选页面中想要的数据
Python 提供了非常强大的正则表达式
假如我们百度贴吧找到了几张漂亮的壁纸，通过到前段查看工具。找到了图片的地址，如：src=”http://imgsrc.baidu.com/forum......jpg”pic_ext=”jpeg”

![](http://images.cnitblog.com/i/311516/201403/020013141657112.png)

```python
import re
import urllib

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html

def getImg(html):
    reg = r'src="(.+?\.jpg)" pic_ext'
    imgre = re.compile(reg)
    imglist = re.findall(imgre,html)
    return imglist      
   
html = getHtml("http://tieba.baidu.com/p/2460150866")
print getImg(html)
```

我们又创建了getImg()函数，用于在获取的整个页面中筛选需要的图片连接。re模块主要包含了正则表达式：
re.compile() 可以把正则表达式编译成一个正则表达式对象.
re.findall() 方法读取html 中包含 imgre（正则表达式）的数据。
运行脚本将得到整个页面中包含图片的URL地址。

#### 1.3 将页面筛选的数据保存到本地

把筛选的图片地址通过for循环遍历并保存到本地，代码如下：

```python
#coding=utf-8
import urllib
import re

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html

def getImg(html):
    reg = r'src="(.+?\.jpg)" pic_ext'
    imgre = re.compile(reg)
    imglist = re.findall(imgre,html)
    x = 0
    for imgurl in imglist:
        urllib.urlretrieve(imgurl,'%s.jpg' % x)
        x+=1


html = getHtml("http://tieba.baidu.com/p/2460150866")

print getImg(html)
```
这里的核心是用到了urllib.urlretrieve()方法，直接将远程数据下载到本地。

　　通过一个for循环对获取的图片连接进行遍历，为了使图片的文件名看上去更规范，对其进行重命名，命名规则通过x变量加1。保存的位置默认为程序的存放目录。

程序运行完成，将在目录下看到下载到本地的文件。


![](http://images.cnitblog.com/i/311516/201403/020014265548094.png)



