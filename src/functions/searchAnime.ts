import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { scrapSearchAnimeData } from "../utils";
import { load } from "cheerio";
import { SearchAnimeData } from "../types";

export async function searchAnime(query: string): Promise<SearchAnimeData[]> {
	try {

		CloudscraperOptions.uri = 'https://www3.animeflv.net/browse?q=' + query.toLowerCase().replace(/\s+/g, "+");

		const searchData = (await cloudscraper(CloudscraperOptions)) as string;
		const $ = load(searchData);

		return scrapSearchAnimeData($);
	} catch {
		return [];
	}
}