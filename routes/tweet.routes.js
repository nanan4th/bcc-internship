const express = require('express')
const router = express.Router()

const tweetController = require('../controllers/tweet.controller')

//create tweet
router.post('/create', tweetController.createTweet)

//findall
router.get('/tweets', tweetController.findAll)

//getone
router.get('/:id', tweetController.findOne)

//update
router.put('/:id', tweetController.update)

//delete
router.delete('/delete/:id', tweetController.delete)

module.exports = router
