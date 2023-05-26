import styles from './LoginPage.module.css'
import {EmailInput, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLoginFormValue, login} from "../services/actions/auth";

export function LoginPage() {
  const {
    email,
    password
  } = useSelector(state => state.auth.form);
  const auth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onFormChange = (e) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value))
  }
  useEffect(() => {
    if (auth) {
      navigate("/", {replace: true});
    }
  },[auth, dispatch, navigate])


  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <div className={styles.inputsContainer}>
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
      </div>
      <Button disabled={!email || !password} htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={()=>{dispatch(login())}}>
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link className={styles.links} to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link className={styles.links} to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  )
}