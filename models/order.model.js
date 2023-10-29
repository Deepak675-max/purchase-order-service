const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dateOfShipping: {
        type: String,
        required: true
    },
    shippingSchedule1: {
        type: Date,
        default: null
    },
    shippingSchedule2: {
        type: Date,
        default: null
    },
    shippingSchedule3: {
        type: Date,
        default: null
    },
    selectedShippingSchedule: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isReaded: {
        type: Boolean,
        default: false
    },
    vendorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

const orderModel = mongoose.model('purchase_order', orderSchema);

module.exports = {
    orderModel
}