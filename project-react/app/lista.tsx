import {router} from 'expo-router'
import {View,Text,TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'

const categorias = [
    {
        titulo:"Hamburgueres",
        rota:"/hamburgueres",
        descricao:"10 opcoes",
        imagem:require('../assets/images/hamburgueres/categoria-hamburgueres.png')
    },
    {
        titulo:"Bebidas",
        rota:"/bebidas",
        descricao:"10 opcoes",
        imagem:require('../assets/images/bebidas/categoria-bebidas.png')
    },
    {
        titulo:"Pizza",
        rota:"/pizza",
        descricao:"10 opcoes",
        imagem:require('../assets/images/pizza/categoria-pizza.png')
    },
    {
        titulo:"Doces",
        rota:"/doces",
        descricao:"10 opcoes",
        imagem:require('../assets/images/doces/categoria-doces.png')
    },
    {
        titulo:"Outros",
        rota:"/outros",
        descricao:"10 opcoes",
        imagem:require('../assets/images/outros/categoria-outros.png')
    },
] as const

export default function Lista() {
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Menu</Text>
            <ScrollView contentContainerStyle={styles.grid}>
                {categorias.map((categoria)=>(
                    <TouchableOpacity
                        key={categoria.rota}
                        style={styles.card}
                        onPress={()=>router.push(categoria.rota as never)}
                    >
                        <View
                            style={styles.imagem}
                        >
                            <Image
                                style={styles.foto}
                                source={categoria.imagem}
                                resizeMode="cover"
                            />
                            <View style={styles.info}>
                                <Text style={styles.cardTitulo}>{categoria.titulo}</Text>
                                <Text style={styles.cardDescricao}>{categoria.descricao}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )}

const styles = StyleSheet.create({
    container:{flex:1,padding:16,backgroundColor:"#d2cfcf"},
    titulo:{
        color:"#000",
        fontSize:28,
        fontWeight:"800",
        marginBottom:16
    },
    grid:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        gap:12,
        paddingBottom:16
    },
    card:{
        backgroundColor:"#f1f1f1",
        borderRadius:16,
        width:"31%",
        aspectRatio:1,
        elevation:3,
        shadowColor:"#000",
        shadowOpacity:0.08,
        shadowRadius:8,
        overflow:"hidden"
    },
    info:{
        backgroundColor:"rgba(0,0,0,0.58)",
        paddingHorizontal:10,
        paddingVertical:10,
        gap:4,
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        width:"100%",
        alignItems:"center"
    },
    cardTitulo:{fontSize:18,fontWeight:"700",color:"#fff",textAlign:"center"},
    cardDescricao:{fontSize:15,fontWeight:"600",color:"#f1f1f1"},
    imagem:{
        width:"100%",
        aspectRatio:1,
        backgroundColor:"#f1f1f1",
        justifyContent:"center",
        alignItems:"center"
    },
    foto:{
        width:"100%",
        height:"100%"
    }
})
