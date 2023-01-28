import { type SearchAnimeResults } from "../types";
import { load } from "cheerio"
import { getNextAndPrevPages } from "./getPrevAndNextPages";
import { scrapSearchAnimeData } from "./scrapAnimeData";

export function executeSearch(searchData: string): SearchAnimeResults | null {

    const $ = load(searchData);

    const search: SearchAnimeResults = {
        previousPage: null,
        nextPage: null,
        foundPages: 0,
        data: []
    }

    const pageSelector = $('body > div.Wrapper > div > div > main > div > ul > li');
    const { foundPages, nextPage, previousPage } = getNextAndPrevPages(pageSelector);

    search.data = scrapSearchAnimeData($)
    search.foundPages = foundPages;
    search.nextPage = nextPage;
    search.previousPage = previousPage;

    return search;
}