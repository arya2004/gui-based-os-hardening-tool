import useTerminal from '@renderer/store/logs'
import { useEffect, useRef } from 'react'

export default function Firewall(): JSX.Element {
  let term = useTerminal()
  let terminalContainer = useRef(null)
  useEffect(() => {
    term.createTerminal()
    if (terminalContainer.current) term.setupTerminal(terminalContainer.current)
    return () => term.disposeTerminal()
  }, [])

  return (
    <div className="firewall">
      <center>this is fireall pahge</center>
      <div ref={terminalContainer} className="terminalContainer"></div>
    </div>
  )
}
