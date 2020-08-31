const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllData,
    addOne,
    updateOne,
    deleteOne
} = require('../controllers/Products')

route.get('/products', verifyToken, getAllData)
route.post('/products', verifyToken, addOne)
route.put('/products/:id', verifyToken, updateOne)
route.delete('/products/:id', verifyToken, deleteOne)

module.exports = route