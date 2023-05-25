const graphql = require ('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull} = graphql
const queries = require('../queries')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        authId: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        picture: { type: GraphQLString }
    })
})

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
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return queries.getAllUsers().then(response => response)
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(parent, args){
                return queries.getUserById(args.id).then(response => response)
            }
        },
        userAuth: {
            type: UserType,
            args: { authId: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(parent, args){
                return queries.getUserByAuthId(args.authId).then(response => response)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return queries.getAllMovies().then(response => response)
            }
        },
        movie: {
            type: MovieType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(parent, args){
                return queries.getMovieById(args.id).then(response => response)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                authId: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                picture: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let user = new Object({
                    authId: args.authId,
                    username: args.username,
                    email: args.email,
                    picture: args.picture
                })
                return queries.createUser(user).then(item => {
                    return item[0]
                })
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                authId: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                picture: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let user = new Object({
                    id: args.id,
                    authId: args.authId,
                    username: args.username,
                    email: args.email,
                    picture: args.picture
                })
                return queries.updateUser(args.id, user).then(item => {
                    return item[0]
                })
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                return queries.deleteUser(args.id).then(item => {
                    return item[0]
                })
            }
        },
        deleteAllUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return queries.deleteAllUsers().then(items => {
                    return items
                })
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                directors: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) },
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                poster_url: { type: new GraphQLNonNull(GraphQLString) }
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
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                directors: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) },
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                poster_url: { type: new GraphQLNonNull(GraphQLString) }
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
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                return queries.deleteMovie(args.id).then(item => {
                    return item[0]
                })
            }
        },
        deleteAllMovies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return queries.deleteAllMovies().then(items => {
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
