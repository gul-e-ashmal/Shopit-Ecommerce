
const AuthUser = require("../middlerware/AuthUser");
const { getOrderInfo, myOrders, newOrder, allOrders, updateOrders, deleteOrder } = require("../controllers/orderController");
const express = require("express");
const AuthorizeRole = require("../middlerware/AuthorizeRole");

const router = express.Router();

router.post("/order/new", AuthUser, newOrder);

router.get("/order/:id", AuthUser, getOrderInfo);
router.get("/orders/me", AuthUser, myOrders);


router.route("/admin/orders").get(AuthUser, AuthorizeRole("admin"), allOrders)
router.route("/admin/orders/:id").put(AuthUser, AuthorizeRole("admin"), updateOrders)
    .delete(AuthUser, AuthorizeRole("admin"), deleteOrder)

module.exports = router