import styles from './LoginPage.module.css'
import {EmailInput, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../services/actions/auth";

export function LoginPage() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  let navigate = useNavigate();
  
  const login = () => {
    dispatch(signIn())
  }

  useEffect(() => {
    if (auth.userData) {
      navigate("/", {replace: true});
    }
  },[auth, navigate])


  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <div className={styles.inputsContainer}>
        <EmailInput
          onChange={() => {
          }}
          value={"value"}
          name={'email'}
          isIcon={false}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          onChange={() => {
          }}
          value={'value'}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={login}>
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