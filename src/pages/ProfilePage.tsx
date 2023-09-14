import styles from "./ProfilePage.module.css";
import {
  PasswordInput,
  Input, EmailInput, Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState, useRef} from "react";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setProfileDataFormValue, updateProfileData} from "../services/redux/actions/profileData";
import {getLoginData, logout} from "../services/redux/actions/auth";

export function ProfilePage() {
  const {
    name,
    login,
    password
  } = useSelector(state => state.profileData.form);
  const dispatch = useDispatch();
  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProfileDataFormValue(e.target.name, e.target.value))
    setInputChange(true)
  }
  const location = useLocation();
  const match = matchPath("/profile", `${location.pathname}`);
  const navigate = useNavigate();
  const [inputNameStatus, setInputNameStatus] = useState(true);
  const [inputChange, setInputChange] = useState(false);
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfileData())
    setInputChange(false)
  }

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={`${styles.navContainer} ml-5 mr-15`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button
                onClick={() => navigate("/profile")}
                className={match ? styles.navButtonActive : styles.navButton}
              >
                Профиль
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                onClick={() => navigate("/profile/orders")}
                className={styles.navButton}
              >
                История заказов
              </button>
            </li>
            <li className={styles.navItem}>
              <button onClick={() => dispatch(logout())} className={styles.navButton}>Выход</button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form onSubmit={onFormSubmit} className={styles.formContainer}>
          <Input
            disabled={inputNameStatus}
            onBlur={() => setInputNameStatus(true)}
            type={"text"}
            placeholder={"Имя"}
            icon="EditIcon"
            onChange={onFormChange}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            ref={inputNameRef}
            onIconClick={() => {
              setInputNameStatus(false);
              setTimeout(() => {
                if (inputNameRef.current) {
                  inputNameRef.current.focus();
                }
              }, 0);
            }}
            extraClass="mb-6 mt-6"
          />
          <EmailInput
            onChange={onFormChange}
            value={login}
            name={'login'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onFormChange}
            placeholder={"Пароль"}
            icon="EditIcon"
            value={password}
            name={"password"}
            extraClass="mb-15"
          />
          {inputChange && (<div className={styles.buttons}>
            <Button htmlType="button" type="secondary" size="medium" onClick={()=> {
              dispatch(getLoginData())
              setInputChange(false)
            }}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" >
              Сохранить
            </Button>
          </div>)}
        </form>
      </div>
    </>
  );
}
