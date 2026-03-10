@echo off
REM Start portal from repo root so all links work. Run from anywhere; script cd to repo root.
cd /d "%~dp0"
cd ..\..
echo Starting HTTP server from repo root. 从仓库根目录启动服务。
echo Open in browser / 用浏览器打开:
echo   http://localhost:3765/50-publish/site/
echo.
python -m http.server 3765
