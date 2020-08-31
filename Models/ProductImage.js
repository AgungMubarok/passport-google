const mongoose = require('mongoose');

const Schema = mongoose.Schema

const product_imageSchema = new Schema({
    url_image: {
        type: String,
        required: true
    }
}, {timestamps:true})

const Product_Image = mongoose.model('product_image', product_imageSchema)

module.exports = Product_Image;