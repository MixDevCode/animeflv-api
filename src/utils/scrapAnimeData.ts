import { type CheerioAPI } from "cheerio"
import type { AnimeType, SearchAnimeData } from "../types";

export function scrapSearchAnimeData($: CheerioAPI): SearchAnimeData[] {

	const selectedElement = $('body > div.Wrapper > div > div > main > ul > li')

	if (selectedElement.length > 0) {
		const data: SearchAnimeData[] = []

		selectedElement.each((i, el) => {
			const temp: SearchAnimeData = {
				title: $(el).find('h3').text(),
				cover: $(el).find('figure > img').attr('src')!,
				synopsis: $(el).find('div.Description > p').eq(1).text(),
				rating: $(el).find('article > div > p:nth-child(2) > span.Vts.fa-star').text(),
				id: $(el).find('a').attr('href')!.replace("/anime/", ""),
				type: $(el).find('a > div > span.Type').text() as AnimeType,
				url: 'https://www3.animeflv.net' + ($(el).find('a').attr('href') as string),
			}

			data.push(temp);
		});

		return data;

	} else {
		return [];
	}
}