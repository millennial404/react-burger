import styles from "./ProfilePage.module.css";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";

export function ProfilePage() {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={`${styles.navContainer} ml-5 mr-15`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button className={styles.navButton}>Профиль</button>
            </li>
            <li className={styles.navItem}>
              <button className={styles.navButton}>История заказов</button>
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
            type={"text"}
            placeholder={"Имя"}
            icon="EditIcon"
            onChange={onChange}
            value={value}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6 mt-6"
          />
          <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
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
