import { OptionsWithUrl } from "cloudscraper";

export const AnimeGenres = [
	"Acción", "Artes Marciales", "Aventuras", "Carreras", "Ciencia Ficción", "Comedia", "Demencia", "Demonios", "Deportes", "Drama", "Ecchi", "Escolares", "Espacial", "Fantasía", "Harem", "Histórico", "Infantil", "Josei", "Juegos", "Magia", "Mecha", "Militar", "Misterio", "Música", "Parodia", "Policía", "Psicológico", "Recuentos de la vida", "Romance", "Samurai", "Seinen", "Shoujo", "Shounen", "Sobrenatural", "Superpoderes", "Suspenso", "Terror", "Vampiros", "Yaoi", "Yuri"
] as const;

export const AnimeStatus = ["En emision", "Finalizado", "Proximamente"] as const;
export const AnimeType = ["OVA", "Anime", "Película", "Especial"] as const

export const CloudscraperOptions: OptionsWithUrl = {
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
		'Cache-Control': 'private',
		'Referer': 'https://www.google.com/search?q=animeflv',
		'Connection': 'keep-alive',
	},
	uri: ""
}