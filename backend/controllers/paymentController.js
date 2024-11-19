const ErrorHandler = require("../utils/ErrorHandler")
const CatchAsyncAwait = require("../middlerware/CatchAsyncAwait")
const Stripe = require("stripe");
const Order = require("../models/ordermodel");
require('dotenv').config();

const stripe = Stripe("")

const stripeCheckoutSession = CatchAsyncAwait(async (req, res) => {

    const body = req?.body;

    const shipping_rate = body?.itemsPrice > 200 ? "" : "";
    const line_items = body?.orderItem?.map((item) => {
        return {
            price_data: {
                currency: "aud",
                product_data: {
                    name: item?.name,
                    metadata: { productId: item?.id }
                },
                unit_amount: item.price * 100
            },
            tax_rates: [""],
            quantity: item?.quantity
        }
    })


    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            "card"
        ],
        success_url: "http://127.0.0.1:3001/me/orders?order_success=true",
        cancel_url: "http://127.0.0.1:3001/",
        customer_email: req?.user?.email,
        client_reference_id: req?.user?._id.toString(),
        mode: "payment",
        metadata: { ...body?.shippingInfo, itemsPrice: body?.itemsPrice },
        shipping_options: [{ shipping_rate }],
        line_items
    })

    res.status(200).json({
        url: session.url
    })

})

const getOrderItems = async (line_items) => {
    return new Promise((resolve, reject) => {
        let cartItems = [];

        // line_items?.data?.map(async (item) => {
        //     const product = await stripe.products.retrieve(item.price.product);
        //     const productId = product.metadata.productId;

        //     cartItems.push({
        //         id: productId,
        //         name: product.name,
        //         price: item.price.unit_amount_decimal / 100,
        //         quatity: item.quantity
        //     })
        // })

        Promise.all(
            line_items?.data?.map(async (item) => {
                const product = await stripe.products.retrieve(item.price.product);
                const productId = product.metadata.productId;

                cartItems.push({
                    id: productId,
                    name: product.name,
                    price: item.price.unit_amount_decimal / 100,
                    quatity: item.quantity
                })

                return {
                    id: productId,
                    name: product.name,
                    price: item.price.unit_amount_decimal / 100,
                    quantity: item.quantity
                };
            })
        )
            .then(cartItems => resolve(cartItems))
            .catch(error => reject(error));

        // if (cartItems.length === line_items?.data?.length) {
        //     resolve(cartItems)
        //     // return cartItems
        // }

    })
}

const stripeWebhook = CatchAsyncAwait(async (req, res) => {
    try {
        const signature = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.rawBody, signature, ``);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const line_items = await stripe.checkout.sessions.listLineItems(session.id);

            const orderItems = await getOrderItems(line_items);
            console.log("orderItems", orderItems)
            const user = session.client_reference_id;

            const totalAmount = session.amount_total / 100;
            const totalTax = session.total_details.amount_tax / 100;
            const totalShipping = session.total_details.amount_shipping / 100;

            const itemsPrice = session.metadata.itemsPrice;
            const shippingInfo = {
                address: session.metadata.address,
                city: session.metadata.city,
                country: session.metadata.country,
                phoneNo: session.metadata.phoneNo,
                postalCode: session.metadata.postalCode,
            }

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status
            }

            const orderData = {
                orderItems, shippingInfo,
                paymentInfo,
                itemsPrice,
                user,
                totalAmount,
                totalShipping,
                totalTax,
                itemsPrice,
                paymentMethod: "Card",
                orderStatus: "Shipped"

            }
            await Order.create(orderData);
        }


        res.status(200).json({
            success: true
        })

    } catch (error) {

        console.log(error);

    }
})

module.exports = { stripeCheckoutSession, stripeWebhook }