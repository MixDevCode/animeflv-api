import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { scrapSearchAnimeData } from "../utils";
import { load } from "cheerio";
import { AnimeFilterResults } from "../types";

export async function searchAnime(query: string): Promise<AnimeFilterResults | null> {
    try {

        CloudscraperOptions.uri = 'https://www3.animeflv.net/browse?q=' + query.toLowerCase().replace(/\s+/g, "+");

        const searchData = (await cloudscraper(CloudscraperOptions)) as string;
        const $ = load(searchData);
        
        const search: AnimeFilterResults = {
            previousPage: null,
            nextPage: null,
            foundPages: 0,
            data: []
        }

        search.data = scrapSearchAnimeData($)

        const pageSelector = $('body > div.Wrapper > div > div > main > div > ul > li')

        if(Number(pageSelector.last().prev().find('a').text()) === 0) search.foundPages = 1;
        else search.foundPages = Number(pageSelector.last().prev().find('a').text());

        if (pageSelector.eq(0).children('a').attr('href') === "#" || search.foundPages == 1) search.previousPage = null;
        else search.previousPage = 'https://www3.animeflv.net' + pageSelector.eq(0).children('a').attr('href');

        if (pageSelector.last().children('a').attr('href') === "#" || search.foundPages == 1) search.nextPage = null;
        else search.nextPage = 'https://www3.animeflv.net' + pageSelector.last().children('a').attr('href');

        return search;
        
    } catch {
        return null;
    }
}