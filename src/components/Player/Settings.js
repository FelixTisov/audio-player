export function settings (container, backend) {

    const preset = {
        barWidth: 1,
        barRadius: 3,
        barGap: 3,
        barMinHeight: 1,
        partialRender: true,
        pixelRatio: 1,
        container: container,
        backend: backend,
        scrollParent: false,
        height: 80,
        progressColor: '#c6a827',
        normalize: true,
        responsive: true,
        fillParent: true,
        hideScrollbar: true,
        waveColor: '#EFEFEF',
        cursorColor: 'transparent'
    }

    return(preset)
}

export default settings

// Подробнее о настройках: https://wavesurfer-js.org/docs/options.html