import {useQuery} from '@tanstack/react-query'
import { fetchFavoriteMovies } from '../../api/favorite'
import { queryClient } from '../../api/QueryClient'
import { Loader } from '../Loader/Loader'
import { FavoriteMovies } from '../FavoriteMovies/FavoriteMovies'


export const FetchFavoriteMovies = () => {

    const favoriteMoviesQuery = useQuery({
        queryFn: () => fetchFavoriteMovies(),
        queryKey: ['favorite-movies'],
    },  queryClient)

    switch(favoriteMoviesQuery.status){
        case 'pending':
            return <Loader/>
        case 'success':
            return <>
             <FavoriteMovies movieList={favoriteMoviesQuery.data} />
            </>
            
        case 'error':
            return <div>
                <span>Ошибка</span>
                <button type="button" onClick={() => favoriteMoviesQuery.refetch()}>Повторить запрос </button>
            </div>
    }
}


