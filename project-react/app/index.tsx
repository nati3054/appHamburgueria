import {Ionicons} from '@expo/vector-icons'
import {router} from 'expo-router'
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const categorias = [
    {titulo:"Hamburgueres", rota:"/hamburgueres", imagem:require('../assets/images/hamburgueres/categoria-hamburgueres.png')},
    {titulo:"Bebidas", rota:"/bebidas", imagem:require('../assets/images/bebidas/categoria-bebidas.png')},
    {titulo:"Pizzas", rota:"/pizza", imagem:require('../assets/images/pizza/categoria-pizza.png')},
    {titulo:"Doces", rota:"/doces", imagem:require('../assets/images/doces/categoria-doces.png')},
] as const

const destaques = [
    {titulo:"Double X", descricao:"Blend 150g, queijo, bacon e alface", preco:"R$58.90", rota:"/produto/0", imagem:require('../assets/images/hamburgueres/1.png')},
    {titulo:"Pizza Pepperoni", descricao:"Mussarela, pepperoni e molho de tomate", preco:"R$52.90", rota:"/produto/27", imagem:require('../assets/images/pizza/pizza-pepperoni.png')},
    {titulo:"Milkshake Chocolate", descricao:"Milkshake cremoso 400ml", preco:"R$18.90", rota:"/produto/19", imagem:require('../assets/images/bebidas/bebida-milkshake-chocolate.png')},
] as const

export default function Index(){
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={require('../assets/images/hero-food-spread.png')}
                    style={styles.hero}
                    imageStyle={styles.heroImage}
                    resizeMode="cover"
                >
                    <View style={styles.overlay}>
                        <View style={styles.topBar}>
                            <View>
                                <Text style={styles.nome}>Burger House</Text>
                                <Text style={styles.subNome}>Hamburgueria artesanal</Text>
                            </View>
                            <View style={styles.status}>
                                <Ionicons name="time-outline" size={16} color="#fff" />
                                <Text style={styles.statusTexto}>Aberto</Text>
                            </View>
                        </View>

                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitulo}>Seu pedido pronto para matar a fome.</Text>
                            <Text style={styles.heroDescricao}>
                                Hamburgueres, pizzas, bebidas, doces e porcoes em um cardapio rapido de navegar.
                            </Text>

                            <View style={styles.botoes}>
                                <TouchableOpacity style={styles.botaoPrincipal} onPress={()=>router.push('/lista')}>
                                    <Text style={styles.botaoPrincipalTexto}>Ver cardapio</Text>
                                    <Ionicons name="arrow-forward" size={20} color="#1c120c" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.botaoSecundario} onPress={()=>router.push('/hamburgueres')}>
                                    <Ionicons name="fast-food-outline" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitulo}>Categorias</Text>
                    </View>

                    <View style={styles.categoriasGrid}>
                        {categorias.map((categoria)=>(
                            <TouchableOpacity
                                key={categoria.rota}
                                style={styles.categoriaCard}
                                onPress={()=>router.push(categoria.rota as never)}
                            >
                                <Image source={categoria.imagem} style={styles.categoriaImagem} resizeMode="cover" />
                                <View style={styles.categoriaOverlay}>
                                    <Text style={styles.categoriaTitulo}>{categoria.titulo}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitulo}>Destaques</Text>
                    <View style={styles.destaques}>
                        {destaques.map((item)=>(
                            <TouchableOpacity
                                key={item.rota}
                                style={styles.destaqueCard}
                                onPress={()=>router.push(item.rota as never)}
                            >
                                <Image source={item.imagem} style={styles.destaqueImagem} resizeMode="cover" />
                                <View style={styles.destaqueInfo}>
                                    <Text style={styles.destaqueTitulo}>{item.titulo}</Text>
                                    <Text style={styles.destaqueDescricao}>{item.descricao}</Text>
                                    <Text style={styles.destaquePreco}>{item.preco}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{flex:1,backgroundColor:"#17120f"},
    container:{backgroundColor:"#f4f1ec",paddingBottom:24},
    hero:{
        minHeight:560,
        margin:12,
        borderRadius:20,
        overflow:"hidden",
        backgroundColor:"#1c120c"
    },
    heroImage:{
        borderRadius:20,
        backgroundColor:"#1c120c",
        width:"100%",
        height:"118%",
        transform:[{translateY:-90}]
    },
    overlay:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.68)",
        padding:20,
        justifyContent:"space-between"
    },
    topBar:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:12},
    nome:{color:"#fff",fontSize:24,fontWeight:"900"},
    subNome:{color:"#f0ddd0",fontSize:14,fontWeight:"600",marginTop:2},
    status:{
        flexDirection:"row",
        alignItems:"center",
        gap:6,
        borderWidth:1,
        borderColor:"rgba(255,255,255,0.32)",
        borderRadius:999,
        paddingHorizontal:12,
        paddingVertical:8,
        backgroundColor:"rgba(255,255,255,0.14)"
    },
    statusTexto:{color:"#fff",fontSize:13,fontWeight:"800"},
    heroContent:{gap:14},
    heroTitulo:{color:"#fff",fontSize:38,fontWeight:"900",lineHeight:43,maxWidth:560},
    heroDescricao:{color:"#f7ece3",fontSize:16,fontWeight:"600",lineHeight:23,maxWidth:520},
    botoes:{flexDirection:"row",alignItems:"center",gap:12,marginTop:6},
    botaoPrincipal:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:10,
        backgroundColor:"#ffba38",
        borderRadius:12,
        paddingHorizontal:18,
        paddingVertical:14
    },
    botaoPrincipalTexto:{color:"#1c120c",fontSize:16,fontWeight:"900"},
    botaoSecundario:{
        width:52,
        height:52,
        borderRadius:12,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(255,255,255,0.16)",
        borderWidth:1,
        borderColor:"rgba(255,255,255,0.28)"
    },
    section:{paddingHorizontal:16,marginTop:10},
    sectionHeader:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:12},
    sectionTitulo:{fontSize:23,fontWeight:"900",color:"#211915",marginBottom:12},
    link:{fontSize:15,fontWeight:"800",color:"#9d4612"},
    categoriasGrid:{flexDirection:"row",flexWrap:"wrap",gap:12},
    categoriaCard:{
        width:"48%",
        aspectRatio:1.28,
        borderRadius:14,
        overflow:"hidden",
        backgroundColor:"#ddd6cd",
        elevation:3,
        shadowColor:"#000",
        shadowOpacity:0.08,
        shadowRadius:8
    },
    categoriaImagem:{width:"100%",height:"100%"},
    categoriaOverlay:{
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        padding:10,
        backgroundColor:"rgba(0,0,0,0.55)"
    },
    categoriaTitulo:{color:"#fff",fontSize:16,fontWeight:"900",textAlign:"center"},
    destaques:{gap:12},
    destaqueCard:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius:14,
        padding:12,
        elevation:3,
        shadowColor:"#000",
        shadowOpacity:0.08,
        shadowRadius:8
    },
    destaqueImagem:{width:104,height:104,borderRadius:12,backgroundColor:"#eee"},
    destaqueInfo:{flex:1,marginLeft:12,gap:5},
    destaqueTitulo:{fontSize:18,fontWeight:"900",color:"#211915"},
    destaqueDescricao:{fontSize:14,fontWeight:"600",color:"#6c5b51",lineHeight:20},
    destaquePreco:{fontSize:16,fontWeight:"900",color:"#9d4612",marginTop:2},
})
