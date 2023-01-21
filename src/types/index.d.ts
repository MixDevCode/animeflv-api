import { AnimeGenres, AnimeStatus, AnimeType } from "../constants";

/** Puede que hayan status faltantes */
type AnimeStatus = typeof AnimeStatus[number];
/** Puede que hayan tipos faltantes */
type AnimeType = typeof AnimeType[number];

type AnimeGenre = typeof AnimeGenres[number];

interface SearchAnimeData {
	title: string
	cover: string
	synopsis: string
	rating: string
	id: string
	type: AnimeType
	url: string
}

interface AnimeFilterResults {
	previousPage: string | null
	nextPage: string | null
	foundPages: number
	data: SearchAnimeData[]
}

interface AnimeData {
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

interface ChapterData {
	title: string
	chapter: number
	cover: string
	url: string
}

interface AnimeOnAirData {
	title: string
	type: AnimeType
	id: string
	url: string
}

declare function searchAnime(query: string): Promise<SearchAnimeData[] | null>