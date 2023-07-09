const db = require('../../data/dbConfig');

function get() {
    return db('users')
}

function getById(id) {
    return db('users').where({ id: id }).first()
}

function getByFilter(filter) {
    return db('users').where(filter).first()
}

async function insert(user) {
    const [id] = await db('users').insert(user)
    return getById(id)
}

module.exports = { get, getById, getByFilter, insert }