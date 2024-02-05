import styles from "./NavBar.module.css";

export default function NavBar({ children }) {
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.container}`}>{children}</div>
    </nav>
  );
}
