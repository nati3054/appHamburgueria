import {useLocalSearchParams} from 'expo-router'
import CategoriaProdutos from '../../../components/CategoriaProdutos'
import {buscarCategoria} from '../../../types/Categoria'

export default function ProdutosCategoria() {
    const {categoria} = useLocalSearchParams<{categoria: string}>()
    const categoriaSelecionada = buscarCategoria(categoria)
    const titulo = categoriaSelecionada?.tituloCategoria ?? categoria

    return <CategoriaProdutos categoria={categoria} titulo={titulo} />
}
