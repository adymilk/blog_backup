---
title: 完美的 Ubuntu16.04 优化方案
date: 2017-10-19 20:27:40
tags:
- ubuntu
- 开源
categories: 代码笔记

cover: /img/ubuntu-desktop.png

author:
	nick: 王恒

subtitle: Ubuntu 桌面操作系统近年来越来越火了。目前版本已经发布到了 18，日常使用基本没有问题了。
---


Ubuntu 到底怎么样？来，听听人家官网的妹子是怎样介绍的。
<!-- more -->
> Ubuntu | 最受欢迎的免费操作系统
Fast, secure and stylishly simple, the Ubuntu operating system is used by 20 million people worldwide every day.

<!-- more -->

- 老子看不懂英文，说人话！

> 快速，安全，简单时尚，Ubuntu操作系统，每天全球有2000万人使用。

这能说明啥？Windows 可是拥有全球百分之八十的系统用户！

ok!

> Ubuntu Kylin 中国制造，为中国用户量身定制。
Ubuntu Kylin 是专门为中国市场打造的免费桌面操作系统。它包括 Ubuntu 用户熟识的各种功能，并配有必须的中文软件及程序。与竞争对手不同，Ubuntu Kylin 的用户界面专门为中国用户设计，配上最新支持触摸屏以及 HiDPI 高清显示屏的特征，它可以在各种不同硬件上完美运行。作为 2013 年开始的 Ubuntu 项目的一部分，最新版的 Ubuntu Kylin 将提供五年的支持服务, 确保您的电脑在未来几年能安全顺畅地使用。

这么说到是有点意思了！那你继续说说这个系统到底咋样啊！

> Okey! 一本正经的胡说八道过后，我给大家好好介绍介绍 ubuntu 系统的优缺点，以及日常的美化工作！

从 Windows 转到 Ubuntu 是在一年前。本人平时喜欢折腾写计算机系统 OR 编程之类的东西。先后自学过 HTML、CSS、JAVASCRIPT、JAVA、ANDROID、C++、C#、PHP、SHELL、PYTHON等多种编程语言! 深深的被计算机程序神奇的魅力所吸引。
在用 Windows 的时候。基本日常操作是通过GUI鼠标点击来完成的。然而自从接触到 Ubuntu （ Linux 系统 ），我已经忘记了使用鼠标的习惯。在 （ Linux ）Ubuntu 系统中，绝大多数操作是通过打开一个叫做终端的应用程序窗口，然后输入命令来完成的！比如我要启动 QQ ，我只需要通过快捷键 `Ctrl+Alt+T` 打开终端，然后输入一个 `Q` 再按一下 `Tab` 键 系统就可以帮我自动补全。这就是 Linux 相比较 Windows 简单高效的优势。有些同学可能疑惑了，相比较 Windows 可能还是鼠标点击一下桌面上的应用程序快捷方式更方便点。你别较真嘛，没听说过，太认真你就输了吗？哈哈哈～ 这只是给大家先简单的举个例子，后面我会说如何给应用程序创建桌面快捷方式。


![ ubuntu 桌面 QQ 截图](/img/ubuntu-desktop-qq.png)

### 系统的安装

- #### 安装ubuntu16.04桌面版

ubuntu16.04的安装还是比较人性化的，在你安装的时候，会自动从你的最大空余磁盘分出来50G左右用于安装ubuntu系统，并且可以选择和我们的windows系统共存，这是比较令人欣喜的。所以我们完全可以把自己的电脑装成双系统，windows系统用来玩游戏，ubuntu系统用来做开发，随时可以很方便的切换。

- #### 制作ubuntu系统安装盘#

[ubuntu16.04下载地址](http://www.ubuntu.com/download/desktop)
[图文教程](http://www.linuxidc.com/Linux/2016-04/130520.htm)

在windows下，我们使用一些工具，把ubuntu系统写到u盘里，做成启动盘，写成功之后关闭电脑，设置为u盘启动，或直接打开快捷启动项，选择u盘，接着就会进入ubuntu的安装界面的了，在最左边的语言选择那里选择中文，之后，只要你认识中文，基本都一步一步往下走，都能安装成功。


安装的时候最需要注意的就是选择与你的 `windows` 系统共存这一项，一定要仔细

制作u盘启动，我一般使用的工具是ultraiso (自行百度下载)

使用的步骤是：点击文件->打开，选择你本地ubuntu16.04镜像，然后点击启动->写入磁盘镜像，选择你的u盘，点击开始写入，静静等待进度条走到100%


### 安装成功之后的一些优化

- #### 检查更新，确保系统最新

点击右上角图标，打开关于这台计算机，点击安装更新：

![](https://dn-phphub.qbox.me/uploads/images/201608/31/4540/gHarcb9MnN.png)

- #### 设置更多的软件源

点击右上角图标，选择系统设置，打开软件和更新，勾选上全部勾选上：

![](http://upload-images.jianshu.io/upload_images/1772607-a9bbe5749a97d244.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 安装显卡驱动

点击右上角图标，选择系统设置，打开软件和更新，找到附加驱动：

![](http://upload-images.jianshu.io/upload_images/1772607-c1d7454d693338a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 关闭swap内存交换，桌面版不需要

```
vim /etc/sysctl.conf

# 最后一行加入：
vm.swappiness=0
```

### 安装mac主题【资料来源于网络】

#### 一些安装前的准备

切换到 `root` 用户：

```
sudo su
```

更新源：

```
apt-get update
```

#### 下载一些必要的工具

```
# 下载工具
apt-get install wget

# 抓取工具
apt-get install curl

# 编辑器之神
apt-get install vim
```

#### 安装主题

下载mac壁纸：

```
http://pan.baidu.com/s/1skQCq2T

# 添加源
add-apt-repository ppa:noobslab/macbuntu

# 更新源
apt-get update
```

下载图标和主题

```
# 下载图标

apt-get install macbuntu-os-icons-lts-v7

# 下载主题
apt-get install macbuntu-os-ithemes-lts-v7

# 卸载命令
cd /usr/share/icons/mac-cursors && sudo ./uninstall-mac-cursors.sh
apt-get remove macbuntu-os-icons-lts-v7 macbuntu-os-ithemes-lts-v7
```


安装 Slingscold：

```
sudo add-apt-repository ppa:noobslab/apps
sudo apt-get update
apt-get install slingscold
```


安装 `Albert` (非常好用)

![](http://oukfi430b.bkt.clouddn.com/ubuntu-albert%20.png)

```
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt-get update
apt-get install albert
```

安装 Plank Dock：

```
# 安装plank
apt-get install plank

# 安装plank主题
apt-get install macbuntu-os-plank-theme-lts-v7
```

替换面板上的Ubuntu Desk为Mac OS：
```
cd && wget -O Mac.po http://drive.noobslab.com/data/Mac/change-name-on-panel/mac.po
cd /usr/share/locale/en/LC_MESSAGES
sudo msgfmt -o unity.mo ~/Mac.porm ~/Mac.po

# 还原默认
cd && wget -O Ubuntu.po http://drive.noobslab.com/data/Mac/change-name-on-panel/ubuntu.po
cd /usr/share/locale/en/LC_MESSAGES
msgfmt -o unity.mo ~/Ubuntu.po
rm ~/Ubuntu.po
```

修改启动器的logo:

```
wget -O launcher_bfb.png http://drive.noobslab.com/data/Mac/launcher-logo/apple/launcher_bfb.png
mv launcher_bfb.png /usr/share/unity/icons/

# 恢复默认
wget -O launcher_bfb.png http://drive.noobslab.com/data/Mac/launcher-logo/ubuntu/launcher_bfb.png
mv launcher_bfb.png /usr/share/unity/icons/
```

安装修改工具:

```
apt-get install unity-tweak-tool
apt-get install gnome-tweak-tool
```


#### 修改主题

找到下载的壁纸，选择一张喜欢的设置成背景

按 `win` 键，打开搜索，搜索 `unity-tweak-tool` 并打开：

![](http://upload-images.jianshu.io/upload_images/1772607-f11edd4bf2357f40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


主题选择 `Macbuntu-os`

图标选择 `Macbuntu-os`

指针选择 `Mac-cursors`

回到主界面，进入启动器里面设置启动器隐藏，会隐藏掉左边的启动器栏（看个人喜好）


> 这里没有下载 `mac` 的字体，感觉 `mac` 的字体和某些软件的兼容不是很好，不如用 `ubuntu` 的字体



打开 `Slingscold` 和 `Albert` 以及 `plank` #

按 `win` 键，打开搜索，依次搜索这些软件并打开

现在已经有了 `mac` 的风格了，最后我们还差一步，把这些软件设置成开机启动

按 `win` 键打开搜索，搜索 `tweak` ，选择优化工具并打开：


![](http://upload-images.jianshu.io/upload_images/1772607-200e5765fc0de206.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


把这些软件设置成开机启动就可以啦.


### 实用的功能

#### 工作区/窗口平铺

这一块主要介绍窗口管理器中的工作区、窗口平铺和热区，这是比较常用的功能。

按 `win` 键打开搜索 `unity tweak tool`，打开之后进入窗口管理器下的工作区：


![](http://upload-images.jianshu.io/upload_images/1772607-541de42e79d3ed96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


设置好 `工作区` 之后，在去设置 窗口铺展，`窗口铺展` 效果：

![](http://upload-images.jianshu.io/upload_images/1772607-91c690b0c5f74de4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


然后设置 `热区` ，`热区` 主要的作用是我们鼠标放到哪一个位置，触发什么样的效果：

![](http://upload-images.jianshu.io/upload_images/1772607-63481bafb16762cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 远程工具#

如果是 `ssh` 链接远程服务器的话，linux自带命令：

```
ssh user@hostname
```

文件传输的话：

``
scp ./test.txt user@hostname:/tmp`
``

还可以使用可视化的远程文件管理：

![](http://upload-images.jianshu.io/upload_images/1772607-2f10f28570bad7de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


连上之后默认在用户的家目录，使用 `ctrl + L`  可以到我们想要的任何目录：

![](http://upload-images.jianshu.io/upload_images/1772607-3f39ea7d27bfadf6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

就可以对远程服务器进行管理和编辑了

### 安装一些必备的软件

#### shadowsocks-qt5

`Ubuntu`  通过PPA源安装，仅支持Ubuntu 14.04或更高版本。
```
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```
> [使用手册参考这里](https://github.com/shadowsocks/shadowsocks-qt5/wiki/%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C)

#### 微信

To clone and run this repository you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:
```
# Clone this repository
git clone https://github.com/geeeeeeeeek/electronic-wechat.git
# Go into the repository
cd electronic-wechat
# Install dependencies and run the app
npm install && npm start
```
> 如果慢的话用 `cnpm`

To pack into an app, simply type one of these:
```
npm run build:osx
npm run build:linux
npm run build:win32
npm run build:win64
```


#### QQ

[方法来源于该博客](http://geekhelp.cn/2016/12/05/linux-qq/)

安装CrossOver之前需要先添加对32位库的支持

```
sudo dpkg –add-architecture i386
sudo apt-get update
sudo apt-get install lib32z1 lib32ncurses5
```
下载 `CrossOver deb` 安装包：

> CrossOver 大小123.33MB：[戳我](http://obl1kak28.bkt.clouddn.com/CrossOver.tar.gz)

下载完成后解压。你将会看到这三个文件：

```
CrossOver
  |---- crossover-15.deb
  |---- crossover-15-free.deb
  |---- deepin-crossover.deb
```

安装顺序

先安装crossover-15.deb，然后再安装crossover-15-free.deb，接着再安装上 deepin-crossover.deb。

```
dpkg -i crossover-15.deb
dpkg -i crossover-15-free.deb
dpkg -i deepin-crossover.deb
```

其他依赖问题：

```
sudo apt-get install -f
```

QQ 8.1 安装包

> QQ 8.1(89.98MB)：[戳我](http://obl1kak28.bkt.clouddn.com/app.deb)

安装完毕后可以在/usr/share/applications路径下找到QQ快捷方式，拖到桌面还是docky上随你喜好。双击启动QQ





















































































































































































