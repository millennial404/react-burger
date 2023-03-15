import ReactDOM from "react";

import styles from "./ModalOverlay.module.css";

const modalRoot = document.getElementById("react-modals");

export default function ModalOverlay() {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay}>
        

      </div>
    </>,
    modalRoot
  );
}
