import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

type ModalPropTypes = {
  children: React.ReactNode;
  onClose: ()=>void;
  title?: string;
}
export default function Modal(props: ModalPropTypes) {
  const {children, onClose, title} = props;
  const escapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", escapeClose);
    return () => {
      document.removeEventListener("keydown", escapeClose);
    };
  });

  return (
    <>
      <ModalOverlay onClick={onClose}/>
      <div className={`${styles.popup}`}>
        <div className={`${styles.titleAndCloseButton} mt-10 ml-10 mr-10`}>
          <h2 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`${styles.buttonClose} pt-5 pb-5`}
          >
            <CloseIcon type="primary"/>
          </button>
        </div>
        {children}
      </div>
    </>
  );
}