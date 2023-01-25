AnimeFLV SCRAPPER ![Licence](https://img.shields.io/npm/l/animeflv-api) ![Version](https://img.shields.io/npm/v/animeflv-api) ![Known Vulnerabilities](https://snyk.io/test/github/mixdevcode/animeflv-api/badge.svg) ![Node Minimum Version](https://img.shields.io/badge/node-%3E%3D16.0.0-informational)
============
[![NPM](https://nodei.co/npm/animeflv-api.png)](https://nodei.co/npm/animeflv-api/)

Librería Node.js para obtener información del sitio `https://www3.animeflv.net/` utilizando el método de Web-Scraping.

Instalación
============
```sh
npm install animeflv-api
```

Uso
============
Una vez el paquete está instalado, puedes importar la librería utilizando "require":

```js
const animeflv = require('animeflv-api');
```

o utilizando "import":

```js
import * as animeflv from 'animeflv-api';
```

## Funciones

> **Note** Si quieres saber más acerca de los tipos, constantes y funciones puedes visitar la [Wiki](https://github.com/MixDevCode/animeflv-api/wiki), aquí solo se listarán ejemplos de uso.

### searchAnime(params) 
|Params|Type|Required|
|-|-|:-:|
|`query`|string|✅|

```js
import { searchAnime } from 'animeflv-api';

searchAnime("Overlord").then((result) => {
  console.log(result);
});
```

###### Respuesta

Un objeto de tipo Promise<[SearchAnimeResults](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#searchanimeresults) | `null`> que contiene todos los animes encontrados utilizando el `query` especificado.

```js
{
  previousPage: null,
  nextPage: null,
  foundPages: 1,
  data: [
    {
      title: 'Overlord II',
      cover: 'https://animeflv.net/uploads/animes/covers/2856.jpg',
      synopsis: 'Segunda temporada de Overlord.',
      rating: '4.7',
      id: 'overlord-ii',
      type: 'Anime',
      url: 'https://www3.animeflv.net/anime/overlord-ii'
    }
    ...
  ]
}
```

### getAnimeInfo(params)

|Params|Type|Required|
|-|-|:-:|
|`animeId`|string|✅|

> **Note** el animeId es obtenido a través de la función `searchAnime` o removiendo `https://www3.animeflv.net/anime/` de la URL de un anime.
```js
import { getAnimeInfo } from 'animeflv-api';

getAnimeInfo("one-piece-tv").then((result) => {
  console.log(result);
});
```

###### Respuesta

Un objeto de tipo Promise<[AnimeData](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#animedata) | `null`> que contiene la información del anime solicitado con el `animeId` especificado.

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

### getLatest()

```js
import { getLatest } from 'animeflv-api';

getLatest().then((result) => {
  console.log(result);
});
```

###### Respuesta

Un arreglo de tipo Promise<[ChapterData[ ]](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#chapterdata)> que contiene los últimos capítulos subidos al sitio web.

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

### getOnAir()

```js
import { getOnAir } from 'animeflv-api';

getOnAir().then((result) => {
  console.log(result);
});
```

###### Respuesta

Un arreglo de tipo Promise<[AnimeOnAirData[ ]](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#animeonairdata)> con todos los animes en emisión del sitio.

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

### searchAnimesByFilter(params)

|Params|Type|Required|
|-|-|:-:|
|`opts`|[FilterOptions](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#filteroptions)|❌|

> **Note** Vease el ejemplo para entender el parámetro requerido por la función.

```js
import { searchAnimesByFilter } from 'animeflv-api';

searchAnimesByFilter({
    types: ["Anime"],
    genres: ["Acción", "Magia"],
    statuses: ["Finalizado"]
}).then((result) => {
    console.log(result);
})
```

###### Respuesta

Un objeto Promise<[FilterAnimeResults](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#filteranimeresults) | `null`> con los resultados encontrados de los filtros definidos.

```js
{
  previousPage: null,
  nextPage: 'https://www3.animeflv.net/browse?genre%5B%5D=accion&genre%5B%5D=magia&status%5B%5D=2&type%5B%5D=tv&order=default&page=2',
  foundPages: 44,
  data: [
    {
      title: 'Arknights: Reimei Zensou',
      cover: 'https://animeflv.net/uploads/animes/covers/3712.jpg',
      synopsis: 'En la tierra de Terra, los desastres inexplicables están ocurriendo irregularmente en varios lugares. La mayoría de las personas allí viven en ciudades móviles que se han desarrollado durante un largo período de tiempo para escapar de los desastres.\n' +
        'Las piedras preciosas con una enorme energía que quedaron en la tierra después del desastr...',
      rating: '4.5',
      id: 'arknights-reimei-zensou',
      type: 'Anime',
      url: 'https://www3.animeflv.net/anime/arknights-reimei-zensou'
    }
    ...
  ]
}
```

### searchAnimesBySpecificURL(params) 

|Params|Type|Required|
|-|-|:-:|
|`url`|string|✅|

```js
import { searchAnimesBySpecificURL } from 'animeflv-api';

searchAnimesBySpecificURL("https://www3.animeflv.net/browse?q=dragon+ball&page=2").then((result) => {
    console.log(result);
})
```

###### Respuesta

Un objeto Promise<[SearchAnimeResults](https://github.com/MixDevCode/animeflv-api/wiki/Datatypes#searchanimeresults) | `null`> con los resultados encontrados de la `url` especificada.

```js
{
  previousPage: 'https://www3.animeflv.net/browse?q=dragon+ball&page=1',
  nextPage: null,
  foundPages: 2,
  data: [
    {
      title: 'Dragon Ball Z Pelicula 10: El regreso del Guerrero Legendario',
      cover: 'https://animeflv.net/uploads/animes/covers/1111.jpg',
      synopsis: 'Goten, Trunks y Videl se aventuran a ir en busca de las Esferas del Dragon...',
      rating: '4.2',
      id: 'dragon-ball-z-pelicula-10',
      type: 'Película',
      url: 'https://www3.animeflv.net/anime/dragon-ball-z-pelicula-10'
    }
    ...
  ]
}
```

Disclaimer
============
El uso de animeflv-api es exclusivamente para fines educativos y de investigación. No nos hacemos responsables del uso indebido o ilegal de la misma, incluyendo pero no limitando a la recolección de datos sin el consentimiento del propietario del sitio web, violación de los términos de uso del sitio, o cualquier otra actividad ilegal. Es responsabilidad del usuario final cumplir con todas las leyes y regulaciones aplicables en su jurisdicción antes de utilizar la librería.

Además, al utilizar esta librería, el usuario acepta que es consciente de las posibles consecuencias legales o técnicas que puedan surgir de su uso. Estas consecuencias incluyen, pero no se limitan a, el bloqueo de su dirección IP por parte del sitio web, la violación de los términos de uso del sitio, y cualquier otra acción tomada por el propietario del sitio web para proteger su contenido.

Si eres el propietario del sitio web y deseas que cesemos el desarrollo de animeflv-api, te invitamos a contactarnos a través de <a href="mailto:soporte@mixdev.online?Subject=Propiedad%20de%20AnimeFLV">soporte@mixdev.online</a>. Haremos todo lo posible para cumplir con tu solicitud de manera rápida y eficiente.

En resumen, el uso de animeflv-api es bajo su propio riesgo.

## TODO
 - [x] Convertir el módulo a TS
 - [x] Agregar una función para obtener los últimos capítulos subidos
 - [x] Agregar una función para obtener los animes en emisión
 - [x] Agregar una función para obtener los próximos animes
 - [x] Modificar las funciones en caso de existir una paginación en el sitio web.

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
      <a href="https://github.com/MixDevCode">MixDevCode</a>
    </td>
  </tr>
</table>
