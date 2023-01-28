import { AnimeGenres, AnimeStatuses, AnimeTypes, FilterOrderEnum } from "../constants";

export type AnimeStatus = typeof AnimeStatuses[number];
export type AnimeType = typeof AnimeTypes[number];
export type AnimeGenre = typeof AnimeGenres[number];
export type FilterOrderType = keyof typeof FilterOrderEnum;
export type FilterAnimeResults = SearchAnimeResults

export interface PartialAnimeData {
    /** Título del animé */
    title: string
    /** URL de la carátula del animé */
    cover: string
    /** La sinopsis (descripción) del animé */
    synopsis: string
    /** Evaluación de estrellas del animé */
    rating: string
    /** Id del animé */
    id: string
    /** El tipo de anime: OVA | Anime | Película | Especial */
    type: AnimeType
    /** La URL directa a la página de éste animé */
    url: string
}

export interface SearchAnimeResults {

    /** URL a la página anterior, o null en caso de no haber*/
    previousPage: string | null
    /** URL a la página siguiente, o null en caso de no haber*/
    nextPage: string | null
    /** Número de páginas con resultados de la búsqueda realizada */
    foundPages: number
    /** Los animés encontrados en la búsqueda */
    data: PartialAnimeData[]
}

export interface AnimeData {
    /** Titulo del animé */
    title: string
    /** Array con titulos alternativos de este animé */
    alternative_titles: string[]
    /** Estado de este animé: "En emision" | "Finalizado" | "Proximamente" */
    status: AnimeStatus
    /** Evaluación de estrellas de este animé */
    rating: string
    /** El tipo de anime: "OVA" | "Anime" | "Película" | "Especial" */
    type: AnimeType
    /** URL a la carátula de este animé */
    cover: string
    /** Sinopsis o descripción del animé */
    synopsis: string
    /** Array con los géneros (etiquetas) del anime */
    genres: AnimeGenre[]
    /** Número de episodios que tiene este animé */
    episodes: EpisodeData[]
    /** La URL directa a la pagina del animé */
    url: string
}

export interface EpisodeData {
    /** Número del episodio */
    number: number
    /** Link del episodio */
    url: string
}

export interface ChapterData {
    /** Título del episodio */
    title: string
    /** Número del episodio */
    chapter: number
    /** URL del thumbnail de este episodio */
    cover: string
    /** URL directa del episodio */
    url: string
}

export interface AnimeOnAirData {
    /** Título del animé */
    title: string
    /** El tipo de anime: "OVA" | "Anime" | "Película" | "Especial" */
    type: AnimeType
    /** La id de este animé */
    id: string
    /** La URL directa a la página de este anime */
    url: string
}
export interface FilterOptions {
    /** Lista de generos para la búsqueda */
    genres?: AnimeGenre[]
    /** Lista de tipos para la búsqueda */
    types?: AnimeType[]
    /** Los statuses de los animés para filtrar */
    statuses?: AnimeStatus[]
    /** El orden en el que se recibirán los animés */
    order?: FilterOrderType
}
