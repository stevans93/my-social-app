const CommentModel = require('../../models/commentModel');

const updateComment = (req, res) => {
    let currentUser = req.locals;
    const {id: singleCommentId} = req.params;
    const {postId, body, user, ...updateData} = req.body;

    let query = {};

    if(currentUser.roll === 'admin') {
        query = {_id: singleCommentId};
    } else if(user.id = currentUser._id && currentUser.roll !== 'admin') {
        query = {
            $and: [{_id: singleCommentId}, {'user.id': currentUser._id}]
        };
    } else {
        return res.status(403).send({error: "You don't have permission to change other users post!"});
    }

    updateData.updatedAt = new Date().getTime();

    CommentModel.findOneAndUpdate(query, updateData, {new: true})
        .then((comment) => {
            res.status(200).send({message: 'Comment is successfully updated!', comment});
        })
        .catch((error) => {
            res.status(403).send({error: error.message});
        })
}

module.exports = updateComment;