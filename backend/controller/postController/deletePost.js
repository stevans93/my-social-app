const { httpStatus } = require("../../config/constants");
const PostModel = require("../../models/postModel");

const deletePost = (req, res) => {
    let {id} = req.params; // Post ID
    let user = req.locals;
    let query = {_id: id}
    let isAdmin = user.role === "admin";

    if(!isAdmin) {
        query = {$and: [{_id: id}, {userId: user._id}]};
    }

    PostModel.deleteOne(query)
        .then((result) => {
            if(result.deletedCount === 1) {
                res.send({msg: "Post Deleted!"});
            } else {
                res.status(httpStatus.NOT_HAVE_PERMISSION.status).send(httpStatus.NOT_HAVE_PERMISSION.send);
            }
        })
        .catch((error) => {
            res.send({msg: "Error"});
        })
}

module.exports = deletePost;