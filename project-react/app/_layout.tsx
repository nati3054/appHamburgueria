import {Stack} from 'expo-router'

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"Tela Inicial"}}/>
            <Stack.Screen name="lista" options={{title:"Cardápio"}}/>
            <Stack.Screen name="carrinho" options={{title:"Carrinho"}}/>
            <Stack.Screen name="cadastrar-produto" options={{title:"Cadastrar produto"}}/>
            <Stack.Screen name="produtos/[categoria]/index" options={{title:"Produtos"}}/>
            <Stack.Screen name="produtos/[categoria]/[id]" options={{title:"Produto"}}/>
        </Stack>
    )
}
