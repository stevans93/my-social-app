const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/config');
const UserModel = require('../models/userModel');

const verifyToken = (req, res, next) => {

    if(req.headers.hasOwnProperty("authorization")) {
        let token = req.headers.authorization;

        jwt.verify(token, JWT_KEY, async (error, decode) => {
            if(error) {
                res.status(httpStatus.TOKEN_EXPIRES.status).send(httpStatus.TOKEN_EXPIRES.send)
            } else {
                try {
                    const user = await UserModel.findOne({_id: decode._id});

                    if(user) {
                        req.locals = {...decode, _id: user._id};
                        next();
                    } else {
                        res.status(httpStatus.TOKEN_EXPIRES.status).send({msg: "Token is invalid!"});
                    }
                } catch(error) {
                    res.status(httpStatus.SERVICE_ERROR.status).send(httpStatus.SERVICE_ERROR.send);
                } 
            }
            
        });
    } else {
        res.status(httpStatus.TOKEN_EXPIRES.status).send({msg: "You are not logged!"});
    }

    
    
}

module.exports = verifyToken;