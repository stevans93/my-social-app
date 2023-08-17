const PostModel = require("../../models/postModel");

const updatePost = (req, res) => {
    let currentUser = req.locals; // Token
    const {id: singlePostId} = req.params; // Link
    const {userId, createdAt, updatedAt, ...updatedData} = req.body; // Body Post
    let query;

    if(currentUser.role === "admin") {
        query = {_id: singlePostId};
    } else if(userId === currentUser._id && currentUser.role !== "admin") {
        query = {$and: [{_id: singlePostId}, {userId: currentUser._id}]};
    } else {
        return res.status(403).send({error: "You don't have premission to change other users post!"});
    }

    PostModel.findOneAndUpdate(query, updatedData, {new: true})
        .then((post) => {
            res.status(200).send({message: "Post is successfully updated!", post});
        })
        .catch((error) => {
            res.status(403).send({error: error.message});
        })
}

module.exports = updatePost;