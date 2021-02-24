const joi = require("joi")

const name = joi.string().regex(/^[a-z A-Z]+$/)
const username = joi.string().alphanum()
const password = joi.string().min(8).strict()

const registerSchema = joi.object().keys({
    firstname: name.required(),
    lastname: name.required(),
    username: username.required(),
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    "register": registerSchema
}