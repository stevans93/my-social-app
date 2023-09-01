const { Router } = require('express');
const verifyToken = require('../midleweare/verifyToken');
const router = new Router();

/**** GET ALL USERS ****/
router.get('/', require('../controller/userController/getAllUsers'));

/**** GET USER ****/
router.get('/:id', require('../controller/userController/getUser'));

/**** POST A USER ****/
router.post('/add', require('../controller/userController/addUser'));

/**** UPDATE USER ****/
router.put('/update', verifyToken, require('../controller/userController/updateUser'));
router.put('/update/:userId', verifyToken, require('../controller/userController/updateUser'));

/**** DELETE USER ****/

module.exports = router;