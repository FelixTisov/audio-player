import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { settings } from './Settings'
import './Player.css'

const Player = ({ title, URL, peaks }) => {

  const pause = require('./icons/pause.png')
  const play = require('./icons/play.png')

  const backend = peaks ? 'MediaElement' : 'WebAudio'

  const waveform = useRef(null)
  const [isLoaded, setLoaded] = useState(false)

  const [playing, setPlaying] = useState(false)
  const [icon, setIcon] = useState(play)
  const [timer, setTimer] = useState('00:00')
  

  // Контейнер для аудиодорожки
  const container = useRef()

  useEffect(() => {    

    if(!waveform.current) {

      // Конфигуратор wavesurfer для отрисовки аудиодорожки
      waveform.current = WaveSurfer.create(settings(container.current, backend))

      // Загрузка аудио.
      // Для мгновенной отрисовки в качестве 
      // второго параметра - полученные заранее пики.
      waveform.current.load(URL, peaks)

    }  

    // Событие по завершении загрузки waveform
    onWaveFormLoaded()

    // Событие по заваершении проигрывания
    onFinishEvent()

    // Событие обновления таймера
    onTimerUpdatedEvent()

  })

  function onWaveFormLoaded() {
    waveform.current.on('ready', () => {
      setLoaded(true)
    })
  }
  
  function onFinishEvent() {
      waveform.current.on('finish', () => {
        setPlaying(false)
        setIcon(play)
      })
  }

  function onTimerUpdatedEvent() {
    waveform.current.on('audioprocess', () => {

      let seconds = waveform.current.getCurrentTime()
      seconds = Math.floor(seconds)
      let h = Math.floor(seconds / 3600)
      let m = Math.floor((seconds - (h * 3600)) / 60)
      let s = seconds - (h * 3600) - (m * 60)
  
      // Форматирование под hh:mm:ss
      h = (h < 10) ? '0' + h : h
      m = (m < 10) ? '0' + m : m
      s = (s < 10) ? '0' + s : s

      setTimer(`${m}:${s}`)
      
    })
  }
  
  // Обработчик кнопки Play/Pause
  function handlePlay() {

    setPlaying(!playing)
    playing ? setIcon(play) : setIcon(pause)

    if(isLoaded) {    
      waveform.current.playPause()
    } 
    else {
      // Ждём, когда загрузится аудиодорожка 
      // и начинаем воспроизведение
      waveform.current.on('ready', () => {
        waveform.current.playPause()
      })
    }  

  }

  return(
      <div className="audio-player__wrapper">
        <div className="audio-player__header">
            <button onClick={handlePlay} className='audio-player__button'>
              <img className='audio-player__img' src={icon} alt='Play/Pause'></img>
            </button>
            <div className='audio-player__header-text'>{title}</div>
        </div>
        <div className="audio-player__body">
          <div className="WaveformContianer">
            <div className='wave' ref={container}/>
          </div>
        </div>
        <div className="audio-player__footer">
            <span className='audio-player__timer'>{timer}</span>
            <a className='audio-player__link' href={URL}>
              {`Download ${title}`}</a>
        </div>
    </div>
  )
}

export default Player