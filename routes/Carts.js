const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllData,
    addOne,
    updateOne,
    deleteOne
} = require('../controllers/Carts')

route.get('/carts', verifyToken, getAllData)
route.post('/carts', verifyToken, addOne)
route.put('/carts/:id', verifyToken, updateOne)
route.delete('/carts/:id', verifyToken, deleteOne)

module.exports = route