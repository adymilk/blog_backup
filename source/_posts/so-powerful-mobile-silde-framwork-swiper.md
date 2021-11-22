---
title: 'Swiper.js '
date: 2017-04-23 10:10:59
tags: 
- swiper.js
categories: 代码笔记
---

### 强大的移动端触摸欢动插件Swiper
![Swiper](/img/swiper1.png)
Swiper常用于移动端网站的内容触摸滑动.Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。Swiper能实现触屏焦点图、触屏Tab切换、触屏多图切换等常用效果。Swiper开源、免费、稳定、使用简单、功能强大，是架构移动终端网站的重要选择！
<!-- more -->

### 引用文件

- 在head中引入swiper.js和swiper.css文件

```
//引入js
<script src="//cdn.bootcss.com/Swiper/3.4.2/js/swiper.min.js"></script>

//引入css
<link href="//cdn.bootcss.com/Swiper/3.4.2/css/swiper.min.css" rel="stylesheet">
```

- 实例化

```
//初始化一个Swiper
new Swiper(swiperContainer,parameters)

//swiperContainer swiper的css选择器
parameters swiper自定义参数（可选）
```


- swiper常用参数

```
<script>
		new Swiper('.swiper-container',{
		    autoplay:1000,//1000ms自动播放一次
			loop: true//循环播放
			initialSlide :2,//设定初始化时slide的索引。
			direction : 'vertical',//	Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
			speed:300,//
			width : 800, //你的slide宽度
						//全屏  width : window.innerWidth,
			pagination : '.swiper-pagination',//分页器容器
		})
</script>
```


### 图解Swiper
![Swiper](/img/swiper-%E5%9B%BE%E8%A7%A3.png)

如果你正好需要上图某个组件，你可以在html中添加swiper指定的类，比如

```
        <!--导航-->
    <div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
	
	<!--分页-->
	<div class="swiper-pagination"></div>
	
	<!--滚动条-->
	<div class="swiper-scrollbar"></div>
```

更多属性参考Swiper[api文档传送门](http://www.swiper.com.cn/api/index.html)



