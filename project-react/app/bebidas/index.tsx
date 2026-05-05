import CategoriaProdutos from '../../components/CategoriaProdutos'
import {bebidas} from '../../data/arrayProdutos'

export default function Bebidas() {
    return <CategoriaProdutos titulo="Bebidas" produtos={bebidas}/>
}
