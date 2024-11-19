import React from 'react'
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeCartItems, setCartItems } from '../../reudx/features/cartSlice';
import toast from 'react-hot-toast';
import { FaTrashCan } from "react-icons/fa6";


const Cart = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const incQty = (item, quantity) => {
        const newQty = quantity + 1;
        if (newQty > item.stock) return
        handleCartItems(item, newQty);
    }
    const dscQty = (item, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return
        handleCartItems(item, newQty);
    }

    const handleCartItems = (product, newQty) => {
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: newQty,
            stock: product.stock,
            image: ""
        }

        dispatch(setCartItems(item));
    }

    const handleCheckout = () => {
        navigate("/shipping")
    }

    const handleRemoveItem = (item) => {
        dispatch(removeCartItems(item.id));
    }
    return (
        <div>
            <MetaData title="Cart" />
            <h2 className="mt-5">Your Cart: <b>5 items</b></h2>

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8">

                    {
                        cartItems.map((item, index) => (
                            <div className="cart-item" data-key={index}>
                                <hr />
                                <div className="row">
                                    <div className="col-4 col-lg-3">
                                        <img
                                            src="../images/product.jpg"
                                            alt="Laptop"
                                            height="90"
                                            width="115"
                                        />
                                    </div>
                                    <div className="col-5 col-lg-3">
                                        <Link to={`/products/${item.id}`}> {item.name} </Link>
                                    </div>
                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p id="card_item_price">${item.price}</p>
                                    </div>
                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <div className="stockCounter d-inline">
                                            <span className="btn btn-danger minus" onClick={() => dscQty(item, item.quantity)}> - </span>
                                            <input
                                                type="number"
                                                className=" count d-inline"
                                                value={item.quantity}
                                                readonly
                                            />
                                            <span className="btn btn-primary plus" onClick={() => incQty(item, item.quantity)}> + </span>
                                        </div>
                                    </div>
                                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                        {/* <FaTrashCan  id="delete_cart_item" className="btn-danger" onClick={() => handleRemoveItem(item)} /> */}
                                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => handleRemoveItem(item)} >delete</i>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                    }



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span></p>
                        <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} </span></p>
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary w-100" onClick={handleCheckout}>
                            Check out
                        </button>
                    </div>
                </div>
            </div></div>
    )
}

export default Cart