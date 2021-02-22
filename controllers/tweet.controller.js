const db = require('../models')
const Tweet = db.tweets

//create tweet
function createTweet (req, res, next) {
    Tweet.create(req.body)
        .then( (data) => {
            res.send(data)
        })
        .catch( (err)=>{
            res.status(500).send({
                message: "Error in create tweet"
            })
        }) 
}

//findAll readtweet
function findAll (req, res, next){
    Tweet.findAll()
        .then( (data) => {
            res.send(data)
        })
        .catch( (err)=> {
            res.status(500).send({
                message: "Error in findAll"
            })
        })
}

function findOne (req, res, next){
    const id = req.params.id
    Tweet.findByPk(id)
        .then( (data) => {
            res.send(data)
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
    Tweet.update(req.body, {where : condition})
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
    Tweet.destroy({where: condition})
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
    createTweet,
    findAll,
    findOne,
    update,
    delete: _delete
}