---
title: Linux 作死自救历险记
date: 2017-07-18 18:49:12
tags:
- sudoers
categories: 代码笔记
---

今天作死不小心修改了系统 `/etc/sudoers` 文件
然后每次使用 `sudo` 的时候都会报如下错误

```
用户名不在sudoers文件中，此事将被报告

```

谷歌之后发现为了保护系统安全，sudoers文件一但被修改以后任何 `sudo` 命令都会被拒绝。现在我连把重新进 `/etc/sudoers` 文件的权限都没有了。更别提改回原文件了。啊啊啊啊啊～感觉自己仿佛在作死。。
<!-- more -->


继续谷歌寻找解决办法。

对了，任何系统不都是有一个 `Recovery Mode` 嘛！有了。
![](http://img.blog.csdn.net/20140117223051453?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFtb25oYW8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

谷歌出 `ubuntu` 进 `Recovery Mode` 的方法。顺利调出 `Recovery Mode` 按 `e` 键进入编辑模式.

```
替换当前引导代码 `ro recovery nomodeset` 为 `rw single init=/bin/bash` 
```
![](http://img.blog.csdn.net/20140117223441468?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFtb25oYW8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

按下 `F10` 或 `Ctr + X` 进入单用户模式

进入以后输入一下命令改回 `/etc/sudoers` 文件

```
cd /etc
vim sudoers
```

`i` 编辑

`ESC` 退出编辑模式
`:` 命令行模式
`wq` 写入文件并退出


重启系统，输入 `sudo` 测试，成功解决。啊！泪流满面。。。。。

### 总结

这个故事告诉我们，没事别瞎jb作死。

