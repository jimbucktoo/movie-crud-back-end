const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')
const queries = require('../queries')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

async function authenticateUser(authId, username, email, picture) {
    const existingUser = await queries.getUserByAuthId(authId)
    if (existingUser) {
        const token = jwt.sign({ username, email }, SECRET_KEY, { expiresIn: '10m' })
        return token
    }
    return null
}

function createUser(authId, username, email, picture) {
    let user = new Object({
        authId: authId,
        username: username,
        email: email,
        picture: picture
    })
    const createdUser = queries.createUser(user).then(item => {
        return item[0]
    })
    const token = jwt.sign({ username, email }, SECRET_KEY, { expiresIn: '10m' })
    return token
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch (err) {
        throw new Error('Invalid Token')
    }
}

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

const TokenType = new GraphQLObjectType({
    name: 'Token',
    fields: () => ({
        token: { type: GraphQLString }
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
        poster_url: { type: GraphQLString },
        user_id: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args, context) {
                return queries.getAllUsers().then(response => response)
            }
        },
        userById: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(parent, args, context){
                return queries.getUserById(args.id).then(response => response)
            }
        },
        userByAuthId: {
            type: UserType,
            args: { authId: { type: new GraphQLNonNull(GraphQLString) }},
            resolve(parent, args, context){
                return queries.getUserByAuthId(args.authId).then(response => response)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args, context) {
                return queries.getAllMovies().then(response => response)
            }
        },
        movieById: {
            type: MovieType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(parent, args, context){
                return queries.getMovieById(args.id).then(response => response)
            }
        },
        moviesByUserId: {
            type: new GraphQLList(MovieType),
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(parent, args, context){
                return queries.getMoviesByUserId(args.id).then(response => response)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        authenticateUser: {
            type: TokenType,
            args: {
                authId: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                picture: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context) {
                const token = authenticateUser(args.authId, args.username, args.email, args.picture)
                return { token }
            }
        },
        addUser: {
            type: TokenType,
            args: {
                authId: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                picture: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context){
                const token = createUser(args.authId, args.username, args.email, args.picture)
                return { token }
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
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
                let user = {
                    id: args.id,
                    authId: args.authId,
                    username: args.username,
                    email: args.email,
                    picture: args.picture
                }
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
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
                return queries.deleteUser(args.id).then(item => {
                    return item[0]
                })
            }
        },
        deleteAllUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
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
                poster_url: { type: new GraphQLNonNull(GraphQLString) },
                user_id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
                let movie = {
                    title: args.title,
                    directors: args.directors,
                    year: args.year,
                    rating: args.rating,
                    poster_url: args.poster_url,
                    user_id: args.user_id
                }
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
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
                let movie = {
                    id: args.id,
                    title: args.title,
                    directors: args.directors,
                    year: args.year,
                    rating: args.rating,
                    poster_url: args.poster_url
                }
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
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
                return queries.deleteMovie(args.id).then(item => {
                    return item[0]
                })
            }
        },
        deleteAllMovies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args, context){
                const decoded = verifyToken(context.headers.authorization)
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
