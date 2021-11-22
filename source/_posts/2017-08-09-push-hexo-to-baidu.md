---
title: hexo 向百度主动推送链接
date: 2017-08-09 10:59:16
tags:
- hexo
- 百度站长
categories: 代码笔记
---

## 分析

### 百度站长工具

百度站长提供了自动提交和手动提交两种方式。这个我们肯定不用手动提交这个弱智的方式。
<!-- more -->
### 自动提交

自动提交分为三种方式自动主动推送（实时），自动推送，sitemap三种方式。

#### 主动推送（实时）

及时发现：可以缩短百度爬虫发现您站点新链接的时间，使新发布的页面可以在第一时间被百度收录
保护原创：对于网站的最新原创内容，使用主动推送功能可以快速通知到百度，使内容可以在转发之前被百度发现。
主动推送提供了4种提交的方式，curl,post,php,ruby。这里以curl为例。
我们将包含html地址的urls.txt文件提交到接口调用地址。我们的重点是怎么生成urls.txt


#### 自动推送

正如官网所说的那样，将代码复制在html页面的head头里即可，这个自己看百度站长工具吧。


#### sitemap

sitemap是我们提交一个带有url地址的txt或者xml文件。我们这里也是提交urls.txt这个文件。同样重点也是生成这个文件。

### 生成urls.txt文件

我们知道在执行hexo g的命令后，会在public文件夹下生成Markdown文件对应的html文件，我们的思路先查找出这些html文件，然后放置在urls.txt这个文件里。

#### 查找html文件
我们在post-receive这个文件里执行的都是shell命令，那么我们首先用shell命令查找这些html文件的路径。这个就用到了grep这个命令。grep语法参考linux grep命令详解
在public的文件夹下，执行下面的命令

```
grep -r -l 'index.html' * >>1.txt

```

> 是将查询的记录添加到1.txt中。
上面的命令生成的路径没有带域名，我们需要使用sed这个命令，在每个路径上添加域名生成urls.txt。


```
ed 's/^/http:\/\/adymilk.cn\/&/g' 1.txt >>urls.txt
```

> 上面的代码是将1.txt里的路径都在开头添加上域名，并把新路径放在urls.txt文件里。


### 开始主动推送

```
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=adymilk.cn&token=XXX"
```

