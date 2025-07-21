import { httpClient } from "../http";
import { Produto } from "../models/produtos";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        // Chamada da API 
        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceURL, produto)
        console.log(response)
        return response.data;
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        const url: string = `${resourceURL}/${produto.id}`
        await httpClient.put<Produto>(url, produto);
    }

    const carregarProduto = async (id: any): Promise<Produto> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Produto> = await httpClient.get(url);
        return response.data;
    }

    const deletarProduto = async (id: any): Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url);
        //return response.data;
    }

    return {
        salvar,
        atualizar,
        carregarProduto,
        deletarProduto,
    }

}