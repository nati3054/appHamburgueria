import {FlatList, StyleSheet, Text, View} from 'react-native'
import ProdutoCard from './produtoCard'
import {prodType} from '../types/prodType'

type Props = {
    titulo: string
    produtos: prodType[]
}

export default function CategoriaProdutos({titulo, produtos}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>(
                    <ProdutoCard produto={item}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,paddingTop:16,backgroundColor:"#d2cfcf"},
    titulo:{
        color:"#000",
        fontSize:26,
        fontWeight:"800",
        paddingHorizontal:16,
        paddingBottom:10
    }
})
