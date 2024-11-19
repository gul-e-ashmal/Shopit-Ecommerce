import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { calculatePrice } from '../../helpers/helpers';
import { useCreateNewOrderMutation, usePaymentCheckoutSessionMutation } from '../../reudx/API/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const Payment_Method = () => {

    const [method, setMethod] = useState("");

    const { user } = useSelector((state) => state.auth);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { subTotal, tax, total, shipping } = calculatePrice(cartItems);

    const navigate = useNavigate();

    const [createNewOrder, { error, isSuccess, isLoading }] = useCreateNewOrderMutation();
    const [paymentCheckoutSession, { data: checkoutData, error: checkoutError }] = usePaymentCheckoutSessionMutation();


    useEffect(() => {

        if (checkoutData) {
            window.location.href = checkoutData?.url
        }

        if (checkoutError) {
            toast.error(checkoutError?.data?.message);
        }

    }, [checkoutData, checkoutError])


    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Order Placed successfully");
            navigate("/me/orders?order_success=true")
        }

    }, [error, isSuccess])

    const handleSubmit = (e) => {

        e.preventDefault();

        if (method === "COD") {
            const data = {
                shippingInfo,
                orderItem: cartItems,
                itemsPrice: subTotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: total,
                orderStatus: "Processing",
                paymentMethod: method,
            }

            createNewOrder(data);
        }
        else if (method === "Card") {

            const data = {
                shippingInfo,
                orderItem: cartItems,
                itemsPrice: subTotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: total,
            }

            paymentCheckoutSession(data)
        }
        else {
            toast.error("Select any option for further steps")
        }
    }

    return (
        <div> <div class="row wrapper mt-5">
            <CheckoutSteps shipping confirmOrder payment />
            <div class="col-10 col-lg-5">
                <form
                    class="shadow rounded bg-body"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <h2 class="mb-4">Select Payment Method</h2>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="payment_mode"
                            id="codradio"
                            value={method}
                            onChange={(e) => setMethod("COD")}
                        />
                        <label class="form-check-label" for="codradio">
                            Cash on Delivery
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="payment_mode"
                            id="cardradio"
                            value={method}
                            onChange={(e) => setMethod("Card")}
                        />
                        <label class="form-check-label" for="cardradio">
                            Card - VISA, MasterCard
                        </label>
                    </div>

                    <button id="shipping_btn" type="submit" class="btn py-2 w-100">
                        CONTINUE
                    </button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Payment_Method