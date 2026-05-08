import CategoriaProdutos from '../../components/CategoriaProdutos'
import {arrayDoces} from '../../data/arrayDoces'

export default function Doces() {
    return <CategoriaProdutos titulo="Doces" produtos={arrayDoces}/>
}
