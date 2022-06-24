import extractPeaks from "webaudio-peaks"

const URL = "https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut_vocals_split_by_lalalai_phoenix.mp3"


// Генерация пиков из аудиофайла
async function getPeaksArray() {
    const response = await fetch(URL);
    const arrayBuffer = await response.arrayBuffer();
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.decodeAudioData(arrayBuffer, function (decodedData) {

      let peaks = extractPeaks(decodedData, 10000, true);

      let array = []
      for(let i = 0; i < peaks.data[0].length-1 ; i++)
        array.push(peaks.data[0][i])

      console.log('Peaks: '+ array)

      return array
    })
}

export default getPeaksArray