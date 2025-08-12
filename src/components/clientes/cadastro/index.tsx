import { Layout } from "@/components/layout"
import { ClienteForm } from "./form"
import { useState } from "react"
import { Cliente } from "@/app/models/produtos/clientes"
import { useClienteService } from "@/app/service"
import { Alert } from "@/components/common/message"

export const CadastroCliente: React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});
    const [messages, setMessages] = useState<Array<Alert>>([])
    const service = useClienteService();


    const handleSubmit = (cliente: Cliente) => {
        console.log(cliente);
        if (cliente.id) {
            service.atualizar(cliente).then(response => {
                console.log("Atualizado")
                setMessages([{
                    tipo: "success", texto: "Cliente atualizado com sucesso"
                }])
            })
        } else {
            service.salvar(cliente)
                .then(clienteSalvo => {
                    setCliente(clienteSalvo);
                    console.log();
                    setMessages([{
                        tipo: "success", texto: "Cliente salvo com sucesso"
                    }])
                })
        }
    }

    return (
        <Layout titulo="Clientes" mensagens={messages}>
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </ Layout>
    )
}