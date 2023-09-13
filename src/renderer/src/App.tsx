import { useState } from "react"
import Conditional from "@components/Conditional"

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)

  const executeScript = () => {
    window.ipcRenderer.send('runScript')
    setIsScriptRunning(true)
    setTimeout(() => {
      setIsScriptRunning(false)
    }, 3000)
  }

  return (
    
    <div className="container">
      <Conditional>
        {/* If script is not running, render the button. Else, render the p tag */ }
        <button slot="if" data-condition={!isScriptRunning} onClick={executeScript}>Run Script</button>
        <p slot="else">Please wait, script is running...</p>
      </Conditional>
    </div>
  )
}

export default App
