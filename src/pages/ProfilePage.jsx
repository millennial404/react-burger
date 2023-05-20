import styles from "./ProfilePage.module.css";
import {
  PasswordInput,
  Input, EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setProfileDataFormValue} from "../services/actions/profileData";
import {logout} from "../services/actions/auth";

export function ProfilePage() {
  const {
    name,
    email
  } = useSelector(state => state.profileData.form);
  const dispatch = useDispatch();
  const onFormChange = (e) => {
    dispatch(setProfileDataFormValue(e.target.name, e.target.value))
  }
  let location = useLocation();
  const match = matchPath("/profile", `${location.pathname}`);
  const navigate = useNavigate();
  const [inputNameStatus, setInputNameStatus] = useState(true);
  const inputNameRef = useRef(null);

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
              <button onClick={()=>dispatch(logout())} className={styles.navButton}>Выход</button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.formContainer}>
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
              setTimeout(() => inputNameRef.current.focus(), 0);
            }}
            extraClass="mb-6 mt-6"
          />
          <EmailInput
            onChange={onFormChange}
            value={email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onFormChange}
            placeholder={"Пароль"}
            icon="EditIcon"
            value={''}
            name={"password"}
            extraClass="mb-6"
          />
        </div>
      </div>
    </>
  );
}
