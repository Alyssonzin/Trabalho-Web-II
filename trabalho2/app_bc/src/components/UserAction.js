import Link from "next/link";
import Axios from "axios";

export default function UserAction(props) {
    const handleDelete = async () => {
        try {
            const response = await Axios.delete(`http://localhost:8080/api/users/${props.pid}`);
            //Dá reload na página para atualizar a tabela.
            location.reload();
        } catch (error) {
            console.error('Erro ao inativar o user:', error);
        }
    }
    return (
        <>
            <Link className="btn btn-outline-primary btn-sm" href={`/admin/users/update/${ props.pid }`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`#`} onClick={handleDelete}>Inativar</Link>
        </>
    )
}
