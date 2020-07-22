const db = require('./usersConfig.js');

const newAccount = (obj) => {
 
    return db('users').insert(obj);
    
}

const findByUsername = (username) => {

    return db('users').where({username}).first();

}

module.exports = {
    newAccount,
    findByUsername
}