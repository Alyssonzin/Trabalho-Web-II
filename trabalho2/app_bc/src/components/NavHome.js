import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function NavHome() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.nav_options_wrapper}>
                    <span className={styles.nav_option}>
                        <Link id={styles.home_link} className={styles.nav_link} href="/">HOME</Link>
                    </span>
                    
                    <span className={styles.nav_option}>
                        <Link className={styles.nav_link} href="/login">LOGIN</Link>
                    </span>
                </div>
            </nav>
        </header>
    );
}
