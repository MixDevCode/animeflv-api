/**
    This script was made by
    @MixDevCode
    and Typed by
    @Shompi
 */

import cloudscraper from 'cloudscraper';
import { load } from 'cheerio';

/** Puede que hayan status faltantes */
export type AnimeStatus = "En emision" | "Finalizado"
/** Puede que hayan tipos faltantes */
export type AnimeType = "OVA" | "Anime" | "Película"

export interface SearchAnimeData {
    title: string
    cover: string
    synopsis: string
    rating: string
    id: string
    type: AnimeType
    url: string
}

export interface AnimeData {
    title: string
    alternative_titles: string[]
    status: AnimeStatus
    rating: string
    type: AnimeType
    cover: string
    synopsis: string
    genres: string[]
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
            genres: $('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a').text().split(/(?=[A-Z])/),
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