import { Input } from "@/components/common"
import { Layout } from "@/components/layout"
import { useFormik } from "formik"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState } from "react"
import { Cliente } from "@/app/models/produtos/clientes"

interface ConsultaClientesForm {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: "1",
            nome: "fulano",
            email: "Lucy@mordedora.com",
            cpf: "000.000.000-00"
        }
    ]);

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        console.log(filtro)
    }

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: '', cpf: '' }
    })

    return (
        <Layout titulo="Clientes">
            <form onSubmit={formikSubmit}>
                <div className="columns">
                    <Input label="Nome" id="nome"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={handleChange}
                        name="nome"
                        value={filtro.nome}
                    />
                    <Input label="CPF" id="cpf"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={handleChange}
                        name="cpf"
                        value={filtro.cpf}
                    />
                </div>


                <div className="field is-grouped">
                    <div className="control is-link">
                        <button type="submit" className="button is-success">
                            Consultar
                        </button>
                    </div>
                </div>
            </form>

            <div className="columns">
                <div className="is-full">
                    <DataTable value={clientes} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" header="Código"></Column>
                        <Column field="nome" header="Nome"></Column>
                        <Column field="cpf" header="CPF"></Column>
                        <Column field="email" header="Email"></Column>
                    </DataTable>

                </div>
            </div>

        </Layout>
    )

}