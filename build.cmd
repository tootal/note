@echo off
qshell qupload .\upload.conf
git add .
git commit -m "update"
git push