const { Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const addLike = require("../controller/likeController/addLike");
const removeLike = require("../controller/likeController/removeLike");
const router = new Router()

router.post("/addRemove/:postId", verifyToken, addLike, removeLike)

module.exports = router