const CommentModel = require("../../models/commentModel");
const {httpStatus} = require("../../config/constants");

const addComment = (req, res) => {
    let user = req.locals;

    let {_id, firstName, lastName} = user;

    let comment = {
        ...req.body,
        user: {
            id: _id,
            firstName,
            lastName
        },
    };

    let newComment = new CommentModel(comment);

    newComment.save()
        .then((newComment) => {
            res.status(200).send({newComment});
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status).send(httpStatus.SERVICE_ERROR.send);
        })
}

module.exports = addComment;