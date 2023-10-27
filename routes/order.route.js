const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order.controller');
const jwtModule = require("../middlewares/jwt/jwt.middleware");

orderRouter.post('/send-purchase-order', jwtModule.verifyAccessToken, orderController.createPurchaseOrder);
orderRouter.get('/get-purchase-order', jwtModule.verifyAccessToken, orderController.getPurchaseOrders);

module.exports = { orderRouter };