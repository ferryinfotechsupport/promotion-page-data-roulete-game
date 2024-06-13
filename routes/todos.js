const express = require("express");
const router = express.Router();
const {  promotionCount, topw11winningInformation, testing } = require("../controller/Aviator/aviator");



// aviator game api's
router.get('/testing-data',testing)

// this is only for testing purpose
router.get('/promotiondata',promotionCount)
router.get('/topw11winningInformation',topw11winningInformation)




module.exports = router;
