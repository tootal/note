@echo off
python �㷨����\����\order.py
qshell qupload .\upload.conf 1>NUL
git add .
git commit -m "update"
git push