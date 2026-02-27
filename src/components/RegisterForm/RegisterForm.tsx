import "./RegisterForm.css";
import { useMutation } from '@tanstack/react-query';
import { queryClient } from "../../api/QueryClient";
import { useState, type FormEventHandler, type FC } from "react";
import { registerUser } from "../../api/user";
import { FormField } from "../FormField/FormField";
import Close from '../../assets/svg/close-icon.svg?react';
import Logo from '../../assets/svg/logo-icon.svg?react';
import Email from '../../assets/svg/email-icon.svg?react';
import Pass from '../../assets/svg/pass-icon.svg?react';
import User from '../../assets/svg/user-icon.svg?react';
import { Button } from "../Button/Button";

interface RegisterFormProps {
  onClose: () => void;
  onLogin: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onClose, onLogin }) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userSecondName, setUserSecondName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errorMessageEmail, setErrorMessageEmail] = useState<string | undefined>()
  const [errorMessageName, setErrorMessageName] = useState<string | undefined>()
  const [errorMessagePass, setErrorMessagePass] = useState<string | undefined>()
  const [errorMessageRepeatPass, setErrorMessageRepeatPass] = useState<string | undefined>()

  const registerMutation = useMutation({
    mutationFn: () => registerUser(userFirstName, userSecondName, email, password),
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
      setErrorMessageEmail('Введите корректный email');
      isValid = false;
    }

    if (userFirstName.length < 5) {
      setErrorMessageName('Длина имени должна быть больше 5 символов');
      isValid = false;
    }

    if (password.length < 8) {
      setErrorMessagePass('Длина пароля должна быть больше 8 символов');
      isValid = false;
    }

    if (password !== repeatPassword) {
      setErrorMessageRepeatPass('Пароли не совпадают');
      isValid = false;
    }

    if (isValid) {
      registerMutation.mutate();
    }
  };

  return (
    <div className="register">
      <div className="register__content">
        <button className="register__close-btn" onClick={onClose}><Close width={24} height={24} /></button>
        <Logo className="register__icon" />
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form__wrapper-inputs">
            <div className="register-form__field-group">
              <FormField>
                <Email className={`register-form__icon ${errorMessagePass ? 'register-form__icon--error' : ''}`} />
                <input className={`register-form__input ${errorMessageEmail ? 'register-form__input--error' : ''}`}
                  placeholder="Электронная почта"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setErrorMessageEmail(undefined)
                  }}
                />
              </FormField>
              {errorMessageEmail && <span className="register-form__error-text-direct">{errorMessageEmail}</span>}
            </div>

            <div className="register-form__field-group">
              <FormField>
                <User className={`register-form__icon ${errorMessagePass ? 'register-form__icon--error' : ''}`} />
                <input className={`register-form__input ${errorMessageName ? 'register-form__input--error' : ''}`}
                  type="text"
                  placeholder="Имя"
                  value={userFirstName}
                  onChange={(event) => {
                    setUserFirstName(event.target.value)
                    setErrorMessageName(undefined)
                  }}
                />
              </FormField>
            </div>

            <div className="register-form__field-group">
              <FormField>
                <User className={`register-form__icon ${errorMessagePass ? 'register-form__icon--error' : ''}`} />
                <input className="register-form__input"
                  type="text"
                  value={userSecondName}
                  placeholder="Фамилия"
                  onChange={(event) => {
                    setUserSecondName(event.target.value)
                  }}
                />
              </FormField>
              {errorMessageName && <span className="register-form__error-text-direct">{errorMessageName}</span>}
            </div>

            <div className="register-form__field-group">
              <FormField>
                <Pass className={`register-form__icon ${errorMessagePass ? 'register-form__icon--error' : ''}`} />
                <input className={`register-form__input ${errorMessagePass ? 'register-form__input--error' : ''}`}
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setErrorMessagePass(undefined)
                  }}
                />
              </FormField>
              {errorMessagePass && <span className="register-form__error-text-direct">{errorMessagePass}</span>}
            </div>

            <div className="register-form__field-group">
              <FormField>
                <Pass className={`register-form__icon ${errorMessagePass ? 'register-form__icon--error' : ''}`} />
                <input className={`register-form__input ${errorMessageRepeatPass ? 'register-form__input--error' : ''}`}
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={repeatPassword}
                  onChange={(event) => {
                    setRepeatPassword(event.target.value)
                    setErrorMessageRepeatPass(undefined)
                  }}
                />
              </FormField>
              {errorMessageRepeatPass && <span className="register-form__error-text-direct">{errorMessageRepeatPass}</span>}
            </div>

            {registerMutation.isError && <span className="register-form__error-message register-form__error-message--center">Ошибка при регистрации</span>}
          </div>
          <div className="register-form__wrapper-btn">
            <Button className="register-form__submit-btn btn btn--submit" type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Создание...' : 'Создать аккаунт'}
            </Button>
            <button className="register-form__login-btn btn btn--second" type="button" onClick={onLogin}>У меня есть пароль</button>
          </div>
        </form>
      </div>
    </div>
  );
};
