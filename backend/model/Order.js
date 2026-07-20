import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: String,
        price: Number,
        qty: Number,
        image: String,
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    shippingAddress: {
        address: String,
        city: String,
        postal: Number,
        country: String
    },
    itemPrice: {
        type: Number
    },
    shippingCharge: {
        type: Number,
        default: 0
    },
    taxPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    },
    paymentMethod: {
        type: String,
        default: 'cod'
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

export default Order;