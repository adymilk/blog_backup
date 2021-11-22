---
title: ubuntu无法打开software-center
date: 2017-07-08 16:20:27
tags:
- ubuntu
- software-center
categories: 代码笔记
---
### 1.1 报错

在ubuntu14.04LTS版本下，点击软件中心图标，过了一会软件未能启动，没有动静。用命令行启动报如下错误:
```
perrin@LittleBlack:~/Desktop$ sudo software-center
  File "/usr/bin/software-center", line 140
    print time.time()
             ^
SyntaxError: invalid syntax
```

### 1.2 原因
```
即ubuntu下有多个版本python共存时，默认使用的Python版本还是保持原样，
不能修改为最新的python版本。若修改为最新版本，原有依赖旧版本python的应用可能会找不到相应的包从而导致出错。
```

### 1.3 解决办法
将python链接默认指向Python2.7版本。
```
sudo mv /usr/bin/python /usr/bin/python_backup
sudo ln -s /usr/bin/python2.7 /usr/bin/python
```
<!-- more -->
