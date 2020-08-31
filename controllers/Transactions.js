const Transactions = require('../Models/Transactions');
const Carts = require('../Models/Carts');
const Products = require('../Models/Products');

module.exports = {
    getAllData : async (req, res) => {
        try{
            const transaction = await Transactions.find({})
            .populate({path:'id_user', select: 'username' })
            .populate({path:'id_product', select: 'product_name' })
            .populate({path:'id_cart', select: 'quantity' })
          
            if(transaction){
                res.send({
                    message: 'get all data',
                    data: transaction
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
    addOne: async (req, res) => {
        try {
            const product = await Products.findOne({_id: req.body.id_product});
            let price = await product.price

            const cart = await Carts.findOne({_id: re.body.id_cart});
            let quantity = await cart.quantity

            const cartStatus = await Carts.findOneAndUpdate({_id: req.body.id_cart}, {status_cart: false})
            let total = await quantity*price;

            const newTransaction = await Transactions.create({
                ...req.body,
                total_price : total
            })
            if(newTransaction) {
                res.status(200).json({
                    message: `success add`,
                    newTransaction
                })
            } else {
                res.status(400).json({
                    message: `failed`
                })
            }
        }
        catch(error) {
            console.log(error);
        }
    },
    updateOne : async (req, res) => {
        const {status_transaction} = req.body
        const transaction = await Transactions.updateOne(
            {_id: req.params.id},
            {status_transaction},
            {new: true}
        );
        if(transaction) {
            res.send({
                message: 'update succes',
                transaction,
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    }
    
}