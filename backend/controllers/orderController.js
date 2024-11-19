const Order = require("../models/ordermodel")
const Product = require("../models/productmodel")
const ErrorHandler = require("../utils/ErrorHandler")
const CatchAsyncAwait = require("../middlerware/CatchAsyncAwait")

// api/v1/order/new
const newOrder = CatchAsyncAwait(async (req, res) => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentMethod, orderStatus } = req.body;

    const order = await Order.create(
        { shippingInfo, orderItems, paymentInfo, paymentMethod, orderStatus, itemsPrice, taxPrice, shippingPrice, totalPrice, user: req?.user?._id });

    res.status(200).json({
        success: "true",
        order
    })

})


//  order/:id
const getOrderInfo = CatchAsyncAwait(async (req, res) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }
    res.status(200).json({
        success: "true",
        order
    })

})

// api/v1//orders/me
const myOrders = CatchAsyncAwait(async (req, res, next) => {

    const order = await Order.find({ user: req.user._id }).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }
    res.status(200).json({
        success: "true",
        order
    })

})

// admin/orders
const allOrders = CatchAsyncAwait(async (req, res) => {

    const order = await Order.find();


    res.status(200).json({
        success: "true",
        order
    })

})

// amdin/orders/:id
const updateOrders = CatchAsyncAwait(async (req, res) => {

    const order = await Order.findOne({ _id: req.params.id });

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    if (order.orderStatus == "Delivered") {
        return next(new ErrorHandler("Order is already delivered", 404))
    }

    const productNotFound = false;

    // implement this logic to check whther product exust or not , if not vreak the loop

    for (item in order?.orderItems) {
        const product = await Product.findById(item.id);
        if (!product) {
            productNotFound = true;
            break;
        }
        product.stock = product?.stock - item.quantity;

        await product.save();
    }


    if (productNotFound) {
        return next(new ErrorHandler("Product not found", 404))
    }

    // this logic is alos correct but it does not cjeck whether product exist ornot
    // order?.orderItems?.forEach(async item => {

    //     const product = await Product.findById(item.id);
    //     product.stock = product?.stock - item.quantity;

    //     await product.save();

    // });

    order.orderStatus = req.body.status;
    order.deliveredAt = new Date();

    await order.save()

    res.status(200).json({
        success: "true",
        order
    })

})

// amdin/orders/:id
const deleteOrder = CatchAsyncAwait(async (req, res) => {

    const order = await Order.findOne({ _id: req.params.id });

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }


    await order.deleteOne();
    res.status(200).json({
        success: "true",
    })

})

const getSalesData = async (startDate, endDate) => {

    const salesData = await Order.aggregate([{
        $match: {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }

    }, {

        $group: {
            _id: { date: { $dateToString: { format: "%Y:%m:%d", date: "$createdAt" } } },
            totalSales: { $sum: "$totalPrice" },
            totalOrder: { $sum: 1 }
        }

    }])

    console.log(salesData);
    // careet a map to store ssales and num of orders
    const setSales = new Map();

    let totalSales = 0;
    let totalNumOrders = 0;

    salesData.forEach((entry) => {

        const date = entry._id.date;
        const sales = entry.totalSales;
        const numOrders = entry.totalOrder;

        setSales.set(date, { sales, numOrders })
        totalSales += sales;
        totalNumOrders += numOrders

    })

    // generate an order between end and start date
    const dates = getDatesBetween(startDate, endDate);
    console.log(dates);

    // create final data
    const finalSalesData = dates.map((date) => ({
        date,
        sales: (setSales.get(date) || { sales: 0 }).sales,
        numOrders: (setSales.get(date) || { numOrders: 0 }).numOrders
    }))
    console.log(finalSalesData);

    return {salesData:finalSalesData,totalSales,totalNumOrders}
}

function getDatesBetween(startDate, endDate) {
    const dates = []
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        // const formattedDate = currentDate.toISOString().split("T")[0];
        // dates.push(formattedDate);
        // currentDate.setDate(currentDate.getDate() + 1);

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}:${month}:${day}`; // Format as "YYYY:MM:DD"

        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates

}

const getSales = CatchAsyncAwait(async (req, res) => {

    console.log(req?.query?.startDate)

    const startDate = new Date(req?.query?.startDate);
    const endDate = new Date(req?.query?.endDate)

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const {salesData,totalSales,totalNumOrders}=await getSalesData(startDate, endDate);
    res.status(200).json({
        success: "true",
        salesData,totalSales,totalNumOrders
    })

})

module.exports = { newOrder, getOrderInfo, myOrders, deleteOrder, updateOrders, allOrders, getSales }