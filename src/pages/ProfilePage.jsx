import styles from './RegisterPage.module.css'
import {EmailInput, Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { Link } from "react-router-dom";

export function ProfilePage() {
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          icon="EditIcon"
          onChange={onChange}
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
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          placeholder={'Пароль'}
          icon="EditIcon"
          value={value}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
    </div>
  )
}