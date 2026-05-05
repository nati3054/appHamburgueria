import {View,TouchableOpacity,Image, StyleSheet} from 'react-native'
import {router} from 'expo-router'
export default function Index(){
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={()=>router.push('/lista')}>
                <Image style={styles.imagem}
                source={require('../assets/images/eu.jpg')}
                />
            </TouchableOpacity>
        </View>
    )}
const styles = StyleSheet.create({
   container:{flex:1,justifyContent:"center",alignItems:"center"},
   imagem:{width:500,height:850,borderRadius:20}
})