import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css"

export default function AppHeader() {
  return (
    <header className="header">
      <BurgerIcon type="primary" />
      <ListIcon type="primary" />
      <Logo />

      <ProfileIcon type="primary" />
    </header>
  );
}
