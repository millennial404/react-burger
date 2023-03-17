import styles from "./ModalOverlay.module.css";

export default function ModalOverlay({ onClick }) {
  return (
      <div className={styles.modalOverlay} onClick={onClick}/>
  );
}