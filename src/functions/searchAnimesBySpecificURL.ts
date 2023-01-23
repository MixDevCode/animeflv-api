import { load } from "cheerio";
import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { SearchAnimeResults } from "../types";
import { scrapSearchAnimeData } from "../utils";

export async function searchAnimesBySpecificURL(url: string): Promise<SearchAnimeResults | null> {

    if (!url || (typeof url) !== "string")
        throw new Error(`TypeError: Parámetro url debe ser una string no vacía, pasaste: ${url}`, { cause: "url is not a valid url." });

    try {
        CloudscraperOptions.uri = url;

        const specificData = (await cloudscraper(CloudscraperOptions)) as string;
        const $ = load(specificData);

        const specific: SearchAnimeResults = {
            previousPage: null,
            nextPage: null,
            foundPages: 0,
            data: []
        }

        specific.data = scrapSearchAnimeData($)

        const pageSelector = $('body > div.Wrapper > div > div > main > div > ul > li')

        if (Number(pageSelector.last().prev().find('a').text()) === 0) specific.foundPages = 1;
        else specific.foundPages = Number(pageSelector.last().prev().find('a').text());

        if (pageSelector.eq(0).children('a').attr('href') === "#" || specific.foundPages == 1) specific.previousPage = null;
        else specific.previousPage = 'https://www3.animeflv.net' + pageSelector.eq(0).children('a').attr('href');

        if (pageSelector.last().children('a').attr('href') === "#" || specific.foundPages == 1) specific.nextPage = null;
        else specific.nextPage = 'https://www3.animeflv.net' + pageSelector.last().children('a').attr('href');

        return specific;
    }
    catch {
        return null;
    }
}