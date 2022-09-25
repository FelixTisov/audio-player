# Player.js
An audio player component. WaveSurfer.js is used to visualize the audio track in Canvas. The component takes 3 parameters as props: 

### `title`

The title of a track.

### `URL`

The audio file link.

### `peaks`

An array with pre-generated peaks of an audio file.
If there are no peaks, they are generated via Web Audio API.


# PeaksGenerator.js
Extracts peaks from an audio file. It takes 1 parameter:

### `URL`

The audio file link.

It returns an array of generated peaks.

# Start Locally
1. Install all the dependencies. Use: `npm install`
2. Use `npm start` to start locally at localhost
