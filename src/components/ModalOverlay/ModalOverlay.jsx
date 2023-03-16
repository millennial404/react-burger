import styles from "./ModalOverlay.module.css";

export default function ModalOverlay(props) {
  const {onClose} = props;
  return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <h1>Модальное окно</h1>
      </div>
  );
}