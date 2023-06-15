const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const cors = require('cors')
const queries = require('./queries')
const { graphqlHTTP } = require('express-graphql')
const schema = require ('./schema/schema')

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

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
