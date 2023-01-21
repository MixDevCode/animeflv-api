import { load } from "cheerio";
import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { AnimeOnAirData, AnimeType } from "../types";

export async function getOnAir(): Promise<AnimeOnAirData[]> {
    try {

        CloudscraperOptions.uri = 'https://www3.animeflv.net/';

        const onAirData = (await cloudscraper(CloudscraperOptions)) as string;
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
