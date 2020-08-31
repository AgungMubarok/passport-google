const jwt = require('jsonwebtoken');

module.exports = {

    createToken : (dataUser) => {
        const token = jwt.sign({...dataUser}, 'impact_store', {
            expiresIn: '3h'
        });
        return token;
    },

    verifyToken: (req, res, next) => {
        const bearerToken = req.headers.authorization
        if(!bearerToken){
            res.status(401).json({
                message: "Unauthorized"
            })
        }
        try {
            const token = bearerToken.split(" ")[1]
            const decoded = jwt.verify(token, 'impact_store');
            if(decoded){
                next()
            }
        }
        catch(error){
            console.log(error);
            res.status(401).json({
                message: "Invalid signature"
            })
        }
    }
}