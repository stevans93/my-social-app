const LikeModel = require("../../models/likeModel");

const addLike = async (req, res, next) => {
    const currentUser = req.locals;
    const {postId} = req.params;

    let isLike = LikeModel.count({$and: [{postId: postId}, {userId: currentUser._id}]});

    if(isLike > 0) {
        next()
    } else {
        
    }
}

module.exports = addLike;