import { FetchGenreMovies } from '../../components/FetchGenreMovies/FetchGenreMovies';
import './GenreMoviesPage.css';

export default function GenreMoviesPage() {


    return (
        <>
            <section className="genre-movies">
                <FetchGenreMovies/>
            </section>
        </>
    );
}