const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                // required: true
            },
            price: {
                type: Number,
                required: true
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'product'
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: {
            values: ["COD", "Card"],
            message: "Please select COD and card"
        }

    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true, enum: {
            values: ["Processing", "Shipped", "Delivered"],
            message: "Please select Processing, Shipped and Delivered"
        },
        default: 'Processing'

    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamp: true })

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel