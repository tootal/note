@echo off
python 算法竞赛\比赛\order.py
qshell qupload .\upload.conf
git add .
git commit -m "update"
git push