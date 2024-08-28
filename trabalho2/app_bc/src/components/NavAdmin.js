import Link from "next/link";
import styles from '@/styles/admin.module.css';

export default function NavAdmin() {
    return (
        <nav className={styles.admin_nav}>
            <Link className={styles.admin_nav_link} href="/admin"><h2>Base de Conhecimentos</h2></Link>
            <Link className={styles.btn_logout} href='/'>Logout</Link>
        </nav>
    )
}
