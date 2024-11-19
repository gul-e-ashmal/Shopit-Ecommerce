const { getAllProduct, newProduct, singleProduct, updateProduct, deleteProduct, createReview, getProductReview, deleteReview, canReview, getProducts, uploadProductImages, deleteProductImages } = require("../controllers/productcontroller");

const express = require("express");
const AuthUser = require("../middlerware/AuthUser");
const AuthorizeRole = require("../middlerware/AuthorizeRole");

const router = express.Router();

router.get("/products", getAllProduct);
router.post("/admin/products", AuthUser, AuthorizeRole('admin'), newProduct);
router.get("/products/:id", singleProduct);
// get products for admin
router.get("/admin/products", AuthUser, AuthorizeRole('admin'), getProducts);
// admin/products/:id/delete_images
router.put("/admin/products/:id/upload_images", AuthUser, AuthorizeRole('admin'), uploadProductImages)
router.delete("/admin/products/:id/delete_images", AuthUser, AuthorizeRole('admin'), deleteProductImages)
// update and deleted product
router.delete("/admin/products/:id", AuthUser, AuthorizeRole('admin'), deleteProduct);
router.put("/admin/products/:id", AuthUser, AuthorizeRole('admin'), updateProduct);

// review routes
router.put("/review", AuthUser, createReview)
router.get("/can_review", AuthUser, canReview)

router.get("/admin/reviews", AuthUser, AuthorizeRole('admin'), getProductReview)
router.delete("/admin/reviews", AuthUser, AuthorizeRole('admin'), deleteReview)

module.exports = router