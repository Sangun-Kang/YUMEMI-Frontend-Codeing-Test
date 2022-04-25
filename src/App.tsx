import Hoge from './components/hoge'
import Card from './components/card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hoge name="love" />
      </header>
      <Card title="hoge" paragraph="moge" />
    </div>
  )
}

export default App
