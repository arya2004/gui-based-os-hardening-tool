const executeScript = () => {
  window.ipcRenderer.send('runScript')
  console.log('Running Script')
}

function App(): JSX.Element {
  return (
    <div className="container">
      <button style={{ background: 'red' }} onClick={executeScript}>Click me bitch</button>
    </div>
  )
}

export default App
