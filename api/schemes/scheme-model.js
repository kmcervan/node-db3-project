// scheme-model
const db = require('../../data/db-config');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findSteps
}

function find(){
    return db('schemes')
}

function findById(id){
    return db('schemes').where('id',id).first()
}

function findSteps(id){
    return db('steps as s')
            .join('schemes as sc', 's.scheme_id', 'sc.id')
            .select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions')
            .where('s.id', id)
}

function add(schemes){
    return db('schemes').insert(schemes)
    .then(([id])=>{
        return db('schemes').where('id', id).first()
    })
}

function update(changes, id){
    const schemeId = id
    return db('schemes').where('id',id).update(changes)
    .then(()=>{
        return db('schemes').where('id',schemeId).first()
    })
}

function remove(id){
    return db ('schemes').where('id',id).del()
    .then(()=>{
        return db('schemes')
    })
}