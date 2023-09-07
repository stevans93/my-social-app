const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

router.post("/addRemove", verifyToken, require('../controller/likeController/addLike'), require('../controller/likeController/removeLike'));

module.exports = router;