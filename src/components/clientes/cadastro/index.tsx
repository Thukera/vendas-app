import { Layout } from "@/components/layout"
import { ClienteForm } from "./form"
import { useState } from "react"
import { Cliente } from "@/app/models/produtos/clientes"
import { useClienteService } from "@/app/service"

export const CadastroCliente: React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});
    const service = useClienteService();

    const handleSubmit = (cliente: Cliente) => {
        console.log(cliente);
        if (cliente.id) {
            service.atualizar(cliente).then(response => {
                console.log("Atualizado")
            })
        } else {
            service.salvar(cliente)
                .then(clienteSalvo => {
                    setCliente(clienteSalvo);
                    console.log();
                })
        }
    }

    return (
        <Layout titulo="Clientes">
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </ Layout>
    )
}