import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const modalRootElement = document.querySelector("#react-modals");

export default function Modal(props) {
  const {children, onClose, title} = props;
  const escapeClose = (event) => {
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

  return ReactDOM.createPortal(
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
    </>,
    modalRootElement
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
}