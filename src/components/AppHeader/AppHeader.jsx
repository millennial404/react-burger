import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import {Link, NavLink} from "react-router-dom";

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <div className={`${styles.content} pb-4 pt-4`}>
        <div className={`${styles.linkContainer} pl-5 pr-5 pt-4 pb-4 mr-2`}>
          <BurgerIcon type="primary"/>
          <Link to="/" className={`${styles.link} ml-2`}>
            Конструктор
          </Link>
        </div>

        <div className={`${styles.linkContainer} pl-5 pr-5 pt-4 pb-4`}>
          <ListIcon type="primary"/>
          <NavLink
            to={{pathname: "/"}}
            className={`${styles.link} ml-2`}>
            Лента заказов
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo/>
        </div>

        <div className={`${styles.linkContainer} pl-5 pr-5 pt-4 pb-4`}>
          <ProfileIcon type="primary"/>
          <NavLink
            to="/profile"
            className={({isActive})=> isActive ? `${styles.activeLink} ml-2` : `${styles.link} ml-2`}
          >
            Личный кабинет
          </NavLink>
        </div>
      </div>
    </header>
  );
}
