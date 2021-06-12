# graph在线绘图代码分析
[网址](https://csacademy.com/app/graph_editor/)

早就对这个很感兴趣了，这次想分析一下是怎么实现的，看下能不能嵌入到博客中去。

我先直接Ctrl+S保存了一下这个网页。

## html文件分析

格式化之后大概有2611行。

一直到1785行，head结束标签。

然后也还是一些引入的css文件：

```html
    <meta property="og:image" content="/static/icon.png">
    <link rel="image_src" href="https://csacademy.com/static/icon.png">
    <link rel="icon" type="image/png" href="https://csacademy.com/static/favicon.png">
    <link rel="stylesheet" href="./Graph Editor_files/katex.min.css">
    <link rel="stylesheet" href="./Graph Editor_files/lato-font.css">
    <link rel="stylesheet" href="./Graph Editor_files/font-awesome.min.css">
    <link rel="stylesheet" href="./Graph Editor_files/csacademy.css">
```

接着是一些引入的js文件，也是要分析的重点吧。

```html
    <script>
        var JS_VERSION = 75;
        var SERVER_PAGE_LOAD = 1610169648.9675238;
        var SERVER_TIME_OFFSET = Date.now() / 1000.0 - SERVER_PAGE_LOAD;
        var WEBSOCKET_URL = ["wss://ws3.csacademy.com", "wss://ws1.csacademy.com", "wss://ws2.csacademy.com"];
        var USER = { "id": 88426, "email": "hzq.convex@gmail.com", "firstName": "tal", "lastName": "too", "dateJoined": 1610169648.691613, "isActive": true, "lastLogin": 1610169648.722804, "hasPassword": false, "localeLanguageId": 1, "username": null, "codeforcesHandle": "", "displayName": false, "isAuthenticated": true, "lastReadNotificationId": 0, "customSettings": {} };
    </script>

    <script src="./Graph Editor_files/require.js.download"></script>
    <script src="./Graph Editor_files/require_config.js.download"></script>
    <script src="./Graph Editor_files/PublicState.js.download"></script>
    <script src="./Graph Editor_files/EmojiMini.js.download"></script>
    <script src="./Graph Editor_files/bundle.js.download"></script>
    <script>
        require(["Bundle"], function (bundle) {
            window.bundle = bundle;
        });
    </script>


    <noscript>You have javascript turned off. Any functionality on our website needs javascript turned on.</noscript>

    <script>
        require(["Bundle", "Bundle"], function (Bundle, WidgetRequire) {
            GlobalState.importState({});
            window.currentWidget = WidgetRequire.CSAApp.create(document.body, {});
        });
    </script>

```


## bundle.js

前面的东西太多了也分析不过来，直接看bundle.js吧，直觉告诉我这是核心。


第一行就给我整懵逼了，这个define是什么鬼。

这应该是一种模块化技术。

