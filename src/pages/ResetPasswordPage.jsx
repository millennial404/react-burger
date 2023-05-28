import styles from './ResetPasswordPage.module.css'
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {confirmationPasswordReset} from "../utils/burger-api";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_RESET_PASS_STATE} from "../services/actions/resetPass";

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [newPass, setNewPass] = React.useState('')
  const [token, setToken] = React.useState('')
  const onChangePass = e => {
    setNewPass(e.target.value)
  }
  const onChangeToken = e => {
    setToken(e.target.value)
  }

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.isAuthenticated)
  const isMail = useSelector(state => state.resetPass.isMail)
  useEffect(() => {
    if (auth) {
      navigate("/", {replace: true});
    }
    if (!isMail) {
      navigate("/login", {replace: true});
    }
  }, [auth, dispatch, isMail, navigate])

  const onFormSubmit = (e) => {
    e.preventDefault();
    confirmationPasswordReset(newPass, token)
      .then((res) => {
        if (res.message === "Password successfully reset") {
          dispatch({type: CLEAR_RESET_PASS_STATE})
        }
      })
  }

  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <form onSubmit={onFormSubmit} className={styles.inputsContainer}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={onChangePass}
          value={newPass}
          name={'password'}
          extraClass="mb-6 mt-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChangeToken}
          value={token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`${styles.submitButton} mb-20`}>
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className={styles.links} to="/login">Войти</Link>
      </p>
    </div>
  )
}