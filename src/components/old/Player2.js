import React from 'react';
import WaveSurfer from "wavesurfer.js";
import './Player.css'
import "./Waveform.css";

const Player = () => {

    const pause = require("../icons/pause.png")
    const play = require("../icons/play.png")
    let playing = false
    let icon = play
    let time = '00:00'

    const URL = "https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3"

    let waveform = WaveSurfer.create({
        barWidth: 1,
        barRadius: 1,
        barGap: 2,
        barMinHeight: 1,
        partialRender: true,
        pixelRatio: 1,
        container: document.getElementById( "#waveform"),
        backend: "WebAudio",
        scrollParent: false,
        height: 80,
        progressColor: "#c6a827",
        normalize: true,
        responsive: true,
        fillParent: true,
        hideScrollbar: true,
        waveColor: "#EFEFEF",
        cursorColor: "transparent"
    });

    waveform.load(URL);

    waveform.on('ready', updateTimer)
    waveform.on('audioprocess', updateTimer)
    waveform.on('seek', updateTimer)

    function updateTimer() {
        var formattedTime = secondsToTimestamp(waveform.getCurrentTime());
        console.log(formattedTime);
    }
      
    function secondsToTimestamp(seconds) {
        seconds = Math.floor(seconds);
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds - (h * 3600)) / 60);
        var s = seconds - (h * 3600) - (m * 60);
        
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return h + ':' + m + ':' + s;
    }


  const handlePlay = () => {
    if(playing) {
      this.setState({ icon: this.play })
    } else {
      this.setState({ icon: this.pause })
    }
    waveform.playPause();
  };


    return (
      <div className="audio-player__wrapper">
          <div className="audio-player__header">
              <button onClick={handlePlay} className='audio-player__button'>
                <img className='audio-player__img' src={this.state.icon} alt='Play/Pause'></img>
              </button>
              <span className='audio-player__header-text'>Sample</span>
          </div>
          <div className="audio-player__body">
            <div className="WaveformContianer">
              <div id="waveform" />
            </div>
          </div>
          <div className="audio-player__footer">
              <div className='audio-player__timer'>{this.state.time}</div>
              <a className='audio-player__link' href='/'>Download Sample</a>
          </div>
      </div>
    )
}

export default Player