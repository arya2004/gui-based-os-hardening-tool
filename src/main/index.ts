import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { spawn } from 'child_process'
import sudo from 'sudo-prompt'
import { exec, execSync } from 'get-pty-output'
// import the script from resources folder
import { getUtils } from './utils'
import { readFile } from 'fs'
import auditScript from '../../resources/audit.sh?asset&asarUnpack'
import installScript from '../../resources/install.sh?asset&asarUnpack'
import uninstallScript from '../../resources/uninstall.sh?asset&asarUnpack'

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.commandLine.appendArgument('--no-sandbox')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('runScript', (_, scriptName) => {
  let { sendStdout, pipeStdout, terminalOutputFile } = getUtils(app, mainWindow)
  console.log(terminalOutputFile)

  // create a watcher which watches the file for changes
  // and send the stdout to renderer

  if (scriptName == 'install') {
    let watcher = sendStdout()
    readFile(installScript, 'utf8', (err, data) => {
      if (err) console.log(err)
      console.log(pipeStdout(data))
      // // Execute a command using sudo and pipe the output to the output file
      sudo.exec(pipeStdout(data), { name: 'OS Hardening' }, () => {
        // Once process is complete, close the watcher
        watcher.close()
      })
    })
  } else if (scriptName == 'audit') {
    let watcher = sendStdout()
    readFile(auditScript, 'utf8', (err, data) => {
      if (err) console.log(err)
      console.log(pipeStdout(data))
      // // Execute a command using sudo and pipe the output to the output file
      sudo.exec(pipeStdout(data), { name: 'OS Hardening' }, () => {
        // Once process is complete, close the watcher
        watcher.close()
      })
    })
  } else if (scriptName == 'uninstall') {
    let watcher = sendStdout()
    readFile(uninstallScript, 'utf8', (err, data) => {
      if (err) console.log(err)
      // console.log(pipeStdout(data))
      // // Execute a command using sudo and pipe the output to the output file
      sudo.exec(pipeStdout(data), { name: 'OS Hardening' }, () => {
        // Once process is complete, close the watcher
        watcher.close()
      })
    })
  }
})
