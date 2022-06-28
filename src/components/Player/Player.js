import React, { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { settings } from './Settings'
import './Player.css'

const Player = ({ title, URL, peaks }) => {

  const pause = require('./icons/pause.png')
  const play = require('./icons/play.png')
  const defIcon = play

  const backend = peaks ? 'MediaElement' : 'WebAudio'

  const waveform = useRef(null)
  const isLoaded = useRef(false)

  const playing = useRef(false)
  const icon = useRef({})
  const time = useRef()

  // Контейнер для аудиодорожки
  const container = useRef()

  useEffect(() => {

    // Если waveform уже была создана, сначала удаляем её, 
    // чтобы она не дублировалась
    if(waveform.current)
      waveform.current.destroy()

    // Конфигуратор wavesurfer для отрисовки аудиодорожки
    waveform.current = WaveSurfer.create(settings(container.current, backend))

    // Загрузка аудио.
    // Для мгновенной отрисовки в качестве 
    // второго параметра - полученные заранее пики.
    waveform.current.load(URL, peaks)

    // Событие по завершении загрузки waveform
    onWaveFormLoaded()

    // Событие по заваершении проигрывания
    onFinishEvent()

    // Событие обновления таймера
    onTimerUpdatedEvent()

  })

  function onWaveFormLoaded() {
    waveform.current.on('ready', () => {
      isLoaded.current = true
    })
  }
  
  function onFinishEvent() {
      waveform.current.on('finish', () => {
        playing.current = false
        icon.current.src = play
      })
  }

  function onTimerUpdatedEvent() {
    waveform.current.on('audioprocess', () => {

      const toHours = 3600
      const toMins = 60

      let seconds = waveform.current.getCurrentTime()
      seconds = Math.floor(seconds)
      let h = Math.floor(seconds / toHours)
      let m = Math.floor((seconds - (h * toHours)) / toMins)
      let s = seconds - (h * toHours) - (m * toMins)
  
      // Форматирование под hh:mm:ss
      h = (h < 10) ? '0' + h : h
      m = (m < 10) ? '0' + m : m
      s = (s < 10) ? '0' + s : s
  
      time.current.innerText = `${m}:${s}`
      
    })
  }
  
  // Обработчик кнопки Play/Pause
  function handlePlay() {

    playing.current = !playing.current
    playing.current ? icon.current.src = pause : icon.current.src = play

    if(isLoaded.current) {    
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
              <img className='audio-player__img' ref={icon} src={defIcon} alt='Play/Pause'></img>
            </button>
            <div className='audio-player__header-text'>{title}</div>
        </div>
        <div className="audio-player__body">
          <div className="WaveformContianer">
            <div className='wave' ref={container}/>
          </div>
        </div>
        <div className="audio-player__footer">
            <span className='audio-player__timer' ref={time}>00:00</span>
            <a className='audio-player__link' href={URL}>
              {`Download ${title}`}</a>
        </div>
    </div>
  )
}

export default Player