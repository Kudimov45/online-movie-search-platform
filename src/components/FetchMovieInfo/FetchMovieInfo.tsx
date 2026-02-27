import { useParams } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query'
import { fetchMovie } from '../../api/film';
import { queryClient } from '../../api/QueryClient';
import { Loader } from '../Loader/Loader';
import { MovieInfo } from '../MovieInfo/MovieInfo';

export const FetchMovieInfo = () => {

    const { movieId } = useParams();

    const MovieQuery = useQuery({
        queryFn: () => fetchMovie( movieId),
        queryKey: ['movie', movieId],
    },  queryClient)


    switch(MovieQuery.status){
        case 'pending':
            return <Loader/>
        case 'success':
            return <MovieInfo movie={MovieQuery.data}/>
            
        case 'error':
            return <div>
                <span>Ошибка</span>
                <button type="button" onClick={() => MovieQuery.refetch()}>Повторить запрос </button>
            </div>
    }
}