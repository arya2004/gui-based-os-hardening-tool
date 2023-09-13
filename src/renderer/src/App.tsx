import { useState } from "react"
import Conditional from "@components/Conditional"
import Button from "@components/Button"

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
        <Button slot="if" condition={!isScriptRunning} onClick={executeScript} icon="coffee" text="Run Script" />
        
        <p slot="else" className="text-lg text-center">Please wait, script is running...</p>
      </Conditional>
    </div>
  )
}

export default App
