@echo off
python �㷨����\����\order.py
qshell qupload .\upload.conf
git add .
git commit -m "update"
git push