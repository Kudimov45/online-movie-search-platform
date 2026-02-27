import type { FC } from "react";
import type { Movie } from "../../api/film";
import './index.css'

export interface TopTenMovieProps {
  movie: Movie;
  top?: number
}

export const CardMovie: FC<TopTenMovieProps> = ({movie, top}) => {
    return (
        <div className="card-movie" >
            <img className="card-movie__img" src={movie.posterUrl ? movie.posterUrl : movie.backdropUrl || 'top.jpg'} alt="" width={222} height={334}/>
            {top ? <span className="card-movie__top">{top}</span> : <span></span>}
        </div>
    )
}