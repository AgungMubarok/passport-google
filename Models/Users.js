const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema

const userSchema = new Schema({
    providerId: {
        type: String,
        require: false
    },
    provider: {
        type: String,
        require: false
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    }
},{
    timestamps: true
})

userSchema.plugin(findOrCreate);

const Users = mongoose.model('users', userSchema)

module.exports = Users