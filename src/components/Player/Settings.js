export function settings (id, backend) {

    const preset = {
        barWidth: 1,
        barRadius: 3,
        barGap: 3,
        barMinHeight: 1,
        partialRender: true,
        pixelRatio: 1,
        container: document.getElementById(id),
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