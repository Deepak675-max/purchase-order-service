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
        required: true
    },
    shippingSchedule2: {
        type: Date,
        required: true
    },
    shippingSchedule3: {
        type: Date,
        required: true
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