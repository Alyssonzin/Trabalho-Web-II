import Link from "next/link";
import Axios from "axios";
import styles from '@/styles/admin_articles.module.css';

export default function ArticlesAction({ pid }) {
    const handleDelete = async () => {
        try {
            const response = await Axios.delete(`http://localhost:8080/api/articles/${pid}`);
            //console.log(response);
            //Dá reload na página para atualizar a tabela.
            location.reload();
        } catch (error) {
            console.error('Erro ao deletar o artigo:', error);
        }
    }

    return (
        <>
            <Link href={`/admin/articles/update/${pid}`} className={styles.link_action} id={styles.link_edit}>Editar</Link>
            <button type="submit" className={styles.link_action} id={styles.link_delete} onClick={handleDelete}>Excluir</button>
        </>
    )
}
