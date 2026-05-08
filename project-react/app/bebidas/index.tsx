import CategoriaProdutos from '../../components/CategoriaProdutos'
import {arrayBebidas} from '../../data/arrayBebidas'

export default function Bebidas() {
    return <CategoriaProdutos titulo="Bebidas" produtos={arrayBebidas}/>
}
