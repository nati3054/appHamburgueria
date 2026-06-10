import {getBanco} from '../database/database'
import {prodType} from '../types/prodType'
import {CarrinhoItem} from '../types/CarrinhoItem'
import {textoParaPreco} from '../utils/moeda'

type CarrinhoRow = {
    id: number
    produto_id: number
    titulo: string
    categoria: string
    preco: number
    quantidade: number
}

function mapearItem(item: CarrinhoRow): CarrinhoItem {
    return {
        id: item.id,
        produtoId: item.produto_id,
        titulo: item.titulo,
        categoria: item.categoria,
        preco: item.preco,
        quantidade: item.quantidade,
    }
}

export async function listarCarrinho(): Promise<CarrinhoItem[]> {
    const banco = await getBanco()
    const itens = await banco.getAllAsync<CarrinhoRow>(
        'SELECT * FROM carrinho ORDER BY id DESC'
    )
    return itens.map(mapearItem)
}

export async function adicionarAoCarrinho(produto: prodType): Promise<void> {
    const banco = await getBanco()

    await banco.runAsync(
        `INSERT INTO carrinho (produto_id, titulo, categoria, preco, quantidade)
         VALUES (?, ?, ?, ?, 1)
         ON CONFLICT(produto_id, categoria)
         DO UPDATE SET quantidade = quantidade + 1`,
        produto.id,
        produto.titulo,
        produto.tituloCategoria,
        textoParaPreco(produto.preco)
    )
}

export async function alterarQuantidade(id: number, quantidade: number): Promise<void> {
    const banco = await getBanco()

    if (quantidade <= 0) {
        await removerDoCarrinho(id)
        return
    }

    await banco.runAsync(
        'UPDATE carrinho SET quantidade = ? WHERE id = ?',
        quantidade,
        id
    )
}

export async function removerDoCarrinho(id: number): Promise<void> {
    const banco = await getBanco()
    await banco.runAsync('DELETE FROM carrinho WHERE id = ?', id)
}

export async function limparCarrinho(): Promise<void> {
    const banco = await getBanco()
    await banco.runAsync('DELETE FROM carrinho')
}

export async function contarItensCarrinho(): Promise<number> {
    const banco = await getBanco()
    const resultado = await banco.getFirstAsync<{total: number}>(
        'SELECT COALESCE(SUM(quantidade), 0) as total FROM carrinho'
    )
    return resultado?.total ?? 0
}
