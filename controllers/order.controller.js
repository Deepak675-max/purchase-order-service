const httpErrors = require("http-errors");
const { orderModel } = require("../models/order.model");
const joiOrder = require('../helper/joi/order.validation_schema');
const { stringToObjectId } = require("../helper/common/backend.function");

const createPurchaseOrder = async (req, res, next) => {
    try {
        const orderDetails = await joiOrder.createPurchaseOrderSchema.validateAsync(req.body);
        console.log(orderDetails);

        const newOrder = new orderModel(orderDetails);

        await newOrder.save();

        if (res.headersSent === false) {
            res.status(201).send({
                error: false,
                data: {
                    message: "Purchase order created successfully"
                }
            })

        }
    } catch (error) {
        if (error?.isJoi === true) error.status = 422;
        next(error);
    }
}

const getPurchaseOrders = async (req, res, next) => {
    try {
        console.log(req.body);
        const orderDetails = await joiOrder.getPurchaseOrdersSchema.validateAsync(req.body);
        console.log(orderDetails);

        const query = { isDeleted: false };

        if (orderDetails.orderId)
            query._id = stringToObjectId(orderDetails.orderId);

        if (orderDetails.userId)
            query.userId = stringToObjectId(orderDetails.userId);

        if (orderDetails.vendorId)
            query.vendorId = stringToObjectId(orderDetails.vendorId);

        if (orderDetails.isReaded)
            query.isReaded = orderDetails.isReaded;

        console.log(query);


        const purchaseOrders = await orderModel.find(query);

        console.log(purchaseOrders);

        if (res.headersSent === false) {
            res.status(201).send({
                error: false,
                data: {
                    purchaseOrders: purchaseOrders,
                    message: "Purchase orders fetched successfully"
                }
            })
        }
    } catch (error) {
        if (error?.isJoi === true) error.status = 422;
        next(error);
    }
}

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders
}