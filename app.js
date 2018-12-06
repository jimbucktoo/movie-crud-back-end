const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = process.env.PORT || 3001
var cors = require('cors')
const queries = require('./queries')

app.use(cors())
app.use(bodyParser.json())

//FAVICON ROUTE
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

//INDEX ROUTE
app.get("/", function(req, res) {
    queries.getAll().then(response => res.send(response))
})

//SHOW ROUTE
app.get("/:id", function(req, res) {
    queries.getById(req.params.id).then(response => res.send(response))
})

//POST ROUTE
app.post('/', (req, res) => {
    queries.createMovie(req.body).then(item => res.send(item))
})

//UPDATE ROUTE
app.put('/:id', (req, res) => {
    queries.updateMovie(req.params.id, req.body).then(data => res.json(data[0]))
})

//DELETE BY ID ROUTE
app.delete('/:id', (req, res) => {
    queries.deleteMovie(req.params.id).then(res.sendStatus(204))
})

//DELETE ALL ROUTE
app.delete('/', (req, res) => {
    queries.deleteAll().then(res.sendStatus(204))
})

//ERROR ROUTE

app.get("*", function(req, res) {
    res.send("Page Not Found: 404")
})

//HOSTING

app.listen(port, function() {
    console.log("Serving on port 3001.")
})

console.log("exit code 0")
