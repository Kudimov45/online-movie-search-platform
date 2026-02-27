import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFilterMovieList } from '../../api/film';
import { Link } from 'react-router-dom';
import './SearchMovie.css';
import Star from '../../assets/svg/star-icon.svg?react';
import Search from '../../assets/svg/search-icon.svg?react';
import { queryClient } from '../../api/QueryClient';

export const SearchMovie = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpenSearch = () => setMobileSearchOpen(true);
        window.addEventListener('openMobileSearch', handleOpenSearch);
        return () => window.removeEventListener('openMobileSearch', handleOpenSearch);
    }, []);

    const { data: movies, isLoading } = useQuery({
        queryKey: ['searchMovies', debouncedQuery],
        queryFn: () => fetchFilterMovieList(debouncedQuery),
        enabled: !!debouncedQuery,
    }, queryClient);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
                setMobileSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getRatingClass = (rating: number) => {
        if (rating <= 4.2) return 'red';
        if (rating <= 6.3) return 'grey';
        if (rating <= 7.5) return 'green';
        return 'gold';
    };

    return (
        <div className={`search-container ${isMobileSearchOpen ? 'search-container--open' : ''}`} ref={searchRef}>
            <Search 
                className="menu-list__item-icon" 
                onClick={() => setMobileSearchOpen(true)}
            />
            <div className={`search-form-wrapper ${isMobileSearchOpen ? 'search-form-wrapper--visible' : ''}`}>
                <div className="menu-list__item--search">
                    <Search className="menu-search__btn" />
                    <input
                        type="text"
                        className="menu-search"
                        placeholder="Поиск по названию фильма"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setDropdownVisible(true)}
                    />
                    <button className="menu-search__close-btn" onClick={() => {
                        setMobileSearchOpen(false);
                        setDropdownVisible(false);
                        setQuery('');
                    }}>
                        &times;
                    </button>
                </div>
                {isDropdownVisible && (query || movies) && (
                    <div className="search-dropdown">
                        {isLoading && <div className="search-loading">Загрузка...</div>}
                        <div className="search-results-list">
                            {movies?.slice(0, 5).map((movie) => (
                                <Link to={`/movie/${movie.id}`} key={movie.id} className="search-item" onClick={() => {
                                    setDropdownVisible(false);
                                    setMobileSearchOpen(false);
                                }}>
                                    <img src={movie.posterUrl} alt={movie.title} className="search-item__poster" />
                                    <div className="search-item__details">
                                        <div className='search-item__meta'>
                                            <div className={`card__wrapper-rating card__wrapper-rating--${getRatingClass(movie.tmdbRating)}`}>
                                                <Star />
                                                <span className={`card__rating`}>{movie.tmdbRating}</span>
                                            </div>
                                            <span className="search-item__year">{movie.releaseYear}</span>
                                            <span className="search-item__genre">{movie.genres[0]}</span>
                                        </div>
                                        <span className="search-item__runtime">
                                            {`${Math.floor((movie.runtime ?? 0) / 60)} ч ${Math.floor((movie.runtime ?? 0) % 60)} мин`}
                                        </span>
                                        <span className="search-item__title">{movie.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};