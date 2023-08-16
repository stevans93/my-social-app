const UserModel = require("../../models/userModel");

const updateUser = (req, res) => {
    const currentUser = req.locals;
    const reqBody = req.body;
    const {role, email, createdAt, updatedAt, ...updatedData} = reqBody;

    UserModel.findOneAndUpdate({_id: currentUser._id}, updatedData, {new: true, projection: {password: 0}})
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = updateUser;