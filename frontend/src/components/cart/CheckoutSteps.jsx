import React from 'react'

const CheckoutSteps = ({ shipping ,confirmOrder,payment}) => {
    return (
        <div><div class="checkout-progress d-flex justify-content-center mt-5 row">
            {
                shipping ? (<a
                    href="/shipping"
                    class="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                >
                    <div class="triangle2-active"></div>
                    <div class="step active-step">Shipping</div>
                    <div class="triangle-active"></div>
                </a>) : (
                    <a
                        href="#!"
                        class="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                        disabled
                    >
                        <div class="triangle2-incomplete"></div>
                        <div class="step incomplete">Shipping</div>
                        <div class="triangle-incomplete"></div>
                    </a>
                )
            }


            {
                confirmOrder ? (<a
                    href="/confirm_order"
                    class="float-right mt-2 mt-md-0 col-12 col-md-4 col-lg-3"
                >
                    <div class="triangle2-active"></div>
                    <div class="step active-step">Confirm Order</div>
                    <div class="triangle-active"></div>
                </a>) : (<a
                    href="#!"
                    class="float-right mt-2 mt-md-0 col-12 col-md-4 col-lg-3"
                    disabled
                >
                    <div class="triangle2-incomplete"></div>
                    <div class="step incomplete">Confirm Order</div>
                    <div class="triangle-incomplete"></div>
                </a>)
            }


            {
                payment ? (<a
                    href="/payment_method"
                    class="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                >
                    <div class="triangle2-active"></div>
                    <div class="step active-step">Payment</div>
                    <div class="triangle-active"></div>
                </a>
                ) : (<a
                    href="#!"
                    class="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                    disabled
                >
                    <div class="triangle2-incomplete"></div>
                    <div class="step incomplete">Payment</div>
                    <div class="triangle-incomplete"></div>
                </a>)
            }
        </div>
        </div>
    )
}

export default CheckoutSteps