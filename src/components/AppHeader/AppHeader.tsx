import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <BurgerIcon type="primary" />
      <div
        style={{ backgroundColor: "#0B5FFF", color: "white" }}
        className="m-2"
      >
      </div>
      <p className="text text_type_main-default">Конструктор</p>

      <button className={styles.button}>
        <ListIcon type="primary" />
        Лента заказов
      </button>
      <div className={styles.logo}>
        <Logo />
      </div>

      <button className={styles.button}>
        <ProfileIcon type="primary" />
        Личный кабинет
      </button>
    </header>
  );
}
