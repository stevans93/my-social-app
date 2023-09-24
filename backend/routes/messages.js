const { Router } = require('express');
const verifyToken = require('../midleweare/verifyToken');
const router = new Router();

router.get('/', require('../controller/messagesController/allMessages'));

router.post("/addMessage/:userId", verifyToken, require('../controller/messagesController/addMessage'));

module.exports = router;