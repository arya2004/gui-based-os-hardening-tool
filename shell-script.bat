@echo off
set "folderPath=C:\Users\arya2\Desktop\tttt" 

mkdir "%folderPath%"
if exist "%folderPath%" (
  echo Folder created successfully.
) else (
  echo Failed to create folder.
)
