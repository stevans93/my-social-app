const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

router.get('/all', require('../controller/commentController/allComments'));
router.get('/:id', require('../controller/commentController/getComment'));


module.exports = router;