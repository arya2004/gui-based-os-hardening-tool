import Button from "@renderer/components/Button"

const executeScript = () => {
  window.ipcRenderer.send('runScript')
  console.log('Running Script')
}

function App(): JSX.Element {
  return (
    <div className="container">
      <Button onClick={() => console.log('hi mom')} text="hi bitch" />
    </div>
  )
}

export default App
