import styles from './ForgotPasswordPage.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPass} from "../services/actions/resetPass";

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.isAuthenticated)
  const isMail = useSelector(state => state.resetPass.isMail)

  const onFormSubmit =(e)=>{
    e.preventDefault();
    dispatch(resetPass(email))
  }

  useEffect(() => {
    if (auth) {
      navigate("/", {replace: true});
    }
    if (isMail) {
      navigate("/reset-password", {replace: true});
    }
  }, [auth, dispatch, isMail, navigate])
  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <form onSubmit={onFormSubmit} className={styles.inputsContainer}>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6 mt-6"
        />
        <Button disabled={!email} htmlType="submit" type="primary" size="medium" extraClass={`${styles.submitButton} mb-20`} >
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className={styles.links} to="/login">Войти</Link>
      </p>
    </div>
  )
}