import {useQuery} from '@tanstack/react-query'
import { fetchTopTenMovie } from "../../api/film";
import { queryClient } from "../../api/QueryClient";
import { Loader } from '../Loader/Loader';
import { MovieListView } from '../MovieListView/MovieListView';

export const FetchTopTenMovie = () => {

    const topTenMovieQuery = useQuery({
        queryFn: () => fetchTopTenMovie(),
        queryKey: ['top10-movie'],
    },  queryClient)

    switch(topTenMovieQuery.status){
        case 'pending':
            return <Loader/>
        case 'success':
            return <MovieListView movieList={topTenMovieQuery.data}/>
            
        case 'error':
            return <div>
                <span>Ошибка</span>
                <button type="button" onClick={() => topTenMovieQuery.refetch()}>Повторить запрос </button>
                {console.error(topTenMovieQuery.error?.message)}
            </div>
    }
}