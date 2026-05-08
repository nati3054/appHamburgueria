import CategoriaProdutos from '../../components/CategoriaProdutos'
import {arrayPizzas} from '../../data/arrayPizzas'

export default function Pizza() {
    return <CategoriaProdutos titulo="Pizza" produtos={arrayPizzas}/>
}
