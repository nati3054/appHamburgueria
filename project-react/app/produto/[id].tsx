import {View,Text,Image,TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import {produtos} from '../../data/arrayProdutos'

export default function Id() {
    const {id} = useLocalSearchParams<{id:string}>()
    const {width} = useWindowDimensions()
    const telaGrande = width >= 768
    const alturaImagem = telaGrande ? 860 : Math.min(Math.max(width * 0.82, 430), 720)
    const produto = produtos.find((p)=>p.id === Number(id))

    if(!produto) return <Text>Nao EXISTE ESSE PRODUTO</Text>

    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
            <View style={[styles.produtoCard, telaGrande && styles.produtoCardDesktop]}>
                <View style={[styles.imagemCard, telaGrande && styles.imagemCardDesktop, {height:alturaImagem}]}>
                    <Image style={styles.imagem} source={produto.imagem} resizeMode='cover'/>
                </View>

                <View style={[styles.info, telaGrande && styles.infoDesktop]}>
                    <View style={styles.cabecalho}>
                        <View style={styles.tituloBox}>
                            <Text style={styles.nome}>{produto.titulo}</Text>
                            <Text style={styles.categoria}>{produto.categoria}</Text>
                        </View>
                        <Text style={styles.preco}>{produto.preco}</Text>
                    </View>

                    <View style={styles.descricaoBox}>
                        <Text style={styles.descricaoLabel}>Ingredientes</Text>
                        <Text style={styles.descricao}>{produto.descricao}</Text>
                    </View>

                    <TouchableOpacity style={styles.botaoComprar}>
                        <Text style={styles.botaoComprarText}>Adicionar ao carrinho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoVoltar}>
                        <Text style={styles.botaoVoltarText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{flex:1,backgroundColor:"#f5f5f5"},
    conteudo:{padding:16,paddingBottom:32},
    produtoCard:{
        width:"100%",backgroundColor:"#fff",
        borderRadius:18,overflow:"hidden"
    },
    produtoCardDesktop:{
        flexDirection:"row",alignItems:"stretch"
    },
    imagemCard:{
        width:"100%",overflow:"hidden",backgroundColor:"#eee"
    },
    imagemCardDesktop:{
        width:"52%"
    },
    imagem:{width:"100%",height:"100%"},
    info:{
        padding:22,gap:18
    },
    infoDesktop:{
        flex:1,justifyContent:"center",padding:36
    },
    cabecalho:{
        flexDirection:"row",justifyContent:"space-between",
        alignItems:"flex-start",gap:20
    },
    tituloBox:{flex:1},
    nome:{fontSize:30,fontWeight:"800",color:"#171717"},
    categoria:{
        alignSelf:"flex-start",fontSize:13,fontWeight:"800",
        color:"#8e0866",backgroundColor:"#fde8f5",
        paddingHorizontal:10,paddingVertical:5,borderRadius:999,
        marginTop:8
    },
    preco:{fontSize:38,fontWeight:"900",color:"#8e0866"},
    descricaoBox:{
        backgroundColor:"#f8f8f8",borderRadius:14,
        padding:16,borderWidth:1,borderColor:"#eeeeee"
    },
    descricaoLabel:{
        fontSize:13,fontWeight:"800",color:"#8e0866",
        marginBottom:8,textTransform:"uppercase"
    },
    descricao:{
        fontSize:19,lineHeight:28,color:"#333"},
    botaoComprar:{
        backgroundColor:"#f10b0b",paddingVertical:18,
        borderRadius:14,alignItems:"center",marginTop:8,
        shadowColor:"#f10b0b",shadowOffset:{width:0,height:6},
        shadowOpacity:0.22,shadowRadius:10,elevation:4
    },
    botaoComprarText:{fontSize:19,fontWeight:"900",color:"#fff"},
    botaoVoltar:{
        paddingVertical:13,alignItems:"center",
        borderRadius:12,borderWidth:1,borderColor:"#e5e5e5"
    },
    botaoVoltarText:{fontSize:15,fontWeight:"800",color:"#4d4949"},
    errorText:{fontSize:16,color:"#4d4949",marginBottom:16}
})    
