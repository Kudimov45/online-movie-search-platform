import { type FC } from "react";
import type { Movie } from "../../api/film";
import Star from '../../assets/svg/star-icon.svg?react';
import Favorite from '../../assets/svg/favorite-icon.svg?react';
import IsFavorite from '../../assets/svg/isFavorite-icon.svg?react';
import "./MovieInfo.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToFavorite, delFromFavorite, fetchFavoriteMovies } from "../../api/favorite";
import { queryClient } from "../../api/QueryClient";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { openLoginModal } from "../../store/createModalSlice";
import { openVideoPlayerModal } from "../../store/createVideoPlayerSlice";



export interface MovieInfoProps {
    movie: Movie
}

export const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.profile.profile);

    const { data: favoriteMovies } = useQuery({
        queryKey: ['favorite-movies'],
        queryFn: fetchFavoriteMovies,
        enabled: !!user,
    }, queryClient);

    const isFavorite = favoriteMovies?.some((favMovie) => favMovie.id === movie.id);

    const favoriteMoviesMutation = useMutation({
        mutationFn: (movieId: string) => addToFavorite(movieId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['favorite-movies']
            });
        }
    }, queryClient);

    const addMovieToFavorite = (movieId: string) => {
        if (user) {
            favoriteMoviesMutation.mutate(movieId);
        } else {
            dispatch(openLoginModal());
        }
    };

    const favoriteDelMoviesMutation = useMutation({
        mutationFn: (movieId: string) => delFromFavorite(movieId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['favorite-movies']
            });
        }
    }, queryClient)

    const handleDelete = (movieId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        favoriteDelMoviesMutation.mutate(movieId)
    };


    const getRatingClass = (rating: number) => {
        if (rating <= 4.2) return 'red';
        if (rating <= 6.3) return 'grey';
        if (rating <= 7.5) return 'green'
        return 'gold';
    };

    return (
        <>
            <div className="card--movie">
                <div className="card__wrapper">
                    <div className="card__inner">
                        <div className="card__wrapper-info">
                            <div className={`card__wrapper-rating card__wrapper-rating--${getRatingClass(movie.tmdbRating)}`}>
                                <Star />
                                <span className="card__rating">{movie.tmdbRating}</span>
                            </div>
                            <span className="card__release-year">{movie.releaseYear}</span>
                            <span className="card__genre">{movie.genres.join(', ')}</span>
                            <span className="card__runtime">{`${Math.floor((movie.runtime ?? 0) / 60)} ч ${Math.floor((movie.runtime ?? 0) % 60)} мин`}</span>
                        </div>
                        <h1 className="card__title">{movie.title}</h1>
                        <p className="card__info">{movie.plot}</p>
                    </div>
                    <div className="card__wrapper-btn card__wrapper-btn--movie-info">
                        <button className="card__link-trailer btn btn--submit" onClick={() => dispatch(openVideoPlayerModal({ videoUrl: movie.trailerUrl, title: movie.title }))}>Трейлер</button>
                        {isFavorite ?
                            <button className={`card__btn-favorite btn`} type="button" onClick={() => handleDelete(movie.id.toString())}>
                                <IsFavorite />
                            </button> :
                            <button className={`card__btn-favorite btn`} type="button" onClick={() => addMovieToFavorite(movie.id.toString())}><Favorite />
                            </button>}
                    </div>
                </div>
                <img className="card__img" src={movie.backdropUrl ? movie.backdropUrl : movie.posterUrl || '../../../public/default-poster.jpg'} alt="Постер фильма" width={680} height={552} />
            </div>
            <div className="about">
                <h2 className="about__title">О фильме</h2>
                <div className="about__wrapper">

                    {movie.language ?
                        <div className="about__wrapper-info">
                            <span className="about__name">Язык оригинала</span>
                            <div className="about__spacer" />
                            <span className="about__value"> {movie.language}</span>
                        </div>
                        : null}

                    {movie.budget ?
                        <div className="about__wrapper-info">
                            <span className="about__name">Бюджет</span>
                            <div className="about__spacer" />
                            <span className="about__value">{`${movie.budget} руб.`}</span>
                        </div>
                        : null}

                    {movie.revenue ?
                        <div className="about__wrapper-info">
                            <span className="about__name">Выручка</span>
                            <div className="about__spacer" />
                            <span className="about__value">{`${movie.revenue} руб.`}</span>
                        </div>
                        : null}

                    {movie.director ?
                        <div className="about__wrapper-info">
                            <span className="about__name">Режиссёр</span>
                            <div className="about__spacer" />
                            <span className="about__value">{movie.director}</span>
                        </div>
                        : null}

                    {movie.production ?
                        <div className="about__wrapper-info">
                            <span className="about__name">Продакшен</span>
                            <div className="about__spacer" />
                            <span className="about__value">{movie.production}</span>
                        </div>
                        : null}

                    {movie.awardsSummary ?
                        <div className="about__wrapper-info">
                            <span className="about__name">Награды</span>
                            <div className="about__spacer" />
                            <span className="about__value">{Array.isArray(movie.awardsSummary)
                                ? movie.awardsSummary.join(", ")
                                : movie.awardsSummary
                            }</span>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}