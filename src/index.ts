/**
                                                                This script was made by
                                                                @MixDevCode
                                                                and Typed by
                                                                @Shompi
 */

import cloudscraper from 'cloudscraper';
import { load } from 'cheerio';
import { AnimeGenres, AnimeType, AnimeStatus } from "./constants"

/** Puede que hayan status faltantes */
export type AnimeStatus = typeof AnimeStatus[number];
/** Puede que hayan tipos faltantes */
export type AnimeType = typeof AnimeType[number];

export type AnimeGenre = typeof AnimeGenres[number];

export interface SearchAnimeData {
    title: string
    cover: string
    synopsis: string
    rating: string
    id: string
    type: AnimeType
    url: string
}

export interface AnimeFilterResults {
    previousPage: string | null
    nextPage: string | null
    foundPages: number
    data: SearchAnimeData[]
}

export interface AnimeData {
    title: string
    alternative_titles: string[]
    status: AnimeStatus
    rating: string
    type: AnimeType
    cover: string
    synopsis: string
    genres: AnimeGenre[]
    episodes: number
    url: string
}

export interface ChapterData {
    title: string
    chapter: number
    cover: string
    url: string
}

export interface AnimeOnAirData {
    title: string
    type: AnimeType
    id: string
    url: string
}


const options: cloudscraper.OptionsWithUrl = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Cache-Control': 'private',
        'Referer': 'https://www.google.com/search?q=animeflv',
        'Connection': 'keep-alive',
    },
    uri: ""
}

export async function searchAnime(query: string): Promise<SearchAnimeData[]> {
    try {

        options.uri = 'https://www3.animeflv.net/browse?q=' + query.toLowerCase().replace(/\s+/g, "+");

        const searchData = (await cloudscraper(options)) as string;
        const $ = load(searchData);

        let search: SearchAnimeData[] = []
        if ($('body > div.Wrapper > div > div > main > ul > li').length > 0) {
            $('body > div.Wrapper > div > div > main > ul > li').each((i, el) => {
                let temp: SearchAnimeData = {
                    title: $(el).find('h3').text(),
                    cover: $(el).find('figure > img').attr('src')!,
                    synopsis: $(el).find('div.Description > p').eq(1).text(),
                    rating: $(el).find('article > div > p:nth-child(2) > span.Vts.fa-star').text(),
                    id: $(el).find('a').attr('href')!.replace("/anime/", ""),
                    type: $(el).find('a > div > span.Type').text() as AnimeType,
                    url: 'https://www3.animeflv.net' + ($(el).find('a').attr('href') as string)
                }

                search.push(temp);
            });
        };
        return search;
    } catch {
        return [];
    }
}

export async function getAnimeInfo(animeId: string): Promise<AnimeData | null> {
    try {

        options.uri = 'https://www3.animeflv.net/anime/' + animeId;

        const animeData = (await cloudscraper(options)) as string;
        const $ = load(animeData);

        const animeInfo: AnimeData = {
            title: $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > h1').text(),
            alternative_titles: [],
            status: $('body > div.Wrapper > div > div > div.Container > div > aside > p > span').text() as AnimeStatus,
            rating: $('#votes_prmd').text(),
            type: $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > span').text() as AnimeType,
            cover: 'https://animeflv.net' + ($('body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img').attr('src') as string),
            synopsis: $('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p').text(),
            genres: $('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a').text().split(/(?=[A-Z])/) as AnimeGenre[],
            episodes: JSON.parse($('script').eq(15).text().match(/episodes = (\[\[.*\].*])/)?.[1] as string).length ?? 0,
            url: options.uri
        };
        $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span').each((i, el) => {
            animeInfo.alternative_titles.push($(el).text());
        })

        return animeInfo;
    } catch {
        return null
    }
}

export async function getLatest(): Promise<ChapterData[]> {
    try {

        options.uri = 'https://www3.animeflv.net/';

        const chaptersData = (await cloudscraper(options)) as string;
        const $ = load(chaptersData);

        const chapters: ChapterData[] = []
        if ($('body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li').length > 0) {
            $('body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li').each((i, el) => {
                const temp: ChapterData = {
                    title: $(el).find('strong').text(),
                    chapter: Number($(el).find('span.Capi').text().replace("Episodio ", "")),
                    cover: 'https://animeflv.net' + ($(el).find('img').attr('src') as string),
                    url: 'https://www3.animeflv.net' + $(el).find('a').attr('href') as string
                }

                chapters.push(temp);
            });
        }

        return chapters;

    } catch {
        return [];
    }
}

export async function getOnAir(): Promise<AnimeOnAirData[]> {
    try {

        options.uri = 'https://www3.animeflv.net/';

        const onAirData = (await cloudscraper(options)) as string;
        const $ = load(onAirData);

        const onAir: AnimeOnAirData[] = []
        if ($('.ListSdbr > li').length > 0) {
            $('.ListSdbr > li').each((i, el) => {
                const temp: AnimeOnAirData = {
                    title: $(el).find('a').remove('span').text(),
                    type: $(el).find('a').children('span').text() as AnimeType,
                    id: $(el).find('a').attr('href')!.replace("/anime/", ""),
                    url: 'https://www3.animeflv.net' + $(el).find('a').attr('href') as string
                }

                onAir.push(temp);
            });
        }

        return onAir;

    } catch {
        return [];
    }
}

export async function getComing(): Promise<SearchAnimeData[]> {
    try {

        options.uri = 'https://www3.animeflv.net/browse?status%5B%5D=3&order=default';

        const comingData = (await cloudscraper(options)) as string;
        const $ = load(comingData);

        const coming: SearchAnimeData[] = []
        if ($('body > div.Wrapper > div > div > main > ul > li').length > 0) {
            $('body > div.Wrapper > div > div > main > ul > li').each((i, el) => {
                const temp: SearchAnimeData = {
                    title: $(el).find('h3').text(),
                    cover: $(el).find('figure > img').attr('src')!,
                    synopsis: $(el).find('div.Description > p').eq(1).text(),
                    rating: $(el).find('article > div > p:nth-child(2) > span.Vts.fa-star').text(),
                    id: $(el).find('a').attr('href')!.replace("/anime/", ""),
                    type: $(el).find('a > div > span.Type').text() as AnimeType,
                    url: 'https://www3.animeflv.net' + ($(el).find('a').attr('href') as string)
                }

                coming.push(temp);
            });
        };
        return coming;
    } catch {
        return [];
    }
}

const FilterOrder = {
    "Por Defecto": "default",
    "Recientemente Actualizados": "recent",
    "Recientemente Agregados": "added",
    "Nombre A-Z": "title",
    "Calificacion": "rating"
}

const AnimeTypeEnum = {
    "Anime": "tv",
    "Película": "movie",
    "Especial": "special",
    "OVA": "ova"
}

const AnimeStatusEnum = {
    "En emision": 1,
    "Finalizado": 2,
    "Proximamente": 3,
}

interface FilterOptions {
    genres?: AnimeGenre[]
    types?: AnimeType[]
    status?: (keyof typeof AnimeStatusEnum)[]
    order?: keyof typeof FilterOrder
}



function generateRequestUrl(options?: FilterOptions): string {
    const quitarAcentos = (cadena: string) => {
        const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
        //@ts-ignore
        return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
    }

    if (!options) return "https://www3.animeflv.net/browse?order=default"

    const FinalUrl = new URL("https://www3.animeflv.net/browse")

    let filteredGenres: string[] | string = ""
    let parsedStatuses: string[] | string = ""
    let parsedTypes: string[] | string = ""
    let filterOrder: string = "default"

    const genrePrefix = "genre[]"
    const typePrefix = "type[]"
    const statusPrefix = "status[]"
    const orderPrefix = "order"

    if (options.genres && Array.isArray(options.genres)) {
        filteredGenres = options.genres.filter(genre => AnimeGenres.includes(genre))

        for (const genre of filteredGenres) {
            const normalizedGenre = quitarAcentos(genre).replace(/\s+/g, "-").toLowerCase()

            FinalUrl.searchParams.append(genrePrefix, normalizedGenre)
        }
    }

    if (options.status && Array.isArray(options.status)) {
        parsedStatuses = options.status.filter(status => status in AnimeStatusEnum)

        for (const status of parsedStatuses) {
            FinalUrl.searchParams.append(statusPrefix, AnimeStatusEnum[status as AnimeStatus].toString())
        }
    }

    if (options.types && Array.isArray(options.types)) {
        parsedTypes = options.types.filter(type => type in AnimeTypeEnum)

        for (const type of parsedTypes) {
            FinalUrl.searchParams.append(typePrefix, AnimeTypeEnum[type as AnimeType])
        }
    }

    if (options.order && (options.order in FilterOrder)) {
        FinalUrl.searchParams.append(orderPrefix, FilterOrder[options.order])
    } else {
        FinalUrl.searchParams.append(orderPrefix, FilterOrder["Por Defecto"])
    }

    return FinalUrl.toString()
}

export async function searchAnimesByFilter(opts?: FilterOptions): Promise<AnimeFilterResults | null> {
    try {
        /** La url del request con los filtros ya puestos */
        const formatedUrl = generateRequestUrl(opts)

        options.uri = formatedUrl;
        
        const filterData = (await cloudscraper(options)) as string;
        const $ = load(filterData);

        let filter: AnimeFilterResults = {
            previousPage: null,
            nextPage: null,
            foundPages: 0,
            data: []
        }
        if ($('body > div.Wrapper > div > div > main > ul > li').length > 0) {
            $('body > div.Wrapper > div > div > main > ul > li').each((i, el) => {
                let temp: SearchAnimeData = {
                    title: $(el).find('h3').text(),
                    cover: $(el).find('figure > img').attr('src')!,
                    synopsis: $(el).find('div.Description > p').eq(1).text(),
                    rating: $(el).find('article > div > p:nth-child(2) > span.Vts.fa-star').text(),
                    id: $(el).find('a').attr('href')!.replace("/anime/", ""),
                    type: $(el).find('a > div > span.Type').text() as AnimeType,
                    url: 'https://www3.animeflv.net' + ($(el).find('a').attr('href') as string),
                }

                filter.data.push(temp);
            });

            if($('body > div.Wrapper > div > div > main > div > ul > li').eq(0).children('a').attr('href') as string == "#") filter.previousPage = null;
            else filter.previousPage = 'https://www3.animeflv.net' + ($('body > div.Wrapper > div > div > main > div > ul > li').eq(0).children('a').attr('href') as string);

            if ($('body > div.Wrapper > div > div > main > div > ul > li').last().children('a').attr('href') as string == "#") filter.nextPage = null;
            else filter.nextPage = 'https://www3.animeflv.net' + ($('body > div.Wrapper > div > div > main > div > ul > li').last().children('a').attr('href') as string);

            filter.foundPages = Number($('body > div.Wrapper > div > div > main > div > ul > li').last().prev().find('a').text());

        };
        return filter;

    } catch {
        return null;
    }
}

export async function searchAnimesBySpecificURL(url: string): Promise<AnimeFilterResults | null> {
    try {
        options.uri = url;

        const specificData = (await cloudscraper(options)) as string;
        const $ = load(specificData);

        let specific: AnimeFilterResults = {
            previousPage: null,
            nextPage: null,
            foundPages: 0,
            data: []
        }
        if ($('body > div.Wrapper > div > div > main > ul > li').length > 0) {
            $('body > div.Wrapper > div > div > main > ul > li').each((i, el) => {
                let temp: SearchAnimeData = {
                    title: $(el).find('h3').text(),
                    cover: $(el).find('figure > img').attr('src')!,
                    synopsis: $(el).find('div.Description > p').eq(1).text(),
                    rating: $(el).find('article > div > p:nth-child(2) > span.Vts.fa-star').text(),
                    id: $(el).find('a').attr('href')!.replace("/anime/", ""),
                    type: $(el).find('a > div > span.Type').text() as AnimeType,
                    url: 'https://www3.animeflv.net' + ($(el).find('a').attr('href') as string),
                }

                specific.data.push(temp);
            });

            if($('body > div.Wrapper > div > div > main > div > ul > li').eq(0).children('a').attr('href') as string == "#") specific.previousPage = null;
            else specific.previousPage = 'https://www3.animeflv.net' + ($('body > div.Wrapper > div > div > main > div > ul > li').eq(0).children('a').attr('href') as string);

            if ($('body > div.Wrapper > div > div > main > div > ul > li').last().children('a').attr('href') as string == "#") specific.nextPage = null;
            else specific.nextPage = 'https://www3.animeflv.net' + ($('body > div.Wrapper > div > div > main > div > ul > li').last().children('a').attr('href') as string);

            specific.foundPages = Number($('body > div.Wrapper > div > div > main > div > ul > li').last().prev().find('a').text());

        };
        return specific;

    } catch {
        return null;
    }
}