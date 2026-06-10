import {Ionicons} from '@expo/vector-icons'
import {router, useFocusEffect} from 'expo-router'
import {useCallback, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'
import {contarItensCarrinho} from '../repositories/CarrinhoRepository'
import {buscarProdutosApi} from '../services/produtosApi'
import {CATEGORIAS} from '../types/Categoria'

const categoriasBase = [
    {...CATEGORIAS[0], imagem:require('../assets/images/hamburgueres/categoria-hamburgueres.png')},
    {...CATEGORIAS[1], imagem:require('../assets/images/bebidas/categoria-bebidas.png')},
    {...CATEGORIAS[2], imagem:require('../assets/images/pizza/categoria-pizza.png')},
    {...CATEGORIAS[3], imagem:require('../assets/images/doces/categoria-doces.png')},
    {...CATEGORIAS[4], imagem:require('../assets/images/outros/categoria-outros.png')},
]

export default function Lista() {
    const [totalCarrinho, setTotalCarrinho] = useState(0)
    const [quantidades, setQuantidades] = useState<Record<string, number>>({})

    useFocusEffect(
        useCallback(() => {
            contarItensCarrinho().then(setTotalCarrinho).catch(() => {})

            buscarProdutosApi()
                .then((produtos) => {
                    const contagem: Record<string, number> = {}
                    for (const p of produtos) {
                        contagem[p.categoria] = (contagem[p.categoria] ?? 0) + 1
                    }
                    setQuantidades(contagem)
                })
                .catch(() => {})
        }, [])
    )

    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Cardápio</Text>
                <View style={styles.acoes}>
                    <TouchableOpacity
                        style={styles.adicionar}
                        onPress={() => router.push('/cadastrar-produto' as never)}
                    >
                        <Ionicons name="add-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.carrinho}
                        onPress={() => router.push('/carrinho' as never)}
                    >
                        <Ionicons name="cart-outline" size={24} color="#fff" />
                        {totalCarrinho > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeTexto}>
                                    {totalCarrinho > 99 ? '99+' : String(totalCarrinho)}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.grid}>
                {categoriasBase.map((categoria) => (
                    <TouchableOpacity
                        key={categoria.categoria}
                        style={styles.card}
                        onPress={() => router.push(`/produtos/${categoria.categoria}` as never)}
                    >
                        <View style={styles.imagem}>
                            <Image style={styles.foto} source={categoria.imagem} resizeMode="cover" />
                            <View style={styles.info}>
                                <Text style={styles.cardTitulo}>{categoria.tituloCategoria}</Text>
                                <Text style={styles.cardDescricao}>
                                    {quantidades[categoria.categoria] ?? '...'} opções
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, padding:16, backgroundColor:'#d2cfcf'},
    cabecalho:{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:16},
    titulo:{color:'#000', fontSize:28, fontWeight:'800'},
    acoes:{flexDirection:'row', gap:8},
    adicionar:{width:46, height:46, borderRadius:13, backgroundColor:'#218739', alignItems:'center', justifyContent:'center'},
    carrinho:{width:46, height:46, borderRadius:13, backgroundColor:'#9d4612', alignItems:'center', justifyContent:'center'},
    badge:{
        position:'absolute', top:4, right:4,
        minWidth:14, height:14, borderRadius:7,
        backgroundColor:'#ffba38', alignItems:'center', justifyContent:'center', paddingHorizontal:3,
    },
    badgeTexto:{fontSize:9, fontWeight:'900', color:'#1c120c'},
    grid:{flexDirection:'row', flexWrap:'wrap', justifyContent:'center', gap:12, paddingBottom:16},
    card:{
        backgroundColor:'#f1f1f1', borderRadius:16, width:'31%', aspectRatio:1,
        elevation:3, shadowColor:'#000', shadowOpacity:0.08, shadowRadius:8, overflow:'hidden',
    },
    info:{
        backgroundColor:'rgba(0,0,0,0.58)', paddingHorizontal:10, paddingVertical:10, gap:4,
        position:'absolute', bottom:0, left:0, right:0, width:'100%', alignItems:'center',
    },
    cardTitulo:{fontSize:18, fontWeight:'700', color:'#fff', textAlign:'center'},
    cardDescricao:{fontSize:15, fontWeight:'600', color:'#f1f1f1'},
    imagem:{width:'100%', aspectRatio:1, backgroundColor:'#f1f1f1', justifyContent:'center', alignItems:'center'},
    foto:{width:'100%', height:'100%'},
})
