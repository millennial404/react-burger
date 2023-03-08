import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  
  return (
    <header className={styles.header}>
      <div className={`${styles.content} pb-4 pt-4`}>
        <div className={`${styles.linkContainer} pl-5 pr-5 pt-4 pb-4 mr-2`}>
          <BurgerIcon type="primary" />
          <a href="#" className={`${styles.link} ml-2`}>
            Конструктор
          </a>
        </div>

        <div className={`${styles.linkContainer} pl-5 pr-5 pt-4 pb-4`}>
          <ListIcon type="primary" />
          <a href="#" className={`${styles.link} ml-2`}>
            Лента заказов
          </a>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={`${styles.linkContainer} pl-5 pr-5 pt-4 pb-4`}>
          <ProfileIcon type="primary" />
          <a href="#" className={`${styles.link} ml-2`}>
            Личный кабинет
          </a>
        </div>
      </div>
    </header>
  );
}
