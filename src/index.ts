/**
	This script was made by
	@MixDevCode
	and Typed by
	@Shompi
 */

import cloudscraper from 'cloudscraper';
import { load } from 'cheerio';

export interface SearchAnimeData {
    title: string
    cover: string
    synopsis: string
    id: string
    type: string
    url: string
}

export interface AnimeData {
	title: string
	alternative_titles: string[]
	status: string
	rating: string
	type: string
	cover: string
	synopsis: string
	genres: string[]
	episodes: number
	url: string
}

let options: cloudscraper.OptionsWithUrl = {
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
        if($('body > div.Wrapper > div > div > main > ul > li').length > 0) {
            $('body > div.Wrapper > div > div > main > ul > li').each((i, el) => {
                let temp: SearchAnimeData = {
                    title: $(el).find('h3').text(),
                    cover: $(el).find('figure > img').attr('src')!,
                    synopsis: $(el).find('div.Description > p').eq(1).text(),
                    id: $(el).find('a').attr('href')!.replace("/anime/", ""),
                    type: $(el).find('a > div > span.Type').text(),
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

export async function getAnimeInfo(animeId: string): Promise <AnimeData | {}> {
    try {
        
        options.uri = 'https://www3.animeflv.net/anime/' + animeId;

        const animeData = (await cloudscraper(options)) as string;
        const $ = load(animeData);

        let animeInfo: AnimeData = {
            title: $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > h1').text(),
            alternative_titles: [],
            status: $('body > div.Wrapper > div > div > div.Container > div > aside > p > span').text(),
            rating: $('#votes_prmd').text(),
            type: $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > span').text(),
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
        return {};
    }
}