# 构建vnote3
主要参考github action的脚本在本地部署一下。

## win64

```cmd
@echo off
echo Setting up environment for Qt usage...
set PATH=C:\Qt\5.12.10\msvc2017_64\bin;%PATH%
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
qmake -r -spec win32-msvc CONFIG-=debug CONFIG+=release ..\vnote.pro
nmake
```

先按这个尝试编译一下。

```cmd
@echo off
echo Setting up environment for Qt usage...
set PATH=C:\Qt\5.12.10\msvc2017_64\bin;%PATH%
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
windeployqt vnote.exe
```

部署暂时用这个，不是全自动化的，不过目前试了一下是可以运行的。

## win32

```cmd
@echo off
echo Setting up environment for Qt usage...
set PATH=C:\Qt\5.12.10\msvc2017\bin;%PATH%

call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x86
qmake -r -spec win32-msvc CONFIG-=debug CONFIG+=release ..\vnote.pro
nmake
```

差不多。

