import useTerminal from '@renderer/store/logs'
import { useEffect, useRef } from 'react'

export default function Audit(): JSX.Element {
  let term = useTerminal()
  let terminalContainer = useRef(null)

  useEffect(() => {
    term.createTerminal()
    if (terminalContainer.current) term.setupTerminal(terminalContainer.current)
    return () => term.disposeTerminal()
  }, [])

  return (
    <div className="audit">
      {/* <div ref={terminalContainer} className="terminalContainer"></div> */}
      <center>this is odit pgea</center>
    </div>
  )
}
