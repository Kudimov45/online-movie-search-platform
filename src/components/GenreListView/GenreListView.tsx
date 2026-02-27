import { GenreList } from "../../api/film"
import type { FC } from "react"
import "./index.css"
import { CardGenre } from "../CardGenre/CardGenre"
import { Link } from "react-router-dom"

export interface GenreListProps {
  genres: GenreList
}

export const GenreListView: FC<GenreListProps> = ({genres}) => {
    return(
    <div>
        <h2 className="genres__title">Жанры фильмов</h2>
        <ul className="genres__list">
            {genres.map((item, index)=> 
                <Link to={`/movies/${item}`} ><li key={index} className="genres__list-item"><CardGenre genre={item} /></li></Link>
            )}
            
        </ul>
    </div>
    )
}