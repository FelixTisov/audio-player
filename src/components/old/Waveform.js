import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

import "./Waveform.css";

class Waveform extends Component {

    componentDidMount() {
    const track = "https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3"

    this.waveform = WaveSurfer.create({
        barWidth: 1,
        barRadius: 1,
        barGap: 2,
        barMinHeight: 1,
        minPxPerSec: 1,
        partialRender: true,
        pixelRatio: 1,
        container: "#waveform",
        scrollParent: false,
        height: 80,
        progressColor: "#2D5BFF",
        responsive: true,
        hideScrollbar: true,
        waveColor: "#EFEFEF",
    });

    this.waveform.load(track);
  }

  render() {
    
    return (
        <div className="WaveformContianer">
            <div id="waveform" />
        </div>
    );
  }
}

export default Waveform;