import { z } from 'zod'

const URL = "https://cinemaguide.skillbox.cc/"

export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    releaseYear: z.number().nullable(),
    genres: z.array(z.string()),
    plot: z.string(),
    runtime: z.number(),
    posterUrl: z.string().nullable(),
    trailerUrl: z.string(),
    tmdbRating: z.number(),
    backdropUrl: z.string().nullable(),
    language: z.string(),
    budget: z.string().nullable(),
    revenue: z.string().nullable(),
    director: z.string().nullable(),
    production: z.string().nullable(),
    awardsSummary: z.any()
})

export type Movie = z.infer<typeof MovieSchema>

export const MovieList = z.array(MovieSchema)

export type MovieList = z.infer<typeof MovieList>

export const GenreSchema = z.string()

export type Genre = z.infer<typeof GenreSchema>

export const GenreList = z.array(GenreSchema)

export type GenreList = z.infer<typeof GenreList>

export function fetchMovie(id: string | undefined): Promise<Movie> {
    return fetch(`${URL}movie/${id}`).then((response) => response.json()).then((data) => MovieSchema.parse(data))
}

export function fetchRandomMovie(): Promise<Movie> {
    return fetch(`${URL}movie/random`).then((response) => response.json()).then((data) => MovieSchema.parse(data))
}

export function fetchTopTenMovie(): Promise<MovieList> {
    return fetch(`${URL}movie/top10`).then((response) => response.json()).then((data) => MovieList.parse(data))
}

export function fetchGenreList(): Promise<GenreList> {
    return fetch(`${URL}movie/genres`).then((response) => response.json()).then((data) => GenreList.parse(data))
}

export function fetchFilterMovieList(param: string): Promise<MovieList> {
    return fetch(`${URL}movie?title=${param}`).then((response) => response.json()).then((data) => MovieList.parse(data))
}

export function fetchMovies(param: string | undefined, page?: number, limit?: number): Promise<MovieList> {
    let url = `${URL}movie?genre=${param}`;
    if (page !== undefined && limit !== undefined) {
        url += `&page=${page}&count=${limit}`;
    }
    return fetch(url).then((response) => response.json()).then((data) => MovieList.parse(data));
}