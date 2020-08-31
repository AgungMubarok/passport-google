const Users = require('../Models/Users');
const { createToken } = require('../helpers/token')

module.exports = {
    getAllData : (req, res) => {
        Users.find()
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
        const {fullname, username, email, phone, password, address } = req.body

        Users.create({
            fullname,
            username,
            email,
            phone,
            password,
            address
        }, (error, result) => {
            if(error){
                res.status(400).json({
                    message: "error"
                })
            }
            else {
                res.status(200).json({
                    message: "success add user", 
                    result
                })
            }
        })
    },
    updateOne : async (req, res) => {
        const {fullname, username, email, phone, password, address } = req.body
        const user = await Users.updateOne(
            {_id: req.params.id},
            {fullname, username, email, phone, password, address},
            {new: true}
        );
        if(user) {
            res.send({
                message: 'succes',
                user
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    },
    deleteOne : async (req, res) => {
        const user = await Users.deleteOne(
            {_id: req.params.id},
            {new:true}
        );
        if(user) {
            res.send({
                message: 'succes delete',
                user
            })
        } else {
            res.send({
                message: 'error'
            })
        }
    },
    login: async (req, res) => {
        try {
            const registeredUser = await Users.findOne({email: req.body.email})
            if(registeredUser.password === req.body.password){
                const dataUser = {
                    id: registeredUser._id,
                    username: registeredUser.username,
                    email: registeredUser.email
                }
                const token = createToken(dataUser)
                console.log(token)

                res.status(200).json({
                    message: "Selamat datang",
                    token,
                    user: dataUser
                })
            } else {
                res.status(400).json({
                    message: "Password Salah"
                })
            }
        }
        catch(error) {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    
}