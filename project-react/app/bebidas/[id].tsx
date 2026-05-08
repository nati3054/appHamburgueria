import DetalheProduto from '../../components/DetalheProduto'
import {arrayBebidas} from '../../data/arrayBebidas'

export default function Bebida() {
    return <DetalheProduto produtos={arrayBebidas}/>
}
