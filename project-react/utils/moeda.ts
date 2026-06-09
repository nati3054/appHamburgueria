export function textoParaPreco(preco: string): number {
    const valor = preco.replace('R$', '').trim().replace(',', '.')
    return Number(valor)
}

export function formatarMoeda(valor: number): string {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`
}
