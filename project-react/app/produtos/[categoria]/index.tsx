import {useLocalSearchParams} from 'expo-router'
import CategoriaProdutos from '../../../components/CategoriaProdutos'

const tituloPorCategoria: Record<string, string> = {
    hamburgueres: 'Hamburgueres',
    bebidas: 'Bebidas',
    pizza: 'Pizza',
    doces: 'Doces',
    outros: 'Outros',
}

export default function ProdutosCategoria() {
    const {categoria} = useLocalSearchParams<{categoria: string}>()
    const titulo = tituloPorCategoria[categoria] ?? categoria
    return <CategoriaProdutos titulo={titulo} />
}
