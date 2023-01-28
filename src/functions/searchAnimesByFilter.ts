import cloudscraper from "cloudscraper"
import { AnimeGenres, AnimeStatusEnum, AnimeTypeEnum, CloudscraperOptions, FilterOrderEnum } from "../constants"
import { AnimeStatus, AnimeType, FilterOptions, FilterAnimeResults } from "../types"
import { executeSearch } from "../utils"

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

    if (options.statuses && Array.isArray(options.statuses)) {
        parsedStatuses = options.statuses.filter(status => status in AnimeStatusEnum)

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

    if (options.order && (options.order in FilterOrderEnum)) {
        FinalUrl.searchParams.append(orderPrefix, FilterOrderEnum[options.order])
    } else {
        FinalUrl.searchParams.append(orderPrefix, FilterOrderEnum["Por Defecto"])
    }

    return FinalUrl.toString()
}

export async function searchAnimesByFilter(opts?: FilterOptions): Promise<FilterAnimeResults | null> {
    try {
        /** La url del request con los filtros ya puestos */
        const formatedUrl = generateRequestUrl(opts)

        CloudscraperOptions.uri = formatedUrl;

        const filterData = (await cloudscraper(CloudscraperOptions)) as string;

        return executeSearch(filterData)
    }

    catch {
        return null;
    }
}