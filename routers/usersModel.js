const db = require('./usersConfig.js');

const newAccount = (obj) => {
 
    return db('users').insert(obj);
    
}

module.exports = {
    newAccount
}