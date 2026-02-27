import { useState } from "react";
import type { UserProfile } from "../../api/user";
import { FetchFavoriteMovies } from "../../components/FetchFavoriteMovies/FetchFavoriteMovies";
import { SettingsProfile } from "../../components/SettingsProfile/SettingsProfile";
import "./ProfilePage.css"
import Favorite from '../../assets/svg/favorite-icon.svg?react';
import User from '../../assets/svg/user-icon.svg?react';

export interface ProfileProps {
  data: UserProfile
}

export default function ProfilePage() {
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(true);
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    return (
        <>
            <section className="profile">
                <h1 className="profile__title">Мой аккаунт</h1>
                <div className="profile__wrapper-btn">
                    <button className={ isFavoriteOpen ? "profile__btn-favorite btn btn--menu active" : "profile__btn-favorite btn btn--menu"} type="button" onClick={()=>{setIsFavoriteOpen(true); setIsSettingOpen(false)}}>
                        <Favorite className="profile__icon-btn"/>
                        <span className="profile__span">Избранные фильмы</span >
                        <span className="profile__span--small">Избранное</span>
                    </button>
                    <button className={ isSettingOpen ? "profile__btn-favorite btn btn--menu active" : "profile__btn-favorite btn btn--menu"} type="button" onClick={()=>{setIsFavoriteOpen(false); setIsSettingOpen(true)}}>
                        <User className="profile__icon-btn"/>
                        <span className="profile__span">Настройки аккаунта</span>
                        <span className="profile__span--small">Настройки</span>
                    </button>
                </div>
                <div className="profile__wrapper-info">
                    {isFavoriteOpen && <FetchFavoriteMovies/>}
                    {isSettingOpen && <SettingsProfile/>}
                </div>
            </section>
        </>
    );
}