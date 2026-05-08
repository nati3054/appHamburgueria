import DetalheProduto from '../../components/DetalheProduto'
import {arrayPizzas} from '../../data/arrayPizzas'

export default function PizzaDetalhe() {
    return <DetalheProduto produtos={arrayPizzas}/>
}
