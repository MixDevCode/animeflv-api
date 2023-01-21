import { load } from "cheerio";
import cloudscraper from "cloudscraper";
import { CloudscraperOptions } from "../constants";
import { ChapterData } from "../types";

export async function getLatest(): Promise<ChapterData[]> {
    try {

        CloudscraperOptions.uri = 'https://www3.animeflv.net/';

        const chaptersData = (await cloudscraper(CloudscraperOptions)) as string;
        const $ = load(chaptersData);

        const chapters: ChapterData[] = []
        if ($('body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li').length > 0) {
            $('body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li').each((i, el) => {
                const temp: ChapterData = {
                    title: $(el).find('strong').text(),
                    chapter: Number($(el).find('span.Capi').text().replace("Episodio ", "")),
                    cover: 'https://animeflv.net' + ($(el).find('img').attr('src') as string),
                    url: 'https://www3.animeflv.net' + $(el).find('a').attr('href') as string
                }

                chapters.push(temp);
            });
        }

        return chapters;

    } catch {
        return [];
    }
}