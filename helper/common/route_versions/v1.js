const express = require("express");
const v1 = express.Router();

const { orderRouter } = require('../../../routes/order.route');
v1.use('/purchaseOrder', orderRouter);

module.exports = {
  v1
};
