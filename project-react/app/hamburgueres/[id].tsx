import DetalheProduto from '../../components/DetalheProduto'
import {arrayHamburgueres} from '../../data/arrayHamburgueres'

export default function Hamburguer() {
    return <DetalheProduto produtos={arrayHamburgueres}/>
}
