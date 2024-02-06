const express = require("express");
const deliveryController = require('../controllers/deliveryController')
const router = express.Router();

router.get("/", deliveryController.getDeliveryCost);
//router.get("/add", deliveryController.createNewItem);

module.exports = router;
