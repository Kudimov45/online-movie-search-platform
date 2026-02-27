import { MovieList } from './film'
import { validateResponse } from './validateResponse'

const URL = "https://cinemaguide.skillbox.cc/"

export function fetchFavoriteMovies(): Promise<MovieList> {
    return fetch(`${URL}favorites`, {credentials: 'include'}).then((response) => response.json()).then((data) => MovieList.parse(data))
}

export function addToFavorite(filmId: string): Promise<void> {
    return fetch(`${URL}favorites`, {
         method: "POST",
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: filmId,
        })
    }).then(validateResponse).then(()=> undefined)
}

export function delFromFavorite(filmId: string): Promise<void> {
    return fetch(`${URL}favorites/${filmId}`, {
         method: "DELETE",
         credentials: 'include',
    }).then(validateResponse).then(()=> undefined)
}
