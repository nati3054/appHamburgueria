import {useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import DetalheProduto from '../../../components/DetalheProduto'
import {buscarProdutoApi} from '../../../services/produtosApi'
import {converterProdutoApi} from '../../../utils/produtoApi'
import {prodType} from '../../../types/prodType'

export default function DetalheProdutoCategoria() {
    const {id} = useLocalSearchParams<{id: string}>()
    const [produto, setProduto] = useState<prodType | null>(null)
    const [erro, setErro] = useState('')

    useEffect(() => {
        if (!id) return
        buscarProdutoApi(String(id))
            .then((p) => setProduto(converterProdutoApi(p)))
            .catch((e) => setErro(e instanceof Error ? e.message : 'Erro ao carregar produto.'))
    }, [id])

    if (erro) {
        return (
            <View style={styles.centralizado}>
                <Text style={styles.erro}>{erro}</Text>
            </View>
        )
    }

    if (!produto) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" color="#9d4612" />
            </View>
        )
    }

    return <DetalheProduto produtos={[]} produtoSelecionado={produto} />
}

const styles = StyleSheet.create({
    centralizado:{
        flex:1, alignItems:'center', justifyContent:'center',
        backgroundColor:'#f4f1ec', gap:12, padding:24,
    },
    erro:{fontSize:16, color:'#b42318', textAlign:'center'},
})
