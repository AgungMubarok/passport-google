const Products = require('../Models/Products');

module.exports = {
    getAllData : (req, res) => {
        Products.find()
        .populate({path: 'url_image', select: "url_image _id"})
        .then(result => {
            res.send({
                message: 'get All data',
                result
            })
        })
        .catch(error => {
            console.log(error)
            res.send({
                message: 'failed'
            })
        })
    },
    addOne: (req, res) => {
        const { product_name, description, stock, price } = req.body

        Products.create({
            product_name,
            description,
            stock,
            price
        }, (error, result) => {
            if(error){
                res.status(400).json({
                    message: "error"
                })
            }
            else {
                res.status(200).json({
                    message: "success add product", 
                    result
                })
            }
        })
    },
    updateOne : async (req, res) => {
        const {product_name, description, stock, price} = req.body
        const product = await Products.updateOne(
            {_id: req.params.id},
            {product_name, description, stock, price},
            {new: true}
        );
        if(product) {
            res.send({
                message: 'succes',
                product
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    },
    deleteOne : async (req, res) => {
        const product = await Products.deleteOne(
            {_id: req.params.id},
            {new:true}
        );
        if(product) {
            res.send({
                message: 'succes delete',
                product
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    }
    
}