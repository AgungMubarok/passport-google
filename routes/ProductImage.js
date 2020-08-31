const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    addOne,
    updateOne,
    deleteOne
} = require('../controllers/ProductImage')

route.post('/productimg', verifyToken, addOne)
route.put('/productimg/:id', verifyToken, updateOne)
route.delete('/productimg/:id', verifyToken, deleteOne)

module.exports = route