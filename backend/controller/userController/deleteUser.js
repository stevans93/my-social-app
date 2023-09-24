const { httpStatus } = require("../../config/constants");
const UserModel = require("../../models/userModel");

const deleteUser = (req, res) => {
    const {role, _id} = req.locals;
    const {id: userId} = req.params;

    if(role === 'admin' || userId === _id) {
        UserModel.deleteOne({_id: userId})
            .then((res) => {
                if(res.deletedCount === 1) {
                    res.send({msg: "User Deleted"});
                } else {
                    res.status(httpStatuss.NOT_FOUND.status).send({msg: "User doesnt exist."})
                }
            })
            .catch((error) => {
                res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message})
            });
    } else {
        res.status(httpStatus.NOT_HAVE_PERMISSION.status).send({msg: "You dont have permission to delete user."});
    }
}

module.exports = deleteUser;