import {useFocusEffect} from 'expo-router'
import {useCallback, useState} from 'react'
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native'
import {buscarProdutosApi} from '../services/produtosApi'
import {converterProdutoApi} from '../utils/produtoApi'
import {prodType} from '../types/prodType'
import ProdutoCard from './produtoCard'

type Props = {
    titulo: string
}

export default function CategoriaProdutos({titulo}: Props) {
    const [lista, setLista] = useState<prodType[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useFocusEffect(
        useCallback(() => {
            let ativo = true
            setCarregando(true)
            setErro('')

            buscarProdutosApi()
                .then((produtos) => {
                    if (!ativo) return
                    setLista(
                        produtos
                            .filter((p) => p.categoria === titulo)
                            .map(converterProdutoApi)
                    )
                })
                .catch((e) => {
                    if (ativo) setErro(e instanceof Error ? e.message : 'Erro ao carregar produtos.')
                })
                .finally(() => {
                    if (ativo) setCarregando(false)
                })

            return () => { ativo = false }
        }, [titulo])
    )

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" color="#9d4612" />
            </View>
        )
    }

    if (erro) {
        return (
            <View style={styles.centralizado}>
                <Text style={styles.erro}>{erro}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <FlatList
                data={lista}
                keyExtractor={(item) => String(item.apiId)}
                renderItem={({item}) => <ProdutoCard produto={item} />}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhum produto encontrado.</Text>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, paddingTop:16, backgroundColor:'#d2cfcf'},
    centralizado:{
        flex:1, alignItems:'center', justifyContent:'center',
        backgroundColor:'#d2cfcf', gap:12,
    },
    titulo:{
        fontSize:26, fontWeight:'800',
        paddingHorizontal:16, paddingBottom:10, color:'#000',
    },
    vazio:{textAlign:'center', marginTop:40, fontSize:16, color:'#6c5b51'},
    erro:{fontSize:16, color:'#b42318', textAlign:'center', padding:20},
})
