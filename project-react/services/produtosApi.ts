import {ProdutoApi} from '../types/ProdutoApi'

const API_URL =
    'https://6a277cb2a84f9d39e908a07c.mockapi.io/appHamburgueria/produtos'

export type NovoProdutoApi = Omit<ProdutoApi, 'id' | 'createdAt'>

export async function buscarProdutosApi(): Promise<ProdutoApi[]> {
    const resposta = await fetch(API_URL)

    if (!resposta.ok) {
        throw new Error('Não foi possível carregar os produtos da API.')
    }

    return resposta.json()
}

export async function buscarProdutoApi(id: string): Promise<ProdutoApi> {
    const resposta = await fetch(`${API_URL}/${id}`)

    if (!resposta.ok) {
        throw new Error('Não foi possível carregar o produto da API.')
    }

    return resposta.json()
}

export async function cadastrarProdutoApi(
    produto: NovoProdutoApi
): Promise<ProdutoApi> {
    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(produto),
    })

    if (!resposta.ok) {
        throw new Error(`Não foi possível cadastrar ${produto.titulo}.`)
    }

    return resposta.json()
}

export async function atualizarProdutoApi(
    id: string,
    produto: NovoProdutoApi
): Promise<ProdutoApi> {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(produto),
    })

    if (!resposta.ok) {
        throw new Error(`Não foi possível atualizar ${produto.titulo}.`)
    }

    return resposta.json()
}
