const { httpStatus } = require("../../config/constants");
const LikeModel = require("../../models/likeModel");

const addLike = async (req, res, next) => {
    const {_id, ...currentUser} = req.locals
    const {postId} = req.params;

    let isLiked = await LikeModel.count({
        $and: [{postId: postId}, {userId: _id}],
    });

    if (isLiked > 0) {
        return next();
    }

    let newLike = {
        ...currentUser,
        userId: _id,
        postId: postId
    }

    let like = new LikeModel(newLike);
    like.save()
        .then((savedLike) => {
            res.status(200).send({like: savedLike});
            console.log("Add", savedLike);
        })
        .catch((error) => {
            console.log(error)
            res.status(httpStatus.SERVICE_ERROR.status).send(httpStatus.SERVICE_ERROR.send)
        });
}

module.exports = addLike;