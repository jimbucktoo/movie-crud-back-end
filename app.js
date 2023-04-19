const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const cors = require('cors')
const queries = require('./queries')
const { graphqlHTTP } = require('express-graphql');
const schema = require ('./schema/schema')

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

/*
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('/', function(req, res) {
    queries.getAll().then(response => res.send(response))
})

app.get('/:id', function(req, res) {
    queries.getById(req.params.id).then(response => res.send(response))
})

app.post('/', (req, res) => {
    queries.createMovie(req.body).then(item => res.send(item))
})

app.put('/:id', (req, res) => {
    queries.updateMovie(req.params.id, req.body).then(data => res.json(data[0]))
})

app.delete('/:id', (req, res) => {
    queries.deleteMovie(req.params.id).then(res.sendStatus(204))
})

app.delete('/', (req, res) => {
    queries.deleteAll().then(res.sendStatus(204))
})

app.get('*', function(req, res) {
    res.send('Page Not Found: 404')
})
*/

app.listen(port, function() {
    console.log('Serving on port ' + port)
})
