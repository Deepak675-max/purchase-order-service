const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order.controller');
const jwtModule = require("../middlewares/jwt/jwt.middleware");
const { upload } = require('../middlewares/files/file.midlleware');

orderRouter.post('/send-purchase-order',
    upload.single('file'),
    jwtModule.verifyAccessToken,
    orderController.createPurchaseOrder
);
orderRouter.post('/get-purchase-orders', jwtModule.verifyAccessToken, orderController.getPurchaseOrders);

module.exports = { orderRouter };