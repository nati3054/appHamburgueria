import {Stack} from 'expo-router'

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"Tela Inicial"}}/>
            <Stack.Screen name="produto/[id]" options={{title:"Detalhe Sanduiche"}}/>
        </Stack>
    )
}