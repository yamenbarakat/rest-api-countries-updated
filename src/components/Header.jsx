import styles from "./Header.module.css";

export default function Header({ onSetMode }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <h1>Where is the world?</h1>
        <div
          className={styles.colorTheme}
          onClick={() =>
            onSetMode((mode) => (mode === "default" ? "dark" : "default"))
          }
        >
          Dark Mode
        </div>
      </div>
    </header>
  );
}
