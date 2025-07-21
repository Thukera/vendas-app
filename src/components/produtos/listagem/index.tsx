import { Layout } from "@/components/layout";
import Link from 'next/link'
import Router from "next/router";
import { TabelaProdutos } from "./tabela";
import { Produto } from "@/app/models/produtos";
import useSWR from "swr";
import { httpClient } from "@/app/http";
import { url } from "inspector";
import { Axios, AxiosResponse } from "axios";
import { Loader } from "@/components/common";
import { useProdutoService } from "@/app/service";
import { useState } from "react";
import { Alert } from "@/components/common/message";
import { useEffect } from "react";




export const ListagemProdutos: React.FC<{}> = () => {

    const service = useProdutoService();
    const [messages, setMessages] = useState<Array<Alert>>([])

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
        '/api/produtos',
        (url: string) => httpClient.get(url) )


    const [ lista , setLista] = useState<Produto[]>([])

    useEffect( () => {
        setLista(result?.data || [] )
    }, [result])

    const editar = (produto: Produto) => {
        console.log(produto)
        const url = `/cadastro/produtos/?id=${produto.id}`
        Router.push(url)

    }

     const deletar = (produto: Produto) => {
        console.log(produto)
        service.deletarProduto(produto.id).then( reponse => { 
            setMessages([
                { tipo : "success" , texto : "Produto Excluído com Sucesso"}
            ])
        })
        const listaALterada = lista?.filter ( p=> p.id != produto.id)
        setLista(listaALterada)
    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>
            <Link href="/cadastro/produtos">
                <button className="button is-warning">Novo Produto</button>
            </Link>
            <br /> <br />
             <Loader show={!result} />
            <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
        </Layout>
    )
}