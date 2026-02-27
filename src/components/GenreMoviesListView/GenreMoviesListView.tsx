import { MovieList } from "../../api/film"
import type { FC } from "react"
import "./GenreMoviesListView.css"
import { Link } from "react-router-dom"
import { CardMovie } from "../CardMovie/CardMovie"
import Arrow from '../../assets/svg/arrow-icon.svg?react';

export interface GenreMoviesListProps {
  movies: MovieList;
  genre: string | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const GenreMoviesListView: FC<GenreMoviesListProps> = ({ movies, genre, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
    return (
        <div>
            <div className="genre-movies__wrapper-title">
                <Link to={"/genre"} className="genre-movies__link"><Arrow className="genre-movies__title-icon" /></Link>
                <h1 className="genre-movies__title">{genre}</h1>
            </div>

            <ul className="genre-movies__list">
                {movies.map((item) =>
                    <Link to={`/movie/${item.id}`} key={item.id}><li className="genre-movies__list-item"><CardMovie movie={item} /></li></Link>
                )}
            </ul>
            {hasNextPage && (
                <button
                    className="genre-movies__btn-more btn btn--submit"
                    type="button"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Загрузка...' : 'Показать ещё'}
                </button>
            )}
        </div>
    )
}