import useTerminal from '@renderer/store/logs'
import { useEffect, useRef } from 'react'
import Button from '@renderer/components/Button'

export default function Home(): JSX.Element {
  let term = useTerminal()
  let terminalContainer = useRef(null)

  useEffect(() => {
    term.createTerminal()
    if (terminalContainer.current) term.setupTerminal(terminalContainer.current)
    return () => term.disposeTerminal()
  }, [])

  return (
    <div className="audit">
      <div className="flex mt-2">
        <Button onClick={() => window.electron.ipcRenderer.send('runScript', { name: 'quick' })}>
          <span slot="text">Quick Harden</span>
        </Button>
      </div>
      <div ref={terminalContainer} className="terminalContainer w-[90%] mt-4"></div>
    </div>
  )
}
