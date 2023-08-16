const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

// Get All Posts
router.get("/all", require("../controller/postController/allPosts"));

// Get One Post
router.get("/:id", require("../controller/postController/getPost"));

module.exports = router;