const Product = require("../models/productmodel")
const ErrorHandler = require("../utils/ErrorHandler")
const CatchAsyncAwait = require("../middlerware/CatchAsyncAwait")
const APIfilter = require("../utils/APIfliter");
const Order = require("../models/ordermodel");
const { upload_file, delete_file } = require("../utils/CloudinarySetup");

const getAllProduct = CatchAsyncAwait(async (req, res) => {

    let resperpage = 4;

    const filter = new APIfilter(Product, req.query);
    filter.search().filter();

    let product = await filter.query;
    const filterProductCount = product.length;

    filter.pagination(resperpage);

    product = await filter.query.clone();

    res.status(200).json({
        product,
        resperpage,
        filterProductCount
    })

})
// create by admin api/v1/admin/products
const newProduct = CatchAsyncAwait(async (req, res) => {

    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(200).json({
        product
    })

})

// create by admin api/v1/admin/products:id
const singleProduct = CatchAsyncAwait(async (req, res, next) => {

    const product = await Product.findById(req?.params?.id).populate("reviews.user");
    if (!product) {
        return next(new ErrorHandler("product not found", 400))
    }
    return res.status(200).json({
        product
    })
})

const getProducts = CatchAsyncAwait(async (req, res) => {
    const products = await Product.find();
    if (!products) {
        return next(new ErrorHandler("product not found", 400))
    }
    res.status(200).json({
        products
    })

})
// create by admin api/v1/admin/products:id
const deleteProduct = CatchAsyncAwait(async (req, res) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 400))
    }
    await Product.findByIdAndDelete(product)
    res.status(200).json({
        Message: "Deleted successfully"
    })
})

// create by admin api/v1/admin/products:id
const updateProduct = CatchAsyncAwait(async (req, res) => {

    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 400))
    }
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new: true });
    res.status(200).json({
        product
    })

})

// admin/products/:id/upload_images
const uploadProductImages = CatchAsyncAwait(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 400))
    }

    if (!req.body.images || !req.body.images.length) {
        return next(new ErrorHandler("No images provided", 400));
    }


    const uploader = async (image) => upload_file(image, "shopit/products");

    const urls = await Promise.all(req?.body?.images.map(uploader));
    product.images?.push(...urls);

    await product.save()
    res.status(200).json({
        product
    })

})

// admin/products/:id/delete_images
const deleteProductImages = CatchAsyncAwait(async (req, res) => {

    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 400))
    }

    const isDeleted = await delete_file(req?.body?.imgId);


    if (isDeleted) {
        product.images = product.images.filter((img) => img?.public_id !== req?.body?.imgId)
    }

    await product.save()
    res.status(200).json({
        product
    })

})


// product review----/review
const createReview = CatchAsyncAwait(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req?.user?._id,
        name: req?.user?.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found"));
    }

    const isReviewed = product?.reviews?.find((r) => r.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product?.reviews.forEach((item) => {
            if (item.user.toString() === req.user._id.toString()) {
                item.rating = rating;
                item.comment = comment;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => acc + item.rating) / product.reviews.length

    product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

// product review----/review   --->get method
const getProductReview = CatchAsyncAwait(async (req, res, next) => {

    const product = await Product.findById(req.query.id).populate("reviews.user");
    if (!product) {
        return next(new ErrorHandler("Product not found"));
    }
    const reviews = product.reviews;

    res.status(200).json({
        reviews
    })
})

// product review----admin/reviews   --->post method
// const updateReview = CatchAsyncAwait(async (req, res, next) => {

//     const { rating, comment, productId } = req.body

//     const review = {
//         user: req?.user?._id,
//         name: req?.user?.name,
//         rating: Number(rating),
//         comment
//     }

//     const product = await Product.findById(req.query.id);

//     if (!product) {
//         return next(new ErrorHandler("Product not found"));
//     }

//     // const isReviewed = product?.reviews?.find((r) => r.user.toString() === req.user._id.toString())

//     // if (isReviewed) {
//     product?.reviews.forEach((item) => {
//         if (item.user.toString() === req.user._id.toString()) {
//             item.rating = rating;
//             item.comment = comment;
//         }
//         //     })
//         // } else {

//         // }

//         res.status(200).json({
//             success: true
//         })

//     })


// product review----admin/reviews   --->delete method
const deleteReview = CatchAsyncAwait(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found"));
    }

    product.reviews = product.reviews.filter((item) => item._id.toString() !== req.query.id.toString());

    product.numOfReviews = product.reviews.length;

    product.ratings = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})

const canReview = CatchAsyncAwait(async (req, res, next) => {

    const order = await Order.find({ user: req.user._id, "orderItems.id": req.query.productId });

    if (order.length === 0) {
        return res.status(200).json({
            can_review: false
        })
    }

    res.status(200).json({
        can_review: true
    })

})

module.exports = { getAllProduct, newProduct, singleProduct, getProducts, updateProduct, deleteProduct, uploadProductImages, deleteProductImages, createReview, deleteReview, getProductReview, canReview }