const joi = require('joi');

const createPurchaseOrderSchema = joi.object({
    productName: joi.string().trim().required(),
    quantity: joi.number().required(),
    dateOfShipping: joi.string().trim().required(),
    shippingSchedule1: joi.date().allow(null).default(null),
    shippingSchedule2: joi.date().allow(null).default(null),
    shippingSchedule3: joi.date().allow(null).default(null),
    isReaded: joi.boolean().allow(null).default(false),
    userId: joi.string().trim().required(),
    vendorId: joi.string().trim().required(),
    isDeleted: joi.boolean().allow(null).default(false)
})

const getPurchaseOrdersSchema = joi.object({
    vendorId: joi.string().allow(null).default(null),
    orderId: joi.string().allow(null).default(null),
    userId: joi.string().allow(null).default(null),
    isReaded: joi.boolean().allow(null).default(false)
})

module.exports = {
    createPurchaseOrderSchema,
    getPurchaseOrdersSchema,
}