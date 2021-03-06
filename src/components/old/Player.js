import React from 'react'
import WaveSurfer from 'wavesurfer.js'
import './Player.css'

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    
    this.id = String(props.id)
    this.title = String(props.title)
    this.URL = String(props.URL)
    this.peaks = props.peaks

    this.pause = require('./icons/pause.png')
    this.play = require('./icons/play.png')

    // Если пики не предоставлены, генерируем их с помощью Web Audio API
    this.backend = this.peaks ? 'MediaElement' : 'WebAudio'

    this.state = {
      playing: false,
      icon: this.play,
      time: '00:00'
    }
  }
    
  async componentDidMount() {
      
    this.waveform = WaveSurfer.create({
      barWidth: 1,
      barRadius: 3,
      barGap: 3,
      barMinHeight: 1,
      partialRender: true,
      pixelRatio: 1,
      container: document.getElementById(this.id),
      backend: this.backend,
      scrollParent: false,
      height: 80,
      progressColor: '#c6a827',
      normalize: true,
      responsive: true,
      fillParent: true,
      hideScrollbar: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    })
   
    // Загрузка аудио.
    // Для мгновенной отрисовки в качестве 
    // второго параметра - полученные заранее пики.
    this.waveform.load(this.URL, this.peaks)
    // Событие по заваершению проигрывания
    this.onFinishEvent()
    // Событие обновления таймера
    this.waveform.on('audioprocess', this.updateTimer.bind(this))

  }

  updateTimer() {
    let seconds = this.waveform.getCurrentTime()
    seconds = Math.floor(seconds)
    let h = Math.floor(seconds / 3600)
    let m = Math.floor((seconds - (h * 3600)) / 60)
    let s = seconds - (h * 3600) - (m * 60)

    // Форматирование под hh:mm:ss
    h = (h < 10) ? '0' + h : h
    m = (m < 10) ? '0' + m : m
    s = (s < 10) ? '0' + s : s

    this.setState({time: `${m}:${s}`})
  }

  onFinishEvent() {
    this.waveform.on('finish', () => {
      this.setState({playing: false})
      this.setState({icon: this.play})
    })
  }

  // Обработчик кнопки Play/Pause
  handlePlay = () => {
    this.setState({playing: !this.state.playing})
    this.state.playing ? this.setState({icon: this.play}) : this.setState({icon: this.pause})
    this.waveform.playPause()
  }

  render() {
    return (
      <div className="audio-player__wrapper">
          <div className="audio-player__header">
              <button onClick={this.handlePlay} className='audio-player__button'>
                <img className='audio-player__img' src={this.state.icon} alt='Play/Pause'></img>
              </button>
              <span className='audio-player__header-text'>{this.title}</span>
          </div>
          <div className="audio-player__body">
            <div className="WaveformContianer">
              <div className='wave' id={this.id} />
            </div>
          </div>
          <div className="audio-player__footer">
              <div className='audio-player__timer'>{this.state.time}</div>
              <a className='audio-player__link' href={this.URL}>
                {`Download ${this.title}`}</a>
          </div>
      </div>
    )
  }

}