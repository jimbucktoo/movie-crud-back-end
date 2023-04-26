const graphql = require ('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLID} = graphql
const queries = require('../queries')

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        directors: { type: GraphQLString },
        year: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        poster_url: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return queries.getAll().then(response => response)
            }
        },
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return queries.getById(args.id).then(response => response)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: GraphQLString },
                directors: { type: GraphQLString },
                year: { type: GraphQLInt },
                rating: { type: GraphQLInt },
                poster_url: { type: GraphQLString }
            },
            resolve(parent, args){
                let movie = new Object({
                    title: args.title,
                    directors: args.directors,
                    year: args.year,
                    rating: args.rating,
                    poster_url: args.poster_url
                })
                return queries.createMovie(movie).then(item => {
                    return item[0]
                })
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                directors: { type: GraphQLString },
                year: { type: GraphQLInt },
                rating: { type: GraphQLInt },
                poster_url: { type: GraphQLString }
            },
            resolve(parent, args){
                let movie = new Object({
                    id: args.id,
                    title: args.title,
                    directors: args.directors,
                    year: args.year,
                    rating: args.rating,
                    poster_url: args.poster_url
                })
                return queries.updateMovie(args.id, movie).then(item => {
                    return item[0]
                })
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return queries.deleteMovie(args.id).then(item => {
                    return item[0]
                })
            }
        },
        deleteAll: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return queries.deleteAll().then(items => {
                    return items
                })
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
