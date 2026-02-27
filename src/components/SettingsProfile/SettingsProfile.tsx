import type { FC } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './SettingsProfile.css'
import Email from '../../assets/svg/email-icon.svg?react';
import { queryClient } from "../../api/QueryClient";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/user";


export const SettingsProfile: FC = () => {
    const navigate = useNavigate();
    const data = useSelector(state => state.profile)

    const name = data.profile.name || '';
    const surname = data.profile.surname || '';

    const initials = `${name[0] || ''}${surname[0] || ''}`.toUpperCase();

    const logoutMutation =  useMutation({
      mutationFn: () => logout(),
       onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users', 'me']
      });
      navigate('/');
      window.location.reload();
    }
    }, queryClient)

    const handleSubmit = () => {
        logoutMutation.mutate();
      }


    return (
        <div className="settings">
            <div className="settings__wrapper">
                <div className="settings__wrapper-icon"><span>{initials}</span></div>
                <div className="settings__wrapper-info">
                    <span className="settings__name">Имя Фамилия</span>
                    <p className="settings__value">{`${data.profile.name} ${data.profile.surname}`}</p>
                </div>
            </div>
            <div className="settings__wrapper">
                <Email className="settings__icon"/>
                <div className="settings__wrapper-info">
                    <span className="settings__name">Электронная почта</span>
                    <p className="settings__value">{data.profile.email}</p>
                </div>
            </div>
            <button className="settings__btn-exit btn btn--submit" type="submit" onClick={handleSubmit}>Выйти из аккаунта</button>
        </div>
    )
}