const CommentModel = require("../../models/commentModel");
const {httpStatus} = require("../../config/constants");

const getComment = (req, res) => {
    const id = req.params.id;

    CommentModel.findOne({_id: id})
        .then((comment) => {
            res.send({comment});
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status).send({error:error.message})
        })
}

module.exports = getComment;