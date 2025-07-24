@echo off
start cmd /k "cd src/scss & sass --watch style.scss:../../dist/style.css"
start cmd /k "cd src/ts & tsc -w"
pause