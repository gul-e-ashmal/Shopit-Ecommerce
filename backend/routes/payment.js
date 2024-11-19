
const AuthUser = require("../middlerware/AuthUser");
const express = require("express");
const AuthorizeRole = require("../middlerware/AuthorizeRole");
const { stripeCheckoutSession, stripeWebhook } = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment/checkout_session",AuthUser,stripeCheckoutSession);
router.post("/payment/webhook",stripeWebhook);

module.exports = router