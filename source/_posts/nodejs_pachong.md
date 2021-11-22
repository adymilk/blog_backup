---
title: nodejs编写蜘蛛爬虫程序
date: 2018-05-26 17:49:52
tags:
- node.js
- 蜘蛛爬虫
author:
    nick: James
categories: 代码笔记
cover: /img/20191116-1.jpg
---
基于node的超简单蜘蛛爬行程序,一秒钟抓取200张图片。妥妥的。代码总共40行，史上最简单的爬虫程序！

# 史上最简单的网络爬虫

### 1、简介
 - 功能：自动下载某网站的美女图片.
 - 运行环境：node.js
 - 难度系数：简单的一笔（总共46行代码加注释）


## 2、安装运行环境

http://nodejs.org/download/
## 安装依赖包
npm install
## 运行程序
node app.js
<!-- more -->
### 可能遇到的问题

Q： 安装node.js遇到问题，该怎么办？

A： 这个您可以在我的网站留言 地址 adymilk.cn 或者百度搜索 三步枫 也可以找到我的网站

Q：代码可以直接复制运行吗？

A：在你node环境安装好了的前提下是可以直接复制运行起来的，建议你还是先看懂代码。我有详细的注释

### 代码

```


var request = require('request');// 引入网络请求模块
var fs = require('fs'); //引入网络流模块
var path = require('path'); // 引入路径操作模块
var cheerio = require('cheerio');// 引入html数据解析模块
var requrl='';// 这是我们的目标网址
var baseUrl = 'http://www.mmjpg.com/';//这是我们要爬去的网站首页

for (var i=1; i<2; i++){//这个的20 最高为65 因为网站图片就65页
    requrl= baseUrl +'home/' + i ;//通过循环我们可以遍历所有页面的图片
    console.log(requrl);
console.log('第'+ i + '页图片准备下载中......');
    request(requrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            acquireData(body);//发送 request 请求，如果没有错误就返回数据
        }
    })
}
//获取数据函数
function acquireData(data) {
    var $ = cheerio.load(data);//通过上门我们引入的cheerio模块提供的方法，解析数据
    var meizi = $('.pic ul li a img').toArray();//选择图片所在的 dom结构在封装成数组
    console.log(meizi.length);//打印数组长度
    var len = meizi.length; // 把数组的长度赋给 len
    for (var i=0; i<len; i++) {
        var imgsrc = meizi[i].attribs.src;//通过 attribs 方法得到每张图片的src地址
        console.log(imgsrc);
        var filename = parseUrlForFileName(imgsrc);  //调用生成文件名方法
        downloadImg(imgsrc,filename,function() {//调用下载方法下载图片，并且保存在根目录下的images下
        });
    }
}
//生成文件名方法 parseUrlForFileName 见名知意 把url地址转化成文件名
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        if (err) {
            console.log('err: '+ err);
            return false;
        }
        console.log('res: '+ res);
        console.log(filename+"图片下载完毕！尽情欣赏吧！");
        request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);
        //调用request的管道来下载到 images文件夹下
    });
};

```

视频演示在这里看：[我的Bilibili视频](http://www.bilibili.com/video/av10114888/)

代码下载 ：[github](https://github.com/adymilk/node.js-Web-spider)

### 结束

有问题，请留言
