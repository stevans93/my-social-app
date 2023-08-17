const PostModel = require("../../models/postModel");

const addPost = (req, res) => {
    const userFromToken = req.locals;

    const {_id: userId} = userFromToken;

    const post = { ...req.body, userId }

    const addNewPost = new PostModel(post);

    addNewPost.save()
        .then((addNewPost) => {
            res.status(400).send(addNewPost);
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status).send(httpStatus.SERVICE_ERROR.send);
        })
}

module.exports = addPost;