const { httpStatus } = require('../../config/constants');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const UserModel = require('../../models/userModel');

const register = async (req, res) => {

    const { email, password } = req.body;
    const reqBody = req.body;
    let isExist = await UserModel.findOne({email});

    if(isExist > 0) {
        res.status(httpStatus.EXIST.status).send(httpStatus.EXIST.send);
    } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) {
                console.log(err);
            }

            let newUser = new UserModel({...reqBody, password: hash});
            newUser.save()
                .then((user) => {
                    res.send(user);
                })
                .catch((err) => {
                    res.status(httpStatus.SERVICE_ERROR.status).send(err.message);
                })
        });
    }
}

module.exports = register;