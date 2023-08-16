const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

// Get All Comments
router.get('/all/:postId', require('../controller/commentController/allComments'));

// Get One Comment
router.get('/:id', require('../controller/commentController/getComment'));

// Delete One Comment
router.delete('/:id', verifyToken, require('../controller/commentController/deleteComment'));

// Add One Comment
router.post('/add', verifyToken, require('../controller/commentController/addComment'));


module.exports = router;