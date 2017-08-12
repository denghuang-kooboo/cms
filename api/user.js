const APIError = require('../rest').APIError;
const Contact = require('../model.js').Contact;
let _ = require('lodash')
module.exports = {
  'GET get/:user': async (ctx, next) => {
    let userName = ctx.params.user
    if (!userName) {
      ctx.rest({
        data: null,
        message: 'the user name is empty'
      })
      return
    }
    let user = await Contact.findOne({
      where: {
        name: userName
      }
    })
    ctx.rest({
      data: user
    })
  },
  'POST add': async (ctx, next) => {
    let user = _.pick(ctx.request.body, ['name', 'gender', 'birth', 'phone'])
    for (let u in user) {
      if (!user[u] && typeof user[u] !== 'boolean') {
        throw new Error(`${u} should not be empty or null`)
      }
    }
    let result = await Contact.create(user)
    ctx.rest(result)
  },
  'GET error': async (ctx, next) => {
    throw new APIError('500', 'test error')
  }
}