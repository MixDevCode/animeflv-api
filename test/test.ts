'use strict';

import { expect } from 'chai';
import { getAnimeInfo, searchAnime } from '../src/index';

describe('SCRAPPER SELECTORS', function() {
    it('La función getAnimeInfo debe devolver un objeto', async () => {
        var anime = await getAnimeInfo("one-piece-tv");
        expect(anime).to.be.a('Object');
    });
    
    it('La función searchAnime debe devolver un arreglo', async () => {
        var search = await searchAnime("One Piece");
        expect(search).to.be.a('Array');
    });

    it('Si existe un error en getAnimeInfo, debe devolver null', async () => {
        var anime = await getAnimeInfo("one-piece");
        expect(anime).to.eql(null);
    });

    it('Si existe un error en searchAnime, debe devolver un arreglo vacío', async () => {
        var search = await searchAnime("ぼっち・ざ・ろっ");
        expect(search).to.eql([]);
    });

    it('getAnimeInfo("sword-art-online") debe devolver información acerca del anime "Sword Art Online"', async () => {
        var anime = await getAnimeInfo("sword-art-online");
        expect(anime).to.eql({
            title: 'Sword Art Online',
            alternative_titles: [ 'ソードアート・オンライン' ],
            status: 'Finalizado',
            rating: '4.5',
            type: 'Anime',
            cover: 'https://animeflv.net/uploads/animes/covers/825.jpg',
            synopsis: `Escapar es imposible hasta terminar el juego; un game over significaría una verdadera "muerte". Sin saber la "verdad" de la siguiente generación del Multijugador Masivo Online, 'Sword Art Online(SAO)', con 10 mil usuarios unidos juntos abriendo las cortinas para esta cruel batalla a muerte. Participando solo en SAO, el protagonista Kirito ha aceptado inmediatamente la "verdad" de este MMO.\n` +
              '<br/><br/>\n' +
              "Y, en el mundo del juego, un gigante castillo flotante llamado 'Aincrad', Kirito se distinguió a si mismo como un jugador solitario. Apuntando a terminar el juego al alcanzar la planta mas alta el solo continua avanzando arriesgadamente hasta que recibe una invitación a la fuerza de una guerrera y esgrimista experta, Asuna, con la cual tendra que hacer equipo.",
            genres: [ 'Acción', 'Aventuras', 'Fantasía', 'Juegos', 'Romance' ],
            episodes: 25,
            url: 'https://www3.animeflv.net/anime/sword-art-online'
          });
    });

    it('searchAnime("High School of The Dead") debe devolver un array con DOS objetos', async () => {
        var search = await searchAnime("High School of The Dead");
        expect(search).to.eql([
            {
              title: 'Highschool of the Dead',
              cover: 'https://animeflv.net/uploads/animes/covers/4.jpg',
              synopsis: 'El mundo entero esta siendo dominado por una enfermedad mortal, esto convierte a los humanos en zombies. En Japón, muchos estudiantes de la preparatoria Fujimi, y la enfermera de la escuela, estaran juntos trantando de sobrevivir al presente Apocalipsis. La historia se centra en Takashi Komuro, uno de los estudiantes que ha sobrevivido a est...',
              id: 'highschool-of-the-dead',
              type: 'Anime',
              url: 'https://www3.animeflv.net/anime/highschool-of-the-dead'
            },
            {
              title: 'Highschool of the Dead Ova',
              cover: 'https://animeflv.net/uploads/animes/covers/402.jpg',
              synopsis: 'Excelente anime que mezcla imagenes increibles de mujeres hermosas y un mundo invadido por zombies. Un grupo de estudiantes tratan de sobrevivir y libran grandes batallas cuerpo a cuerpo y con armas de primer nivel.',
              id: 'highschool-of-the-dead-ovas',
              type: 'OVA',
              url: 'https://www3.animeflv.net/anime/highschool-of-the-dead-ovas'
            }
          ]);
    })
});