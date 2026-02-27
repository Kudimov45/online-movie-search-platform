import { CardMovie } from "../CardMovie/CardMovie"
import { MovieList } from "../../api/film"
import type { FC } from "react"
import "./index.css"
import { Link } from "react-router-dom"

export interface MovieListProps {
  movieList: MovieList
}

export const MovieListView: FC<MovieListProps> = ({movieList}) => {
    return(
    <div className="top-ten__wrapper">
        <h2 className="top-ten__title">Топ 10 фильмов</h2>
        <ul className="movie__list">
            {movieList.map((item, index)=> 
                <Link to={`movie/${item.id}`}><li key={item.id} className="movie__list-item"><CardMovie movie={item} top={index+1}/></li></Link>
            )}
            
        </ul>
    </div>
    )
}