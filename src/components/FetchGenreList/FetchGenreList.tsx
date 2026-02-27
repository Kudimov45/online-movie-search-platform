import {useQuery} from '@tanstack/react-query'
import { fetchGenreList } from "../../api/film";
import { GenreListView } from '../GenreListView/GenreListView';
import { queryClient } from "../../api/QueryClient";
import { Loader } from '../Loader/Loader';

export const FetchGenreList = () => {

    const genreMovieQuery = useQuery({
        queryFn: () => fetchGenreList(),
        queryKey: ['genre-movie'],
    },  queryClient)

    switch(genreMovieQuery.status){
        case 'pending':
            return <Loader/>
        case 'success':
            return <>
             <GenreListView genres={genreMovieQuery.data} />
            </>
            
        case 'error':
            return <div>
                <span>Ошибка</span>
                <button type="button" onClick={() => genreMovieQuery.refetch()}>Повторить запрос </button>
            </div>
    }
}