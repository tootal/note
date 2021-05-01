# Hexo源码分析

从hexo命令入手。

应该是调用了全局的npm包。

[bin](file:///C:/Users/tootal/scoop/apps/nodejs12/current/bin)

果然有hexo文件。

```cmd
@ECHO off
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)

"%_prog%"  "%dp0%\node_modules\hexo-cli\bin\hexo" %*
ENDLOCAL
EXIT /b %errorlevel%
:find_dp0
SET dp0=%~dp0
EXIT /b

```


`%~dp0`的作用：

`%0`："C:\Users\tootal\scoop\apps\nodejs12\current\bin\test.cmd"
`%~dp0`：C:\Users\tootal\scoop\apps\nodejs12\current\bin\

call标号，先执行标号后的内容，完成后返回。（如果在每段标号末尾加上EXIT，相当与模拟函数了）
goto标号，直接转到标号位置，开始执行标号后的内容。

先不看了，好像执行的是ps1文件。。。

```ps1
#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
# 脚本所在目录
$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0
if (Test-Path "$basedir/node$exe") { # 若当前目录下存在node.exe，则调用它
  & "$basedir/node$exe"  "$basedir/node_modules/hexo-cli/bin/hexo" $args
  $ret=$LASTEXITCODE
} else { # 否则调用系统的node.exe
  & "node$exe"  "$basedir/node_modules/hexo-cli/bin/hexo" $args
  $ret=$LASTEXITCODE
}
exit $ret

```

大概知道了，basedir是脚本所在目录，


总之就是用node执行了一个[文件](C:/Users/tootal/scoop/apps/nodejs12/current/bin/node_modules/hexo-cli/bin/hexo)

```js
#!/usr/bin/env node

'use strict';

require('../lib/hexo')();

```


上面有require，那么就看看这个文件默认导出了什么东西。


## hexo-cli/lib/hexo

```js
module.exports = entry;
```

entry是一个函数。

```js

function entry(cwd = process.cwd(), args) {
  args = camelCaseKeys(args || minimist(process.argv.slice(2), { string: ['_'] }));

  let hexo = new Context(cwd, args);
  let { log } = hexo;

  // Change the title in console
  process.title = 'hexo';

  function handleError(err) {
    if (err && !(err instanceof HexoNotFoundError)) {
      log.fatal(err);
    }

    process.exitCode = 2;
  }

  return findPkg(cwd, args).then(path => {
    if (!path) return;

    hexo.base_dir = path;

    return loadModule(path, args).catch(err => {
      log.error(err.message);
      log.error('Local hexo loading failed in %s', chalk.magenta(tildify(path)));
      log.error('Try running: \'rm -rf node_modules && npm install --force\'');
      throw new HexoNotFoundError();
    });
  }).then(mod => {
    if (mod) hexo = mod;
    log = hexo.log;

    require('./console')(hexo);

    return hexo.init();
  }).then(() => {
    let cmd = '';

    if (!args.h && !args.help) {
      cmd = args._.shift();

      if (cmd) {
        const c = hexo.extend.console.get(cmd);
        if (!c) cmd = 'help';
      } else {
        cmd = 'help';
      }
    } else {
      cmd = 'help';
    }

    watchSignal(hexo);

    return hexo.call(cmd, args).then(() => hexo.exit()).catch(err => hexo.exit(err).then(() => {
      // `hexo.exit()` already dumped `err`
      handleError(null);
    }));
  }).catch(handleError);
}

entry.console = {
  init: require('./console/init'),
  help: require('./console/help'),
  version: require('./console/version')
};

entry.version = require('../package.json').version;

```


## hexo包分析

hexo核心。
hexo-component-inferno，这是icarus主题抽取出来的组件。
hexo-deployer-tcb-static，部署插件。
hexo-front-matter，解析文件开头的元信息。
hexo-fs，文件处理模块。
hexo-generator-archive，生成存档页面。


``` yaml
archive_generator:
  enabled: true
  per_page: 10
  yearly: true
  monthly: true
  daily: false
  order_by: -date
```

- **enabled**: The default value is **true**, set to **false** if you do not want to enable the plugin
- **per_page**: Posts displayed per page. (**0** = disable pagination)
- **yearly**: Generate yearly archive.
- **monthly**: Generate monthly archive.
- **daily**: Generate daily archive.
- **order_by**: Posts order. (Order by date descending by default)


hexo-generator-category，生成分类页面。
hexo-generator-feed，生成feed，订阅信息。
hexo-generator-tag，生成tag。


可以在hexo-generator-tag里面改，但是要知道如何生成一个tag。

看看locals里面的tag是怎么来的。

```js
    locals.set('tags', () => {
      // Ignore tags with zero posts
      return db.model('Tag').filter(tag => tag.length);
    });
```

还是从front-matter开始分析一下吧。

```
template_locals:  [
  'page',  'path',
  'url',   'config',
  'theme', 'layout',
  'env',   'view_dir',
  'site',  '__',
  '_p'
]
```

