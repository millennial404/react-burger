import styles from './ForgotPasswordPage.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import {useNavigate, Link} from "react-router-dom";
import {passwordReset} from "../utils/burger-api";

export function ForgotPasswordPage() {
  const [value, setValue] = React.useState('')
  const navigate = useNavigate();
  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <div className={styles.inputsContainer}>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6 mt-6"
        />
      </div>
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20"
              onClick={() => {
                passwordReset(value)
                  .then(res=>console.log(res))
                  .then(()=>navigate('/reset-password'))
              }}>
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className={styles.links} to="/login">Войти</Link>
      </p>
    </div>
  )
}