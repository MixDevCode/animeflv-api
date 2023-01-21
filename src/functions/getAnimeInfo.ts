import { CloudscraperOptions } from "../constants";
import type { AnimeData, AnimeGenre, AnimeStatus, AnimeType } from "../types";
import { load } from "cheerio";
import cloudscraper from "cloudscraper";

export async function getAnimeInfo(animeId: string): Promise<AnimeData | null> {
	try {

		CloudscraperOptions.uri = 'https://www3.animeflv.net/anime/' + animeId;

		const animeData = (await cloudscraper(CloudscraperOptions)) as string;
		const $ = load(animeData);

		const animeInfo: AnimeData = {
			title: $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > h1').text(),
			alternative_titles: [],
			status: $('body > div.Wrapper > div > div > div.Container > div > aside > p > span').text() as AnimeStatus,
			rating: $('#votes_prmd').text(),
			type: $('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > span').text() as AnimeType,
			cover: 'https://animeflv.net' + ($('body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img').attr('src') as string),
			synopsis: $('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p').text(),
			genres: $('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a').text().split(/(?=[A-Z])/) as AnimeGenre[],
			episodes: JSON.parse($('script').eq(15).text().match(/episodes = (\[\[.*\].*])/)?.[1] as string).length ?? 0,
			url: CloudscraperOptions.uri
		};
		$('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span').each((i, el) => {
			animeInfo.alternative_titles.push($(el).text());
		})

		return animeInfo;
	} catch {
		return null
	}
}