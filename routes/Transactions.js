const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllData,
    addOne,
    updateOne
} = require('../controllers/Transactions')

route.get('/transaction', verifyToken, getAllData)
route.post('/transaction', verifyToken, addOne)
route.put('/transaction/:id', verifyToken, updateOne)

module.exports = route