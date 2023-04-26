const db = require('./database-connection')
module.exports = {
    getAll(){
        return db.select().from('movies')
    },
    getById(id){
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
    deleteAll(){
        return db('movies').delete().returning('*')
    }
}
