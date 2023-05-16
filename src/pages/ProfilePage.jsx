import styles from "./ProfilePage.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

export function ProfilePage() {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  let location = useLocation();
  const match = matchPath("/profile", `${location.pathname}`);
  const navigate = useNavigate();

  const [inputNameStatus, setInputNameStatus] = useState(true);
  const [inputLoginStatus, setInputLoginStatus] = useState(true);
  const inputNameRef = useRef(null);
  const inputLoginRef = useRef(null);

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
              <button className={styles.navButton}>Выход</button>
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
            onChange={onChange}
            value={value}
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
          <Input
            disabled={inputLoginStatus}
            onBlur={() => setInputLoginStatus(true)}
            type={"text"}
            placeholder={"Логин"}
            onChange={onChange}
            icon={"EditIcon"}
            value={value}
            name={"login"}
            error={false}
            ref={inputLoginRef}
            onIconClick={() => {
              setInputLoginStatus(false);
              setTimeout(() => inputLoginRef.current.focus(), 0);
            }}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChange}
            placeholder={"Пароль"}
            icon="EditIcon"
            value={value}
            name={"password"}
            extraClass="mb-6"
          />
        </div>
      </div>
    </>
  );
}
