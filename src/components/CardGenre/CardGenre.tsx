import type { FC } from "react";
import './CardGenre.css'
import type { Genre } from "../../api/film";
import { defaultGenreIcon, genreIcons } from "../../icons/genreIcons";


export interface GenreProps {
  genre: Genre;
}

export const CardGenre: FC<GenreProps> = ({genre}) => {
    return (
        <div className="card-genre" >
            <img className="card-genre__img" src={genreIcons[genre] ?? defaultGenreIcon}  alt="" width={288} height={220}/>
            <span className="card-genre__name">{genre}</span>
        </div>
    )
}