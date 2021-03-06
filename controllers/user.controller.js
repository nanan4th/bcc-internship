const db = require('../models')
const User = db.users
const _ = require('lodash')
const jwt = require("jsonwebtoken")

//create user
function registerUser (req, res, next) {
    User.create(req.body)
        .then( (data) => {
            let payload = {
                id: data.id,
                username: data.username
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            res.status(200).send({data, token})
        })
        .catch( (err)=> {
            if(err.name == 'SequelizeUniqueConstraintError'){
                const failResponse = {
                    success: 'false',
                    error: {
                        details : _.map(err.errors,({message, type}) => ({
                            message,
                            type
                        }))
                    }
                }
                return res.status(422).send(failResponse)
            }
            return next(err)
        }) 
}

//findAll 
function findAll (req, res, next){
    User.findAll()
        .then( (users) => {
            res.status(200).send({users})
        })
        .catch( (err)=> {
            return next(err)
        })
}

//findOne
function findOne (req, res, next){
    const id = req.params.id
    User.findByPk(id)
        .then( (data) => {
            res.send(data)
            if(data == null){
                next("User with id is not found")
            }
        })
        .catch( (err) => {
            return next(err)
        })
}

//updateOne
function update(req, res, next){
    const id = req.params.id
    let condition = {
        id: id
    }
    User.update(req.body, {where : condition})
    .then(num=> {
        if(num!=1){
            return next(err)
        }
        res.status(200).send({
            success: true,
            message:"Update Successful"
        })
    })
    .catch( (err) => {
        return next(err)
    })
}

function _delete(req, res, next){
    const id = req.params.id
    let condition = {
        id: id
    }
    User.destroy({where: condition})
    .then(num => {
        if(num != 1){
            return next(err)
        }
        res.status(200).send({
            message: "Delete successful"
        })
    })
    .catch(err => {
        return next(err)
    })
}

module.exports = {
    registerUser,
    findAll,
    findOne,
    update,
    delete: _delete
}