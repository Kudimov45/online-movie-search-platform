import { type FC, type ReactNode, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { LoginForm } from "../LoginForm/LoginFrom";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { VideoPlayerModal } from "../VideoPlayerModal/VideoPlayerModal";
import "./index.css";
import Logo from '../../assets/svg/logo-icon.svg?react';
import { SearchMovie } from "../SearchMovie/SearchMovie";
import OK from '../../assets/svg/ok-icon.svg?react';
import Tg from '../../assets/svg/tg-icon.svg?react';
import VK from '../../assets/svg/vk-icon.svg?react';
import Youtube from '../../assets/svg/youtube-icon.svg?react';
import Genres from '../../assets/svg/genres-icon.svg?react';
import Search from '../../assets/svg/search-icon.svg?react';
import User from '../../assets/svg/user-icon.svg?react';
import { profileUser } from "../../api/user";
import { queryClient } from "../../api/QueryClient";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../store/createProfileSlice";
import { openLoginModal, closeLoginModal, openRegisterModal, closeRegisterModal } from "../../store/createModalSlice";
import type { RootState } from "../../store/store";

type Props = {
	children?: ReactNode[];
};

const CusomLayout: FC<Props> = () => {
	const { isLoginOpen, isRegisterOpen } = useSelector((state: RootState) => state.modal);
;
	const profileQuery = useQuery({
        queryFn: () => profileUser(),
        queryKey: ['users', 'me'],
    },  queryClient)

	const dispatch = useDispatch()

	useEffect(() => {
		if (profileQuery.data) {
			dispatch(setProfile(profileQuery.data))
		}
	}, [profileQuery.data, dispatch])

	const userSurName = profileQuery.data?.surname;

	
	return (
		<div className="layout">
			<header className="header">
				<Link to={"/"} className="header-logo"><Logo width={144} height={32} className="header-logo__icon"/></Link>
				<nav className="menu">
                <ul className="menu-list">
                	<li className="menu-list__item menu-list__item--main"><NavLink className={({isActive}) => isActive ? "menu-list__item-link btn btn--menu active" : "menu-list__item-link btn btn--menu"} to={"/"}><span className="menu-list__item-name">Главная</span></NavLink></li>
					<li className="menu-list__item"><NavLink className={({isActive}) => isActive ? "menu-list__item-link btn btn--menu active" : "menu-list__item-link btn btn--menu"} to={"/genre"}><Genres className="menu-list__item-icon"/><span className="menu-list__item-name">Жанры</span></NavLink></li>
					<li className="menu-list__item menu-list__item--search">
						<SearchMovie />
					</li>
					<li className="menu-list__item">{ userSurName ? <NavLink className={({isActive}) => isActive ? "header__profile-name active" : "header__profile-name"} to={"/profile"}><User className="menu-list__item-icon"/><span className="menu-list__item-name">{userSurName}</span></NavLink> : <button type="button" className="header-btn btn" onClick={() => dispatch(openLoginModal())}><User className="menu-list__item-icon"/><span className="menu-list__item-name">Войти</span></button>}</li>
                </ul>
            </nav>
				
			</header>
			{isLoginOpen && <LoginForm onClose={() => dispatch(closeLoginModal())} onRegister={() => dispatch(openRegisterModal())} />}
			{isRegisterOpen && <RegisterForm onClose={() => dispatch(closeRegisterModal())} onLogin={() => dispatch(openLoginModal())}/>}
			<VideoPlayerModal />
			<main className="content">
				<Outlet />
			</main>
			<footer className="footer">
				<div className="social">
					<div className="social-wrapper"><a href="#"><VK className="social-icon"/></a></div>
					<div className="social-wrapper"><a href="#"><Youtube className="social-icon"/></a></div>
					<div className="social-wrapper"><a href="#"><OK className="social-icon"/></a></div>
					<div className="social-wrapper"><a href="#"><Tg className="social-icon"/></a></div>
				</div>
			</footer>
		</div>
	);
};

export default CusomLayout;

