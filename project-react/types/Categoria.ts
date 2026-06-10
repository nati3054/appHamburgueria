export const CATEGORIAS = [
    {categoria: 'hamburgueres', tituloCategoria: 'Hamburgueres'},
    {categoria: 'bebidas', tituloCategoria: 'Bebidas'},
    {categoria: 'pizza', tituloCategoria: 'Pizza'},
    {categoria: 'doces', tituloCategoria: 'Doces'},
    {categoria: 'outros', tituloCategoria: 'Outros'},
] as const

export type CategoriaId = typeof CATEGORIAS[number]['categoria']

export function buscarCategoria(categoria: string) {
    return CATEGORIAS.find((item) => item.categoria === categoria)
}
