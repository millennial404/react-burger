import styles from './LoginPage.module.css'
import {EmailInput, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <div className={styles.inputsContainer}>
        <EmailInput
          onChange={onChange}
          value={value}
          name={'email'}
          isIcon={false}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          onChange={onChange}
          value={value}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
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