import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { type SearchAnimeResults } from "../types";
import { executeSearch } from "../utils";

export async function searchAnimesBySpecificURL(url: string): Promise<SearchAnimeResults | null> {

    if (!url || (typeof url) !== "string")
        throw new TypeError(`Parámetro url debe ser una string no vacía, pasaste: ${url}`, { cause: "url is not a valid url." });

    try {
        CloudscraperOptions.uri = url;

        const specificData = (await cloudscraper(CloudscraperOptions)) as string;

        return executeSearch(specificData)
    }
    catch {
        return null;
    }
}