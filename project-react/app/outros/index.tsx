import CategoriaProdutos from '../../components/CategoriaProdutos'
import {arrayOutros} from '../../data/arrayOutros'

export default function Outros() {
    return <CategoriaProdutos titulo="Outros" produtos={arrayOutros}/>
}
