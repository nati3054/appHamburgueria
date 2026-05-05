import CategoriaProdutos from '../../components/CategoriaProdutos'
import {sandubas} from '../../data/arrayProdutos'

export default function Hamburgueres() {
    return <CategoriaProdutos titulo="Hamburgueres" produtos={sandubas}/>
}
