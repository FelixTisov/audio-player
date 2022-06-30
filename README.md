# Player.js
Компонент аудиоплеера. Для построения аудиодорожки используется WaveSurfer. В качестве пропсов принимает три параметра:

### `title`

Название трека.

### `URL`

Ссылка на аудиофайл.

### `peaks`

Массив с сгенерированными заранее пиками аудиофайла.
Если пиков нет, они генерируются с помощью Web Audio API.


# PeaksGenerator.js
Извлечение пиков из аудиофайла. В качестве пропсов принимает один параметр:

### `URL`

Ссылка на аудиофайл.


Возвращвает массив сгенерированных пиков.