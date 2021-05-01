# 深入探索Vue.js
这段时间用Vue框架写了一个小项目[章又贡](https://github.com/tootal/gan)，作为Web大作业，虽然最终完成了，但是开发过程中遇到了很多“不明朗”的地方，为了赶ddl，很多时候都是简单的“可以运行就行了”，并没有深入挖掘原因。目前作业已经交上去了，也有一点空闲的时间来深入探索一下Vue.js了。

[Vue.js](https://cn.vuejs.org/index.html)是一个渐进式JavaScript 框架。之前也简单使用过，不过都是以一个js文件引入的方式使用的，这次是第一次以“前端工程化”的方式开发。从[Vue CLI](https://cli.vuejs.org/zh/)开始创建页面，按照[文档](https://cli.vuejs.org/zh/guide/)的指引安装好后，为了方便探索我就[使用图形化界面](https://cli.vuejs.org/zh/guide/creating-a-project.html#使用图形化界面)的方式创建项目。

## vue命令位置
打开PowerShell命令行窗口，我目前的目录是`C:\Users\awesome\Projects`，根据官网的说明，直接输入命令`vue ui`打开浏览器窗口创建界面。等待一段时间后，自动打开了浏览器窗口，弹出了vue的图形化界面，首先我准备弄明白这个过程中到底发生了什么。

```ps1
PS C:\Users\awesome\Projects> vue ui
�  Starting GUI...
�  Ready on http://localhost:8000
```

注：从PowerShell复制代码时，使用Ctrl+Shift+C可能会自动合并成一行，而Ctrl+Insert不会。

首先vue命令肯定对应了一个可执行程序，显然是nodejs的模块，先在path环境变量中找一下：（新开一个PowerShell窗口）

```ps1
PS C:\Users\awesome> $env:path -split ';'
C:\Program Files (x86)\Common Files\Oracle\Java\javapath
C:\Windows\system32
C:\Windows
C:\Windows\System32\Wbem
C:\Windows\System32\WindowsPowerShell\v1.0\
C:\Windows\System32\OpenSSH\
C:\Program Files\NVIDIA Corporation\NVIDIA NvDLISR
C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common
C:\Program Files\dotnet\
C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\170\Tools\Binn\
C:\Program Files (x86)\Microsoft SQL Server\150\Tools\Binn\
C:\Program Files\Microsoft SQL Server\150\Tools\Binn\
C:\Program Files\Microsoft SQL Server\150\DTS\Binn\
C:\Program Files (x86)\Microsoft SQL Server\150\DTS\Binn\
C:\Users\awesome\scoop\apps\yarn\current\Yarn\bin
C:\Users\awesome\scoop\apps\yarn\current\global\node_modules\.bin
C:\Users\awesome\scoop\apps\nodejs\current\bin
C:\Users\awesome\scoop\apps\nodejs\current
C:\Users\awesome\scoop\apps\python\current
C:\Users\awesome\scoop\apps\python\current\Scripts
C:\Users\awesome\scoop\shims
C:\Users\awesome\AppData\Local\Microsoft\WindowsApps
C:\Program Files\Bandizip\
C:\Users\awesome\AppData\Local\Programs\Microsoft VS Code\bin
C:\Users\awesome\Documents\bin
C:\Programs\mingw\m64-101\bin
```

其中涉及的命令不是重点，用其他方式查看也是类似的。由于我是使用npm安装的，因此大概率在下面两个路径中：

```
C:\Users\awesome\scoop\apps\nodejs\current\bin
C:\Users\awesome\scoop\apps\nodejs\current
```

在第一个路径下果然找到了vue相关的可执行文件：

```ps1
PS C:\Users\awesome\scoop\apps\nodejs\current\bin> (dir -name) -join '    '                                             node_modules    hexo    hexo.cmd    hexo.ps1    rollup    rollup.cmd    rollup.ps1    serve    serve.cmd    serve.ps1    vue    vue.cmd    vue.ps1    vuepress    vuepress.cmd    vuepress.ps1        
```

按照环境变量的搜索顺序，下面的路径应该不会被搜索了，不放心也可以再查看一下。那么如何确定执行的是`vue`、`vue.cmd`还是`vue.ps1`呢？搜索了一下没有找到结果，我决定自己测试一下。

## 同名可执行文件的执行顺序
测试代码：[same_name_exec_order](file:///C:/Users/awesome/Documents/Projects/same_name_exec_order)

### PowerShell
实验过程：

```bat
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> (dir -name) -join '    '
hello    hello.bat    hello.cmd    hello.com    hello.cpp    hello.exe    hello.ps1
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> hello
hello : 无法将“hello”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
+ ~~~~~
    + CategoryInfo          : ObjectNotFound: (hello:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
 

Suggestion [3,General]: 找不到命令 hello，但它确实存在于当前位置。默认情况下，Windows PowerShell 不会从当前位置加载命令。如果信任此命令，请改为键入“.\hello”。有关详细信息，请
参阅 "get-help about_Command_Precedence"。
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello
[ps1]hello world!
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> mv hello.ps1 hello1.ps1
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello
程序“hello.com”无法运行: 指定的可执行文件不是此操作系统平台的有效应用程序。所在位置 行:1 字符: 1
+ .\hello
+ ~~~~~~~。
所在位置 行:1 字符: 1
+ .\hello
+ ~~~~~~~
    + CategoryInfo          : ResourceUnavailable: (:) [], ApplicationFailedException
    + FullyQualifiedErrorId : NativeCommandFailed
 
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> mv hello.com hello2.com
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello
[exe]hello world!
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> mv hello.exe hello3.exe
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello

C:\Users\awesome\Documents\Projects\same_name_exec_order>echo [bat]hello world!
[bat]hello world!
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> mv hello.bat hello4.bat
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello

C:\Users\awesome\Documents\Projects\same_name_exec_order>echo [cmd]hello world!
[cmd]hello world!
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> mv hello.cmd hello5.cmd
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> mv hello hello6
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> .\hello
.\hello : 无法将“.\hello”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
+ .\hello
+ ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (.\hello:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
 
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> (dir -name) -join '    '
hello.cpp    hello1.ps1    hello2.com    hello3.exe    hello4.bat    hello5.cmd    hello6
```

先在PowerShell下将文件名恢复：

```cmd
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> dir | mv -destination { $_.name -replace 'hello\d','hello' }   
PS C:\Users\awesome\Documents\Projects\same_name_exec_order> (dir -name) -join '    '
hello    hello.bat    hello.cmd    hello.com    hello.cpp    hello.exe    hello.ps1
```

### CMD
注：可以直接在PowerShell下输入CMD进入CMD环境。

```cmd
C:\Users\awesome\Documents\Projects\same_name_exec_order>hello
该版本的 C:\Users\awesome\Documents\Projects\same_name_exec_order\hello.com 与你运行的 Windows 版本不兼容。请查看计算机的系统信息，然后联系软件发布者。

C:\Users\awesome\Documents\Projects\same_name_exec_order>move hello.com hello1.com
移动了         1 个文件。

C:\Users\awesome\Documents\Projects\same_name_exec_order>hello
[exe]hello world!

C:\Users\awesome\Documents\Projects\same_name_exec_order>move hello.exe hello2.exe
移动了         1 个文件。

C:\Users\awesome\Documents\Projects\same_name_exec_order>hello

C:\Users\awesome\Documents\Projects\same_name_exec_order>echo [bat]hello world! 
[bat]hello world!

C:\Users\awesome\Documents\Projects\same_name_exec_order>move hello.bat hello3.bat
移动了         1 个文件。

C:\Users\awesome\Documents\Projects\same_name_exec_order>hello     

C:\Users\awesome\Documents\Projects\same_name_exec_order>echo [cmd]hello world!
[cmd]hello world!

C:\Users\awesome\Documents\Projects\same_name_exec_order>move hello.cmd hello4.cmd
移动了         1 个文件。

C:\Users\awesome\Documents\Projects\same_name_exec_order>hello
'hello' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

### 总结
PowerShell默认不会从当前目录下加载命令，需要输入`.\hello`，对于cmd来说，会默认加载当前目录的命令，输入`hello`命令即可。

执行顺序为：

* ps1（仅PowerShell）
* com
* exe
* bat
* cmd
* (empty)

cmd下无法直接运行ps1，可用`powershell -file hello.ps1`。

## 原理

实验完了忽然又发现了原理，其实就是搜索`pathext`环境变量，它的值通常是：

```cmd
PS C:\Users\awesome\test> $env:pathext
.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL
```
下面也会提到这个变量。

## vue.cmd
由上面的测试结果可知，直接输入`vue`命令运行的是`vue.cmd`文件的内容，下面是带注释的文件内容。

```bat
@ECHO off
::关闭命令回显
SETLOCAL
::临时环境变量，与ENDLOCAL连用
CALL :find_dp0
::调用find_dp0标号后的内容，调用完成后返回
IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
::优先调用当前目录下的node
) ELSE (
  SET "_prog=node"
::否则调用环境变量中的node
  SET PATHEXT=%PATHEXT:;.JS;=;%
::可执行文件后缀删除js
::%var:a=b%，表示把变量var中的a替换成b
)

"%_prog%"  "%dp0%\node_modules\@vue\cli\bin\vue.js" %*
::调用node运行js文件，同时传递命令行参数
ENDLOCAL
EXIT /b %errorlevel%
:: /b 指定退出脚本，而不是命令行环境
:: %errorlevel%表示上个命令的返回值
:find_dp0
::定义标号，常用于goto、call等语句
SET dp0=%~dp0
::定义变量dp0，%~dp0表示此文件的目录（不是当前工作目录）
EXIT /b
```

可以发现实际上就是利用node调用[@vue/cli/bin](file:///C:/Users/awesome/scoop/apps/nodejs/current/bin/node_modules/@vue/cli/bin)文件夹下的vue.js文件。

注：为什么要删掉pathext中的js呢？我猜想是为了避免当前目录下含有`node.js`文件，这样直接调用`node`就会变成执行该文件，而不是调用全局的nodejs了。

## vue.ps1
ps1是PowerShell脚本文件的扩展名，由于我主要用PowerShell，因此输入vue命令的时候执行的就是这个脚本文件的内容。

```ps1
#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
# $MyInvocation是PowerShell的自动化变量，打开PowerShell会自动加载
# 可以用来获取脚本的路径，这句的目的是获取脚本所在文件夹路径

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0
if (Test-Path "$basedir/node$exe") {
  & "$basedir/node$exe"  "$basedir/node_modules/@vue/cli/bin/vue.js" $args
  $ret=$LASTEXITCODE
} else {
  & "node$exe"  "$basedir/node_modules/@vue/cli/bin/vue.js" $args
  $ret=$LASTEXITCODE
}
exit $ret

```

操作和上面的类似。

## vue.js
之前涉及了一些操作系统的内容，下面应该就是nodejs的版块了。

第一部分就是检查node版本，chalk用来在控制台输出多彩的信息，semver用来判断版本号。

第二部分就是定义命令、子命令等信息。

一路看下来马上就能找到ui命令的位置了，内容如下：

```js
program
  .command('ui')
  .description('start and open the vue-cli ui')
  .option('-H, --host <host>', 'Host used for the UI server (default: localhost)')
  .option('-p, --port <port>', 'Port used for the UI server (by default search for available port)')
  .option('-D, --dev', 'Run in dev mode')
  .option('--quiet', `Don't output starting messages`)
  .option('--headless', `Don't open browser on start and output port`)
  .action((cmd) => {
    checkNodeVersion('>=8.6', 'vue ui')
    require('../lib/ui')(cleanArgs(cmd))
  })
```

显然最后执行了[lib](file:///C:/Users/awesome/scoop/apps/nodejs/current/bin/node_modules/@vue/cli/lib)文件夹下的`ui.js`文件。

ui文件最后导出了一个lambda函数：

```js
module.exports = (...args) => {
  return ui(...args).catch(err => {
    error(err)
    if (!process.env.VUE_CLI_TEST) {
      process.exit(1)
    }
  })
}
```

其中`...args`表示收集所有参数，放到args数组中。函数体内传递给了ui函数。

分析一下ui函数，主要就是调用了server函数启动一个服务器。server函数在文件开头导入了：

```js
const { portfinder, server } = require('@vue/cli-ui/server')
```

这个server文件在[@vue/cli的node_modules文件夹下的@vue/cli-ui](file:///C:/Users/awesome/scoop/apps/nodejs/current/bin/node_modules/@vue/cli/node_modules/@vue/cli-ui)文件夹内。

```js
exports.server = require('./graphql-server')
```

可以发现到了`graphql-server`这里。

先了解一下什么是`GraphQL`。

## GraphQL
找到一个[介绍网站](https://graphql.cn/)，发现首页的打字动画作的还是不错的，可以借鉴一下。

来源是[这里](https://graphql.github.io/)，目前Github的API也是用的是graphql

大概看了一下，还是先放一边吧。。

## express
在graphql-server中，用到了express。

```js
module.exports = (options, cb = null) => {
  // Default options
  options = merge({
    integratedEngine: false
  }, options)

  // Express app
  const app = express()
...
```