AnimeFLV SCRAPPER ![Licence](https://img.shields.io/npm/l/animeflv-api-ts) ![Version](https://img.shields.io/npm/v/animeflv-api-ts) ![Known Vulnerabilities](https://snyk.io/test/github/mixdevcode/animeflv-api-ts/badge.svg)
============
[![NPM](https://nodei.co/npm/animeflv-api-ts.png)](https://nodei.co/npm/animeflv-api-ts/)

Librería Node.js para obtener información del sitio `https://www3.animeflv.net/` utilizando el método de Web-Scraping.

Instalación
============
```sh
npm install animeflv-api-ts
```

Uso
============
Una vez el paquete está instalado, puedes importar la librería utilizando "require":

```js
const animeflv = require('animeflv-api-ts');
```

o utilizando "import":

```js
import * as animeflv from 'animeflv-api-ts';
```

## Funciones
#### searchAnime(params)
|Params|Type|
|-|-|
|`query`|string|

```js
import { searchAnime } from 'animeflv-api-ts';

searchAnime("Overlord").then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON que contiene todos los animes encontrados utilizando el `query` especificado.

```js
[
  {
    title: 'Overlord II',
    cover: 'https://animeflv.net/uploads/animes/covers/2856.jpg',
    synopsis: 'Segunda temporada de Overlord.',
    id: 'overlord-ii',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/overlord-ii'
  }
  ...
]
```

#### getAnimeInfo(params)

|Params|Type|
|-|-|
|`animeId`|string|

> **Note** el animeId es obtenido a través de la función `searchAnime` o removiendo `https://www3.animeflv.net/anime/` de la URL de un anime.
```js
import { getAnimeInfo } from 'animeflv-api-ts';

getAnimeInfo("one-piece-tv").then((result) => {
  console.log(result);
});
```

###### Respuesta

Un objeto JSON que contiene la información del anime solicitado con el `animeId` especificado.

```js
{
  title: 'One Piece',
  alternative_titles: [ 'ワンピース' ],
  status: 'En emision',
  rating: '4.6',
  type: 'Anime',
  cover: 'https://animeflv.net/uploads/animes/covers/7.jpg',
  synopsis: 'Una historia épica de piratas, donde narra...',
  genres: [
    'Acción',
    'Aventuras',
    'Comedia',
    'Drama',
    'Fantasía',
    'Shounen',
    'Superpoderes'
  ],
  episodes: 1047,
  url: 'https://www3.animeflv.net/anime/one-piece-tv'
}
```

#### getLatest()

```js
import { getLatest } from 'animeflv-api-ts';

getLatest().then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON que contiene los últimos capítulos subidos al sitio web.

```js
[
  {
    title: 'Majutsushi Orphen Hagure Tabi: Urbanrama-hen',
    chapter: 1,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3763.jpg',
    url: 'https://www3.animeflv.net/ver/majutsushi-orphen-hagure-tabi-urbanramahen-1'
  }
  ...
]
```

#### getOnAir()

```js
import { getOnAir } from 'animeflv-api-ts';

getOnAir().then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON con todos los animes en emisión del sitio.

```js
[
  {
    title: 'One Piece Anime',
    type: 'Anime',
    id: 'one-piece-tv',
    url: 'https://www3.animeflv.net/anime/one-piece-tv'
  }
  ...
]
```

#### getComing()

```js
import { getComing } from 'animeflv-api-ts';

getComing().then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON con animes próximos a estrenarse.

```js
[
  {
    title: 'Golden Kamuy 4th Season',
    cover: 'https://animeflv.net/uploads/animes/covers/3686.jpg',
    synopsis: 'Cuarta temporada de Golden Kamuy ',
    rating: '4.8',
    id: 'golden-kamuy-4th-season',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/golden-kamuy-4th-season'
  }
  ...
]
```

## TODO
 - [x] Convertir el módulo a TS
 - [x] Agregar una función para obtener los últimos capítulos subidos
 - [x] Agregar una función para obtener los animes en emisión
 - [x] Agregar una función para obtener los próximos animes
 - [ ] Modificar las funciones en caso de existir una paginación en el sitio web.

## Contribuyentes

<table>
  <tr>
    <td>
      <img alt="Shompi" src="https://avatars.githubusercontent.com/u/10200647?v=4&s=117" width="117">
    </td>
    <td>
      <img alt="MixDevCode" src="https://avatars.githubusercontent.com/u/66272629?v=4&s=117" width="117">
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/Shompi">Shompi</a>
    </td>
    <td>
      <center><a href="https://github.com/MixDevCode">MixDevCode</a></center>
    </td>
  </tr>
</table>
