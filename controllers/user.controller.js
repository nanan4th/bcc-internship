const db = require('../models')
const User = db.users
const _ = require('lodash')

//create user
function registerUser (req, res, next) {
    User.create(req.body)
        .then( (data) => {
            res.status(200).send(data)
        })
        .catch( (err)=> {
            if(err.name == 'SequelizeUniqueConstraintError'){
                console.log("masuk sini")
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
            res.status(500).send({
                message: "Error in create user"
            })
        }) 
}

//findAll 
function findAll (req, res, next){
    User.findAll()
        .then( (users) => {
            res.status(200).send({users})
        })
        .catch( (err)=> {
            res.status(500).send({
                message: "Error in findAll"
            })
        })
}

//findOne
function findOne (req, res, next){
    const id = req.params.id
    User.findByPk(id)
        .then( (data) => {
            res.send(data)
            if(data !=null){
                res.status(500).send ({
                    message: "Error in findOne"
                })
            }
        })
        .catch( (err) => {
            res.status(500).send({
                message: "Error in findOne"
            })
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
            res.status(500).send({
                message:"Affected row not one"
            })
        }
        res.status(200).send({
            success: true,
            message:"Update Successful"
        })
    })
    .catch( (err) => {
        res.status(500).send({
            message: "Error in update tweet"
        })
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
            res.status(500).send({
                message: "Affected not one row"
            })
        }
        res.status(200).send({
            message: "Delete successful"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Error in delete tweet"
        })
    })
}

module.exports = {
    registerUser,
    findAll,
    findOne,
    update,
    delete: _delete
}