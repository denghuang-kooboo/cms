const db = require('../db');

module.exports.model = db.defineModel('contact', {
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    phone: db.STRING(20)
});
module.exports.association = (sequelize) => {
    console.log('association called')
}
