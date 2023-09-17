import styles from './LoginPage.module.css'
import {EmailInput, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../services/redux/store";
import {setLoginFormValue, login} from "../services/redux/actions/auth";

export function LoginPage() {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const {
    email,
    password
  } = useSelector(state => state.auth.form);
  const auth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value))
  }
  useEffect(() => {
    if (auth) {
      navigate(fromPage, { replace: true });
    }
  }, [auth, dispatch, fromPage, navigate])

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login());
  }

  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <form onSubmit={onFormSubmit} className={styles.inputsContainer}>
        <EmailInput
          onChange={onFormChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          onChange={onFormChange}
          value={password}
          name={'password'}
          extraClass="mb-6"
        />
        <Button disabled={!email || !password} htmlType="submit" type="primary" size="medium"
                extraClass={`${styles.submitButton} mb-20`}>
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link className={styles.links} to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link className={styles.links} to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  )
}