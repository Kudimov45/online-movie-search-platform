import type { FC } from "react"
import type { MovieList } from "../../api/film"
import { Link } from "react-router-dom"
import { CardMovie } from "../CardMovie/CardMovie"
import './FavoriteMovies.css'
import Close from '../../assets/svg/close-icon.svg?react';
import { useMutation } from '@tanstack/react-query';
import { delFromFavorite } from "../../api/favorite"
import { queryClient } from "../../api/QueryClient"

export interface FavoriteMoviesProps {
    movieList: MovieList
}

export const FavoriteMovies: FC<FavoriteMoviesProps> = ({ movieList }) => {

    const favoriteMoviesMutation = useMutation({
        mutationFn: (movieId: string) => delFromFavorite(movieId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['favorite-movies']
            });
        }
    }, queryClient)

    const handleDelete = (movieId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        favoriteMoviesMutation.mutate(movieId)
    };

    return (
        <div>
            <ul className="movie__list">
                {movieList.map((item) =>

                    <li key={item.id} className="movie__list-item">
                        <Link to={`/movie/${item.id}`}>
                            <CardMovie movie={item} />
                        </Link>
                        <button className="movie__btn-del" onClick={() => handleDelete(item.id.toString())} type="button">
                            <Close />
                        </button>
                    </li>

                )}

            </ul>
        </div>
    )
}

