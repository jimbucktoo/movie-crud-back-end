const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const cors = require('cors')
const queries = require('./queries')
const { graphqlHTTP } = require('express-graphql')
const schema = require ('./schema/schema')
const cron = require('node-cron')
const axios = require('axios')

cron.schedule('*/10 * * * *', () => {
    axios.get('https://moviecrud.onrender.com/')
        .then((response) => {
            console.log('Server Awake')
        })
        .catch((error) => {
            console.error('Error Keeping Server Awake: ', error)
        })
})

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('/', function(req, res) {
    res.send("MovieCrud Server")
})

app.get('/users', function(req, res) {
    queries.getAllUsers().then(response => res.send(response))
})

app.get('/movies', function(req, res) {
    queries.getAllMovies().then(response => res.send(response))
})

app.get('*', function(req, res) {
    res.send('Page Not Found: 404')
})

app.listen(port, function() {
    console.log('Serving on port ' + port)
})
