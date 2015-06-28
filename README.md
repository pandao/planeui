# Plane UI

The Modern HTML5 Cross-Device Responsive Front-end UI Framework.

Plane UI，意为纸飞机或平面 UI，即 P(aper) (P)lane UI 的缩写，是一个构建 HTML5 应用的跨终端响应式前端界面框架及解决方案。

![](https://pandao.github.io/planeui/poster.jpg)

#### 目录

- [设计理念](#设计理念)
- [主要特性](#主要特性)
- [下载与安装](#下载与安装)
- [使用方法](#使用方法)
- [组件列表](#组件列表)
- [依赖项目及致谢](#依赖项目及致谢)
- [兼容支持情况](#兼容支持情况)
- [开发文档](#开发文档)
- [更新日志](#更新日志)
- [Lisence](#Lisence)

#### 设计理念

- 简单通用，高效开发；
- 模块化，低耦合；
- 移动优先，优雅降级；
- 美学追求，交互为本；
- 持续演进，拥抱新技术；

#### 主要特性

- 基于 HTML5 + CSS3：移动优先，快速开发跨终端响应式 Web 应用；
- 交互美学：扁平化风格，借鉴和溶合 Google Material Design 部分设计风格及规范，同时又有自己的风格；
- 按需定制：样式语义化，使用 SCSS 预处理样式；
- 基于 jQuery：更高的开发效率，方便使用各种 jQuery 插件；
- 丰富的组件：自带大量常用的组件，并向 Web Components 演化；
- 组件模块化：遵循 CommonJS 规范，支持 AMD / CMD 各种模块化加载工具；
- 命名空间： CSS 前缀式命名空间；
- 优雅降级：向下“基本”兼容到 IE8 ；

> 注：IE8 下支持基本的内容和样式渲染和部分交互。

#### 下载与安装

Github 下载：[https://github.com/pandao/planeui/archive/master.zip](https://github.com/pandao/planeui/archive/master.zip)

Bower 安装：

	bower install planeui

#### 使用方法

```html
<link rel="stylesheet" type="text/css" href="dist/css/planeui.min.css" />
<script type="text/javascript" src="./js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="./dist/js/planeui.js"></script>
```

兼容IE8~9 的用法（基本的内容渲染或不完全的支持，不过还是建议不考虑兼容 IE8）：

```html
<link rel="stylesheet" type="text/css" href="./dist/css/planeui.min.css" />

<!--[if (gte IE 9) | !(IE)]><!-->
<script type="text/javascript" src="./js/jquery-2.1.1.min.js"></script>
<!--<![endif]-->

<!--[if lt IE 9]>
<script type="text/javascript" src="./js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="./dist/js/planeui.patch.ie8.min.js"></script>
<![endif]-->

<!--[if lt IE 10]>
<script type="text/javascript" src="./dist/js/planeui.patch.ie9.min.js"></script>
<![endif]-->

<script type="text/javascript" src="./dist/js/planeui.js"></script>
```

响应式网格布局：

| 尺码    |     分辨率    |                 描述                |
|---------|:------------:|-------------------------------------|
| xs      |   *          | 所有屏幕（或手机竖屏）                |
| sm      | 640px及以上  |  手机横屏等                           |
| md      | 768px及以上  |  平板电脑（iPad）竖屏等               |
| lg      | 992px及以上  |  平板电脑（iPad）横屏、PC 机、笔记本等 |
| xl      | 1200px及以上 |  PC 机、笔记本等                     |
| xxl     | 1400px及以上 |  PC 机、笔记本等                     |

整体布局及限定最大宽度：

```html
<div class="pui-layout pui-layout-fixed"></div>
```

> `.pui-layout-fixed` 即限定最大宽度为 `960px`，其他宽度限定：`pui-layout-fixed-980 pui-layout-fixed-1000 pui-layout-fixed-1200 pui-layout-fixed-1360 pui-layout-fixed-1400 pui-layout-fixed-1500 pui-layout-fixed-1600 pui-layout-fixed-1700 pui-layout-fixed-1800`，通过媒体查询当前的屏幕宽度响应对应最大宽度。

12 等分网格布局示例：

```html
<div class="pui-grid">
	<div class="pui-row">
		<div class="pui-grid-xs-3"></div>
		<div class="pui-grid-xs-3"></div>
		<div class="pui-grid-xs-3"></div>
		<div class="pui-grid-xs-3"></div>
	</div>
	<div class="pui-row">
		<div class="pui-grid-xs-4"></div>
		<div class="pui-grid-xs-4"></div>
		<div class="pui-grid-xs-4"></div>
	</div>
	<div class="pui-row">
		<div class="pui-grid-xs-3"></div>
		<div class="pui-grid-xs-6"></div>
		<div class="pui-grid-xs-3"></div>
	</div>
	<div class="pui-row">
		<div class="pui-grid-xs-5"></div>
		<div class="pui-grid-xs-7"></div>
	</div>
</div>
```

Flexbox 弹性布局示例（不支持 IE9 及以下版本）：

```html
<div class="pui-flexbox pui-flex-column">
	<header>标题栏</header>
	<div class="pui-flex">内容层</div>
	<footer>底栏</footer>
</div>
```

> 更多示例及用法详见：[https://pandao.github.io/planeui/](https://pandao.github.io/planeui/)

#### 组件列表

- Arrow
- Article
- App Layout
- Animations
- Basic
- Badge / Label / Tag
- Button
- Button Sheet
- Breadcrumb
- Card
- Colors (Material Design Colors)
- Color Picker (Material Design Color Picker)
- Checkbox
- Close Button
- Comment
- Dialog
- Date Picker（未实现）
- Fonts
- Font sizer
- File Input
- FullPage
- Flexbox Layout
- Forms
- Form Validator
- Grid Layout
- Gallery （未实现）
- Icons （自带 Font Awesome 和 手机淘宝图标库两套图标库）
- Image
- List
- ListView
- Loading
- Menu
- Menubar
- Menu Accordion
- Mask
- Notice
- Pagination
- Progress
- Rating
- Radio Button
- Ring Progress
- Search
- Slider（未实现）
- Switch Button
- ScrollTo (Anchor + Container)
- SideNav / Side slide (Off Canvas Plus)
- Tab
- Texts
- Table
- Top10
- Tooltip
- Timeline
- Time Picker（未实现）
- Uploader（未实现）
- Z-Depth (Material Design Z-Depth)

#### 依赖项目及致谢

##### 1、依赖项目

- [jQuery](https://jquery.org/ "jQuery")  `jQuery License`
- [Normalize.css](http://necolas.github.io/normalize.css/ "Normalize.css") `未知 License`
- [Font Awesome](http://fontawesome.io/ "Font Awesome")  `GPL License & CC BY 3.0 License`
- [手机淘宝图标库](http://www.iconfont.cn/ "手机淘宝图标库") `未知 License`
- [HTML5 Shiv](https://github.com/aFarkas/html5shiv "HTML5 Shiv")  `MIT and GPL2 licenses`
- [Respond](https://github.com/scottjehl/Respond/ "Respond") `MIT License`
- [Selectivizr](http://selectivizr.com/ "Selectivizr") `MIT License`
- [Modernizr](http://modernizr.com/ "Modernizr") `MIT License`
- [Flexie](http://flexiejs.com/ "Flexie.js") `MIT License`
- [Prefixes.scss](https://github.com/pandao/prefixes.scss "Prefixes.scss") `MIT License`

##### 2、参考项目

- [Bootstrap](http://getbootstrap.com/ "Bootstrap")
- [Foundation](http://foundation.zurb.com/ "Foundation")
- [Semantic UI](http://semantic-ui.com/ "Semantic UI")
- [Amaze UI](http://amazeui.org/ "Amaze UI")
- [UI Kit](http://www.getuikit.net/ "UI Kit")
- [Google Material Design](http://www.google.com/design/)

#### 3、构建工具

- [Gulp.js](http://gulpjs.com/)
- [Sass/Scss](http://www.sass-lang.com/) `MIT License`

> 注：以上所有项目排名不分先后。

#### 兼容支持情况

Plane UI 对浏览器进行了分级支持 (GBS，即 Graded Browser Support，分级浏览器支持)，优先支持那些支持 HTML 5、CSS3、ES5 / 6 等新特性的现代浏览器。

> A > B > C > D

|  级别 |                      浏览器                    |              描述             |
|-------|-----------------------------------------------|:-----------------------------:|
| A 级  | Webkit 系（Chrome 31+、Safari 7+、Opera 29+等） |      完整的渲染和交互支持      |
|       | Android 4.2+ 浏览器（自带、UC、QQ、Chrome等）   |                               |
|       | iOS Safari 7.1+                               |                               |
|       | Firefox 31+                                   |                               |
|       | 桌面 IE10+、WP 8.1+ IE                         |                               |
| B 级  | iOS 6.x 浏览器                                 |  基本完整的支持，部分支持不完善  |
|       | Android 2.3.x+ 浏览器                          |                               |
|       | Firefox 旧版本                                 |                               |
|       | Opera 旧版本（非 Chromium）                    |                                |
|       | IE9、WP IE                                    |                                |
| C 级  | IE8、Android 2.2.x+ 浏览器                     |   部分基本支持，基本内容的渲染   |
| D 级  | 其他浏览器（IE6~7等）                           |     部分基本支持或不支持        |

兼容支持测试：

- iOS 7+
- Android 4.2+
- Chrome (latest)
- Firefox (latest)
- Safari 6+
- Opera (latest)
- Internet Explorer 9+

> IE 9 下因为它本身不支持部分 HTML5 特性（例如动画、Flexbox等）的原因，不太完美的支持。
> IE 8 只是提供最基本的兼容支持，有部分不支持、不完善或兼容性差。
> IE 7 及以下版本、Window Phone 等平台或浏览器均未测试。

其他环境的兼容测试：

- Node-webkit
- Phonegap

> 注：由于条件的限制，Android 和 iOS 的其他版本暂时未测试，欢迎使用者反馈和提交 Bug。

#### 开发文档

整理中...

#### 更新日志

[查看更新日志](https://github.com/pandao/planeui/blob/master/CHANGE.md)

#### License

The MIT License ([MIT](https://github.com/pandao/planeui/blob/master/LICENSE))

Plane UI 遵循 [MIT](https://github.com/pandao/planeui/blob/master/LICENSE) 协议，无论个人还是公司，都可以免费自由使用。

Copyright (c) 2014~2015 Pandao
