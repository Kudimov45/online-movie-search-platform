import { FetchGenreList } from "../../components/FetchGenreList/FetchGenreList";
import './GenrePage.css'

export default function GenrePage() {
    return (
        <>
            <section className="genres">
                <FetchGenreList/>
            </section>
        </>
    );
}