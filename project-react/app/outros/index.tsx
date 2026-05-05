import CategoriaProdutos from '../../components/CategoriaProdutos'
import {outros} from '../../data/arrayProdutos'

export default function Outros() {
    return <CategoriaProdutos titulo="Outros" produtos={outros}/>
}
