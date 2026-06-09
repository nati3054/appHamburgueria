# Burger House

Aplicativo mobile de hamburgueria desenvolvido com React Native, Expo e
TypeScript.

## Requisitos do trabalho

- Navegacao: Expo Router, configurado em `app/_layout.tsx`.
- Mais de 5 telas: inicio, cardapio, categorias, detalhes, carrinho,
  produtos da API e cadastro de produto.
- Imagens: arquivos locais em `assets/images` e URLs publicas nos produtos
  recebidos pela API.
- SQLite: carrinho persistente em `database/database.ts`.
- API: consulta, cadastro e atualizacao de produtos no MockAPI por meio de
  `services/produtosApi.ts`.
- Lista: produtos exibidos com `FlatList`.

## API

Endpoint utilizado:

```text
https://6a277cb2a84f9d39e908a07c.mockapi.io/appHamburgueria/produtos
```

## Como executar

Instale as dependencias:

```powershell
npm install
```

Inicie o projeto:

```powershell
npm start
```

Depois abra no Expo Go ou em um emulador Android/iOS.
