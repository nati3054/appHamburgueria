import CategoriaProdutos from '../../components/CategoriaProdutos'
import {doces} from '../../data/arrayProdutos'

export default function Doces() {
    return <CategoriaProdutos titulo="Doces" produtos={doces}/>
}
