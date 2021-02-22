const router = require('express').Router()
const userController = require('../controllers/user.controller')

// const { registerUser,findAll,findOne,update,delete: _delete} = require('../controllers/user.controller')

//create tweet
router.post('/register', userController.registerUser)

//findall
router.get('/users', userController.findAll)

//getone
router.get('/:id', userController.findOne)

//update
router.put('/:id', userController.update)

//delete
router.delete('/delete/:id', userController.delete)

module.exports = router