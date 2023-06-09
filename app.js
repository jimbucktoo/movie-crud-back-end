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

app.get('/users/:id', function(req, res) {
    queries.getUserById(req.params.id).then(response => res.send(response))
})

app.post('/users', (req, res) => {
    queries.createUser(req.body).then(item => res.send(item))
})

app.put('/users/:id', (req, res) => {
    queries.updateUser(req.params.id, req.body).then(data => res.json(data[0]))
})

app.delete('/users/:id', (req, res) => {
    queries.deleteUser(req.params.id).then(res.sendStatus(204))
})

app.delete('/users', (req, res) => {
    queries.deleteAllUsers().then(res.sendStatus(204))
})

app.get('/movies', function(req, res) {
    queries.getAllMovies().then(response => res.send(response))
})

app.get('/movies/:id', function(req, res) {
    queries.getMovieById(req.params.id).then(response => res.send(response))
})

app.post('/movies', (req, res) => {
    queries.createMovie(req.body).then(item => res.send(item))
})

app.put('/movies/:id', (req, res) => {
    queries.updateMovie(req.params.id, req.body).then(data => res.json(data[0]))
})

app.delete('/movies/:id', (req, res) => {
    queries.deleteMovie(req.params.id).then(res.sendStatus(204))
})

app.delete('/movies', (req, res) => {
    queries.deleteAllMovies().then(res.sendStatus(204))
})

app.get('*', function(req, res) {
    res.send('Page Not Found: 404')
})

app.listen(port, function() {
    console.log('Serving on port ' + port)
})
