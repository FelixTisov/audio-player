import extractPeaks from "webaudio-peaks"

const defaultURL = "https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut_vocals_split_by_lalalai_phoenix.mp3"

// Генерация пиков из аудиофайла
export async function getPeaksArray({ URL = defaultURL }) {

    const response = await fetch(URL);
    const arrayBuffer = await response.arrayBuffer();

    const audioCtx = new AudioContext();

    audioCtx.decodeAudioData(arrayBuffer, function (decodedData) {

      // Количество сэмплов для расчёта одного пика.
      // 10000 сэмплов = 700 пиков
      const samplesPerPixel = 10000 
      // Объединение всех каналов
      const isMono = true
      let peaks = extractPeaks(decodedData, samplesPerPixel, isMono);

      let decodedPeaks = []
      for(let i = 0; i < peaks.data[0].length-1 ; i++)
        decodedPeaks.push(peaks.data[0][i])

      return decodedPeaks
    })

}

export default getPeaksArray

// Подробнее: https://github.com/naomiaro/webaudio-peaks