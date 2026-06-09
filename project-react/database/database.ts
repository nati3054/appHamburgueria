import * as SQLite from 'expo-sqlite'

let bancoPromise: Promise<SQLite.SQLiteDatabase> | null = null

export async function getBanco(): Promise<SQLite.SQLiteDatabase> {
    if (!bancoPromise) {
        bancoPromise = SQLite.openDatabaseAsync('burger-house.db').then(async (banco) => {
            await banco.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS carrinho (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    produto_id INTEGER NOT NULL,
                    titulo TEXT NOT NULL,
                    categoria TEXT NOT NULL,
                    preco REAL NOT NULL,
                    quantidade INTEGER NOT NULL DEFAULT 1,
                    UNIQUE(produto_id, categoria)
                );
            `)

            return banco
        })
    }

    return bancoPromise
}
