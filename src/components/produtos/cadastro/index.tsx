import { useEffect, useState } from 'react';
import { Input, InputMoney, Layout, Message } from 'components';
import { useProdutoService } from 'app/service'
import { Produto } from 'app/models/produtos'
import { converteEmBigDecimal, formatReal } from '@/app/util/masks';
import { Alert } from '@/components/common/message';
import * as yup from 'yup'
import Link from 'next/link';
import { useRouter } from 'next/router';

const msgCampoObrigatorio = "Campo Obrigatório"

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio).length(5, "O codigo do produto deve possuir 5 caracteres"),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00 (zero)")
})

interface FormErrors {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string | undefined>()
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState<string | undefined>()
    const [descricao, setDescricao] = useState<string | undefined>()
    const [id, setId] = useState<number>()
    const [cadastro, setCadastro] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErros] = useState<FormErrors>()
    const router = useRouter();
    const { id: queryId } = router.query;

    console.log("Produto ID : " + queryId);
    useEffect(() => {
        if (queryId) {
            console.log("Produto: "+ queryId);
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco(formatReal(produtoEncontrado.preco))
                setCadastro(produtoEncontrado.cadastro)
            })
        }
    }, [queryId])

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converteEmBigDecimal(preco),
            nome,
            descricao
        }
        console.log(produto)
        validationSchema.validate(produto).then(obj => {
            setErros({})
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
        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErros({
                [field]: message
            })
            /*setMessages([
                            { tipo: "danger", field, texto: message }
                        ]) */
            console.log(JSON.parse(JSON.stringify(err)))
        })
    }
    return (
        <Layout titulo="Produtos" mensagens={messages}>

            {id &&
                <div className="columns">
                    <Input id="inputId"
                        label='ID'
                        columnClasses='is-half'
                        value={id}
                        disabled />

                    <Input id="inputCadastro"
                        label='Cadastro*'
                        columnClasses='is-half'
                        value={cadastro}
                        disabled />
                </div>
            }

            <div className="columns">
                <Input id="inputSku"
                    label='SKU: *'
                    columnClasses='is-half'
                    onChange={ e => setSku(e.target.value)}
                    value={sku}
                    placeholder='Digite o SKU do produto'
                    error={errors?.sku}
                />

                <InputMoney id="inputPreco"
                    label='Preço :*'
                    columnClasses='is-half'
                    onChange={ e => setPreco(e.target.value)}
                    value={preco}
                    placeholder='Digite o Preço do produto'
                    maxLength={16}
                    error={errors?.preco}
                />
            </div>

            <div className="columns">
                <Input id="inputNome"
                    label='Nome :*'
                    columnClasses='is-full'
                    onChange={ e => setNome(e.target.value)}
                    value={nome}
                    placeholder='Digite o Nome do produto'
                    error={errors?.nome}
                />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição :*</label>
                    <div className="control">
                        <textarea className="textarea"
                            id="inputDesc" value={descricao} onChange={event => setDescricao(event.target.value)}
                            placeholder="Insira a Descrição detalhada do produto" />
                        {errors?.descricao &&
                            <p className="help is-danger">{errors.descricao}</p>
                        }
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
                    <Link href='/consultas/produtos'>
                        <button className="button">Voltar</button>
                    </Link>
                </div>
            </div>

        </Layout>
    )
}