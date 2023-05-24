module.exports = {

    development: {
        client: 'pg',
        connection: 'postgresql://localhost/moviecrud'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }

}
