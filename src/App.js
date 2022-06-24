import './App.css'
import Player from './components/Player/Player.js'
import songs from './Songs' // Объекты с URL аудио и сгенерированными пиками

function App() {

  return (
    <div className="App">

        <div className="container">
          <div className='wrapper'>
            <Player id="first" title="Sample" URL={songs[0].URL} peaks={songs[0].peaks}/>
          </div>
          <div className='wrapper'></div>
        </div>

        <div className="container">
          <div className='wrapper'>
            <Player id="second" title="Instrumental" URL={songs[1].URL} peaks={songs[1].peaks}/>
          </div>
          <div className='wrapper'>
            <Player id="third" title="Vocal" URL={songs[2].URL} peaks={songs[2].peaks}/>
          </div>
        </div>

    </div>
  )
}

export default App
