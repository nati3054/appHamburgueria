import {prodType} from '../types/prodType'
import {ProdutoApi} from '../types/ProdutoApi'
import {formatarMoeda} from './moeda'

export function converterProdutoApi(produto: ProdutoApi): prodType {
    return {
        id: Number(produto.id),
        apiId: produto.id,
        titulo: produto.titulo,
        descricao: produto.descricao,
        preco: formatarMoeda(Number(produto.preco)),
        imagem: {uri: produto.imagem},
        categoria: produto.categoria,
    }
}
