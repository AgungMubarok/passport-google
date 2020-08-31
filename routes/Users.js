const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')
const { jwtAuthenticate } = require('../helpers/auth');

const {
    getAllData,
    addOne,
    updateOne,
    deleteOne,
    login
} = require('../controllers/Users')

route.get('/users', getAllData )
route.post('/users', addOne)
route.put('/users/:id', jwtAuthenticate, updateOne)
route.delete('/users/:id', deleteOne)
route.post('/users/login', login)

module.exports = route