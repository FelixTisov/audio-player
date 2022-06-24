  // Получить массив пиков
  async function getPeaksArray() {
    const ctx = new AudioContext();
    const response = await fetch("https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const dataBuffer = await ctx.decodeAudioData(arrayBuffer);
    let audioBuffer = dataBuffer;
    let source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    var analyser = ctx.createAnalyser();
    source.connect(analyser);
    source.connect(ctx.destination);
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(this.dataArray);
  }

  // Воспроизведение через Web Audio API
  async function init() {
    this.ctx = new AudioContext()
    this.audioBuffer = await this.getFile()
  }

  async function getFile() {
    console.log(this.URL)
    const response = await fetch(this.URL)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer)
    console.log(audioBuffer)
    return audioBuffer
  }

  function play() {
    let source = this.ctx.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.ctx.destination);
    source.start();
  }

  async function fetchAndPlay() {
    let context = new AudioContext();
    context.decodeAudioData(
        await fetch('https://upload.wikimedia.org/wikipedia/commons/2/28/Karplus-strong-A2.ogg')
        .then(r => r.arrayBuffer()),
    decoded => {
      var source = context.createBufferSource();
      source.buffer = decoded;
      source.connect(context.destination);
      source.start(0);
    });
  }
  