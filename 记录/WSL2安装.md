# WSL2安装
参考官方文档：[Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

## 启用WSL特性

在管理员权限下运行PowerShell，运行：

```
PS C:\Windows\system32> dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

Deployment Image Servicing and Management tool
Version: 10.0.19041.572

Image Version: 10.0.19041.572

Enabling feature(s)
[==========================100.0%==========================]
The operation completed successfully.
```

## 升级到WSL2
默认启用的是WSL1，最新版本的Win10支持WSL2。

继续运行，启用虚拟机特性：

```
PS C:\Windows\system32> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

Deployment Image Servicing and Management tool
Version: 10.0.19041.572

Image Version: 10.0.19041.572

Enabling feature(s)
[==========================100.0%==========================]
The operation completed successfully.
```

重启电脑。

下载升级包：[WSL2 Linux kernel update package for x64 machines](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)，（13.7MB）

注意上面的升级包仅适用于x64机器，使用`systeminfo | find "System Type"`可以查看本机情况。

```
PS C:\Users\tootal> systeminfo | find "System Type"
System Type:               x64-based PC
```

安装升级包。

将WSL2设为默认。

```
PS C:\Windows\system32> wsl --set-default-version 2
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
PS C:\Windows\system32> wsl -l
Windows Subsystem for Linux has no installed distributions.
Distributions can be installed by visiting the Microsoft Store:
https://aka.ms/wslstore
```

## 安装Linux发行版
打开Microsoft Store。

我选择安装广泛使用的Ubuntu20.04 LTS系统。

安装完成后启动。

```
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: tootal
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 4.19.128-microsoft-standard x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Oct 23 12:49:21 CST 2020

  System load:  0.0                Processes:             8
  Usage of /:   0.4% of 250.98GB   Users logged in:       0
  Memory usage: 0%                 IPv4 address for eth0: 172.24.147.162
  Swap usage:   0%

1 update can be installed immediately.
0 of these updates are security updates.
To see these additional updates run: apt list --upgradable


The list of available updates is more than a week old.
To check for new updates run: sudo apt update


This message is shown once once a day. To disable it please create the
/home/tootal/.hushlogin file.
```

注意输入密码的时候没有显示，输入完按回车即可。

## 配置Ubuntu
为了加快升级下载的速度，可以配置[清华大学Ubuntu 镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)。

```
tootal@DESKTOP-TOOTAL:~$ sudo mv /etc/apt/sources.list /etc/apt/sources.list.back
tootal@DESKTOP-TOOTAL:~$ sudo vi /etc/apt/sources.list
tootal@DESKTOP-TOOTAL:~$ cat /etc/apt/sources.list
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

更新系统软件：

```
tootal@DESKTOP-TOOTAL:~$ sudo apt update
Get:1 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal InRelease [265 kB]
Get:2 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-updates InRelease [111 kB]
Get:3 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-backports InRelease [98.3 kB]
Get:4 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-security InRelease [107 kB]
（省略部分）
Get:44 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-security/multiverse amd64 Packages [1256 B]
Get:45 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-security/multiverse Translation-en [540 B]
Get:46 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-security/multiverse amd64 c-n-f Metadata [116 B]
Fetched 19.2 MB in 32s (609 kB/s)
Reading package lists... Done
Building dependency tree
Reading state information... Done
102 packages can be upgraded. Run 'apt list --upgradable' to see them.
tootal@DESKTOP-TOOTAL:~$ sudo apt upgrade
Reading package lists... Done
Building dependency tree
Reading state information... Done
Calculating upgrade... Done
The following NEW packages will be installed:
  motd-news-config python3-pexpect python3-ptyprocess
The following packages will be upgraded:
  alsa-ucm-conf apport base-files bcache-tools bind9-dnsutils bind9-host bind9-libs bolt bsdutils busybox-initramfs
  busybox-static cloud-init command-not-found cryptsetup cryptsetup-bin cryptsetup-initramfs cryptsetup-run curl fdisk
  finalrd gcc-10-base gir1.2-packagekitglib-1.0 initramfs-tools initramfs-tools-bin initramfs-tools-core
  language-selector-common libasound2 libasound2-data libblkid1 libbrotli1 libc-bin libc6 libcryptsetup12
  libcurl3-gnutls libcurl4 libdns-export1109 libfdisk1 libfreetype6 libgcc-s1 libgl1 libglvnd0 libglx0 libgnutls30
  libisc-export1105 liblzma5 libmount1 libnetplan0 libpackagekit-glib2-18 libpam-modules libpam-modules-bin
  libpam-runtime libpam0g libproxy1v5 libpulse0 libpulsedsp libpython3.8 libpython3.8-minimal libpython3.8-stdlib
  libsmartcols1 libstdc++6 libuuid1 libuv1 libx11-6 libx11-data libx11-xcb1 locales mdadm mount netplan.io
  open-vm-tools packagekit packagekit-tools pulseaudio-utils python3-apport python3-commandnotfound
  python3-distupgrade python3-distutils python3-gdbm python3-lib2to3 python3-problem-report
  python3-software-properties python3-urllib3 python3.8 python3.8-minimal rsyslog show-motd snapd
  software-properties-common sosreport sudo tmux ubuntu-minimal ubuntu-release-upgrader-core ubuntu-server
  ubuntu-standard ubuntu-wsl unattended-upgrades update-motd util-linux uuid-runtime xz-utils zlib1g
102 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
Need to get 56.7 MB of archives.
After this operation, 4489 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-updates/main amd64 ubuntu-server amd64 1.450.2 [2680 B]
Get:2 https://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-updates/main amd64 show-motd all 3.6-0ubuntu6.1 [2304 B]
（余下省略）
```