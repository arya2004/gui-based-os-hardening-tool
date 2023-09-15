import { App, BrowserWindow } from 'electron'
import { writeFileSync, readFile, unlink, watch } from 'fs'

export const getUtils = (app: App, mainWindow: BrowserWindow) => {
  const terminalOutputFile = `${app.getPath('logs')}/terminalOutput.txt`

  // Converts a string of commands so that
  // output of every command is piped to the output file.
  const pipeStdout = (command: string): string => {
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
  }

  // If data is provided, send it to the renderer.
  // If not, it sends the contents of the terminalOutputFile
  const sendStdout = (data: any = null): any => {
    if (data != null) {
      mainWindow.webContents.send('stdout', data)
      return null
    } else {
      let outputFile = `${app.getPath('logs')}/terminalOutput.txt`
      writeFileSync(outputFile, '')
      let watcher = watch(outputFile, () => {
        readFile(outputFile, 'utf8', (err, data) => {
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
        unlink(outputFile, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
      })

      return watcher
    }
  }

  return { sendStdout, pipeStdout, terminalOutputFile }
}