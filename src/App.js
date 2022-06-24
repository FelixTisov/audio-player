import './App.css'
import Player from './components/Player/Player.js'

function App() {
  return (
    <div className="App">

      <div className='header'>
        <div className='high'>
          <h1 style={{marginTop: '15%'}}>Audio Player</h1>
          <img style={{marginTop: '10%'}} src={require('../src/down-arrow.png')} alt='Down'></img>
        </div>
      </div>

      <div className='header'>
        <div className="container" id='cont1'>
          <div className='wrapper'>
            <Player id="first" title="Sample" URL={"https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3"}/>
          </div>
          <div className='wrapper'></div>
        </div>
        <div className="container" id='cont2'>
          <div className='wrapper'>
            <Player id="second" title="Instrumental" URL={"https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut_no_vocals_split_by_lalalai_phoenix.mp3"}/>
          </div>
          <div className='wrapper'>
            <Player id="third" title="Vocal" URL={"https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut_vocals_split_by_lalalai_phoenix.mp3"}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default App
