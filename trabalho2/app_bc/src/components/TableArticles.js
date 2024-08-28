import { useState, useEffect } from "react";
import Axios from "axios";
import ArticlesAction from "./ArticlesAction";
import styles from '@/styles/admin_articles.module.css';

export default function TableArticles() {
    const [articles, setArticles] = useState([]);

    const URL = "http://localhost:8080/api/articles";

    useEffect(() => {
        const getAllArticles = async () => {
            try {
                const response = await Axios.get(URL);
                setArticles(response.data);
            } catch (error) {
                console.error('Erro ao buscar os artigos:', error);
            }
        };

        getAllArticles();

    }, []);

    return (

        <table>
            <thead>
                <tr>
                    <th className={styles.th} scope="col" id={styles.col_id}> <h3>Data</h3> </th>
                    <th className={styles.th} scope="col"> <h3>Título</h3> </th>
                    <th className={styles.th} scope="col"> <h3>Autor</h3> </th>
                    <th className={styles.th} scope="col" id={styles.col_action}> <h3>Ação</h3> </th>
                </tr>
            </thead>
            <tbody>
                {
                    articles.map(article => (
                        <tr key={article._id}>
                            <th className={styles.td} scope="row">{article.kb_published_date}</th>
                            <td className={styles.td}>{article.kb_title}</td>
                            <td className={styles.td}>{article.kb_author_email}</td>
                            <td className={styles.td}>
                                <ArticlesAction pid={article._id} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
}