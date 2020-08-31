const Carts = require('../Models/Carts');

module.exports = {
    getAllData : async (req, res) => {
        try{
            const cart = await Carts.find({})
            .populate({path:'id_user', select: 'username' })
            .populate({path:'id_product', select: 'product_name' })
          
            if(cart){
                res.send({
                    message: 'get all data',
                    data: cart
                })
            } else {
                res.status(400).json({
                    message: 'failed to get data'
                })
            }
        }
        catch(error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    addOne: (req, res) => {
        const {id_user, id_product, quantity, status_cart} = req.body
        Carts.create({
            id_user,
            id_product,
            quantity, 
            status_cart
        }, (error, result) => {
            if(error){
                res.status(400).json({
                    message: "error"
                })
            }
            else {
                res.status(200).json({
                    message: "success add cart", 
                    result
                })
            }
        })
    },
    updateOne : async (req, res) => {
        const {status_cart, quantity} = req.body
        const cart = await Carts.updateOne(
            {_id: req.params.id},
            {status_cart, quantity},
            {new: true}
        );
        if(cart) {
            res.send({
                message: 'succes',
                cart
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    },
    deleteOne : async (req, res) => {
        const cart = await Carts.deleteOne(
            {_id: req.params.id},
            {new:true}
        );
        if(cart) {
            res.send({
                message: 'succes delete',
                cart
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    },
    
}