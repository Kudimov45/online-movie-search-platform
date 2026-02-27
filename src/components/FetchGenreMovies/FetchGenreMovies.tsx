import { useInfiniteQuery } from '@tanstack/react-query'
import { queryClient } from "../../api/QueryClient";
import { Loader } from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../api/film';
import { GenreMoviesListView } from '../GenreMoviesListView/GenreMoviesListView'

export const FetchGenreMovies = () => {
    const { genre } = useParams<{ genre: string }>();

    const genreMoviesQuery = useInfiniteQuery({
        queryKey: ['genre-movies', genre],
        queryFn: ({ pageParam = 0 }) => fetchMovies(genre, pageParam, 15),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length >= 0 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 0,
    }, queryClient);

    

    switch (genreMoviesQuery.status) {
        case 'pending':
            return <Loader />;
        case 'success':
            const allMovies = genreMoviesQuery.data.pages.flatMap(page => page);
            return (
                <GenreMoviesListView
                    movies={allMovies}
                    genre={genre}
                    fetchNextPage={genreMoviesQuery.fetchNextPage}
                    hasNextPage={genreMoviesQuery.hasNextPage}
                    isFetchingNextPage={genreMoviesQuery.isFetchingNextPage}
                />
            );
        case 'error':
            return (
                <div>
                    <span>Ошибка</span>
                    <button type="button" onClick={() => genreMoviesQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
};