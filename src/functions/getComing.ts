import { load } from "cheerio";
import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import type { SearchAnimeData } from "../types";
import { scrapSearchAnimeData } from "../utils";

export async function getComing(): Promise<SearchAnimeData[]> {
    try {

        CloudscraperOptions.uri = 'https://www3.animeflv.net/browse?status%5B%5D=3&order=default';

        const comingData = (await cloudscraper(CloudscraperOptions)) as string;
        const $ = load(comingData);

        return scrapSearchAnimeData($);

    } catch {
        return [];
    }
}