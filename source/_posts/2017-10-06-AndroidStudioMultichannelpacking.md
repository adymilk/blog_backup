---
title: Android-Studio 多渠道打包
date: 2017-10-06 15:13:55
tags: Android
categories: 代码笔记
author:
    nick: 王恒
cover: /img/20180520-1.jpg
subtitle: 安卓快速实现多渠道打包的方法。
---

# 1、图形界面打包

## #需求分析（友盟SDK）
[友盟SDK](https://dev.umeng.com/analytics/android-doc/integration) 需要在`AndroidManifest.xml`中配置如下值：

<!-- more -->

```
<meta-data android:value="Channel ID" android:name="UMENG_CHANNEL"/>
```
其中`Channel ID`为软件应用市场标识。为了能够动态的设置`Channel ID`。可在`build.gradle`这样配置`productFlavors`


```xml
// 这里假定我们需要打包的渠道为酷安市场、360、小米、百度、豌豆荚

android {  
    productFlavors {
        kuan {
            manifestPlaceholders = [UMENG_CHANNEL_VALUE: "kuan"]
        }
        xiaomi {
            manifestPlaceholders = [UMENG_CHANNEL_VALUE: "xiaomi"]
        }
        qh360 {
            manifestPlaceholders = [UMENG_CHANNEL_VALUE: "qh360"]
        }
        baidu {
            manifestPlaceholders = [UMENG_CHANNEL_VALUE: "baidu"]
        }
        wandoujia {
            manifestPlaceholders = [UMENG_CHANNEL_VALUE: "wandoujia"]
        }
    }  
}
```

<!-- more -->
>  所谓ProductFlavors其实就是可定义的产品特性，配合 manifest merger 使用的时候就可以达成在一次编译过程中产生多个具有自己特性配置的版本。上面这个配置的作用就是，为每个渠道包产生不同的 UMENG_CHANNEL_VALUE 的值。

## #执行打包
![执行打包](http://img.blog.csdn.net/20160629090244167)

## #选择打包渠道
![选择打包渠道](http://img.blog.csdn.net/20160629090229510)

## #打包成功
![](http://img.blog.csdn.net/20160629091100616)

# 2、命令行打包

除了使用AndroidStudio图形打包操作以外，我们也可以使用命令行进行打包操作，具体步骤如下：

## #项目根目录打开`Terminal`面板，

> 输入`gradlew assembleRelease`命令

如果系统中没有安装Gradle，则会自动下载完成安装及初始化

## #打包成功后
会提示`BUILD SUCCESSRUL`

在`app–>build–>outputs–>apk`路径中就可以看到打包成功后的APK