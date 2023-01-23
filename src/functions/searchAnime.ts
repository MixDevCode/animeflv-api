import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { scrapSearchAnimeData } from "../utils";
import { load } from "cheerio";
import { SearchAnimeResults } from "../types";

export async function searchAnime(query: string): Promise<SearchAnimeResults | null> {

    if (!query || typeof query !== "string")
        throw new Error("Debes pasar una query válida a esta función.", { cause: "query is not valid." });

    try {

        CloudscraperOptions.uri = 'https://www3.animeflv.net/browse?q=' + query.toLowerCase().replace(/\s+/g, "+");

        const searchData = (await cloudscraper(CloudscraperOptions)) as string;
        const $ = load(searchData);

        const search: SearchAnimeResults = {
            previousPage: null,
            nextPage: null,
            foundPages: 0,
            data: []
        }

        search.data = scrapSearchAnimeData($)

        const pageSelector = $('body > div.Wrapper > div > div > main > div > ul > li')

        if (Number(pageSelector.last().prev().find('a').text()) === 0) search.foundPages = 1;
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