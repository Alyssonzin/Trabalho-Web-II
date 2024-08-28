import Head from 'next/head';
import TableArticles from '@/components/TableArticles';
import NavAdmin from '@/components/NavAdmin';
import styles from '@/styles/admin_articles.module.css';
import Link from 'next/link';

export default function adminArticles() {
    return (
        <>
            <Head>
                <title>Artigos</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <header>
                <NavAdmin />
            </header>

            <main className={styles.background_img}>

                <TableArticles />

                <div className={styles.link_novo_wrapper}>
                    <Link href="/admin/articles/create" className={styles.link_action} id={styles.link_novo}><h3>Novo+</h3></Link>
                </div>
            </main>
        </>
    )
}