const { getAllProduct, newProduct, singleProduct, updateProduct, deleteProduct, createReview, getProductReview, deleteReview } = require("../controllers/productcontroller");

const express = require("express");
const AuthUser = require("../middlerware/AuthUser");
const AuthorizeRole = require("../middlerware/AuthorizeRole");

const router = express.Router();

router.get("/products", getAllProduct);
router.post("/admin/products", AuthUser,AuthorizeRole('admin'), newProduct);
router.get("/products/:id", singleProduct);
router.delete("/admin/products/:id", AuthUser,AuthorizeRole('admin'), deleteProduct);
router.put("/admin/products/:id", AuthUser,AuthorizeRole('admin'), updateProduct);

// review routes
router.post("/review", AuthUser, createReview)
router.get("/review", AuthUser, getProductReview)

router.delete("/admin/review", AuthUser, AuthorizeRole('admin'), deleteReview)

module.exports = router