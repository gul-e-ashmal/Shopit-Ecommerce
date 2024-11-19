import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailQuery } from '../../reudx/API/productApi';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { setCartItems } from '../../reudx/features/cartSlice';
import NewReview from '../reviews/NewReview';
import ListReview from '../reviews/ListReview';

const ProductDetail = () => {

  const [quantity, setQuantity] = useState(1)

  const param = useParams();
  const dispatch = useDispatch()

  const { data } = useGetProductDetailQuery({ id: param?.id.toString() });
  const { isAuthenticated } = useSelector((state) => state.auth)

  const product = data?.product;


  const handleCartItems = () => {
    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      stock: product.stock,
      // image: product?.image[0]?.url
    }

    dispatch(setCartItems(item))
    toast.success("cart added successfully")
  }

  const dcrQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  const icrQty = () => {
    const count = document.querySelector(".count");
    if (quantity >= product.stock) return

    const qty = quantity + 1;
    setQuantity(qty);

  }
  return (
    <>
      <Fragment>
        {data?.product && (<><div className="row d-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <div className="p-3">
              <img
                className="d-block w-100"
                src="./images//default_product.png"
                alt=""
                width="340"
                height="390"
              />
            </div>
            <div className="row justify-content-start mt-5">
              <div className="col-2 ms-4 mt-2">
                <a role="button">
                  <img
                    className="d-block border rounded p-3 cursor-pointer"
                    height="100"
                    width="100"
                    src="./images//default_product.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr />

            <div className="d-flex">
              <div className="star-ratings">
                <i className="fa fa-star star-active"></i>
                <i className="fa fa-star star-active"></i>
                <i className="fa fa-star star-active"></i>
                <i className="fa fa-star star-active"></i>
                <i className="fa fa-star star-active"></i>
              </div>
              <span id="no-of-reviews" className="pt-1 ps-2"> ({product.numOfReviews} Reviews) </span>
            </div>
            <hr />

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={dcrQty}>-</span>
              <input
                type="number"
                className=" count d-inline"
                value={quantity}
                readonly
              />
              <span className="btn btn-primary plus" onClick={icrQty}>+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ms-4"
              disabled={quantity <= 0}
              onClick={handleCartItems}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status: <span id="stock_status" className="greenColor">In Stock</span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>
              {product.description}
            </p>
            <hr />
            <p id="product_seller mb-3">Sold by: <strong>{product?.user ? product?.user?.username : "Tech"}</strong></p>
            {
              isAuthenticated ? <NewReview productId={product._id} /> : <div className="alert alert-danger my-5" type="alert">
                Login to post your review.
              </div>
            }

          </div>
        </div>
          {product.reviews.length > 0 && <ListReview review={product.reviews} />}

        </>)}

        {/* {product.reviews.length > 0 && <ListReview review={product.reviews} />} */}


      </Fragment>
    </>
  )
}

export default ProductDetail