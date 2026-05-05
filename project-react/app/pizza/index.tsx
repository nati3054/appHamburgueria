import CategoriaProdutos from '../../components/CategoriaProdutos'
import {pizzas} from '../../data/arrayProdutos'

export default function Pizza() {
    return <CategoriaProdutos titulo="Pizza" produtos={pizzas}/>
}
