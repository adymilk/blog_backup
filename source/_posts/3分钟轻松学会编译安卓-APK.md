---
title: 3分钟轻松学会编译安卓 APK
date: 2017-07-30 12:08:15
tags: 
- android
- 开源
categories: 代码笔记
---
![](/img/https://developer.coolapk.com.png)

简单说下，如何快速利用别人的开源项目快速编译一个apk。通过阅读优秀的开源项目源码，学习优秀的设计思路。提高自己的编码能力！编程高手的必经之路-----从学会阅读别人的代码开始！
好了，让我们马上开始把！

<!-- more -->

> ### 开发环境搭建

* #### 1. 安装 Android Studio

![android-studio.org](http://www.android-studio.org/images/news/3.0.1/16-apk.jpg)

[Windows下载地址](https://dl.google.com/dl/android/studio/install/2.3.3.0/android-studio-bundle-162.4069837-windows.exe) **包含 Android SDK（推荐）**

[Linux下载地址](https://dl.google.com/dl/android/studio/ide-zips/2.3.3.0/android-studio-ide-162.4069837-linux.zip) **不包含 Android SDK（需翻墙）**

* #### 2. 安装 JDK

[Windows 64位 下载地址](https://pan.baidu.com/s/1kTJYRXH)
[Linux 下载地址](https://pan.baidu.com/s/1cr4say)


* #### 3. 下载示例项目

[妹子图开源代码](https://github.com/Surine/MaterialTest.git)

> ### 导入项目到 Android Studio

#### 1. 如图所示

1. 点击 Open existing Android Studio Project

![](http://oss.gkstk.com/images/2017/2/28175446522.jpg)

2. 选择刚刚我们下载的示例项目

![](http://ask.android-studio.org/uploads/article/20141216/ba22322003c96708ccfd3222e58fec22.png?_=4183012)

> ### 添加支付宝捐赠功能(重要部分)

#### 1. 导入支付宝 SDK 依赖库

> compile 'moe.feng:AlipayZeroSdk:1.1'

#### 2. 核心支付代码

```
if (AlipayZeroSdk.hasInstalledAlipayClient(AboutActivity.this)) {
	AlipayZeroSdk.startAlipayClient(AboutActivity.this, "FKX02828RROAVHC0VOT05F");
} else {
	Toast.makeText(AboutActivity.this, "未安装支付宝", Toast.LENGTH_SHORT).show();
	}
```
`FKX02828RROAVHC0VOT05F` 是由我的支付宝收款二维码生成的 URL。如果你需使用这段支付代码，可以保存你自己的收款二维码浏览器扫描即可得到这串字符。（当然，那你不打算换，我也很乐意啊。改天一起出来喝咖啡哦）



> ### 编译 APK 文件并发布

#### 1. 编译 APK 并签名

![](http://img.blog.csdn.net/20161206162011136?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZG9ua29yXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![](http://img.blog.csdn.net/20161206163112969?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZG9ua29yXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

填写完整的签名信息。这里密码统一填写“android”，别名写个“key”即可。其他的信息根据实际情况和需求填写，并不很重要。

> Key store path : 签名文件路径
Password : 签名密码
Confirm : 确认密码
Alias : 别名
Validity ( years ) : 有限期 （年）
First and Last Name : 全名
Organizational Unit : 组织单位
Organization : 组织
City or Locality : 城市或地方
State or Province : 州或省
Country Code(XX) : 国家代码


![](http://img.blog.csdn.net/20161206170726271?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZG9ua29yXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

* 猛击下一步。在Build Type选择构建类型release。选择Finish这样就生成了签名文件。

> APK Destination Folder : apk目标文件夹
Build Type : 构建类型
release是发布版本用的签名文件
debug是debug用的签名文件 

![](http://img.blog.csdn.net/20161206171532845?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZG9ua29yXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)




#### 2. 发布 APK 到酷安

![](/img/https://developer.coolapk.com.png)


### 最终 app 效果图

![](/img/meizi.jpg)
