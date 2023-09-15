import { App, BrowserWindow } from 'electron'

import { writeFileSync, readFile, unlink, watch, constants, access, write, unlinkSync } from 'fs'

export const getUtils = (app: App, mainWindow: BrowserWindow) => {
  let paths = [
    { name: 'appData', path: app.getPath('appData') },
    { name: 'userData', path: app.getPath('userData') },
    { name: 'logs', path: app.getPath('logs') },
    { name: 'temp', path: app.getPath('temp') },
    { name: 'sessionData', path: app.getPath('sessionData') },
    { name: 'desktop', path: app.getPath('desktop') },
    { name: 'documents', path: app.getPath('documents') },
    { name: 'downloads', path: app.getPath('downloads') },
    { name: 'home', path: app.getPath('home') }
  ]

  let usablePathIndex = -1

  for (let path of paths) {
    try {
      writeFileSync(path.path.concat('/test.txt'), '')
      usablePathIndex = paths.indexOf(path)
      unlinkSync(path.path.concat('/test.txt'))
      console.log(`usable path is ${path.name}: ${path.path}`)
      break
    } catch (err) {
      continue
    }
  }

  if (usablePathIndex == -1) {
    throw new Error('No usable path found. Please check your app permissions.')
  }

  const terminalOutputFile = paths[usablePathIndex].path.concat('/terminalOutput.txt')


  // Converts a string of commands so that
  // output of every command is piped to the output file.
  const pipeStdout = (command: string): string => {

    if (!command) return ''
    return command

      .split(/[;|\n]+/)
      .map((el) => el.trim())
      .filter((el) => el !== '')
      .map((el, index) => {
        if (index == 0) {
          return el.concat(` &> ${terminalOutputFile}\n`)
        } else {
          return el.concat(` &>> ${terminalOutputFile}\n`)
        }
      })
      .join('')
      console.log(command)
      return command
  }

  // If data is provided, send it to the renderer.
  // If not, it sends the contents of the terminalOutputFile
  const sendStdout = (data: any = null): any => {
    if (data != null) {
      mainWindow.webContents.send('stdout', data)
      return null

    } else {
      writeFileSync(terminalOutputFile, '')
      let watcher = watch(terminalOutputFile, () => {
        readFile(terminalOutputFile, 'utf8', (err, data) => {

          if (err) {
            console.log(err)
            return
          }
          mainWindow.webContents.send('stdout', data)
        })
      })

      // When process completes, watcher is closed.
      // Delete the terminal output file.
      watcher.on('close', () => {
        // unlink(terminalOutputFile, (err) => {
        //   if (err) {
        //     console.error(err)
        //     return
        //   }
        // })
      })

      return watcher
    }
  }

  return { sendStdout, pipeStdout, terminalOutputFile }
}
