import {useQuery} from '@tanstack/react-query'
import { fetchRandomMovie } from "../../api/film";
import { queryClient } from "../../api/QueryClient";
import { Loader } from '../Loader/Loader';
import { CardRandomMovie } from '../CardRandomMovie/CardRandomMovie';

export const FetchRandomMovie = () => {

    const randomMovieQuery = useQuery({
        queryFn: () => fetchRandomMovie(),
        queryKey: ['random-movie'],
    },  queryClient)

    switch(randomMovieQuery.status){
        case 'pending':
            return <Loader/>
        case 'success':
            return <>
             <CardRandomMovie movie={randomMovieQuery.data} refetch={randomMovieQuery.refetch}/>
            </>
            
        case 'error':
            return <div>
                <span>Ошибка</span>
                <button type="button" onClick={() => randomMovieQuery.refetch()}>Повторить запрос </button>
            </div>
    }
}