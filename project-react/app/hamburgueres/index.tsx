import CategoriaProdutos from '../../components/CategoriaProdutos'
import {arrayHamburgueres} from '../../data/arrayHamburgueres'

export default function Hamburgueres() {
    return <CategoriaProdutos titulo="Hamburgueres" produtos={arrayHamburgueres}/>
}
