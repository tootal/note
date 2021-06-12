# jsx对比分析

```
var ArticleLicensing = /*#__PURE__*/function (_Component) {
  _inherits(ArticleLicensing, _Component);

  var _super = _createSuper(ArticleLicensing);

  function ArticleLicensing() {
    _classCallCheck(this, ArticleLicensing);

    return _super.apply(this, arguments);
  }

  _createClass(ArticleLicensing, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          link = _this$props.link,
          author = _this$props.author,
          authorTitle = _this$props.authorTitle,
          createdAt = _this$props.createdAt,
          createdTitle = _this$props.createdTitle,
          updatedAt = _this$props.updatedAt,
          updatedTitle = _this$props.updatedTitle,
          licenses = _this$props.licenses,
          licensedTitle = _this$props.licensedTitle;
      return (0, _inferno.createVNode)(1, "div", "article-licensing box", [(0, _inferno.createVNode)(1, "div", "licensing-title", [title ? (0, _inferno.createVNode)(1, "p", null, title, 0) : null, (0, _inferno.createVNode)(1, "p", null, (0, _inferno.createVNode)(1, "a", null, link, 0, {
        "href": link
      }), 2)], 0), (0, _inferno.createVNode)(1, "div", "licensing-meta level is-mobile", (0, _inferno.createVNode)(1, "div", "level-left", [author ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, authorTitle, 0), (0, _inferno.createVNode)(1, "p", null, author, 0)], 4), 2) : null, createdAt ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, createdTitle, 0), (0, _inferno.createVNode)(1, "p", null, createdAt, 0)], 4), 2) : null, updatedAt ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, updatedTitle, 0), (0, _inferno.createVNode)(1, "p", null, updatedAt, 0)], 4), 2) : null, licenses && Object.keys(licenses).length ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, licensedTitle, 0), (0, _inferno.createVNode)(1, "p", null, Object.keys(licenses).map(function (name) {
        return (0, _inferno.createVNode)(1, "a", licenses[name].icon ? 'icon' : '', licenses[name].icon ? (0, _inferno.createVNode)(1, "i", licenses[name].icon) : name, 0, {
          "rel": "noopener",
          "target": "_blank",
          "title": name,
          "href": licenses[name].url
        });
      }), 0)], 4), 2) : null], 0), 2)], 4);
    }
  }]);

  return ArticleLicensing;
}(Component);
```

尤其是这一部分，看得眼花缭乱：

```
(0, _inferno.createVNode)(1, "div", "article-licensing box", [(0, _inferno.createVNode)(1, "div", "licensing-title", [title ? (0, _inferno.createVNode)(1, "p", null, title, 0) : null, (0, _inferno.createVNode)(1, "p", null, (0, _inferno.createVNode)(1, "a", null, link, 0, {
        "href": link
      }), 2)], 0), (0, _inferno.createVNode)(1, "div", "licensing-meta level is-mobile", (0, _inferno.createVNode)(1, "div", "level-left", [author ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, authorTitle, 0), (0, _inferno.createVNode)(1, "p", null, author, 0)], 4), 2) : null, createdAt ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, createdTitle, 0), (0, _inferno.createVNode)(1, "p", null, createdAt, 0)], 4), 2) : null, updatedAt ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, updatedTitle, 0), (0, _inferno.createVNode)(1, "p", null, updatedAt, 0)], 4), 2) : null, licenses && Object.keys(licenses).length ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, licensedTitle, 0), (0, _inferno.createVNode)(1, "p", null, Object.keys(licenses).map(function (name) {
        return (0, _inferno.createVNode)(1, "a", licenses[name].icon ? 'icon' : '', licenses[name].icon ? (0, _inferno.createVNode)(1, "i", licenses[name].icon) : name, 0, {
          "rel": "noopener",
          "target": "_blank",
          "title": name,
          "href": licenses[name].url
        });
      }), 0)], 4), 2) : null], 0), 2)], 4);
    }
  }])
```

实质应该是类似这样的东西：

```
<Fragment>
    <div id="twikoo" class="content twikoo"></div>
    <script src={jsUrl}></script>
    <script dangerouslySetInnerHTML={{ __html: js }}></script>
</Fragment>
```

只不过从jsx编译成了纯粹的js代码。

由于要自定义部分逻辑，因此尝试恢复一下原来的代码。

或许可以找一下现成的？？

啊啊啊啊啊啊，为什么最新的是jsx？？
我傻了。

好了，没事了。。
