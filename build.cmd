@echo off
python �㷨����\����\order.py
qshell qupload .\upload.conf 1>NUL
qshell cdnrefresh --dirs -i refresh_url.txt
git add .
git commit -m "update"
git push