const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

router.get("/all", require("../controller/postController/allPosts"));

module.exports = router;