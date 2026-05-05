import {View,FlatList} from 'react-native'
import {sandubas} from '../data/arrayProdutos'
import ProdutoCard from '../components/produtoCard'

export default function Lista() {
    return(
        <View 
        style={{flex:1,paddingTop:16,backgroundColor:"#d2cfcf"}}>
            <FlatList
            data={sandubas}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>
               ( 
               <ProdutoCard produto={item}/>
            ) }
                    />
        </View>
    )}

