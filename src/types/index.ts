import { AnimeGenres, AnimeStatuses, AnimeStatusEnum, AnimeTypes, FilterOrderEnum } from "../constants";

/** Puede que hayan status faltantes */
export type AnimeStatus = typeof AnimeStatuses[number];
/** Puede que hayan tipos faltantes */
export type AnimeType = typeof AnimeTypes[number];

export type AnimeGenre = typeof AnimeGenres[number];
export type FilterOrder = keyof typeof FilterOrderEnum;

export interface SearchAnimeData {
    title: string
    cover: string
    synopsis: string
    rating: string
    id: string
    type: AnimeType
    url: string
}

export interface AnimeFilterResults {
    previousPage: string | null
    nextPage: string | null
    foundPages: number
    data: SearchAnimeData[]
}

export interface AnimeData {
    title: string
    alternative_titles: string[]
    status: AnimeStatus
    rating: string
    type: AnimeType
    cover: string
    synopsis: string
    genres: AnimeGenre[]
    episodes: number
    url: string
}

export interface ChapterData {
    title: string
    chapter: number
    cover: string
    url: string
}

export interface AnimeOnAirData {
    title: string
    type: AnimeType
    id: string
    url: string
}
export interface FilterOptions {
    genres?: AnimeGenre[]
    types?: AnimeType[]
    statuses?: AnimeStatus[]
    order?: FilterOrder
}
