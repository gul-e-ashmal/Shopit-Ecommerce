import React from 'react'
import { useSelector } from 'react-redux'
import { calculatePrice } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const Confirm_Order = () => {
    const { user } = useSelector((state) => state.auth);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const {subTotal,total,tax,shipping}=calculatePrice(cartItems);
    return (
        <div> <div class="row d-flex justify-content-between">
            <CheckoutSteps shipping confirmOrder />
            <div class="col-12 col-lg-8 mt-5 order-confirm">
                <h4 class="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p class="mb-4">
                    <b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}
                </p>

                <hr />
                <h4 class="mt-4">Your Cart Items:</h4>

                <hr />

                {
                    cartItems.map((item, index) => <div key={index} class="cart-item my-1">
                        <div class="row">
                            <div class="col-4 col-lg-2">
                                <img
                                    src="../images/product.jpg"
                                    alt="Laptop"
                                    height="45"
                                    width="65"
                                />
                            </div>

                            <div class="col-5 col-lg-6">
                                <a href="#">{item.name}</a>
                            </div>

                            <div class="col-4 col-lg-4 mt-4 mt-lg-0">
                                <p>{item.quantity} x ${item.price} = <b>${(item.quantity*item.price).toFixed(2)}</b></p>
                            </div>
                        </div>
                    </div>)
                }

                <hr />
            </div>

            <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal: <span class="order-summary-values">${subTotal}</span></p>
                    <p>Shipping: <span class="order-summary-values">${shipping}</span></p>
                    <p>Tax: <span class="order-summary-values">${tax}</span></p>

                    <hr />

                    <p>Total: <span class="order-summary-values">${total}</span></p>

                    <hr />
                    <Link to="/payment_method" id="checkout_btn" class="btn btn-primary w-100">
                        Proceed to Payment
                    </Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Confirm_Order