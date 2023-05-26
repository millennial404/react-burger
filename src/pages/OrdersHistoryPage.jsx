import styles from "./OrdersHistoryPage.module.css";
import React from "react";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {logout} from "../services/actions/auth";
import {useDispatch} from "react-redux";

export function OrdersHistoryPage() {
  const dispatch = useDispatch()
  const location = useLocation();
  const match = matchPath('/profile/orders', `${location.pathname}`)
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={`${styles.navContainer} ml-5 mr-15`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button onClick={() => navigate('/profile')} className={styles.navButton}>Профиль</button>
            </li>
            <li className={styles.navItem}>
              <button onClick={() => navigate('/profile/orders')}
                      className={match ? styles.navButtonActive : styles.navButton}>История заказов
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
        <div className={styles.formContainer}>
          <h3>История заказов </h3>
        </div>
      </div>
    </>
  );
}
