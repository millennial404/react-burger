import styles from './RegisterPage.module.css'
import {EmailInput, Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { Link } from "react-router-dom";

export function RegisterPage() {
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Регистрация</h3>
      <div className={styles.inputsContainer}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6 mt-6"
        />
        <EmailInput
          onChange={onChange}
          value={value}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={value}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link className={styles.links} to="/login">Войти</Link>
      </p>
    </div>
  )
}