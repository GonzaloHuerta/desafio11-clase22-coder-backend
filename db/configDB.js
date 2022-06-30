export const options = {
    mariaDB:{
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafio08'
        },
        pool: {min:0, max:10}
    },
    sqlite:{
        client: 'sqlite3',
        connection: {
            filename: './ecommerce.sqlite',
        },
        useNullAsDefault: true
    }
}