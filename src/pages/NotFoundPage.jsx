import styles from './NotFoundPage.module.css';

export function NotFoundPage() {

  return (
    <div className={styles.contentContainer}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_digits-large">Page not found</p>
    </div>
  )
}