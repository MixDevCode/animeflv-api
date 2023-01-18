AnimeFLV API ![Licence](https://img.shields.io/npm/l/animeflv-api-ts) ![Version](https://img.shields.io/npm/v/animeflv-api-ts)
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
const { getAnimeInfo } = require('animeflv-api-ts');

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

#### getLatest()

```js
const { getLatest } = require('animeflv-api-ts');

getLatest().then((result) => {
  console.log(result);
});
```

###### Respuesta

```js
[
  {
    title: 'Majutsushi Orphen Hagure Tabi: Urbanrama-hen',
    chapter: 1,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3763.jpg',
    url: 'https://www3.animeflv.net/ver/majutsushi-orphen-hagure-tabi-urbanramahen-1'
  },
  {
    title: 'Tensei Oujo to Tensai Reijou no Mahou Kakumei',
    chapter: 3,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3717.jpg',
    url: 'https://www3.animeflv.net/ver/tensei-oujo-to-tensai-reijou-no-mahou-kakumei-3'
  },
  {
    title: 'Bungou Stray Dogs 4th Season',
    chapter: 3,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3718.jpg',
    url: 'https://www3.animeflv.net/ver/bungou-stray-dogs-4th-season-3'
  },
  {
    title: 'Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu. 2',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3759.jpg',
    url: 'https://www3.animeflv.net/ver/itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2-2'
  },
  {
    title: 'Tondemo Skill de Isekai Hourou Meshi',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3757.jpg',
    url: 'https://www3.animeflv.net/ver/tondemo-skill-de-isekai-hourou-meshi-2'
  },
  {
    title: 'Kubo-san wa Mob wo Yurusanai',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3758.jpg',
    url: 'https://www3.animeflv.net/ver/kubosan-wa-mob-wo-yurusanai-2'
  },
  {
    title: 'Ningen Fushin no Boukensha-tachi ga Sekai wo Sukuu you desu',
    chapter: 3,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3715.jpg',
    url: 'https://www3.animeflv.net/ver/ningen-fushin-no-boukenshatachi-ga-sekai-wo-sukuu-you-desu-3'
  },
  {
    title: 'Koori Zokusei Danshi to Cool na Douryou Joshi',
    chapter: 3,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3719.jpg',
    url: 'https://www3.animeflv.net/ver/koori-zokusei-danshi-to-cool-na-douryou-joshi-3'
  },
  {
    title: 'Eiyuuou, Bu wo Kiwameru Tame Tenseisu: Soshite, Sekai Saikyou no Minarai Kishi♀',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3756.jpg',
    url: 'https://www3.animeflv.net/ver/eiyuuou-bu-wo-kiwameru-tame-tenseisu-soshite-sekai-saikyou-no-minarai-kishi-2'
  },
  {
    title: 'Ayakashi Triangle',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3755.jpg',
    url: 'https://www3.animeflv.net/ver/ayakashi-triangle-2'
  },
  {
    title: 'Mononogatari',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3754.jpg',
    url: 'https://www3.animeflv.net/ver/mononogatari-2'
  },
  {
    title: 'Kyuuketsuki Sugu Shinu 2',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3752.jpg',
    url: 'https://www3.animeflv.net/ver/kyuuketsuki-sugu-shinu-2-2'
  },
  {
    title: 'Vinland Saga Season 2',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3753.jpg',
    url: 'https://www3.animeflv.net/ver/vinland-saga-season-2-2'
  },
  {
    title: 'High Card',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3751.jpg',
    url: 'https://www3.animeflv.net/ver/high-card-2'
  },
  {
    title: 'Mou Ippon!',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3750.jpg',
    url: 'https://www3.animeflv.net/ver/mou-ippon-2'
  },
    url: 'https://www3.animeflv.net/ver/nokemonotachi-no-yoru-2'
  },
  {
    title: 'Kami-tachi ni Hirowareta Otoko 2nd Season',
    chapter: 2,
    cover: 'https://animeflv.net/uploads/animes/thumbs/3746.jpg',
    url: 'https://www3.animeflv.net/ver/kamitachi-ni-hirowareta-otoko-2nd-season-2'
  }
]
```

#### getOnAir()

```js
const { getOnAir } = require('animeflv-api-ts');

getOnAir().then((result) => {
  console.log(result);
});
```

###### Respuesta

```js
[
  {
    title: 'One Piece Anime',
    type: 'Anime',
    id: 'one-piece-tv',
    url: 'https://www3.animeflv.net/anime/one-piece-tv'
  },
  {
    title: 'Detective Conan Anime',
    type: 'Anime',
    id: 'detective-conan',
    url: 'https://www3.animeflv.net/anime/detective-conan'
  },
  {
    title: 'Boruto: Naruto Next Generations Anime',
    type: 'Anime',
    id: 'boruto-naruto-next-generations-tv',
    url: 'https://www3.animeflv.net/anime/boruto-naruto-next-generations-tv'
  },
  {
    title: 'IDOLiSH7: Third Beat! Anime',
    type: 'Anime',
    id: 'idolish7-third-beat',
    url: 'https://www3.animeflv.net/anime/idolish7-third-beat'
  },
  {
    title: 'Digimon Ghost Game Anime',
    type: 'Anime',
    id: 'digimon-ghost-game',
    url: 'https://www3.animeflv.net/anime/digimon-ghost-game'
  },
  {
    title: 'Shadowverse Flame Anime',
    type: 'Anime',
    id: 'shadowverse-flame',
    url: 'https://www3.animeflv.net/anime/shadowverse-flame'
  },
  {
    title: 'Isekai Ojisan Anime',
    type: 'Anime',
    id: 'isekai-ojisan',
    url: 'https://www3.animeflv.net/anime/isekai-ojisan'
  },
  {
    title: 'Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka IV Anime',
    type: 'Anime',
    id: 'dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-darou-ka-iv-shin-shou-meikyuuhen',
    url: 'https://www3.animeflv.net/anime/dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-darou-ka-iv-shin-shou-meikyuuhen'
  },
  {
    title: 'Boku no Hero Academia 6th Season Anime',
    type: 'Anime',
    id: 'boku-no-hero-academia-6th-season',
    url: 'https://www3.animeflv.net/anime/boku-no-hero-academia-6th-season'
  },
  {
    title: 'Kage no Jitsuryokusha ni Naritakute! Anime',
    type: 'Anime',
    id: 'kage-no-jitsuryokusha-ni-naritakute',
    url: 'https://www3.animeflv.net/anime/kage-no-jitsuryokusha-ni-naritakute'
  },
  {
    title: 'Mairimashita! Iruma-kun 3rd Season Anime',
    type: 'Anime',
    id: 'mairimashita-irumakun-3rd-season',
    url: 'https://www3.animeflv.net/anime/mairimashita-irumakun-3rd-season'
  },
  {
    title: 'Blue Lock Anime',
    type: 'Anime',
    id: 'blue-lock',
    url: 'https://www3.animeflv.net/anime/blue-lock'
  },
  {
    title: 'Yowamushi Pedal: Limit Break Anime',
    type: 'Anime',
    id: 'yowamushi-pedal-limit-break',
    url: 'https://www3.animeflv.net/anime/yowamushi-pedal-limit-break'
  },
  {
    title: 'Urusei Yatsura (2022) Anime',
    type: 'Anime',
    id: 'urusei-yatsura-2022',
    url: 'https://www3.animeflv.net/anime/urusei-yatsura-2022'
  },
  {
    title: 'Fumetsu no Anata e 2nd Season Anime',
    type: 'Anime',
    id: 'fumetsu-no-anata-e-2nd-season',
    url: 'https://www3.animeflv.net/anime/fumetsu-no-anata-e-2nd-season'
  },
  {
    title: 'KanColle: Itsuka Ano Umi de Anime',
    type: 'Anime',
    id: 'kancolle-itsuka-ano-umi-de',
    url: 'https://www3.animeflv.net/anime/kancolle-itsuka-ano-umi-de'
  },
  {
    title: 'Ningen Fushin no Boukensha-tachi ga Sekai wo Sukuu you desu Anime',
    type: 'Anime',
    id: 'ningen-fushin-no-boukenshatachi-ga-sekai-wo-sukuu-you-desu',
    url: 'https://www3.animeflv.net/anime/ningen-fushin-no-boukenshatachi-ga-sekai-wo-sukuu-you-desu'
  },
  {
    title: 'Tensei Oujo to Tensai Reijou no Mahou Kakumei Anime',
    type: 'Anime',
    id: 'tensei-oujo-to-tensai-reijou-no-mahou-kakumei',
    url: 'https://www3.animeflv.net/anime/tensei-oujo-to-tensai-reijou-no-mahou-kakumei'
  },
  {
    title: 'Bungou Stray Dogs 4th Season Anime',
    type: 'Anime',
    id: 'bungou-stray-dogs-4th-season',
    url: 'https://www3.animeflv.net/anime/bungou-stray-dogs-4th-season'
  },
  {
    title: 'Koori Zokusei Danshi to Cool na Douryou Joshi Anime',
    type: 'Anime',
    id: 'koori-zokusei-danshi-to-cool-na-douryou-joshi',
    url: 'https://www3.animeflv.net/anime/koori-zokusei-danshi-to-cool-na-douryou-joshi'
  },
  {
    title: 'Technoroid: Overmind Anime',
    type: 'Anime',
    id: 'technoroid-overmind',
    url: 'https://www3.animeflv.net/anime/technoroid-overmind'
  },
  {
    title: 'Tomo-chan wa Onnanoko! Anime',
    type: 'Anime',
    id: 'tomochan-wa-onnanoko',
    url: 'https://www3.animeflv.net/anime/tomochan-wa-onnanoko'
  },
  {
    title: 'Tsurune: Tsunagari no Issha Anime',
    type: 'Anime',
    id: 'tsurune-tsunagari-no-issha',
    url: 'https://www3.animeflv.net/anime/tsurune-tsunagari-no-issha'
  },
  {
    title: 'Inu ni Nattara Suki na Hito ni Hirowareta. Anime',
    type: 'Anime',
    id: 'inu-ni-nattara-suki-na-hito-ni-hirowareta',
    url: 'https://www3.animeflv.net/anime/inu-ni-nattara-suki-na-hito-ni-hirowareta'
  },
  {
    title: 'Revenger Anime',
    type: 'Anime',
    id: 'revenger',
    url: 'https://www3.animeflv.net/anime/revenger'
  },
  {
    title: 'Oniichan wa Oshimai! Anime',
    type: 'Anime',
    id: 'oniichan-wa-oshimai',
    url: 'https://www3.animeflv.net/anime/oniichan-wa-oshimai'
  },
  {
    title: 'Spy Kyoushitsu Anime',
    type: 'Anime',
    id: 'spy-kyoushitsu',
    url: 'https://www3.animeflv.net/anime/spy-kyoushitsu'
  },
  {
    title: 'Hyouken no Majutsushi ga Sekai wo Suberu Anime',
    type: 'Anime',
    id: 'hyouken-no-majutsushi-ga-sekai-wo-suberu',
    url: 'https://www3.animeflv.net/anime/hyouken-no-majutsushi-ga-sekai-wo-suberu'
  },
  {
    title: 'Sugar Apple Fairy Tale Anime',
    type: 'Anime',
    id: 'sugar-apple-fairy-tale',
    url: 'https://www3.animeflv.net/anime/sugar-apple-fairy-tale'
  },
  {
    title: 'The Legend of Heroes: Sen no Kiseki - Northern War Anime',
    type: 'Anime',
    id: 'the-legend-of-heroes-sen-no-kiseki-northern-war',
    url: 'https://www3.animeflv.net/anime/the-legend-of-heroes-sen-no-kiseki-northern-war'
  },
  {
    title: 'Nijiyon Animation Anime',
    type: 'Anime',
    id: 'nijiyon-animation',
    url: 'https://www3.animeflv.net/anime/nijiyon-animation'
  },
  {
    title: 'Isekai Nonbiri Nouka Anime',
    type: 'Anime',
    id: 'isekai-nonbiri-nouka',
    url: 'https://www3.animeflv.net/anime/isekai-nonbiri-nouka'
  },
  {
    title: 'Buddy Daddies Anime',
    type: 'Anime',
    id: 'buddy-daddies',
    url: 'https://www3.animeflv.net/anime/buddy-daddies'
  },
  {
    title: 'Ars no Kyojuu Anime',
    type: 'Anime',
    id: 'ars-no-kyojuu',
    url: 'https://www3.animeflv.net/anime/ars-no-kyojuu'
  },
  {
    title: 'Tsundere Akuyaku Reijou Liselotte to Jikkyou no Endou-kun to Kaisetsu no Kobayashi-san Anime',
    type: 'Anime',
    id: 'tsundere-akuyaku-reijou-liselotte-to-jikkyou-no-endoukun-to-kaisetsu-no-kobayashisan',
    url: 'https://www3.animeflv.net/anime/tsundere-akuyaku-reijou-liselotte-to-jikkyou-no-endoukun-to-kaisetsu-no-kobayashisan'
  },
  {
    title: 'Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken Anime',
    type: 'Anime',
    id: 'otonari-no-tenshisama-ni-itsunomanika-dame-ningen-ni-sareteita-ken',
    url: 'https://www3.animeflv.net/anime/otonari-no-tenshisama-ni-itsunomanika-dame-ningen-ni-sareteita-ken'
  },
  {
    title: 'Trigun Stampede Anime',
    type: 'Anime',
    id: 'trigun-stampede',
    url: 'https://www3.animeflv.net/anime/trigun-stampede'
  },
  {
    title: 'UniteUp! Anime',
    type: 'Anime',
    id: 'uniteup',
    url: 'https://www3.animeflv.net/anime/uniteup'
  },
  {
    title: 'NieR:Automata Ver1.1a Anime',
    type: 'Anime',
    id: 'nierautomata-ver11a',
    url: 'https://www3.animeflv.net/anime/nierautomata-ver11a'
  },
  {
    title: 'Maou Gakuin no Futekigousha II Anime',
    type: 'Anime',
    id: 'maou-gakuin-no-futekigousha-ii',
    url: 'https://www3.animeflv.net/anime/maou-gakuin-no-futekigousha-ii'
  },
  {
    title: 'Tokyo Revengers: Seiya Kessen-hen Anime',
    type: 'Anime',
    id: 'tokyo-revengers-seiya-kessenhen',
    url: 'https://www3.animeflv.net/anime/tokyo-revengers-seiya-kessenhen'
  },
  {
    title: 'Saikyou Onmyouji no Isekai Tenseiki Anime',
    type: 'Anime',
    id: 'saikyou-onmyouji-no-isekai-tenseiki',
    url: 'https://www3.animeflv.net/anime/saikyou-onmyouji-no-isekai-tenseiki'
  },
  {
    title: 'Ijiranaide, Nagatoro-san 2nd Attack Anime',
    type: 'Anime',
    id: 'ijiranaide-nagatorosan-2nd-attack',
    url: 'https://www3.animeflv.net/anime/ijiranaide-nagatorosan-2nd-attack'
  },
  {
    title: 'Kaiko sareta Ankoku Heishi (30-dai) no Slow na Second Life Anime',
    type: 'Anime',
    id: 'kaiko-sareta-ankoku-heishi-30dai-no-slow-na-second-life',
    url: 'https://www3.animeflv.net/anime/kaiko-sareta-ankoku-heishi-30dai-no-slow-na-second-life'
  },
  {
    title: 'Rougo ni Sonaete Isekai de 8-manmai no Kinka wo Tamemasu Anime',
    type: 'Anime',
    id: 'rougo-ni-sonaete-isekai-de-8manmai-no-kinka-wo-tamemasu',
    url: 'https://www3.animeflv.net/anime/rougo-ni-sonaete-isekai-de-8manmai-no-kinka-wo-tamemasu'
  },
  {
    title: 'Nokemono-tachi no Yoru Anime',
    type: 'Anime',
    id: 'nokemonotachi-no-yoru',
    url: 'https://www3.animeflv.net/anime/nokemonotachi-no-yoru'
  },
  {
    title: 'Kami-tachi ni Hirowareta Otoko 2nd Season Anime',
    type: 'Anime',
    id: 'kamitachi-ni-hirowareta-otoko-2nd-season',
    url: 'https://www3.animeflv.net/anime/kamitachi-ni-hirowareta-otoko-2nd-season'
  },
  {
    title: 'Benriya Saitou-san, Isekai ni Iku Anime',
    type: 'Anime',
    id: 'benriya-saitousan-isekai-ni-iku',
    url: 'https://www3.animeflv.net/anime/benriya-saitousan-isekai-ni-iku'
  },
  {
    title: 'Kyokou Suiri Season 2 Anime',
    type: 'Anime',
    id: 'kyokou-suiri-season-2',
    url: 'https://www3.animeflv.net/anime/kyokou-suiri-season-2'
  },
  {
    title: 'D4DJ All Mix Anime',
    type: 'Anime',
    id: 'd4dj-all-mix',
    url: 'https://www3.animeflv.net/anime/d4dj-all-mix'
  },
  {
    title: 'Mou Ippon! Anime',
    type: 'Anime',
    id: 'mou-ippon',
    url: 'https://www3.animeflv.net/anime/mou-ippon'
  },
  {
    title: 'High Card Anime',
    type: 'Anime',
    id: 'high-card',
    url: 'https://www3.animeflv.net/anime/high-card'
  },
  {
    title: 'Kyuuketsuki Sugu Shinu 2 Anime',
    type: 'Anime',
    id: 'kyuuketsuki-sugu-shinu-2',
    url: 'https://www3.animeflv.net/anime/kyuuketsuki-sugu-shinu-2'
  },
  {
    title: 'Vinland Saga Season 2 Anime',
    type: 'Anime',
    id: 'vinland-saga-season-2',
    url: 'https://www3.animeflv.net/anime/vinland-saga-season-2'
  },
  {
    title: 'Mononogatari Anime',
    type: 'Anime',
    id: 'mononogatari',
    url: 'https://www3.animeflv.net/anime/mononogatari'
  },
  {
    title: 'Ayakashi Triangle Anime',
    type: 'Anime',
    id: 'ayakashi-triangle',
    url: 'https://www3.animeflv.net/anime/ayakashi-triangle'
  },
  {
    title: 'Eiyuuou, Bu wo Kiwameru Tame Tenseisu: Soshite, Sekai Saikyou no Minarai Kishi♀ Anime',
    type: 'Anime',
    id: 'eiyuuou-bu-wo-kiwameru-tame-tenseisu-soshite-sekai-saikyou-no-minarai-kishi',
    url: 'https://www3.animeflv.net/anime/eiyuuou-bu-wo-kiwameru-tame-tenseisu-soshite-sekai-saikyou-no-minarai-kishi'
  },
  {
    title: 'Tondemo Skill de Isekai Hourou Meshi Anime',
    type: 'Anime',
    id: 'tondemo-skill-de-isekai-hourou-meshi',
    url: 'https://www3.animeflv.net/anime/tondemo-skill-de-isekai-hourou-meshi'
  },
  {
    title: 'Kubo-san wa Mob wo Yurusanai Anime',
    type: 'Anime',
    id: 'kubosan-wa-mob-wo-yurusanai',
    url: 'https://www3.animeflv.net/anime/kubosan-wa-mob-wo-yurusanai'
  },
  {
    title: 'Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu. 2 Anime',
    type: 'Anime',
    id: 'itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2',
    url: 'https://www3.animeflv.net/anime/itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2'
  },
  {
    title: 'Ooyukiumi no Kaina Anime',
    type: 'Anime',
    id: 'ooyukiumi-no-kaina',
    url: 'https://www3.animeflv.net/anime/ooyukiumi-no-kaina'
  },
  {
    title: 'Shin Shinka no Mi: Shiranai Uchi ni Kachigumi Jinsei Anime',
    type: 'Anime',
    id: 'shin-shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei',
    url: 'https://www3.animeflv.net/anime/shin-shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei'
  },
  {
    title: 'Hikari no Ou Anime',
    type: 'Anime',
    id: 'hikari-no-ou',
    url: 'https://www3.animeflv.net/anime/hikari-no-ou'
  },
  {
    title: 'Majutsushi Orphen Hagure Tabi: Urbanrama-hen Anime',
    type: 'Anime',
    id: 'majutsushi-orphen-hagure-tabi-urbanramahen',
    url: 'https://www3.animeflv.net/anime/majutsushi-orphen-hagure-tabi-urbanramahen'
  }
]
```

#### getComing()

```js
const { getComing } = require('animeflv-api-ts');

getComing().then((result) => {
  console.log(result);
});
```

###### Respuesta

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
  },
  {
    title: 'JoJo no Kimyou na Bouken Part 6: Stone Ocean',
    cover: 'https://animeflv.net/uploads/animes/covers/3553.jpg',
    synopsis: 'En Florida, 2011, Jolyne Cujoh está sentada en una celda como lo estuvo su padre Jotaro; sin embargo, esta situación no es de su propia elección. Inculpada por un delito que no ha cometido y manipulada para que cumpla una condena más larga, Jolyne está dispuesta a resignarse a un destino funesto como prisionera de la cárcel de la calle Delfí...',
    rating: '4.6',
    id: 'jojo-no-kimyou-na-bouken-part-6-stone-ocean',
    type: 'OVA',
    url: 'https://www3.animeflv.net/anime/jojo-no-kimyou-na-bouken-part-6-stone-ocean'
  },
  {
    title: 'Ame-iro Cocoa in Hawaii',
    cover: 'https://animeflv.net/uploads/animes/covers/2559.jpg',
    synopsis: '¡¿El Cafe Rainy Color se está expandiendo a Hawaii!?\n' +
      'De repente un día Nozomu Tokura se designa el gerente de la tienda por orden del propietario. Desconcertado, sin embargo, con la cooperación de todos y el apoyo de nuevos amigos locales, Nozomu ahora tiene una batalla cuesta arriba para abrir la nueva tienda. &i...',
    rating: '4.1',
    id: 'ame-iro-cocoa-in-hawaii',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/ame-iro-cocoa-in-hawaii'
  },
  {
    title: 'Mahou Shoujo? Naria☆Girls',
    cover: 'https://animeflv.net/uploads/animes/covers/2506.jpg',
    synopsis: 'La historia gira en torno a unas chicas llamadas Urara, Hanabi y Inaho, que aspiran a alcanzar la fama en todo Japón haciendo versiones anime de ellas mismas. Para atraer a todo el mundo, desde pequeños a adultos, deciden que el género sea magical girls. Ahora tienen como objetivo emitir una temporada de anime.\n',
    rating: '4.2',
    id: 'mahou-shoujo-nariagirls',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/mahou-shoujo-nariagirls'
  },
  {
    title: 'Hakuouki: Otogisoushi',
    cover: 'https://animeflv.net/uploads/animes/covers/2439.jpg',
    synopsis: '',
    rating: '4.3',
    id: 'hakuouki-otogisoushi',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/hakuouki-otogisoushi'
  },
  {
    title: 'Ragnastrike Angels',
    cover: 'https://animeflv.net/uploads/animes/covers/2426.jpg',
    synopsis: 'La serie trata sobre chicas de un tamaño de 38 metros peleando.',
    rating: '3.7',
    id: 'ragnastrike-angels',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/ragnastrike-angels'
  },
  {
    title: 'Cardfight!! Vanguard G: Gears Crisis-hen',
    cover: 'https://animeflv.net/uploads/animes/covers/2252.jpg',
    synopsis: 'Segunda temporada de Cardfight!! Vanguard',
    rating: '4.1',
    id: 'cardfight-vanguard-g-gears-crisis-hen',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/cardfight-vanguard-g-gears-crisis-hen'
  },
  {
    title: 'Kamisama Minarai: Himitsu no Cocotama',
    cover: 'https://animeflv.net/uploads/animes/covers/2225.jpg',
    synopsis: 'Los “Cocotama” son unos pequeños dioses nacidos de los pensamientos y sentimientos de los objetos que las personas usan con mucho cuidado. El hecho de que los Cocotama vistan la mitad del huevo del que salen como si fuera su ropa interior prueba que todavía son aprendices. Los Cocotama usan una misteriosa magia y entrenan ...',
    rating: '3.6',
    id: 'kamisama-minarai-himitsu-no-cocotama',
    type: 'Anime',
    url: 'https://www3.animeflv.net/anime/kamisama-minarai-himitsu-no-cocotama'
  }
]
```

## TODO
 - [x] Convertir el módulo a TS
 - [x] Agregar una función para obtener los últimos capítulos subidos
 - [x] Agregar una función para obtener los animes en emisión
 - [x] Agregar una función para obtener los próximos animes

## Contribuyentes
 - [ShompiFlen](https://github.com/Shompi) :star:
