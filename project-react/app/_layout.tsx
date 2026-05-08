import {Stack} from 'expo-router'

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"Tela Inicial"}}/>
            <Stack.Screen name="lista" options={{title:"Cardápio"}}/>
            <Stack.Screen name="hamburgueres/index" options={{title:"Hamburgueres"}}/>
            <Stack.Screen name="bebidas/index" options={{title:"Bebidas"}}/>
            <Stack.Screen name="pizza/index" options={{title:"Pizza"}}/>
            <Stack.Screen name="doces/index" options={{title:"Doces"}}/>
            <Stack.Screen name="outros/index" options={{title:"Outros"}}/>
            <Stack.Screen name="produto/[id]" options={{title:"Produto"}}/>
        </Stack>
    )
}
