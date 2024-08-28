import Link from "next/link";
import styles from '@/styles/form.module.css';

export default function Buttons({ eventOnClick, href }) {
    return (
        <div>
            <Link href={href}><button className={styles.btn_enviar} type='submit' onClick={eventOnClick}>Enviar</button></Link>

            <Link href={href}><button className={styles.btn_voltar} type='button'>Voltar</button></Link>
        </div>
    )
}