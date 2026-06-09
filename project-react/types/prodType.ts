import {ImageSourcePropType} from 'react-native'

export type prodType={
    id : number
    apiId?: string
    titulo : string
    descricao : string
    preco : string
    imagem : ImageSourcePropType
    categoria : string
}
