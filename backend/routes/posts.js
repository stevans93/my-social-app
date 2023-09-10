const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

// Get All Posts
router.get("/all", require("../controller/postController/allPosts"));

// Get One Post By Id
router.get("/:id", require("../controller/postController/getPost"));

// Search Post
router.get("/search", require("../controller/postController/searchPost"));

// Filter Post
router.get("/filter", require("../controller/postController/filterPost"));

// Add Post
router.post("/add", verifyToken, require("../controller/postController/addPost"));

// Update Post By Id
router.put("/update/:id", verifyToken, require("../controller/postController/updatePost"));

// Delete Post By Id
router.delete("/:id", verifyToken, require("../controller/postController/deletePost"));

module.exports = router;