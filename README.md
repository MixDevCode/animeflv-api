AnimeFLV API [![Build Status](https://api.cirrus-ci.com/github/MixDevCode/animeflv-api-ts.svg)](https://cirrus-ci.com/github/MixDevCode/animeflv-api-ts)
============

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
## Funciones
#### searchAnime(params)
|Params|Type|
|-|-|
|`query`|string|

```js
const { searchAnime } = require('animeflv-api-ts');

searchAnime("Overlord").then((result) => {
  console.log(result);
});
```

###### Respuesta

```js
[
  {
    title: 'Overlord II',
    cover: 'https://animeflv.net/uploads/animes/covers/2856.jpg',
    synopsis: 'Segunda temporada de Overlord.',
    id: 'overlord-ii',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/overlord-ii'
  },
  {
    title: 'Overlord IV',
    cover: 'https://animeflv.net/uploads/animes/covers/3641.jpg',
    synopsis: 'Cuarta temporada de Overlord',
    id: 'overlord-iv',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/overlord-iv'
  },
  {
    title: 'Overlord',
    cover: 'https://animeflv.net/uploads/animes/covers/2105.jpg',
    synopsis: 'La historia da comienzo cuando Yggdrasil, un popular juego online, es cerrado un día sin previo aviso. Sin embargo, el protagonista, Momonga, decide no salir del juego. Momonga así se transforma y se convierte en “el mago más poderoso”. El mundo sigue cambiando con él dentro, y los NPCs comienzan a sentir emo...',
    id: 'overlord',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/overlord'
  },
  {
    title: 'Overlord Specials',
    cover: 'https://animeflv.net/uploads/animes/covers/2152.jpg',
    synopsis: 'Especiales',
    id: 'overlord-specials',
    type: 'OVA',
    url: 'https://www3.animeflv.net/anime/overlord-specials'
  },
  {
    title: 'Overlord III',
    cover: 'https://animeflv.net/uploads/animes/covers/2991.jpg',
    synopsis: 'Tercera temporada de Overlord.',
    id: 'overlord-iii',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/overlord-iii'
  }
]
```

#### getAnimeInfo(params)
|Params|Type|
|-|-|
|`animeId`|string|

> **Note** el animeId es obtenido a través de la función `searchAnime` o removiendo `https://www3.animeflv.net/anime/` de la URL de un anime.
```js
const { getAnimeInfo } = require('animeflv-api');

getAnimeInfo("one-piece-tv").then((result) => {
  console.log(result);
});
```

###### Respuesta

```js
{
  title: 'One Piece',
  alternative_titles: [ 'ワンピース' ],
  status: 'En emision',
  rating: '4.6',
  type: 'Anime',
  cover: 'https://animeflv.net/uploads/animes/covers/7.jpg',
  synopsis: 'Una historia épica de piratas, donde narra la historia de "Monkey D. Luffy" quien cuado tenia 7 años, comió accidentalmente una "Akuma no mi"(Futa del diablo) la cual le dio poderes de goma. Por otra parte "Gol D. Roger" conocido como "El rey de los Piratas" quien fuera ejecutado por la Marine, habló antes de morir, acerca de su famoso tesoro "One Piece" escondido en la "Gran line". Esta noticia desato la gran era de la piratas lanzando a incontables piratas a ese lugar, en busca de "One Piece" el tesoro perdido. Diez años después, Luffy inspirado en "Gol D. Roger" y un pirata de nombre Akagami no Shanks (Shanks el pelirrojo) se convierte en pirata deseando ser el próximo "Rey de los Piratas" y zarpar para conocer amigos y tener aventuras con ellos, teniendo como meta encontrar el "One Piece". ',
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
