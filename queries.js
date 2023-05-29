const db = require('./database-connection')
module.exports = {
    getAllUsers(){
        return db.select().from('users')
    },
    getUserById(id){
        return db('users').where('id', id).first()
    },
    getUserByAuthId(authId){
        return db('users').where('authId', authId).first()
    },
    createUser(item){
        return db('users').insert(item).returning('*')
    },
    updateUser(id, updateUser){
        return db('users').where('id', id).update(updateUser).returning('*')
    },
    deleteUser(id){
        return db('users').where('id', id).delete().returning('*')
    },
    deleteAllUsers(){
        return db('users').delete().returning('*')
    },
    getAllMovies(){
        return db.select().from('movies')
    },
    getMoviesByUserId(id) {
        return db.select().from('movies').where('user_id', id)
    },
    getMovieById(id){
        return db('movies').where('id', id).first()
    },
    createMovie(item){
        return db('movies').insert(item).returning('*')
    },
    updateMovie(id, updateMovie){
        return db('movies').where('id', id).update(updateMovie).returning('*')
    },
    deleteMovie(id){
        return db('movies').where('id', id).delete().returning('*')
    },
    deleteAllMovies(){
        return db('movies').delete().returning('*')
    }
}
