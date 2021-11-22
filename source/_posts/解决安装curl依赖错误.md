---
title: 解决安装curl依赖错误
date: 2017-07-19 18:19:14
tags:
- curl
categories: 代码笔记
---
### 错误原因
```
$ sudo apt-get install curl
```


ubuntu 安装软件报依赖问题是比较让人头疼的问题。就比如前几天在安装 `curl` 报出的这条错误/
```
curl : 依赖: libcurl3-gnutls (= 7.47.0-1ubuntu2) 但是 7.47.0-1ubuntu2.2 正要被安装
```

一开始不清楚原因，执行了$ sudo apt-get update，出现了如下错误
```
E: 无法获得锁 /var/lib/apt/lists/lock - open (11: 资源暂时不可用) 
E: 无法对目录 /var/lib/apt/lists/ 加锁
```

### 解决方法，强制删除
```
$ sudo rm /var/cache/apt/archives/lock
$ sudo rm /var/lib/dpkg/lock
```

### 重新安装 `libccurl3-gnutls`
```
$ sudo apt-get install libcurl3-gnutls=7.47.0-1ubuntu2
```

安装完后再执行一下 `$ sudo apt-get install curl` 即可


<!-- more -->