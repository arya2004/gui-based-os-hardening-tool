import useTerminal from '@renderer/store/logs'
import { useEffect, useRef } from 'react'
import Button from '@renderer/components/Button'

export default function Audit(): JSX.Element {
  let term = useTerminal()
  let terminalContainer = useRef(null)

  useEffect(() => {
    term.createTerminal()
    if (terminalContainer.current) term.setupTerminal(terminalContainer.current)
    return () => term.disposeTerminal()
  }, [])

  return (
    <div className="audit p-2">
      <div className="flex items-center justify-start">
        <Button
          className="mr-2"
          onClick={() => window.electron.ipcRenderer.send('runScript', { name: 'install' })}
        >
          <span slot="text">Install Lynis</span>
        </Button>
        <Button
          className="mr-2"
          onClick={() => window.electron.ipcRenderer.send('runScript', { name: 'audit' })}
        >
          <span slot="text">Run System Audit</span>
        </Button>
        <Button
          className="mr-2"
          onClick={() => window.electron.ipcRenderer.send('runScript', { name: 'uninstall' })}
        >
          <span slot="text">Uninstall Lynis</span>
        </Button>
      </div>
      <div ref={terminalContainer} className="terminalContainer w-[90%] mt-4"></div>
    </div>
  )
}
