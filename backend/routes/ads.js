const { Router } = require('express');
const verifyToken = require('../midleweare/verifyToken');
const router = new Router();

// Get All Ads
router.get("/", require("../controller/adsController/allAds"));

// Add Ads
router.post("/add", verifyToken, require("../controller/adsController/addAds"));

module.exports = router;