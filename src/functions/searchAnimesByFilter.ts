import { load } from "cheerio"
import cloudscraper from "cloudscraper"
import { AnimeGenres, CloudscraperOptions } from "../constants"
import { AnimeFilterResults, AnimeGenre, AnimeStatus, AnimeType } from "../types"
import { scrapSearchAnimeData } from "../utils/scrapAnimeData"

const FilterOrder = {
	"Por Defecto": "default",
	"Recientemente Actualizados": "recent",
	"Recientemente Agregados": "added",
	"Nombre A-Z": "title",
	"Calificacion": "rating"
}

const AnimeTypeEnum = {
	"Anime": "tv",
	"Película": "movie",
	"Especial": "special",
	"OVA": "ova"
}

const AnimeStatusEnum = {
	"En emision": 1,
	"Finalizado": 2,
	"Proximamente": 3,
}

interface FilterOptions {
	genres?: AnimeGenre[]
	types?: AnimeType[]
	status?: (keyof typeof AnimeStatusEnum)[]
	order?: keyof typeof FilterOrder
}



function generateRequestUrl(options?: FilterOptions): string {
	const quitarAcentos = (cadena: string) => {
		const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
		//@ts-ignore
		return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
	}

	if (!options) return "https://www3.animeflv.net/browse?order=default"

	const FinalUrl = new URL("https://www3.animeflv.net/browse")

	let filteredGenres: string[] | string = ""
	let parsedStatuses: string[] | string = ""
	let parsedTypes: string[] | string = ""
	let filterOrder: string = "default"

	const genrePrefix = "genre[]"
	const typePrefix = "type[]"
	const statusPrefix = "status[]"
	const orderPrefix = "order"

	if (options.genres && Array.isArray(options.genres)) {
		filteredGenres = options.genres.filter(genre => AnimeGenres.includes(genre))

		for (const genre of filteredGenres) {
			const normalizedGenre = quitarAcentos(genre).replace(/\s+/g, "-").toLowerCase()

			FinalUrl.searchParams.append(genrePrefix, normalizedGenre)
		}
	}

	if (options.status && Array.isArray(options.status)) {
		parsedStatuses = options.status.filter(status => status in AnimeStatusEnum)

		for (const status of parsedStatuses) {
			FinalUrl.searchParams.append(statusPrefix, AnimeStatusEnum[status as AnimeStatus].toString())
		}
	}

	if (options.types && Array.isArray(options.types)) {
		parsedTypes = options.types.filter(type => type in AnimeTypeEnum)

		for (const type of parsedTypes) {
			FinalUrl.searchParams.append(typePrefix, AnimeTypeEnum[type as AnimeType])
		}
	}

	if (options.order && (options.order in FilterOrder)) {
		FinalUrl.searchParams.append(orderPrefix, FilterOrder[options.order])
	} else {
		FinalUrl.searchParams.append(orderPrefix, FilterOrder["Por Defecto"])
	}

	return FinalUrl.toString()
}

export async function searchAnimesByFilter(opts?: FilterOptions): Promise<AnimeFilterResults | null> {
	try {
		/** La url del request con los filtros ya puestos */
		const formatedUrl = generateRequestUrl(opts)

		CloudscraperOptions.uri = formatedUrl;

		const filterData = (await cloudscraper(CloudscraperOptions)) as string;
		const $ = load(filterData);

		const filter: AnimeFilterResults = {
			previousPage: null,
			nextPage: null,
			foundPages: 0,
			data: []
		}

		filter.data = scrapSearchAnimeData($)

		const pageSelector = $('body > div.Wrapper > div > div > main > div > ul > li');

		if (pageSelector.eq(0).children('a').attr('href') as string == "#") filter.previousPage = null;
		else filter.previousPage = 'https://www3.animeflv.net' + (pageSelector.eq(0).children('a').attr('href') as string);

		if (pageSelector.last().children('a').attr('href') as string == "#") filter.nextPage = null;
		else filter.nextPage = 'https://www3.animeflv.net' + (pageSelector.last().children('a').attr('href') as string);

		filter.foundPages = Number(pageSelector.last().prev().find('a').text());

		return filter;
	}

	catch {
		return null;
	}
}