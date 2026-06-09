import {Ionicons} from '@expo/vector-icons'
import {router, useFocusEffect} from 'expo-router'
import {useCallback, useState} from 'react'
import {
    ActivityIndicator,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    alterarQuantidade,
    listarCarrinho,
    limparCarrinho,
    removerDoCarrinho,
} from '../repositories/CarrinhoRepository'
import {CarrinhoItem} from '../types/CarrinhoItem'
import {formatarMoeda} from '../utils/moeda'

export default function Carrinho() {
    const [itens, setItens] = useState<CarrinhoItem[]>([])
    const [carregando, setCarregando] = useState(true)
    const [confirmando, setConfirmando] = useState(false)
    const [pedidoFeito, setPedidoFeito] = useState(false)

    const carregarCarrinho = useCallback(async () => {
        try {
            setItens(await listarCarrinho())
        } catch {
            // silencioso — lista fica vazia
        } finally {
            setCarregando(false)
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            setCarregando(true)
            carregarCarrinho()
        }, [carregarCarrinho])
    )

    async function atualizarQuantidade(item: CarrinhoItem, quantidade: number) {
        await alterarQuantidade(item.id, quantidade)
        await carregarCarrinho()
    }

    async function remover(item: CarrinhoItem) {
        await removerDoCarrinho(item.id)
        await carregarCarrinho()
    }

    async function confirmarPedido() {
        await limparCarrinho()
        setConfirmando(false)
        setPedidoFeito(true)
    }

    const total = itens.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    )

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" color="#9d4612" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={itens}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={itens.length === 0 ? styles.listaVazia : styles.lista}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={styles.info}>
                            <Text style={styles.titulo}>{item.titulo}</Text>
                            <Text style={styles.categoria}>{item.categoria}</Text>
                            <Text style={styles.preco}>
                                {formatarMoeda(item.preco * item.quantidade)}
                            </Text>
                        </View>

                        <View style={styles.acoes}>
                            <View style={styles.quantidade}>
                                <TouchableOpacity
                                    style={styles.botaoQuantidade}
                                    onPress={() => atualizarQuantidade(item, item.quantidade - 1)}
                                >
                                    <Ionicons name="remove" size={19} color="#211915" />
                                </TouchableOpacity>
                                <Text style={styles.quantidadeTexto}>{item.quantidade}</Text>
                                <TouchableOpacity
                                    style={styles.botaoQuantidade}
                                    onPress={() => atualizarQuantidade(item, item.quantidade + 1)}
                                >
                                    <Ionicons name="add" size={19} color="#211915" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => remover(item)}>
                                <Ionicons name="trash-outline" size={23} color="#b42318" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.centralizado}>
                        <Ionicons name="cart-outline" size={64} color="#9b8f87" />
                        <Text style={styles.vazioTitulo}>Seu carrinho está vazio</Text>
                        <TouchableOpacity
                            style={styles.botaoCardapio}
                            onPress={() => router.replace('/lista')}
                        >
                            <Text style={styles.botaoCardapioTexto}>Ver cardápio</Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            {itens.length > 0 && (
                <View style={styles.rodape}>
                    <View style={styles.totalLinha}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.total}>{formatarMoeda(total)}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.botaoFinalizar}
                        onPress={() => setConfirmando(true)}
                    >
                        <Ionicons name="checkmark-circle-outline" size={20} color="#211915" />
                        <Text style={styles.botaoFinalizarTexto}>Finalizar pedido</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal de confirmação */}
            <Modal visible={confirmando} transparent animationType="fade" onRequestClose={() => setConfirmando(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Ionicons name="receipt-outline" size={40} color="#9d4612" />
                        <Text style={styles.modalTitulo}>Finalizar pedido?</Text>
                        <Text style={styles.modalDescricao}>
                            Total: {formatarMoeda(total)}
                        </Text>
                        <View style={styles.modalBotoes}>
                            <TouchableOpacity
                                style={styles.modalCancelar}
                                onPress={() => setConfirmando(false)}
                            >
                                <Text style={styles.modalCancelarTexto}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalConfirmar}
                                onPress={confirmarPedido}
                            >
                                <Text style={styles.modalConfirmarTexto}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de sucesso */}
            <Modal visible={pedidoFeito} transparent animationType="fade" onRequestClose={() => {}}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Ionicons name="checkmark-circle" size={56} color="#218739" />
                        <Text style={styles.modalTitulo}>Pedido realizado!</Text>
                        <Text style={styles.modalDescricao}>
                            Seu pedido foi recebido com sucesso.{'\n'}Em breve estará pronto.
                        </Text>
                        <TouchableOpacity
                            style={[styles.modalConfirmar, {width:'100%',marginTop:8}]}
                            onPress={() => {
                                setPedidoFeito(false)
                                router.replace('/lista' as never)
                            }}
                        >
                            <Text style={styles.modalConfirmarTexto}>Ver cardápio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'#f4f1ec'},
    centralizado:{flex:1,alignItems:'center',justifyContent:'center',gap:14},
    lista:{padding:16,paddingBottom:160,gap:12},
    listaVazia:{flexGrow:1},
    card:{
        backgroundColor:'#fff',borderRadius:16,padding:16,
        flexDirection:'row',alignItems:'center',gap:12,
    },
    info:{flex:1,gap:4},
    titulo:{fontSize:18,fontWeight:'800',color:'#211915'},
    categoria:{fontSize:13,fontWeight:'600',color:'#75675f'},
    preco:{fontSize:17,fontWeight:'900',color:'#9d4612',marginTop:4},
    acoes:{alignItems:'center',gap:14},
    quantidade:{flexDirection:'row',alignItems:'center',gap:10},
    botaoQuantidade:{
        width:34,height:34,borderRadius:10,backgroundColor:'#f3ede7',
        alignItems:'center',justifyContent:'center',
    },
    quantidadeTexto:{minWidth:20,textAlign:'center',fontSize:17,fontWeight:'800'},
    vazioTitulo:{fontSize:20,fontWeight:'800',color:'#4b4039'},
    botaoCardapio:{backgroundColor:'#ffba38',paddingHorizontal:22,paddingVertical:13,borderRadius:12},
    botaoCardapioTexto:{fontSize:16,fontWeight:'900',color:'#211915'},
    rodape:{
        position:'absolute',left:0,right:0,bottom:0,backgroundColor:'#fff',
        padding:16,paddingBottom:24,borderTopWidth:1,borderTopColor:'#e9e2dc',gap:12,
    },
    totalLinha:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
    totalLabel:{fontSize:18,fontWeight:'700',color:'#4b4039'},
    total:{fontSize:24,fontWeight:'900',color:'#9d4612'},
    botaoFinalizar:{
        backgroundColor:'#ffba38',borderRadius:13,padding:16,
        flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,
    },
    botaoFinalizarTexto:{fontSize:17,fontWeight:'900',color:'#211915'},
    overlay:{
        flex:1,backgroundColor:'rgba(0,0,0,0.55)',
        alignItems:'center',justifyContent:'center',padding:24,
    },
    modalBox:{
        backgroundColor:'#fff',borderRadius:20,padding:28,
        alignItems:'center',gap:12,width:'100%',maxWidth:360,
    },
    modalTitulo:{fontSize:22,fontWeight:'900',color:'#211915'},
    modalDescricao:{fontSize:15,color:'#6c5b51',textAlign:'center',lineHeight:22},
    modalBotoes:{flexDirection:'row',gap:12,marginTop:8,width:'100%'},
    modalCancelar:{
        flex:1,paddingVertical:14,borderRadius:12,
        borderWidth:1,borderColor:'#ddd4cd',alignItems:'center',
    },
    modalCancelarTexto:{fontSize:16,fontWeight:'800',color:'#4b4039'},
    modalConfirmar:{
        flex:1,paddingVertical:16,borderRadius:12,
        backgroundColor:'#218739',alignItems:'center',
    },
    modalConfirmarTexto:{fontSize:16,fontWeight:'900',color:'#fff'},
})
