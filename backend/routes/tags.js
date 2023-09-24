const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

router.get('/', require('../controller/tagController/allTags'));

module.exports = router;