import { create } from 'zustand'
import { Terminal } from 'xterm'

type TerminalType = {
  terminal: Terminal | null
  createTerminal: () => void
  setupTerminal: (element: HTMLElement) => void
  clearTerminal: () => void
  disposeTerminal: () => void
}

// Save cursor position (0, 0) on terminal

const useTerminal = create<TerminalType>()((set) => ({
  terminal: null,
  createTerminal: () => {
    set((state) => {
      return {
        terminal: new Terminal()
      }
    })
  },
  setupTerminal: (element: HTMLElement) => {
    set((state) => {
      window.electron.ipcRenderer.on('stdout', (event, data) => {
        
        let lines = data.split('\n')
        console.log(lines)
        state.terminal?.clear()
        for (let line of lines)state.terminal?.writeln(line)
        
      })
      state.terminal?.open(element)
      return {}
    })
  },
  clearTerminal: () => {
    set((state) => {
      state.terminal?.write('\x1b[2J')
      state.terminal?.write('\x1b[u')
      return {}
    })
  },
  disposeTerminal: () => {
    set((state) => {
      state.terminal?.dispose()
      window.electron.ipcRenderer.removeAllListeners('stdout')
      return { terminal: null }
    })
  }
}))

export default useTerminal
