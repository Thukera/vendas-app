import { Layout } from "@/components/layout"
import { Produto } from "@/app/models/produtos"
import { formatReal } from '@/app/util/masks';
import { useState } from "react";

interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onEdit,
    onDelete
}) => {
    return (
        <table className="table is-striped is-hoverable is-fullwidth" >
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => <ProdutoRow key={produto.id}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        produto={produto}
                    />)
                }
            </tbody>
        </table>
    )
}



interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}
const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onDelete,
    onEdit
}) => {

    const [deletando, setDeletando] = useState<boolean>(false)

    const onDeleteClick = (produto: Produto) => {
        if (deletando) {
            onDelete(produto)
            setDeletando(false)
        } else {
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false)

    let precoReal = formatReal(String(produto.preco));

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.descricao}</td>
            <td>{precoReal}</td>
            {!deletando &&
                <td>
                    <button onClick={e => onEdit(produto)}
                        className="button is-success is-rounded is-small">Editar</button>
                </td>
            }
            <td>
                <button onClick={e => onDeleteClick(produto)}
                    className="button is-danger is-rounded is-small">
                    {deletando ? "Confirma" : "Deletar"}
                </button>
            </td>

            {deletando &&
                <td>
                    <button onClick={cancelaDelete}
                        className="button is-warning is-rounded is-small">Cancelar</button>
                </td>
            }
        </tr>
    )
}