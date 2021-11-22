---
title: 'ubuntu解决dpkg: 处理软件包 **** (--configure)时出错'
date: 2017-07-07 22:39:48
tags:
- python
categories: 代码笔记
---

原因：之前ubuntu误卸载了自带的python,导致这个问题、

dpkg: 处理软件包 update-notifier-common (--configure)时出错：
子进程 已安装 post-installation 脚本 返回错误状态 1
dpkg: 依赖关系问题使得 ttf-mscorefonts-installer 的配置工作不能继续：

1.$ sudo mv /var/lib/dpkg/info /var/lib/dpkg/info_old //现将info文件夹更名

2.$ sudo mkdir /var/lib/dpkg/info //再新建一个新的info文件夹

3.$ sudo apt-get update

4.$ apt-get -f install

5.$ sudo mv /var/lib/dpkg/info/* /var/lib/dpkg/info_old //执行完上一步操作后会在新的info文件夹下生成一些文件，现将这些文件全部移到info_old文件夹下

6.$ sudo rm -rf /var/lib/dpkg/info //把自己新建的info文件夹删掉

7.$ sudo mv /var/lib/dpkg/info_old /var/lib/dpkg/info //把以前的info文件夹重新改回名字

<!-- more -->