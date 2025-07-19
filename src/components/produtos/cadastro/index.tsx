import { useState } from 'react';
import { Input, Layout, Message } from 'components';
import { useProdutoService } from 'app/service'
import { Produto } from 'app/models/produtos'
import { converteEmBigDecimal } from '@/app/util/money';
import { Alert } from '@/components/common/message';
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    sku: yup.string().required(),
    nome: yup.string().required(),
    descricao: yup.string().required(),
    preco: yup.number().required()
})

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [id, setId] = useState<number>()
    const [cadastro, setCadastro] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converteEmBigDecimal(preco),
            nome,
            descricao
        }
        console.log(produto)

        if (id) {
            service
                .atualizar(produto)
                .then(response => {
                    console.log("atualizado")
                    setMessages([{
                        tipo: "success", texto: "Atualizado com Sucesso!"
                    }])
                })
        } else {
            service
                .salvar(produto)
                .then(produtoResposta => {
                    setId(produtoResposta.id)
                    setCadastro(produtoResposta.cadastro)
                    console.log(produtoResposta)
                    setMessages([{
                        tipo: "success", texto: "Novo Produto Salvo com Sucesso!"
                    }])

                })
        }

    }
    return (
        <Layout titulo="Produtos" mensagens={messages}>

            {id &&
                <div className="columns">
                    <Input id="inputId" label='ID' columnClasses='is-half' value={id} disabled />
                    <Input id="inputCadastro" label='Cadastro*' columnClasses='is-half' value={cadastro} disabled />
                </div>
            }

            <div className="columns">
                <Input id="inputSku" label='SKU: *' columnClasses='is-half' onChange={setSku} value={sku} placeholder='Digite o SKU do produto' />
                <Input id="inputPreco" label='Preço :*' columnClasses='is-half' onChange={setPreco} value={preco} placeholder='Digite o Preço do produto' currency maxLength={16} />
            </div>

            <div className="columns">
                <Input id="inputNome" label='Nome :*' columnClasses='is-full' onChange={setNome} value={nome} placeholder='Digite o Nome do produto' />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição :*</label>
                    <div className="control">
                        <input className="textarea"
                            id="inputDesc" value={descricao} onChange={event => setDescricao(event.target.value)}
                            placeholder="Insira a Descrição detalhada do produto" />
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <button className="button">Voltar</button>
                </div>
            </div>

        </Layout>
    )
}