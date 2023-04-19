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

module.exports = new GraphQLSchema({
    query: RootQuery
})
