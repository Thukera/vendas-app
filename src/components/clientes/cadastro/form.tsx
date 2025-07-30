import { Layout } from "@/components/layout"
import { Cliente } from "@/app/models/produtos/clientes"
import { useFormik } from 'formik'


interface ClierntFormProps {
    cliente : Cliente;
    onSubmit : (cliente: Cliente) => void;
}

const formScheme: Cliente = {
    cadastro: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    endereco: '',
    id: '',
    nome: '',
    telefone: '',

}

export const ClienteForm: React.FC<ClierntFormProps> = ({
    cliente,
    onSubmit
}) => {

    const formik = useFormik<Cliente>({
        initialValues: { ...cliente, ...formScheme},
        onSubmit,

    })
        
    return (
        <form onSubmit={formik.handleSubmit}>
            <input value={formik.values.nome} 
            onChange={formik.handleChange}
            id="nome"
            name="nome" 
            />

            <button type="submit">Enviar</button>
        </form>
    )
}