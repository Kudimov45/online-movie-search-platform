import { useState, type FC, type FormEventHandler } from "react";
import { FormField } from "../FormField/FormField";
import Logo from '../../assets/svg/logo-icon.svg?react';
import Email from '../../assets/svg/email-icon.svg?react';
import Pass from '../../assets/svg/pass-icon.svg?react';
import Close from '../../assets/svg/close-icon.svg?react';
import './LoginForm.css';
import { queryClient } from "../../api/QueryClient";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/user";
import { Button } from "../Button/Button";

interface LoginFormProps {
  onClose: () => void;
  onRegister: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onClose, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState<string | undefined>();
  const [errorMessagePass, setErrorMessagePass] = useState<string | undefined>();

  const loginMutation =  useMutation({
      mutationFn: () => login(email, password),
      onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users', 'me']
      });
      onClose();
    }
    }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
    let isValid = true;

    if (!emailRegex.test(email)) {
      setErrorMessageEmail('Укажите правильный email');
      isValid = false;
    } else {
      setErrorMessageEmail(undefined);
    }

    if (password.length < 8) {
      setErrorMessagePass('Длина пароля должна быть минимум 8 символов');
      isValid = false;
    } else {
      setErrorMessagePass(undefined);
    }

    if (isValid) {
      loginMutation.mutate();
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <button className="login__close-btn" onClick={onClose}><Close width={24} height={24}/></button>
        <Logo className="login__icon" />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__wrapper-inputs">
            <div className="login-form__field-group">
              <FormField>
                <Email className={`login-form__icon ${errorMessagePass ? 'login-form__icon--error' : ''}`}/>
                <input className={`login-form__input ${errorMessageEmail ? 'login-form__input--error' : ''}`}
                  placeholder="Электронная почта"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessageEmail(undefined);
                  }}
                   /> 
              </FormField>
              {errorMessageEmail && <span className="login-form__error-text-direct">{errorMessageEmail}</span>}
            </div>

            <div className="login-form__field-group">
              <FormField>
                <Pass className={`login-form__icon ${errorMessagePass ? 'login-form__icon--error' : ''}`}/>
                <input className={`login-form__input ${errorMessagePass ? 'login-form__input--error' : ''}`} 
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessagePass(undefined);
                  }}
                   />
              </FormField>
              {errorMessagePass && <span className="login-form__error-text-direct">{errorMessagePass}</span>}
            </div>
          </div>
          {loginMutation.isError && <span className="login-form__error-message login-form__error-message--center">Неверный логин или пароль</span>}
          <div className="login-form__wrapper-btn">
            <Button className="login-form__submit-btn btn btn--submit" type="submit" isDisabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Вход...' : 'Войти'}
            </Button>
            <button className="login-form__reg-btn btn btn--second" type="button" onClick={onRegister}>Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  );
};
