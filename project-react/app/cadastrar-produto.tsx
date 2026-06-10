import {Ionicons} from '@expo/vector-icons'
import {router} from 'expo-router'
import {useRef, useState} from 'react'
import {
    ActivityIndicator,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import {cadastrarProdutoApi} from '../services/produtosApi'
import {CATEGORIAS, CategoriaId} from '../types/Categoria'

export default function CadastrarProduto() {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [imagem, setImagem] = useState('')
    const [categoria, setCategoria] = useState<CategoriaId | ''>('')
    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState('')
    const opacidadeSucesso = useRef(new Animated.Value(0)).current

    function mostrarSucesso() {
        Animated.sequence([
            Animated.timing(opacidadeSucesso, {toValue:1, duration:200, useNativeDriver:true}),
            Animated.delay(2500),
            Animated.timing(opacidadeSucesso, {toValue:0, duration:300, useNativeDriver:true}),
        ]).start()
    }

    async function salvarProduto() {
        setErro('')
        const precoNumerico = Number(preco.trim().replace(',', '.'))
        const imagemValida = /^https?:\/\/.+/i.test(imagem.trim())

        if (!titulo.trim() || !descricao.trim() || !preco.trim() || !imagem.trim() || !categoria) {
            setErro('Preencha todos os campos antes de cadastrar.')
            return
        }

        if (!Number.isFinite(precoNumerico) || precoNumerico <= 0) {
            setErro('Informe um preço válido maior que zero.')
            return
        }

        if (!imagemValida) {
            setErro('A URL da imagem deve começar com http:// ou https://.')
            return
        }

        setSalvando(true)

        try {
            const categoriaSelecionada = CATEGORIAS.find((item) => item.categoria === categoria)

            if (!categoriaSelecionada) {
                setErro('Selecione uma categoria válida.')
                return
            }

            const criado = await cadastrarProdutoApi({
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                preco: precoNumerico,
                imagem: imagem.trim(),
                categoria: categoriaSelecionada.categoria,
                tituloCategoria: categoriaSelecionada.tituloCategoria,
            })

            setTitulo('')
            setDescricao('')
            setPreco('')
            setImagem('')
            setCategoria('')
            mostrarSucesso()

            setTimeout(() => {
                router.push(`/produtos/${categoriaSelecionada.categoria}/${criado.id}` as never)
            }, 1500)
        } catch (falha) {
            setErro(falha instanceof Error ? falha.message : 'Não foi possível cadastrar o produto.')
        } finally {
            setSalvando(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.conteudo}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.apresentacao}>
                    <Ionicons name="add-circle-outline" size={42} color="#218739" />
                    <Text style={styles.titulo}>Novo produto</Text>
                    <Text style={styles.subtitulo}>
                        O produto será cadastrado diretamente no MockAPI.
                    </Text>
                </View>

                {erro ? (
                    <View style={styles.erroBox}>
                        <Ionicons name="alert-circle-outline" size={20} color="#b42318" />
                        <Text style={styles.erroTexto}>{erro}</Text>
                    </View>
                ) : null}

                <Campo label="Título" value={titulo} onChangeText={setTitulo} placeholder="Ex.: X-Bacon" />
                <Campo label="Descrição" value={descricao} onChangeText={setDescricao} placeholder="Ingredientes ou detalhes" multiline />
                <Campo label="Preço" value={preco} onChangeText={setPreco} placeholder="Ex.: 29,90" keyboardType="decimal-pad" />
                <Campo label="URL da imagem" value={imagem} onChangeText={setImagem} placeholder="https://site.com/imagem.png" autoCapitalize="none" />

                <Text style={styles.label}>Categoria</Text>
                <View style={styles.categorias}>
                    {CATEGORIAS.map((item) => {
                        const selecionada = categoria === item.categoria
                        return (
                            <TouchableOpacity
                                key={item.categoria}
                                style={[styles.categoriaBtn, selecionada && styles.categoriaBtnSelecionada]}
                                onPress={() => setCategoria(item.categoria)}
                            >
                                <Text style={[styles.categoriaBtnTexto, selecionada && styles.categoriaBtnTextoSelecionado]}>
                                    {item.tituloCategoria}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <TouchableOpacity
                    style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
                    onPress={salvarProduto}
                    disabled={salvando}
                >
                    {salvando
                        ? <ActivityIndicator color="#fff" />
                        : <Ionicons name="cloud-upload-outline" size={22} color="#fff" />}
                    <Text style={styles.botaoSalvarTexto}>
                        {salvando ? 'Cadastrando...' : 'Cadastrar produto'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Animated.View style={[styles.toast, {opacity: opacidadeSucesso}]} pointerEvents="none">
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.toastTexto}>Produto cadastrado com sucesso na API!</Text>
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

type CampoProps = {
    label: string
    value: string
    onChangeText: (texto: string) => void
    placeholder: string
    keyboardType?: 'default' | 'decimal-pad'
    autoCapitalize?: 'none' | 'sentences'
    multiline?: boolean
}

function Campo({label, value, onChangeText, placeholder, keyboardType = 'default', autoCapitalize = 'sentences', multiline = false}: CampoProps) {
    return (
        <View style={styles.campo}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.inputGrande]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'#f4f1ec'},
    conteudo:{padding:20,paddingBottom:120},
    apresentacao:{alignItems:'center',gap:7,marginBottom:26},
    titulo:{fontSize:26,fontWeight:'900',color:'#211915'},
    subtitulo:{fontSize:15,color:'#6c5b51',textAlign:'center'},
    erroBox:{
        flexDirection:'row',alignItems:'center',gap:9,
        backgroundColor:'#fef2f2',borderWidth:1,borderColor:'#fca5a5',
        borderRadius:12,padding:13,marginBottom:18,
    },
    erroTexto:{flex:1,fontSize:15,fontWeight:'700',color:'#b42318'},
    campo:{marginBottom:15},
    label:{fontSize:14,fontWeight:'800',color:'#4b4039',marginBottom:7},
    input:{
        backgroundColor:'#fff',borderWidth:1,borderColor:'#ddd4cd',
        borderRadius:12,paddingHorizontal:14,paddingVertical:13,fontSize:16,
    },
    inputGrande:{minHeight:100},
    categorias:{flexDirection:'row',flexWrap:'wrap',gap:9,marginBottom:24},
    categoriaBtn:{
        borderWidth:1,borderColor:'#cfc4bc',borderRadius:999,
        paddingHorizontal:14,paddingVertical:10,backgroundColor:'#fff',
    },
    categoriaBtnSelecionada:{backgroundColor:'#9d4612',borderColor:'#9d4612'},
    categoriaBtnTexto:{fontSize:14,fontWeight:'800',color:'#4b4039'},
    categoriaBtnTextoSelecionado:{color:'#fff'},
    botaoSalvar:{
        minHeight:54,backgroundColor:'#218739',borderRadius:14,
        flexDirection:'row',alignItems:'center',justifyContent:'center',gap:9,
    },
    botaoDesabilitado:{opacity:0.65},
    botaoSalvarTexto:{fontSize:17,fontWeight:'900',color:'#fff'},
    toast:{
        position:'absolute',
        bottom:32,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        backgroundColor:'#218739',
        paddingHorizontal:20,
        paddingVertical:14,
        borderRadius:14,
        elevation:8,
        shadowColor:'#000',
        shadowOpacity:0.18,
        shadowRadius:10,
    },
    toastTexto:{color:'#fff',fontSize:15,fontWeight:'800'},
})
