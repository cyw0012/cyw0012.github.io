const joi = require('joi')
const userinfo = joi.string().min(1).required()
const id = joi.number().min(1).integer().required()
const state = joi.number().min(0).max(1).required()
const time = joi.string().required()

exports.add_info_sc = {
  body: {
    userinfo,
    time,
  },
}
exports.update_info_sc = {
  body: {
    id,
    state,
  },
}
