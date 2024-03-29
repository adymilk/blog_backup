---
title: 对比ThinkPHP和Drupal看中外软件业现状
date: 2021-10-14 16:54:54
tags: 
- ThinkPHP
- Drupal
categories: 代码笔记
---


由 云客 提交于 24 May 2021
住房、结婚、医疗、教育、养老每一个都是一座大山，“搞钱”必须是头等重要的大事，谁有空搞开源？于是仅两个核心开发者打造的ThinkPHP成为了很多人的希望，而另外一边，没有“程序员是吃青春饭的”，开源软件社区聚会上常常见到五六十岁的人还在眼中带光的谈论技术，他们寻找生命的意义，不被生计太多打扰，将一生的积累注入到开源，他们梦想自己所做的能照亮世界，将人生化做伟大的作品伴随人类文明流传下去，于是Drupal被万众捧出，并急速驶向星辰大海。本文讲述了一个忧伤的故事，思考着看同种文字的人们该何去何从，这个故事应被更多人知道。

<!-- more -->
对比ThinkPHP和Drupal看中外软件业现状

云客 20210511

将ThinkPHP和Drupal（翻译成中文为“水滴”的意思）放在一起聊会让很多开发者感到好奇，但从中外软件生态发展来看，这真的是一个好的讨论起点，本文对这两系统在各方面都做了一些对比，但对比不是写作本文的主要目的，主要是分享中外软件行业的不同，以及由此引发的一些思考，帮助开发者规划职业生涯，为IT决策者提供决策依据。

 

这两系统都是开源、免费的PHP应用，首先做个简要介绍：

ThinkPHP：

产品定位：PHP开发框架，开发者在此基础上继续开发搭建自己的应用系统

开发机构：由国内“上海顶想信息科技有限公司”开发

创始人：刘晨，没有太多资料，百度查询为开源软件资深顾问，资深PHP程序员，看云CEO，超过15年的互联网产品开发和管理经验，主要研究领域包括Web应用架构和开发，产品用户体验设计，致力于国内的开源事业

发展时间：最早诞生于2006年初

开源协议： Apache 2

官网地址：http://www.thinkphp.cn/

用户群体：中国国内小微企业，在国内开发者圈中具有较高知名度，其官网自我描述为“是国内最有影响力的PHP框架和先驱者！”

著名案例：56群组、联想问吧、中青旅开心遨游、宝矿力水特、星巴克、美特斯邦威的邦购商城、TCL的在线商城、新浪微坛，澳星、中车友科技等

团队规模：没有官方数据，但框架的每个文件有作者信息，据此统计一共有7人，其中主要开发者有两人（贡献90%以上代码），这些数据不包括社区生态圈的贡献开发者，依据企查查平台对顶想公司查询结果显示，公司规模小于50人，参保人数3人

系统文件：按目前的6.0.7版本算，初装文件数569个，占用空间2.41MB

 

Drupal：

产品定位：完整的后端系统（后端数据与控制中心），用于APP、小程序、网站、物联网等的后端开发

开发机构：全球两百多个国家共建，Drupal基金会组织的非盈利开源社区

创始人：最初由比利时的Dries Buytaert博士发起，Dries 2008年的大学博士论文是《Java应用程序性能分析和优化分析技术》，Java的发明者詹姆斯·高斯林(James Gosling)是其博士答辩委员会的成员，Dries个人主页地址https://dri.es/about

发展时间：最早诞生于2000年

开源协议：GPL 2.0

官网地址：https://www.Drupal.org/

用户群体：全球各国的企业、政府机构、大学、个人等，其中世界五百强企业市场占有率超过80%，著名IDE:phpstorm直接集成了Drupal项目新建

著名案例：国内有：华为、京东、百度、腾讯、清华、北大、贵州市政府站群、真功夫等，国外有：特斯拉、谷歌、本田、高通、联合国、欧盟、哈佛大学、麻省理工大学、迪士尼、NASA、辉瑞制药等

团队规模：

拥有全球最大最活跃的开源社区，核心开发者1800余人，处于活跃状态的贡献者（代码、文档、设计等人员）共有超过12万人，其中中国分社区两千余人，主力推动公司Acquia雇员超过1100人。当前平均每周产生1300次左右代码提交。

系统文件：按目前的9.1.7版本算，初装文件数18770个，占用空间71.2MB

 

为什么是ThinkPHP和 Drupal：

一个是中国国内的流行框架，一个是国际流行的完整后端系统（也是目前世界上最强大灵活的系统，没有之一），从它们的体量看这完全不在一个重量级，从其市场定位看，也没有比较的意义，但探索它们对了解中外软件生态具有重要意义，此外如果直接告诉你ThinkPHP能做的事情，Drupal都能做，而且还更加优雅和简洁呢？事情是不是就变的很有意思了，继续。

通常使用Drupal的国内开发者都是有很多年经验的开发老手，是伴随时代从各种系统一步一步淌出来的，他们一定知道或多少了解ThinkPHP，但使用ThinkPHP的开发者却不一定了解Drupal，使用ThinkPHP的开发者选择ThinkPHP的理由一般是：框架较底层PHP进一步的提供了常用基础，灵活自由，和对帝国CMS这样的系统进行二次开发相比，不受限制，能够随意实现自己的功能，但是在Drupal面前，事情就变的不一样了，可能会让开发者有如获至宝的感觉，在此需要先简要介绍一下Drupal的系统架构，整个Drupal系统是分层建设的：

最底层：

是框架层，基于流行的Symfony框架，Symfony可谓是PHP的行业标准，是世界最著名的框架，另一个著名的PHP框架Laravel本身很多部分也都是基于或来自Symfony，懂得Symfony框架的开发者可以很快上手开发Drupal，Symfony框架的作者法比安是一个传奇人物，其另一个广为人知的作品是Twig模板引擎，该引擎也用在Drupal中，Drupal是Symfony最著名的案例，其官网将Drupal列在第一位，Drupal社区也参与Symfony的代码贡献。

第二层：

是数据层，以实体为代表，向上提供各种数据，数据库封装即属于该层，ORM概念以及ThinkPHP中的模型概念类似于实体概念在很早很早时期的样子

第三层：

应用层，开发者在这一层处理各种业务逻辑

这里需要注意开发者在使用Drupal时，不一定要一层一层往下调用，而是可以跨越，直接去面向某一层，所以当直接面向框架层开发时，就可以将整个系统当做框架来使用，就像ThinkPHP开发者直接使用ThinkPHP框架一样，这就是为什么说ThinkPHP能做的Drupal都能做的原因，所不同的是Drupal采用Symfony框架，题外话ThinkPHP深受Symfony影响，甚至直接采用了其部分组件，许多方面高度借鉴了Symfony框架（任何创造者都值得尊敬，因此不用“抄袭”这个词，而用“借鉴”），主干流程几乎相同，但在成熟度和细节上相差甚远，这种差距举个例子来形象的说明：

当人类先祖在结绳计数的那个时代，一个果子就是一个果子，一条鱼就是一条鱼，当从一个个具体事物中抽象出背后的数字“1”时，人类就面临了一次巨大的飞跃，此刻的意义不亚于火的使用，进而发明数字、数学等，在时间和空间上，人类一直处于对世界的不停探索、抽象之中，无数次累积才有了今天的文明，可以说抽象程度越高，意味着越强，越直达本质。

许多伟大的作品都需要巨大的人力和时间去积累，那么ThinkPHP和Symfony之间，或者说ThinkPHP和Drupal之间积累的差距有多大呢？这里可以直接果断的告诉你是小学和大学之间的差距，中间还隔着初中、高中，主要原因在于社区规模、生态和时间上。ThinkPHP和Symfony同为框架，是最直接的竞争者，ThinkPHP要有存在的必要就需要一条自主创新的路，却又大量借鉴Symfony，这是一件非常尴尬的事情，作为开发者为什么不直接使用Symfony呢？同级别的CI框架（CodeIgniter）就完全自主发展，在许多全球排名中都看不到ThinkPHP的影子，但在国内，你可以在很多招聘信息中看到ThinkPHP的影子，这是个很奇特的现象，因为ThinkPHP是一个十足的地方性产品，连注释文档都是中文，本文也正是基于此才选择了ThinkPHP来作为研究中外软件状态的起点。

 

何为好系统？我们需要什么？

俗话说工欲善其事必先利其器，这里列出几个点来说明一个优秀的系统应该具备什么特性，下文我们将以此来对比ThinkPHP和Drupal：

完备性：

所谓完备性你可以认为是某个工具或组件被设计出来已经充分考虑到了所有的情况，比如PHP原生提供的字符串截取函数会把UTF-8字符截断，产生乱码，而你设计了一个截取函数，不但不会这样，还不会截断英文单词，还考虑到了不截断HTML中的标签，那么你这个工具就比PHP原生函数更加完备，一旦发现有满足不了的用列就需要改进以提高完备性，Drupal很多地方的设计是“完备”的，尽管Drupal也在持续探索和进化，但这种完备程度远超ThinkPHP，举个例子，Drupal的路由系统可以天然支持基于域名、协议、HTTP方法、数据格式、选项等进行路由，在都匹配的情况下有优先级分级，而这些是ThinkPHP不完全具备的，这种组件设计上的完备依赖于对事务本质认知的深度和大量开发经验，完备性让人类站在前人的基础上继续前行。

标准化：

标准化是大规模协作的前提，系统分层结构、跨系统通讯、解耦组件等都离不开标准化，Drupal完全面向RFC文档，而不是自成体系，在注释或讨论中经常看到对RFC的引用，RFC文档是IT互联网的基石，类似在产品上常见的国家标准，常被用户忽略，但又异常重要。

完整性：

合作分工，当把发展的足够完备的组件凑到一起，大家都来使用它们，这就构成了完整性，然后人们不必自己再重复造轮子，突破内卷，完整性也会反过来促使完备性的提高，Symfony和Drupal就以组件和模块的方式来解决完整性问题。

低耦合性：

系统设计各组件间需要尽可能解耦，这样就能给各组件更多的发展提高的空间，不好的组件也便于替换，Drupal采用模块化设计，连核心都是模块化的，用户可以在用户空间中替换任何核心文件，而不直接修改，避免功能不足和阻碍升级，相对而言ThinkPHP耦合较紧。

掌握边界：

一个好的系统势必是分寸拿捏得当的系统，但这真的有点难，且仁者见仁智者见智，总的来看大方向或者主干系统必须是简洁的，这里举一个例子，在ThinkPHP中支持按路由参数决定路由控制器，即：Route::get(':action/blog/:id', 'Blog/:action');，而Drupal不允许这样做，实现类似功能时通常采用代理控制器实现，简而言之即该效果不应该在路由层面实现，而应该在控制器层面实现，这样使得路由系统更加简洁，系统架构更加清晰，这种思想贯穿Drupal，使得Drupal系统主干十分简单干净，当你要某个细化功能时，首先进入对应大支流再进入到不同的细化支流当中，是不是像一颗树？但你更喜欢哪种方式呢？

简洁性：

大道至简，系统需要流程清晰，调用统一，规则一致，不允许有另外，或尽量避免另外，这样的好处是易于新人学习，并且追踪、排查都很方便。

生命力：

系统的生命力也在于可持续性，生态圈和开发者就是系统的养料，下文还会讲到，这里略过。

 

对比ThinkPHP和Drupal：

ThinkPHP和Drupal相比总的来说，在于ThinkPHP抽象程度不足，积累不足，这是根本上的不足，它像一个孩子，Drupal是一个经历岁月的成年人，懂得更多，知道事物背后蕴含的通用道理，做的也更进一步，假设我们是在建造一栋大厦，ThinkPHP提供了混凝土、砖块、钢筋等等建筑基础材料，开发者需要去探索如何修建，如何设计等建筑学问题，而Drupal不但提供了基础材料，还附带了施工队和设计院，很多时候你只需要说出你要什么样感觉和功能的大厦就行了（你遇到的需求，通常已经有人遇到过，形成了数量庞大的贡献模块，安装即可），当然如果你有兴趣，你也可以参与修建的过程得到你自定义的结果。

本章在技术架构层面上来对比二者，如果你不是开发者，或者对具体技术不感兴趣，可以直接跳过本章，接着看下一章，这里都以当前各自最新的版本ThinkPHP 6.0.7和Drupal 9.1.7，由于篇幅有限，仅选择部分重要内容进行对比：

事件：

在ThinkPHP中将事件定位为替代原来的行为和Hook机制，由此可见作者并没有认识到事件和钩子之间的本质区别，相同点都是用第三方代码来介入当前逻辑的处理，但在这个大前提下钩子重参与，事件重通知，它们在数量和性质上都有很大不同，ThinkPHP将其混为一谈，而Drupal认识的更加本质，由于ThinkPHP对“事件”概念的认识不足也导致实现上松散复杂，且功能上有重大不足，比如ThinkPHP事件没有优先级概念，这在有顺序要求的情况下至关重要，同时也没有事件传播终止机制，又比如ThinkPHP可以不要求实现事件类，实际上要处理事件通常必须要有参数传递，且需要将处理结果反馈给事件发源地，因此事件类是必须的，ThinkPHP非常初浅，而Drupal中统一采用事件派发器服务处理所有事件，对订阅器和侦听器也无特殊限制，在系统任何地方处理事件相关逻辑只需要面对事件派发器服务即可

 

中间件：

在ThinkPHP和Drupal中都有“中间件”概念，但二者定位有很大不同，在ThinkPHP里中间件实现的功能，在Drupal中是由事件派发器负责的，比如ThinkPHP文档提到中间件主要用于拦截或过滤应用的HTTP请求，这在Drupal中是派发请求事件做的事情，此外还有路由中间件、控制器中间件都是如此，它们对应路由事件、控制器事件，而Drupal中的中间件主要作用是将HTTP处理核心由一个变成多个，在逻辑架构上Drupal要比ThinkPHP优雅和清晰很多，这也是ThinkPHP对事件机制理解不足导致的，这让系统结构杂乱了，为将来的升级埋下了包袱

 

入口文件：

两者的入口文件都很简单，逻辑也比较类似，区别主要有三点：

1、Drupal直接在入口文件中向处理核心注入请求对象，从字面上直接体现“任何web系统都是将请求转化为响应的系统”这一理念，而ThinkPHP的HTTP服务的run方法虽然也可以，但没有在入口处体现，但这点没什么本质区别，区别大的是ThinkPHP缺乏对“子请求”功能的支持，即系统运行过程中向自己再提交请求进行处理的能力，不需要跳出系统再回来，该功能对系统架构影响很大（贯穿整个体系，子请求除不能影响到主请求的环境状态外还要考虑性能），此一点最能看出Drupal的系统架构比ThinkPHP强大太多，完备性高出不少，Drupal更能应对复杂的业务逻辑

2、真正的大道至简，Drupal全局只有一个入口文件，不管是多应用，还是单应用的前后台等，都只有一个入口，虽然用户可以设置多个，但并不推荐多个，这减少复杂性保持简单，且为URL别名系统打下基础，而ThinkPHP有复杂的多入口机制，在多应用时尤其如此，这也对URL别名的支持会较困难

3、Drupal在初始状态下将类加载器传递到处理核心中，这就天然支持替换或修改类加载器，而ThinkPHP不支持，它只是加载而已，当需要修改类加载器时，无法获取，这一点导致灵活性大打折扣，比如很多类不能替换为用户自己的，比如你要替换“\think\Http”类就比较麻烦。

 

多应用：

两者都支持多应用，即多个系统复用同一套代码，但具体做法上Drupal要简洁的多

 

面向接口编程：

在ThinkPHP的很多实现中，对类没有提取出接口，甚至有些重要类也没有接口，比如：

\think\App

\think\Request

它们是如此核心和重要，但都没有自己的独立接口，ThinkPHP不是严格按照接口编程的，在灵活性上大打折扣，比如我想实现一个自己的app类去替换\think\App就做不到了，只能去修改核心，这样每次升级是个问题，而在Drupal中是严格按照接口的，架构上完全面向接口，参数类型约束全部是接口，我们可以替换核心提供的任何类，而不必修改核心，包括最为重要的HTTP核心类：DrupalKernel，该类类似ThinkPHP的app类。

不严格按照接口编程除影响扩展性外，还有诸多其他坏处，比如对IDE不友好，文档提取自动化难，代码注释无继承，协作讨论不方便等等

 

路由系统：

引用ThinkPHP官方教程的一句原文：

“ThinkPHP并非强制使用路由，如果没有定义路由，则可以直接使用“控制器/操作”的方式访问”

可见框架作者对路由的本质认识不足，如前文所述尚未抽象出数字1来，所说的“控制器/操作”的方式也应属于默认路由或者内部路径路由，而不是不用路由，看似无伤大雅的一点其实很重要，涉及本质认知，进而导致行为很不一样。

路由是进入系统后的分岔路口，必定存在，许多业务逻辑都需要在这里处理，比如权限控制、参数转化、路径别名处理、语言处理等等，在ThinkPHP中认为可以没有路由，这导致了另外，这样的认知结果势必将事情变的松散和复杂，比如代码冗余、使用不统一等。

而入口处理只是路由的两大功能之一，另一大功能是出口处理，也就是全系统URL的生成，这对URL别名处理、语言协商、SEO等至关重要，但ThinkPHP中只有简单的实现，尚未充分认识到路由系统的该责任，比如这里提出一个需求：

用户在一个自定义函数中给全系统的URL加上“target="_blank"”怎么实现？

 

容器与依赖注入：

该概念和叫法起源于Symfony框架，详见：

https://symfony.com/doc/current/components/dependency_injection.html

简而言之其主要思想是在系统中设置一个中央大对象，也可以叫做母对象，其负责收集、保存、自动实例化我们常用的对象，在Symfony中，这个大对象称为容器，其中保存的对象称为服务，服务的定义可以采用YAML静态提供或服务提供器方式动态提供，“定义”具备一定的格式，当我们需要某服务时，容器对象会依据定义去实例化服务对象，然后保存并返回，定义中涉及类、参数、工厂方法、实例化后回调、配置器、公私有属性、特征继承、延迟实例化等概念，容器形成前还会有服务编译过程，以便处理服务组群、参数修改等高级功能，在容器中每一个服务都有一个ID，称为服务ID，在使用之处通过该ID取得服务对象，容器中除了保存服务外还保存容器参数、服务别名等。

ThinkPHP的容器概念有Symfony的影子，但还非常幼小和初级，其实现离大道至简相去甚远，较混乱，比如没有明确的服务ID概念，在Symfony容器里的服务对象，必有对应的服务ID，而ThinkPHP将类似概念称为abstract，其可以是标识符或者类名，但部分容器方法又将其视为类名使用，比如：

\think\App::register

\think\App::getService

看起来作者是想尽可能灵活，但却导致了由不统一引发的混乱，在ThinkPHP中“服务”概念有单独的定义（有点像操作系统的服务），但本质上还是Symfony服务，只是进行了特殊处理，在Symfony中将服务放到容器里面叫做对服务进行“收集”，或者叫“注入”到容器，而ThinkPHP称为将服务“绑定”到容器，顾名思义容器就是用来装东西的，为什么要叫绑定呢？这种叫法非常拗口，还有很多名字也词不达意，比如运行容器中对象的实例化后操作，ThinkPHP称为“执行后”操作，而不叫“实例化后”操作，计算机界有句名言：“什么难？缓存和命名”，在这一块上ThinkPHP需要改进，现在的一些命名对新手不友好。

另外服务（在ThinkPHP中应该称为绑定到容器中的类、对象或回调才对）又可以向容器绑定服务这个特性看起来灵活，但是对代码追踪和调试非常不友好，增加新人接手系统的难度，而Drupal得益于模块化设计，使得可以做到集中声明（因为模块必定知道服务会依赖哪些服务，通过容器编译机制也可以判断某服务是否存在），这样在追踪代码和调试时就做到了尽可能简单，导出运行时容器中的服务定义也很方便，不用真的去实例化每个服务。

 

门面Façade：

这只是ThinkPHP中的概念，用来以静态方式调用被包装类的动态方法，即用静态方式代理类到方法级别，这只是形式上的调整，内部依然需要实例化对象，其实该概念并没有存在的必要，不但对IDE十分不友好还违背了PHP静态方法设计初衷，只是弥补了ThinkPHP中容器功能的不足，在Drupal中无此概念，其功能目的是统一采用\Drupal::service($id)静态方法获取服务实例，进而由开发者自行调用其动态方法，如需不同实例则自行克隆，这也避免了use引入代理类的麻烦。

 

助手函数

ThinkPHP中有个助手函数的概念，文档提到其目的是享受IDE自动提醒的便利，这相当于Drupal中的“\Drupal”全局类提供的静态方法，或者快捷函数，但Drupal并不是因为IDE，而是更加便捷的获取服务，因为PHP函数或静态类方法是超全局可用的。

 

控制器和模型：

在ThinkPHP中认为控制器是用来做业务处理前逻辑的，必须是一个php类或闭包，业务逻辑是“模式器”的事情，其实这是很僵化教条的一点，首先控制器可以是任何形式表示的php回调，包括函数、容器实例的方法（用容器ID进行定义）等，其次现实中业务逻辑的边界并没有那么清晰，很难抽象出“模式”然后还能给出这个名字，再次控制器应该已经是业务处理的开始，而ThinkPHP概念中的控制器所做的事情应该是在路由中处理，这一点ThinkPHP已经意识到了，并在文档中一笔带过。

 

多语言处理：

在实现上ThinkPHP和Drupal都是基于英语作为开发元语言，ThinkPHP的翻译实现非常简陋，在现实中通常不能满足需求，开发国际化应用时尤其如此（这应是应用范围覆盖不足导致的），Drupal具备完整的多语言系统，已经完整处理以下概念：

语言单复数问题（部分语言还不止单复数）
上下文问题（“may”翻译成“可以”还是“五月”呢？）
JS里面文字的翻译
界面、配置和内容语言的翻译
团队翻译协作机制
向左文字语种的处理等等
而这些ThinkPHP都不具备，仅简单的实现了模板里面文字的翻译，语句中变量的替换；此外Drupal天然具备多种语言协商机制，如用户设置、URL前缀、会话信息、域名、HTTP头、用户代理标识等等，支持通过插件自定义语言协商机制，在ThinkPHP中默认仅支持URL、HTTP头变量、cookie、浏览器，注意如果你以Cookie来传递语言信息，在开发国际系统时可能会遇到法律问题，很多国家要求系统明确提问用户是否能够使用其Cookie；综上使用ThinkPHP时需要开发者自行解决大多数语言问题，但实际上多语言系统贯穿整个系统，非常庞大复杂，Drupal由于是国际共建的系统，多语言是其一大亮点，是天然的多语言系统，只此一项就可能难住ThinkPHP开发者。

 

缓存系统：

完整的缓存系统有三要素：超期时间、失效标签、上下文，Drupal对其有完整实现，而ThinkPHP只实现了时间和标签，没有实现上下文，何为上下文呢？简单的说它指示同一个缓存键KEY下，被缓存物属于谁在何种环境条件下进行的缓存，比如用户的权限、登录状态、语言、ip、协议版本、主题信息等都属于缓存上下文，同一个KEY在不同上下文条件下需要读取不同的缓存物，这对大型系统设计至关重要，且该系统非常庞大，ThinkPHP需要开发者自行解决缓存上下文的问题，此外ThinkPHP未提供缓存合并机制，这将无法实现缓存的分层分级处理，要实现高效缓存，该功能是必不可少的。

 

会话Session：

使用ThinkPHP的开发者得自己解决会话相关问题了，为什么呢？IT发展到今天，仅小微系统只使用一台服务器，大多数系统都会负载均衡到多台服务器上，因此应用必须要求无状态，那么会话数据就不能存储在本机，通常的解决办法是存储到数据库中，基于此，由于ThinkPHP是一个框架无法提供数据库储存会话的现存方案，因此需要开发者自行处理，而Drupal本身已经考虑到负载均衡、应用无状态等事情，会话默认已经储存到数据库，可以开箱即用，尽管ThinkPHP提供了扩展能力，开发者还是要付出许多人力成本去实现开发

在ThinkPHP的会话实现中有个问题：会话的保存不在脚本结束之后进行，而是在脚本里面执行，这样当用户调用die或exit就会导致无法保存，应当注册关机函数才对，详见php函数：

register_shutdown_function

 

数据库：

ThinkPHP和Drupal都支持多数据库，该特性在ThinkPHP中自创了一个“分布式数据库”的概念来描述，Drupal没有专门渲染概念，只用业务标识对不同数据库进行区分，二者也都支持主从配置和读写分离；但在实现上很明显Drupal优雅很多，比如在数据库配置的数据结构上，Drupal采用一个多维数组，第一级键名是业务标识，第二级键名是主从标识，其值就是连接配置信息，这样的结构十分简单，如果你要实现一个数据库负载调度子系统，那么该结构的接口是非常简单的，而ThinkPHP的配置数据结构中，把所有的主机地址储存在一个数组键下，把所有的密码储存在另外一个数组键下，等等诸如此类的还有用户名等，这样的结构在生成连接信息时还需要再次解析配置信息，不但阅读修改不直观还消耗了系统性能，数据库负载调度子系统的接口也较复杂，非常不优雅。

二者也都支持多类型数据库，Drupal核心自带对mysql、pgsql、sqlite三种数据库的支持，加上社区模块几乎完整实现了对所有常用数据库的支持，在底层，Drupal将不同数据库的差异称为“方言”，不同方言的处理在驱动层完成，向上层提供统一接口，换句话说上层数据库操作类感知不到底层用的是什么数据库，采用标准的SQL规范，这样就完美屏蔽差异，实现了数据库解耦，模块开发者就不用去考虑用户用的是什么数据库，建表、查询、修改等等全部是统一的，在应用层切换不同种类数据库时可以做到一键搞定。

关于数据库操作，Drupal由于是一个完整系统，已经默认实现了一整套非常先进的数据储存结构，该结构提供了对系统数据层的支持，当所有人都基于统一数据结构时，奇妙的事情就产生了，分布在全球的人们可以合作实现丰富的上层应用，该结构造就了大名鼎鼎的实体概念，由此Drupal也提供了更多关于数据的操作，比如实体查询，用户实现了开箱即用， Drupal是包容的，用户也可以定义自己的数据结构。

对数据层的支持ThinkPHP是无法做到的，ThinkPHP用模型来处理数据封装和操作，模型和实体相比，是非常初期和幼小的概念，它能做的实体皆可做，反过来则不行，比如模型不支持输入用的字段控件、输出用的格式化器、表单和查看的显示控制等等，究其原因，是因为这些都需要更高层面的实现。

中外开源生态与联系：

在充分对比后，会明白ThinkPHP能做的Drupal都能做，而且做的更好，反过来却不行，因为Drupal是一个完整后端系统，被人誉称为WEB操作系统，已帮助做了更多的事情，常用需求基本都有了，开箱即用，ThinkPHP开发者想要那些功能，则需要在ThinkPHP基础上走非常远的路，先不提质量问题，单就时间消耗就是一个惊人的数字（比如Drupal 8正式版发布之前，其各种开发版，就由一千多名国际顶级开发者为此工作了五年），事实上很多Drupal开发者确实也不屑于去学习ThinkPHP或者是其他框架，但在国内可以发现一个很奇特的现象：为什么国内还有很多小公司在用ThinkPHP？（关于这一点，可以到各招聘平台搜索PHP招聘信息就可略知一二），要解释这一点有两方面原因：

文化交流受阻：

中外文化、生活等的交流依然还只限于一小部分人，大部分人是没有异国朋友的，主要原因是众所周知的网络屏障和语言问题，语言不通应该是主要原因，我国发展太快，目前国内开发者主力是70后到90后这一批人，绝大部分英语沟通水平欠佳，哑巴英语，或者阅读困难，他们往往本能的不会去接触英文资料，00后或者10后的英语水平则高很多（得益于教授早，互联网等），在未来他们会更多融入国际环境，所幸的是现在科技发达，翻译软件水准越来越高，也越来越多人投身到技术引进上面来，比如Drupal在中国就有“Drupal中国”、“爱码文档汇”、“水滴间”、“Drupal大学”、“Think in Drupal”、“宁皓网”等等一大批技术平台，这些平台或博客提供了巨量、几乎完整的中文文档，扫平了语言障碍。在北上广深、成都、南宁、宁波等等城市均有以Drupal作为核心技术的开发公司。

 

压力下导致的快餐现象：

中国人绝对是世界上最勤劳的人群之一，这种勤劳很大程度上和压力相关，住房、结婚、医疗、教育、养老每一个都是一座大山，“搞钱”必须是头等重要的大事，对于大多数普通民众来说，保持匠心做长线积累风险太大，缺乏安全感，眼下能搞的钱先搞了再说，社会发展那么快谁能知道以后什么样子，这种现象对我国基础科学领域伤害巨大，同样的在快速发展的IT业更是如此，我国开发者身上的担子太重了，996甚至被大公司推崇，长期做着CURD这样简单的码农的工作，很多开发者根本没有太多时间去学习，稍有时间得用来陪陪家人、孩子、女朋友，自己休息的时间很少，学习深究就更难了，如果有多余时间通常用来接私活搞外快，在这样的大环境下，大家习惯于“吃快餐”，有锄头用就先用着，学习挖掘机没有空，发展挖掘机更是成本高昂，最终导致了我国开源事业难以发展，为数不多的开源项目带着浓浓的商业味，其中小公司靠广告补贴，靠开源项目引流商业项目盈利（看看ThinkPHP的首页就能感受到），大公司则出于培养后备人才、免费消除Bug等等而选择开源，带着浓厚的“势力范围”色彩，总的来说纯粹的热爱和兴趣占比很小，但这不应责备中国的开发者们，这是重压力的大环境所致，现在也出现了逃离一线城市的现象，许多人去到不那么繁忙，有些闲暇时间的二线城市，也许他们是开源的一种力量，得到APP（罗辑思维）也预测中国的创新中心可能会移动到那些拥有闲暇的二线城市。

相反国际开源的土壤好的多，由许多发达国家主导，而这些国家通常是福利型国家，相比压力不大，人们靠兴趣做事的空间很大，许多参与开源的人首要考虑的是人生意义，关于此有个“马斯洛需求模型”读者可以了解下，“喜欢”保证了“质量”，福利可以让开发者不考虑年龄、工作，在一年一度的DrupalCon大会上，你可以看到很多开发者年龄都非常大，五六十岁的人很多，他们在一起眼中带光的谈论技术，将一生的积累注入到Drupal中。

当然国际开源也并非主要由发达国家参与，英语系的不发达国家也是重点参与者，他们往往是通过开源衍生的商业项目赚取外汇，典型国家就是印度，在印度两极分化严重，曾经被英国殖民过，在其高端人群中英语普及率很高，这一点让印度高度融入国际开源，相应的造就了印度较高的软件开发实力。

 

开发者职业规划：

这一节讨论下国内开发者的职业规划问题，在国内社会一直有一种声音：“程序员是吃青春饭的”，对应的通常就是35岁门槛，你可能经常看到某某大公司辞退35岁的大龄开发者，一些公司招聘年龄要求不能超过35岁，很奇怪，35岁正是能力上积累较深，很多事情的分寸上拿捏得当的年纪，为什么会出现这个现象呢？我们来探索下：

首先那些新闻有很重的博眼球嫌疑，就像“女司机”一样，实际上女司机的事故率比男司机还少，正是因为少所以才是新闻，才能让你浏览，但这样的新闻多了你会形成错觉，因此35岁门槛一定程度上被过度渲染了，造成了不好的影响，甚至有些人无理由跟风。

但35岁门槛又有一些道理，这要选择性区分，如果开发者一直做着CURD这样简单、重复性的体力活（真正的码农），那么当达到35岁时，和刚出校门一两年的年轻人比，竞争力可想而知，35岁时孩子上学、父母身体、住房等压力会很大，逼迫开发者提出更高的待遇要求，家庭事务、应酬交际等也多，不愿加班，通常工龄长累加的工资相对更高，如果你做的事情年轻人也能做，老板选谁呢？同时年纪大了多少有些面子问题，如果上司是个比自己小很多的年轻人，是否服管呢？对于年轻人来说管理一个比自己年长很多的人有时也挺尴尬。根据这些可见35岁门槛的存在有一定的道理。

时间不等任何人，那么开发者如何避免35岁门槛，该如何规划自己的一生呢？

如果你发现自己并不真的喜欢技术，那么你应该在年纪上还有竞争力时趁早转型，跟随内心，找到喜欢的事情并开始积累竞争力。

如果你真的很喜欢技术，并愿意且准备好以此度过一生，那么你就需要高效积累，不停学习，时刻注意拉开和年轻人的技术差距，他们有压力小和体力强的优势，你需要以技术优势进行弥补，大神之路不是你可选可不选，而是必须选择的，当到达35岁时，你必须是一个大神，担起年轻人难以胜任的系统岗位。

这里需要提醒你随着社会的发展，技术的门槛其实是在逐步提高的，比如你可能听说过“全栈工程师”，但那只属于互联网时代初期，现在社会分工太细太深，已经不存在全栈了，如果存在那可以换个叫法“样样懂，门门差”，因为人的精力差距不会太大，你选择研究全部，别人选择钻研一处，而用人单位是按岗位用人的，你需要考虑谁更有优势，理智会让你选择深钻一门，周边懂得即可，但这样你会成为一个大机器上的一个部件，你的选择自由被限制，细分门槛要求会很精专，浅尝辄止，不求精深必面临淘汰。

做这样的机器部件不适合有创业理想的人，那么创业会面临些什么呢？看看中国社会的发展，所有通用的IT需求你可能都没有机会，比如网站被公众号取代，不多的网站市场也被SaaS平台占领，与这样的平台竞争，他们只需要点鼠标初始化即可，你得写代码，他们按时间收费可以很低，你得一次性收费，站在客户角度首要考虑的当然是成本问题，通用需求还包括电商系统、直播系统、内容付费系统等等，而这些都有很成熟的现存解决方案，在规模优势上，微盟、有赞、微擎、微积木等等这些都是已经发展起来的很不错的SaaS平台，非通用的IT需求呢？会形成许多垂直领域的解决方案，山头被抢占瓜分，比如美团、滴滴、土巴兔、顶呱呱等等，他们所在的领域你都很难再有机会，留给开发者的仅剩下数量不多的真正需要定制化的需求，这样的需求有个特点，由于是定制，成本原因决定了客单价必须高，此时客户会对创业者公司的实力有所要求，你有多少员工？有多大的办公室？有多长时间的历史积累？有多少案例？注册资本有多高？

此外IT发展到今天，同一个应用系统在软件形式上会呈现多种形式，通常需要App、小程序、网页等中的一种或几种，还涉及到跨平台（APP有安卓、IOS和即将出现的鸿蒙，小程序涉及微信、支付宝、百度、抖音等等），虽然有UNIAPP这样的工具，但在客户要求原生应用时仍然所需技能很多，这就导致必须组建团队，团队成员还包括非技术人员等，比如业务员、财务等，这些都形成了一定的进入门槛，最终你会发现创业需要的不止是技术更多的是资金。

说到这里你是否感觉路很难？但请你相信不是只有IT领域是这样的，有竞争的地方都会这样，任何成功皆不容易，唯有你的兴趣能保证你能走多远、走多高，所以请跟随自己的内心。

如果你跟随内心，深思后依然选择了做技术，当一个了不起的大神，那么你该怎么做呢？首先你必须要注重积累，尤其是要站在巨人的肩膀上向着未开发的土地猛冲，你需要找到所在细分领域最有前景的生态圈，加入进去，回到PHP开发框架上来，小白看框架它只是进一步封装提供了要的功能，而大神看框架是它提供了一个统一的协作平台，大家都在同一个平台上进行创造，这样才能避免自己重复造轮子，在经济成本上才足够划算，借助众人的力量才能腾出手来发展自己的事情。

基础平台的统一性非常重要，只有这样人类才能累积向前，才能降低成本，但统一平台的形成有个很有意思的规律，那就是最终只会剩一个作为主要平台，然后有个处于第二位的平台来形成竞争后备，第三第四位的基本可以忽略不计了，且第一位和第二位在体量上会选差很远，这样的列子有很多，比如历史上有几千个操作系统，最终剩下window和linux，二者用户数量选差很远，又比如安卓和苹果、淘宝和京东、抖音和快手、美团和饿了么等等皆是如此，一旦格局形成，便很难撼动，比如微软就撼不动安卓，不是因为技术，而是因为滚雪球效应在发挥作用，王者会更强、更大，败者逐渐落寞消失，即便王者犯了些小错发展也不可改变，比如现在我们使用的键盘，其字母排列其实不是最合理的，历史上也出现过排布合理的键盘，但由于大家已经习惯于现在的键盘，所以也就延续使用了，要成为王者有两点很重要：技术层面的先进性要足够、社区生态要建立滚雪球效应，这两点相辅相成。

那么在PHP框架领域谁会成为这个统一的基础平台呢？开源项目的主要发展力量应该是大批使用者在使用过程中不断的提炼并总结，然后一起对其的持续讨论并改进，而不是几个人单凭自己的思考或经验，因此如果在ThinkPHP和Symfony中做选择，答案已经非常清楚，其实很早Symfony就意识到统一平台的意义所在，因此致力于解耦的、完备的基础组件的建立，并反复迭代，以至于现存其他一些框架也用Symfony的组件，比如Laravel和ThinkPHP，Symfony一再强调“标准”，且现在也已经存为php开发领域的事实标准，因为标准化就是统一平台的必备条件。

至于Drupal则是在Symfony基础上建立起来的更高一层的统一标准平台，成为了完整系统的标准基础，在这里常用的应用层功能几乎都已被提供，人们正在此统一平台上，基于模块化设计，创建更多面向未来的功能，实现Drupal的理想“提供卓越的数字体验”。

 

决策者技术选型：

如果你是一位创业老板，或项目总监，正为项目进行技术选型，那么这里为你提供几个注意事项：

控制成本：

这似乎不用多说，理所当然，但你真的控制到了吗？软件是无形的，如果你不是专业人士，很难控制成本，这里说一些坑：

在目前环境下，想做个长远规划的项目，能自己开发，就不要外包，有些东西看起来一样实则差距非常大，不专业的人很难看出健壮性、扩展性、安全性、持续性等等性质在两个系统间有何不同，比如同样功能的系统，负载五千和负载五千万的开发成本是完全不同的，又比如软件文档工作量有时会远高于软件开发本身，文档是保障系统长远发展的重点，但外包很难做到文档齐全，外包质量通常会让你在日后买单，究其原因，不是因为外包公司实力不行，而是成本问题。

 

少欠技术债：

不要在开始因为省钱，找一些积累不够的开发者，这里分享个故事：有位老板和技术总监在人才招聘上出现了分歧，技术总监要求给出岗位工资1.5万，来了一个应聘者只要八千，技术总监不要，但老板大喜，认为赚到了，为什么要傻傻的多给钱呢？有时小白会在系统中留下巨大隐患，这位技术总监就是看到了技术债问题，开发团队一定要有积累深的技术骨干来把控系统，同时在选择基础系统时不要选择成熟度低的东西，这样保证尽可能不欠技术债，否则你会开始轻车熟路，后面深陷泥潭，如果遇到商业关键窗口期，那么神仙也救不了你

 

借力加速：

社会发展到今天，其实很多IT系统功能都已经有了，而且非常齐全，你不需要自己去开发，比如要在ThinkPHP和Drupal之间选择，我会毫不犹豫的选择Drupal，因为ThinkPHP只是个半成品，通常在各种业务系统中有些功能是必须的，比如垃圾回收系统、状态系统、键值储存、批处理系统、计划任务系统、数据类型化系统、Ajax系统、数据查看引擎、版本支持系统、权限系统等等，这些在ThinkPHP都没有，而Drupal很完备，而要在ThinkPHP上开发出这些，需要数月到数年，不但谈不上基础统一平台的优势，也很难保证自己开发的代码质量，不但白白浪费了资源，在后期新加成员还需要付出高昂的培训费用，有现成的基础齐全的、成熟的系统为什么不用呢？

 

融入大环境：

开发体系要融入大环境，除了借力加速外，还在于后备人才的获取，让开发者和项目解耦，不要因为在现有开发者离职或不够时，找不到足够的开发者快速加入项目，融入大环境，解耦开发者很大程度保障了项目的发展安全。

 

国家开源建议：

这一节我们站在国家层面，来看看应当如何对待开源，我国日渐强大，很多国人都期待着超越美国那一天早日到来，那么中国要突破美国封锁，达到超越的目的，就必须要参与国际开源成为贡献主力，而不是自己搞一套独立的体系（自建体系应发生在新生事物上，比如下一代物联网操作系统鸿蒙），因为开源是全人类的开源，而不是哪一个国家的开源，闭门造车出门不合辙，会让中国远离世界，要知道中国只有十四亿人，而全世界有七十多亿人，生态力量无法和全世界对抗，因此理性的做法是参与开源，努力做出奉献，一则继承已有的人类发展成果，站在巨人基础上发展更快，二则选择和大多数人在一起，开放国门，建立影响力，才有可能树立大国形象。

 

关于本文作者：

云客（个人网站www.inDrupal.com），从事互联网技术多年，最初活动于Discuz、PHPCMS、帝国CMS等国内社区，为这些国内开源系统提供技术贡献，扩展开发，比如为帝国CMS开发有EXCEL导入插件等，后转向开发框架领域，对比ThinkPHP和CI框架（CodeIgniter）后，选择CI深度研习，精读了其所有源代码，并开发了基于CI和帝国的微信公众号管理系统，后意识到框架系统的不足，和对软件架构认识加深，逐步投入国际开源社区，深入研究Drupal，成为Drupal核心贡献者、模块开发者，并耗时六年写作了《云客Drupal源码分析》系列教程，开放阅读，全面系统性向国内开发者介绍Drupal系统，超过一百万字。目前致力于将国际开源技术引入国内，同中国开发者们一起推动中国开源发展。

 

本文写作于：2021年5月11-15日

[转载出处](http://drupalchina.cn/node/8507)
