import "./Player.css";
import {Howl} from 'howler';
import Waveform from "./Waveform";

const Player = () => {
  
  let URL = "https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3"
  let isPlaying = false
  
  // Howler
  const sound = new Howl({
    src: [URL],
    html5: true
  });

  function playHandler() {
    isPlaying = !isPlaying
    isPlaying ? sound.play() : sound.pause()
  }

  return (
      <div className="audio-player__wrapper">
        <div className="audio-player__header">
          <button onClick={() => playHandler()} className="audio-player__button">
            
          </button>
          <span className="audio-player__header-text">Sample</span>
        </div>
        <div className="audio-player__body">
          {/* <div className="audio-player__sample" /> */}
          {/* <Waveform /> */}
        </div>
        <div className="audio-player__footer">
          <div className="audio-player__timer">00:00</div>
          <a className="audio-player__link" href="/">
            Download Sample
          </a>
        </div>
      </div>
  );
};

export default Player;
