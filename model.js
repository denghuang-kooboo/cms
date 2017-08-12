// scan all models defined in models:
let _ = require('lodash')
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);
module.exports = {};
let tables = []
_.forEach(js_files, f => {
    console.log(`import model from file ${f}...`);
    let name = f.replace('.js', '');
    let table = require(__dirname + '/models/' + f);
    tables.push(table)
    module.exports[name] = table.model
})
_.forEach(tables, item => {
    if (item.association && typeof item.association === 'function') {
        item.association(db.sequelize)
    }
})
module.exports.sync = () => {
    db.sync();
};
