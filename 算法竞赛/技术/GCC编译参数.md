# GCC编译参数


## 适合算法竞赛调试
VSCode CodeRunner ExecuteMap for PowerShell：

```sh
cd $dir && g++ $fileName -o $fileNameWithoutExt -DLOCAL -std=gnu++17 -O2 -Wall -Wextra '-Wl,--stack=256000000' -pedantic -Wshadow -Wformat=2 -Wfloat-equal -Wconversion -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond && $dir$fileNameWithoutExt
```

Far：

```sh
g++ !.cpp -std=gnu++17 -O2 -o !.exe -Wall -Wextra -Wl,--stack=256000000 -pedantic -Wshadow -Wformat=2 -Wfloat-equal -Wconversion -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond
```