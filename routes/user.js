const userController = require('../controllers/UserController')
const router = require('express').Router()

// /user
router.get('/', userController.getAllUser)
router.post('/', userController.insertUser)
router.put('/update/:idUser', userController.updateUser)
router.put('/remove/:idUser', userController.removeUser)

module.exports = router   
