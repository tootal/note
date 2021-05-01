# Qt源代码分析
安装Qt的时候可以选择下载源代码，我放在[Src](file:///C:/Qt/5.15.0/Src)目录中。

一堆文件和文件夹，先看看README文件。

>  A typical `configure; make' build process is used.

构建方法还是比较简单的，我以Windows为例分析一下：

```
   Windows:
   --------

     Open a command prompt.
     Ensure that the following tools can be found in the path:
     * Supported compiler (Visual Studio 2012 or later,
        MinGW-builds gcc 4.9 or later)
     * Perl version 5.12 or later   [http://www.activestate.com/activeperl/]
     * Python version 2.7 or later  [http://www.activestate.com/activepython/]
     * Ruby version 1.9.3 or later  [http://rubyinstaller.org/]

     cd <path>\<source_package>
     configure -prefix %CD%\qtbase <license> -nomake tests
     nmake // jom // mingw32-make
```

## 简单尝试一下

使用MSVC2019的命令行，简单尝试一下编译：

直接在根目录下输入`configure`命令。然后直接nmake，23：00开始编译。

好像要编译好久好久，第二天早上起来编译好了。安装就不用多久了。
