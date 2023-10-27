const httpErrors = require("http-errors");
const { orderModel } = require("../models/order.model");

const createPurchaseOrder = async (req, res, next) => {
    try {
        const orderDetails = req.body;

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
        next(error);
    }
}

const getPurchaseOrders = async (req, res, next) => {
    try {
        const orderDetails = req.body;

        const query = { isDeleted: false };

        if (orderDetails.orderId)
            query._id = orderDetails.orderId;

        if (orderDetails.userId)
            query.userId = orderDetails.userId;

        if (orderDetails.vendorId)
            query.vendorId = orderDetails.vendorId;

        if (orderDetails.isReaded)
            query.isReaded = orderDetails.isReaded;


        const purchaseOrders = await orderModel.find(query);

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
        next(error);
    }
}

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders
}