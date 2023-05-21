import styles from './RegisterPage.module.css'
import {EmailInput, Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserFormValue, register} from "../services/actions/registerUser";
import Cookies from 'js-cookie';
import {useEffect} from "react";
import {getLoginData} from "../services/actions/auth";

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    name,
    email,
    password
  } = useSelector(state => state.registration.form);

  const {registrationRequest} = useSelector(state => state.registration)

  const onFormSubmit = () => {
    dispatch(register())
  }

  const dispatch = useDispatch();
  const onFormChange = (e) => {
    dispatch(setUserFormValue(e.target.name, e.target.value))
    setTimeout(() => {
      if (Cookies.get('accessToken')) {
        navigate("/", {replace: true});
      }
    }, 0)
  }
  const auth = useSelector(state => state.auth.isAuthenticated)
  useEffect(() => {
    dispatch(getLoginData())
    if (auth) {
      navigate("/", {replace: true});
    }
  }, [auth, dispatch, navigate])
  return (
    <div className={styles.formContainer}>
      <h3 className="text text_type_main-medium">Регистрация</h3>
      <div className={styles.inputsContainer}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onFormChange}
          value={name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6 mt-6"
        />
        <EmailInput
          onChange={onFormChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onFormChange}
          value={password}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
      <Button disabled={!name || !email || !password || registrationRequest} onClick={onFormSubmit} htmlType="button"
              type="primary" size="medium" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link className={styles.links} to="/login">Войти</Link>
      </p>
    </div>
  )
}