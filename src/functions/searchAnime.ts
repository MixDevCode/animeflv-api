import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { SearchAnimeResults } from "../types";
import { executeSearch } from "../utils";

export async function searchAnime(query: string): Promise<SearchAnimeResults | null> {

    if (!query || (typeof query) !== "string")
        throw new TypeError(`El parámetro query debe ser una string no vacía, pasaste: ${query}`, { cause: `query: ${query}` });

    try {
        CloudscraperOptions.uri = 'https://www3.animeflv.net/browse?q=' + query.toLowerCase().replace(/\s+/g, "+");

        const searchData = (await cloudscraper(CloudscraperOptions)) as string;

        return executeSearch(searchData)

    } catch {
        return null;
    }
}