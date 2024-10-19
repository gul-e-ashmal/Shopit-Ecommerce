const Order = require("../models/ordermodel")
const Product = require("../models/productmodel")
const ErrorHandler = require("../utils/ErrorHandler")
const CatchAsyncAwait = require("../middlerware/CatchAsyncAwait")

// api/v1/order/new
const newOrder = CatchAsyncAwait(async () => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({ shippingInfo, user, orderItems, paymentInfo, paymentMethod, orderStatus, itemsPrice, taxPrice, shippingPrice, totalPrice, user: req.user._id });

    res.status(200).json({
        success: "true",
        order
    })

})


//  order/:id
const getOrderInfo = CatchAsyncAwait(async () => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }
    res.status(200).json({
        success: "true",
        order
    })

})

// api/v1//orders/me
const myOrders = CatchAsyncAwait(async () => {

    const order = await Order.findOne(req.user._id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }
    res.status(200).json({
        success: "true",
        order
    })

})

// admin/orders
const allOrders = CatchAsyncAwait(async () => {

    const order = await Order.find();

    res.status(200).json({
        success: "true",
        order
    })

})

// amdin/orders/:id
const updateOrders = CatchAsyncAwait(async () => {

    const order = await Order.findOne(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    if (order.orderStatus == "Delivered") {
        return next(new ErrorHandler("Order is already delivered", 404))
    }

    order?.orderItems?.forEach(async item => {

        const product = await Product.findById(item.product);
        product.stock = product.stock = item.quantity;

        await product.save();

    });

    order.orderStatus = req.body.status;
    order.deliveredAt = new Date.now();

    await order.save()

    res.status(200).json({
        success: "true",
        order
    })

})

// amdin/orders/:id
const deleteOrder = CatchAsyncAwait(async () => {

    const order = await Order.findOne(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }


    await order.deleteOne();
    res.status(200).json({
        success: "true",
    })

})

module.exports = { newOrder, getOrderInfo, myOrders, deleteOrder, updateOrders, allOrders }