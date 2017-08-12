const fs = require('fs');
const methods = require('./methods.js')

// add url-route in /controllers:

function addMapping(router, mapping, prefix) {
    for (let item in mapping) {
        let urlArray = item.split(' ')
        if (!urlArray || urlArray.length < 1) {
            throw Error('method and url for api is not defined')
        }
        let method
        let action
        if (urlArray.length === 1) {
            method = methods.GET
            action = urlArray[0]
        } else {
            method = urlArray[0]
            action = urlArray[1]
            if (!methods.hasOwnProperty(method)) {
                throw new Error(`the method ${method} is not correct`)
            }
        }

        let path = `${prefix}${action}`
        let methodKey = method ? method.toLowerCase() : methods.GET.toLowerCase()
        router[methodKey](path, mapping[item]);
        console.log(`register URL mapping: ${method} ${path}`);
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        let prefix = `/${dir}/${f.replace('.js', '')}/`
        addMapping(router, mapping, prefix);
    });
}

module.exports = function (dir) {
    let controllers_dir = dir || 'api', router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
