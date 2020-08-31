const Products_Image = require('../Models/ProductImage');
const Products = require('../Models/Products');

module.exports = {
    addOne: async(req, res) => {
        const productImg = await Products_Image.create({url_image : req.body.url_image});
        const product = await Products.findOneAndUpdate(
            {_id: req.body._id},
            {$push: {url_image: productImg._id}},
            {new: true}
        );
        if(product) {
            res.status(200).json({
                message: "success add image", 
                productImg,
                product
            })
        }
        else {
            res.status(400).json({
                message: "error"
            })
        }
    },
    updateOne : async (req, res) => {
        const {url_image} = req.body
        const productImg = await Products_Image.updateOne(
            {_id: req.params.id},
            {url_image},
            {new: true}
        );
        if(productImg) {
            res.send({
                message: 'update succes',
                productImg,
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    },
    deleteOne : async (req, res) => {
        const productImg = await Products_Image.deleteOne(
            {_id: req.params.id},
            {new:true}
        );
        if(productImg) {
            res.send({
                message: 'succes delete',
                productImg
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    }
}